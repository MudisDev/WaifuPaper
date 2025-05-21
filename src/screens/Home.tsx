import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { NekosAPI } from 'nekosapi';

import { useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme';
import { show_images } from '../const/UrlConfig';
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
    url: string;
    //rating: 'safe' | 'suggestive' | 'explicit' | 'xxx';
    rating: string;
    artist_name: string | null;
    source_url: string | null;
    api_source: string;
    api_id: string;
    insertion_date: string;
    update_date: string;
}

export const Home = () => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [dataArray, setDataArray] = useState<NekoImageData[] | null>(null);
    const { themeData, dynamicStyles } = useTheme();

    const [noImages, setNoImages] = useState(false);


    const navigation = useNavigation();

    // useEffect(() => {
    //fetch("https://nekos.best/api/v2/neko")
    //fetch("https://api.nekosapi.com/v4/images/random")
    /* .then((res) => res.json())
    .then((data) => {
        //const url = data.results?.[0]?.url;
        //const url = data.results?.[0]?.url;
        const url = data?.[0]?.url;
        //const url = data.results?.url;
        if (url) {
            setImageUrl(url);
            //console.log(`url -> ${url}`);

        }
        // Guarda todos los datos recibidos en el estado
        setDataArray(data);


        console.log(JSON.stringify(data));
    })
    .catch((err) => console.error("Error al traer imagen:", err));
}, []); */
    //fetch("https://api.nekosapi.com/v4/images?rating=explicit")
    /*  fetch("https://api.nekosapi.com/v4/images?limit=10")
         .then((res) => res.json())
         .then((data) => {
             const items = data?.items;

             if (Array.isArray(items) && items.length > 0) {

                 // Guarda todo el array correctamente
                 setDataArray(items);
                 //console.log("Datos recibidos:", JSON.stringify(items, null));



             } else {
                 console.warn("No se encontraron imágenes en la respuesta.");
             }

             

         })
         .catch((err) => console.error("Error al traer imagen:", err));
 }, []); */

    useEffect(() => {
        //fetch("http://192.168.18.5/nekopaper/api/lista/mostrar_imagenes.php")
        fetch(`${show_images}`)

            .then((res) => res.json())
            .then((data) => {
                //const items = data?.items;
                //const items = data[0];

                //setDataArray(data);

                console.log("TRAYENDO RESULTADOS DE BD Bv");
                if (Array.isArray(data) && data.length > 0) {
                    const mappedData: NekoImageData[] = data.map((item: any) => ({
                        id: parseInt(item.id_imagen),
                        url: item.url,
                        rating: item.clasificacion,
                        artist_name: item.artista === "null" ? null : item.artista,
                        source_url: item.url_fuente === "null" ? null : item.url_fuente,
                        api_source: item.api_origen,
                        api_id: item.id_imagen_api,
                        insertion_date: item.fecha_insercion,
                        update_date: item.fecha_actualizacion,
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
            onPress={() => navigation.navigate("Wallpaper", { url: item?.url, tags: item?.tags, artist_name: item?.artist_name, id: item?.id })}
        >
            <Image
                source={{ uri: item.url }}
                style={{ width: 170, height: 170 }}
            //style={stylesAppTheme.animeCellImage}
            />
            {/* <Text style={[dynamicStyles.dynamicText, stylesAppTheme.animeCellText]} numberOfLines={2} ellipsizeMode="tail">
                {item.nombre}
            </Text> */}
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

