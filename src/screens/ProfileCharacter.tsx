import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Image, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native'

import { search_character, show_images_for_character } from '../const/UrlConfig';

import { useTheme } from '../hooks/UseTheme';
import { WaifuData, ImageData } from '../helpers/Interfaces';
import { useFetch } from '../hooks/useFetch';
import { adaptarUrlImagen } from '../helpers/helpers';

export const ProfileCharacter = ({ route }) => {
    const navigation = useNavigation();

    const { width } = Dimensions.get('window');
    const { id_personaje } = route.params;

    const { dynamicStyles } = useTheme();

    const [waifu, setWaifu] = useState<WaifuData | null>(null);
    const [listaWallpapers, setListaWallpapers] = useState<ImageData[] | null>(null);

    const { fetchData: consultarWaifu, error: errorWaifu }
        = useFetch<WaifuData>({ endpoint: search_character, metodo: 'GET', params: { id_personaje: id_personaje } });

    const { fetchData: consultarWallpapers, error: errorWallpaper } = useFetch<ImageData[]>({ endpoint: show_images_for_character, metodo: 'GET', params: { id_personaje: id_personaje } });

    useEffect(() => {

        const perfilWaifu = async () => {

            const response = await consultarWaifu();
            if (!response.Error) {
                /* const waifusAdaptadas = response.map(waifu => ({
                    ...waifu,
                    imagen_perfil: adaptarUrlImagen(waifu.imagen_perfil)
                }))
                setWaifu(waifusAdaptadas); */
                setWaifu(response);
            }
        }
        perfilWaifu();

    }, []);
    useEffect(() => {
        const wallpapersWaifu = async () => {
            const response = await consultarWallpapers();
            if (!response.Error) {
                const wallpapersAdaptados = response.map(wallpaper => ({
                    ...wallpaper,
                    url: adaptarUrlImagen(wallpaper.url)
                }))
                setListaWallpapers(wallpapersAdaptados);
            }
        }
        wallpapersWaifu();
    }, []);

    return (
        <ScrollView style={dynamicStyles.dynamicScrollViewStyle} /* style={{marginTop:200}} */>
            <View style={{ padding: 16 }}>
                {/* Nombre y favorito */}
                {waifu &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[dynamicStyles.dynamicText, { fontSize: 24, fontWeight: 'bold' }]}>{waifu?.nombre} ({waifu?.alias})</Text>
                    </View>}

                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    {waifu &&
                        <>
                            <Image
                                source={{ uri: waifu?.imagen_perfil }}
                                style={{
                                    width: width * 0.4,
                                    aspectRatio: 9 / 16,
                                    borderRadius: 12,
                                    marginRight: 16
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={dynamicStyles.dynamicText}>Edad: {waifu?.edad}</Text>
                                <Text style={dynamicStyles.dynamicText}>Ocupación: {waifu?.ocupacion}</Text>
                                <Text style={dynamicStyles.dynamicText}>Pasatiempo: {waifu?.pasatiempo}</Text>
                                <Text style={dynamicStyles.dynamicText}>Cumpleaños: {waifu?.dia}/{waifu?.mes}</Text>
                                <Text style={dynamicStyles.dynamicText}>Especie: {waifu?.especie}</Text>
                                <Text style={dynamicStyles.dynamicText}>Personalidad(es): {waifu?.personalidades}</Text>
                            </View>
                        </>}
                </View>

                {waifu &&
                    <>
                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                            {waifu?.descripcion}
                        </Text>
                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16, fontWeight: 'bold' }]}>Historia:</Text>
                        <Text style={[dynamicStyles.dynamicText]}>
                            {waifu?.historia}
                        </Text>
                    </>}

                {waifu &&
                    <>
                        <Text></Text>
                        <Text style={[dynamicStyles.dynamicText, { fontWeight: 'bold' }]}>Wallpapers</Text>
                    </>
                }

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 10, /* backgroundColor: "red", */ justifyContent: 'center' }}>
                    {waifu &&
                        <>
                            {listaWallpapers?.map((item) => (
                                <TouchableOpacity onPress={() => navigation.navigate("Wallpaper", { url: item.url, id: item.id_imagen })} key={item.id_imagen}>

                                    <Image
                                        source={{ uri: item.url }}
                                        style={{
                                            width: width * 0.25, // un poco más grande
                                            aspectRatio: 9 / 16,
                                            borderRadius: 14,
                                            resizeMode: 'cover', // importante: evita que se estire raro
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </>
                    }
                </View>


            </View>
        </ScrollView>
    );
};