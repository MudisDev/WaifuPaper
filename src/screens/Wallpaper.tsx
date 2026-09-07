import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Image, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { UserContext } from '../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { add_favorite, consult_favorite, consult_tags, delete_favorite } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { TagData } from '../helpers/Interfaces';
import { useFetch } from '../hooks/useFetch';
import { Tag } from 'nekosapi/v3/types/Tag';

export const Wallpaper = ({ route }) => {
    const [image, setImage] = useState<string | null>(null)
    const { width, height } = Dimensions.get('window');
    const { url, id_imagen } = route.params;
    const { userData, } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido
    const { themeData, dynamicStyles } = useTheme();
    const [isFavorite, setIsFavorite] = useState<boolean>();
    const [tags, setTags] = useState<TagData[] | null>();

    useEffect(() => {
        setImage(url);
    }, [])

    /*    useFocusEffect(
           useCallback(() => {
               Consultar_Favorito();
               Consultar_Etiquetas();
           }, [])
       ) */

    /* useEffect(() => {
        Consultar_Favorito();
    }, [isFavorite]) */

    const { data: listaEtiquetas, fetchData: consultarEtiquetas }
        = useFetch<TagData[]>({ endpoint: consult_tags, metodo: 'GET', params: { id_imagen: id_imagen } })

    const { data: favorito, fetchData: consultarFavorito }
        = useFetch({ endpoint: consult_favorite, metodo: 'GET', params: { id_usuario: userData?.id_usuario, id_imagen: id_imagen } });

    useEffect(() => {
        consultarEtiquetas();
    }, [])

    useEffect(() => {

        const consultar = async () => {

            const response = await consultarFavorito();
            if (response.Error)
                setIsFavorite(false);
            else
                setIsFavorite(true);

        }
        consultar();
    }, [])

    /* const Consultar_Favorito = async () => {
        try {
            const url = `${consult_favorite}?` + `id_imagen=${id}` + `&id_usuario=${userData?.idUser}`;
    
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
    } */

    const { fetchData: guardarFavorito } = useFetch({ endpoint: add_favorite, metodo: 'POST' });
    const { fetchData: eliminarFavorito } = useFetch({ endpoint: delete_favorite, metodo: 'DELETE' });

    const Marcar_Favorito = async () => {

        await guardarFavorito({ id_usuario: userData?.id_usuario, id_imagen: id_imagen });
        setIsFavorite(true);

        /* try {
            const url = `${add_favorite}?` + `id_imagen=${id}` + `&id_usuario=${userData?.idUser}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log("Data favorito ->", data);
            setIsFavorite(true); // <-- Actualiza aquí
    
        } catch (e) {
            console.error(`Error al marcar como favorito: ${e}`);
        } */
    }

    const Borrar_Favorito = async () => {

        await eliminarFavorito({ id_usuario: userData?.id_usuario, id_imagen: id_imagen });
        setIsFavorite(false);
        /* try {
            const url = `${delete_favorite}?` + `id_imagen=${id}` + `&id_usuario=${userData?.idUser}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log("Data favorito ->", data);
            setIsFavorite(false); // <-- Actualiza aquí
        } catch (e) {
            console.error(`Error al marcar como favorito: ${e}`);
        } */
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

            {listaEtiquetas?.length !== 0 && (
                <View style={styles.tagContainer}>
                    {listaEtiquetas?.map((tag: TagData, index: number) => (
                        <Text key={tag.id_etiqueta} style={[styles.tagText, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]}>#{tag.nombre_etiqueta}</Text>
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
                    (<TouchableOpacity style={[styles.button, dynamicStyles.dynamicViewContainer]} onPress={Marcar_Favorito}>
                        <Ionicons name={"heart-outline"} size={25} color={themeData.texto} />
                    </TouchableOpacity>)
                }

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
    button: {
        width: 55,
        height: 40,
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }

});