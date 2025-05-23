import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { NekosAPI } from 'nekosapi';

import { useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme';
import { show_characters, show_images } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';


/* export interface NekoImageData {
    id: number;
    url: string;
    rating: string;
    color_dominant: number[];
    color_palette: number[][];
    artist_name: string | null;
    tags: string[];
    source_url: string | null;
} */

export interface NekoImageData {
    id: number;
    name: string;
    /* alias: string;
    description: string;
    history: string;
    hobbie: string;
    occupation: string;
    day: number;
    month: number;
    age: number;
    kind: number; */
    profile_photo: string;
}

export const Characters = () => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [dataArray, setDataArray] = useState<NekoImageData[] | null>(null);
    const { themeData, dynamicStyles } = useTheme();

    const [noImages, setNoImages] = useState(false);


    const navigation = useNavigation();

    useEffect(() => {
        //fetch("http://192.168.18.5/nekopaper/api/lista/mostrar_imagenes.php")
        fetch(`${show_characters}`)

            .then((res) => res.json())
            .then((data) => {
                //const items = data?.items;
                //const items = data[0];

                //setDataArray(data);
                console.log("data => ", data);
                console.log("TRAYENDO RESULTADOS DE BD Bv");
                if (Array.isArray(data) && data.length > 0) {
                    const mappedData: NekoImageData[] = data.map((item: any) => ({
                        id: parseInt(item.id_personaje),
                        name: item.nombre,
                        /* alias: item.alias,
                        description: item.descripcion,
                        history: item.historia,
                        hobbie: item.pasatiempo,
                        occupation: item.ocupacion,
                        day: parseInt(item.dia),
                        month: parseInt(item.mes),
                        age: parseInt(item.edad),
                        kind: parseInt(item.id_especie), */
                        profile_photo: item.imagen_perfil,

                    }));

                    setDataArray(mappedData);
                    setNoImages(false);
                } else {
                    console.warn("No se encontraron imágenes en la respuesta.");
                    setNoImages(true);
                }



            })
            .catch((err) => console.error("Error al traer imagen:", err));
    }, []);


    const renderItem = ({ item }: { item: NekoImageData }) => (
        <TouchableOpacity
            //style={stylesAppTheme.animeCell}
            onPress={() => navigation.navigate("ProfileCharacter", {/*  url: item?.url, tags: item?.tags, artist_name: item?.artist_name, */profile_photo: item.profile_photo, id: item?.id })}
        >
            <Image
                source={{ uri: item.profile_photo }}
                style={{ width: 170, height: 170 }}
            //style={stylesAppTheme.animeCellImage}
            />
            <Text style={[dynamicStyles.dynamicText, stylesAppTheme.animeCellText]} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle,]}>
            <FlatList
                data={dataArray}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}

                //contentContainerStyle={[dynamicStyles.dynamicMainContainer, /* stylesAppTheme.mainContainer, */]}
                //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, stylesAppTheme.viewContainer]} // Estilo para englobar las columnas
                ListHeaderComponent={() => (

                    <>
                        {noImages && <Text style={dynamicStyles.dynamicText}>No hay Wallpapers en la BD Bv</Text>}
                    </>

                )}
                //ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />

                //onEndReached={fetchAnimes} // Llama a fetchAnimes cuando el usuario alcanza el final de la lista
                onEndReachedThreshold={0.5} // Cargar más datos cuando queda el 50% de la lista visible
            />
        </View>
    )
}

