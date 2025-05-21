import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Image, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { UserContext } from '../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';

import { stylesAppTheme } from '../theme/AppTheme';
import { add_favorite, consult_favorite, consult_tags, delete_favorite } from '../const/UrlConfig';
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme';
import { useTheme } from '../hooks/UseTheme';


interface TagData {
    id_tag: string,
    name_tag: string,
}

export const Wallpaper = ({ route }) => {
    const navigation = useNavigation();

    const [image, setImage] = useState<string | null>(null)
    const [artist, setArtist] = useState<string | null>(null);
    const { width, height } = Dimensions.get('window');
    const { url, artist_name, id } = route.params;
    const { userData, } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

    const { themeData, dynamicStyles } = useTheme();


    const [isFavorite, setIsFavorite] = useState<boolean>();

    const [tags, setTags] = useState<TagData[] | null>();


    useEffect(() => {
        console.log("URL:", url);
        console.log("Artista recibido:", artist_name);

        setImage(url);
        setArtist(artist_name);

    }, [])

    useFocusEffect(
        useCallback(() => {
            Consultar_Favorito();
            Consultar_Etiquetas();
        }, [])
    )

    useEffect(() => {
        Consultar_Favorito();
    }, [isFavorite])

    const Consultar_Etiquetas = async () => {
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
    }

    const Consultar_Favorito = async () => {
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
    }

    return (
        //<ScrollView contentContainerStyle={[{ flexGrow: 1, alignItems: 'center', paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>
        <ScrollView style={dynamicStyles.dynamicScrollViewStyle} /* style={{marginTop:200}} */>

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width, height: height * 0.7, resizeMode: 'contain' }}
                />
            )}
            {/* {artist && (
                <Text >Artista: {artist}</Text>
            )}
            {id && (
                <Text >Id: {id}</Text>
            )}
            <Text >IdUser: {userData?.idUser}</Text> */}
            {tags && Array.isArray(tags) && (
                <View style={styles.tagContainer}>
                    {tags.map((tag: TagData, index: number) => (
                        <Text key={tag.id_tag} style={[styles.tagText, dynamicStyles.dynamicText,dynamicStyles.dynamicViewContainer]}>#{tag.name_tag}</Text>
                    ))}
                </View>
            )}
            <View style={styles.buttonsContainer}>
                {/* <TouchableOpacity style={styles.button} onPress={Marcar_Favorito}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={25} color={"red"} />
                </TouchableOpacity> */}
                {isFavorite ?
                    (<TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]} onPress={Borrar_Favorito}>
                        <Ionicons name={"heart"} size={25} color={themeData.texto} />
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]}  onPress={Marcar_Favorito}>
                        <Ionicons name={"heart-outline"} size={25} color={themeData.texto} />
                    </TouchableOpacity>)
                }

                <TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]} >
                    <Ionicons name={"information"} size={25} color={themeData.texto} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]} >
                    <Ionicons name={"download"} size={25} color={themeData.texto} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]} >
                    <Ionicons name={"share-social"} size={25} color={themeData.texto} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button}>
                    <Ionicons name={"people"} size={25} color={"red"} />
                </TouchableOpacity> */}

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
        alignSelf:'center',
        gap: 15

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