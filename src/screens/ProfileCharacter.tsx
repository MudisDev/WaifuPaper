import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Image, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity, TextComponent } from 'react-native'
import { UserContext } from '../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';

import { stylesAppTheme } from '../theme/AppTheme';
import { add_favorite, consult_favorite, consult_tags, delete_favorite, search_character } from '../const/UrlConfig';
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme';
import { useTheme } from '../hooks/UseTheme';


interface TagData {
    id_tag: string,
    name_tag: string,
}


interface WaifuData {
    id_character: number;
    name: string;
    alias: string;
    description: string;
    history: string;
    hobbie: string;
    occupation: string;
    day: number;
    month: number;
    age: number;
    kind: string;
    profile_photo: string;
    personality: string;
}


export const ProfileCharacter = ({ route }) => {
    const navigation = useNavigation();

    const [image, setImage] = useState<string | null>(null)
    const [artist, setArtist] = useState<string | null>(null);
    const { width, height } = Dimensions.get('window');
    const { url, profile_photo, artist_name, id } = route.params;
    const { userData, } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

    const { themeData, dynamicStyles } = useTheme();


    const [isFavorite, setIsFavorite] = useState<boolean>();

    const [tags, setTags] = useState<TagData[] | null>();
    const [waifu, setWaifu] = useState<WaifuData[] | null>();


    useEffect(() => {
        console.log("URL:", url);
        console.log("Artista recibido:", artist_name);

        setImage(profile_photo);
        setArtist(artist_name);



    }, [])

    useFocusEffect(
        useCallback(() => {
            Buscar_Personaje();
            //Consultar_Favorito();
            /* Consultar_Etiquetas(); */
        }, [])
    )

    /* useEffect(() => {
        Consultar_Favorito();
    }, [isFavorite]) */

    const Buscar_Personaje = async () => {
        try {
            const url = `${search_character}?` +
                `id_personaje=${id}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data waifu ->", data);


            console.log("Array Waifu -> ", Array.isArray(data));
            console.log("Waifu buscada =>", data[0]);

            if (Array.isArray(data) && data.length > 0) {
                const mappedData: WaifuData[] = data.map((item: any) => ({
                    id_character: parseInt(item.id_personaje),
                    name: item.nombre,
                    alias: item.alias,
                    description: item.descripcion,
                    history: item.historia,
                    hobbie: item.pasatiempo,
                    occupation: item.ocupacion,
                    day: parseInt(item.dia),
                    month: parseInt(item.mes),
                    age: parseInt(item.edad),
                    //kind: parseInt(item.id_especie),
                    kind: item.especie,
                    profile_photo: item.imagen_perfil,
                    personality: item.personalidades,
                }));

                console.log("MappedData => ", mappedData);

                setWaifu(mappedData);
            } else {
                console.warn("No se encontraron imágenes en la respuesta.");
            }


        } catch (e) {
            console.error(`Error al buscar al personaje: ${e}`);
        }
    }

    /* const Consultar_Etiquetas = async () => {
        try {
            //const url = `http://192.168.18.5/nekopaper/api/imagen/consultar_etiquetas.php?` +
            const url = `${consult_tags}?` +
                `id_imagen=${id}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data etiquetas ->", data);

            console.log("Array Etiquetas -> ", Array.isArray(data));

            if (Array.isArray(data) && data.length > 0) {
                const mappedData: TagData[] = data.map((item: any) => ({
                    id_tag: item.id_etiqueta,
                    name_tag: item.nombre_etiqueta,
                }));

                setTags(mappedData);
            } else {
                console.warn("No se encontraron imágenes en la respuesta.");
            }


        } catch (e) {
            console.error(`Error al consultar etiquetas: ${e}`);
        }
    } */

    /* const Consultar_Favorito = async () => {
        try {
            //const url = `http://192.168.18.5/nekopaper/api/usuario/consultar_favorito.php?` +
            const url = `${consult_favorite}?` +
                `id_imagen=${id}` +
                `&id_usuario=${userData?.idUser}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data favorito ->", data);
            if (data.Error) {
                setIsFavorite(false);
            } else
                setIsFavorite(true);


        } catch (e) {
            console.error(`Error al marcar como favorito: ${e}`);
        }
    }



    const Marcar_Favorito = async () => {
        try {
            //const url = `http://192.168.18.5/nekopaper/api/usuario/marcar_favorito.php?` +
            const url = `${add_favorite}?` +
                `id_imagen=${id}` +
                `&id_usuario=${userData?.idUser}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data favorito ->", data);
            setIsFavorite(true); // <-- Actualiza aquí

        } catch (e) {
            console.error(`Error al marcar como favorito: ${e}`);
        }
    }

    const Borrar_Favorito = async () => {
        try {
            const url = `${delete_favorite}?` +
                `id_imagen=${id}` +
                `&id_usuario=${userData?.idUser}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data favorito ->", data);
            setIsFavorite(false); // <-- Actualiza aquí
        } catch (e) {
            console.error(`Error al marcar como favorito: ${e}`);
        }
    } */

    return (
        //<ScrollView contentContainerStyle={[{ flexGrow: 1, alignItems: 'center', paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>
        <ScrollView style={dynamicStyles.dynamicScrollViewStyle} /* style={{marginTop:200}} */>
            <View style={{ padding: 16 }}>
                {/* Nombre y favorito */}
                {waifu &&
                    <View style={{  alignItems: 'center' }}>
                        <Text style={[dynamicStyles.dynamicText, { fontSize: 24, fontWeight: 'bold' }]}>{waifu[0]?.name} ({waifu[0]?.alias})</Text>
                        {/* <TouchableOpacity onPress={isFavorite ? Borrar_Favorito : Marcar_Favorito}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={themeData.texto} />
                        </TouchableOpacity> */}
                    </View>}

                {/* Imagen + Info básica */}
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    {waifu &&
                        <>
                            <Image
                                source={{ uri: waifu[0]?.profile_photo }}
                                style={{
                                    width: width * 0.4,
                                    aspectRatio: 9 / 16,
                                    borderRadius: 12,
                                    marginRight: 16
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={dynamicStyles.dynamicText}>Edad: {waifu[0]?.age}</Text>
                                <Text style={dynamicStyles.dynamicText}>Ocupación: {waifu[0]?.occupation}</Text>
                                <Text style={dynamicStyles.dynamicText}>Pasatiempo: {waifu[0]?.hobbie}</Text>
                                <Text style={dynamicStyles.dynamicText}>Cumpleaños: {waifu[0]?.day}/{waifu[0]?.month}</Text>
                                <Text style={dynamicStyles.dynamicText}>Especie: {waifu[0]?.kind}</Text>
                                <Text style={dynamicStyles.dynamicText}>Personalidad(es): {waifu[0]?.personality}</Text>
                            </View>
                        </>}
                </View>

                {waifu &&
                    <>
                        {/* Descripción */}

                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                            {waifu[0]?.description}
                        </Text>

                        {/* Historia (expandible si deseas) */}
                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16, fontWeight: 'bold' }]}>Historia:</Text>
                        <Text style={[dynamicStyles.dynamicText]}>
                            {waifu[0]?.history}
                        </Text>
                    </>}

                {/* Etiquetas opcionales si las activas */}
                {/* {tags && (
                    <View style={styles.tagContainer}>
                        {tags.map(tag => (
                            <Text key={tag.id_tag} style={[styles.tagText, dynamicStyles.dynamicText]}>
                                #{tag.name_tag}
                            </Text>
                        ))}
                    </View>
                )} */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'center',
    },
    tagText: {
        margin: 4,
        fontSize: 14,
        //backgroundColor: '#e3e3e3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    buttonsContainer: {
        //backgroundColor: 'red',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems:'center',
        alignSelf: 'center',
        gap: 15

    },
    profileContainer: {
        //backgroundColor: 'red',
        width: '80%',
        /*  flexDirection: 'row', */
        justifyContent: 'center',
        //alignItems:'center',
        alignSelf: 'center',
        gap: 15,
        borderRadius: 10,

    },
    button: {
        width: 55,
        height: 40,
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }

});