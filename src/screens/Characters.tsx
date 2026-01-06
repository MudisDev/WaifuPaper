import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme';
import { show_characters } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { ListWaifusData } from '../helpers/Interfaces';

export const Characters = () => {
    const [dataArray, setDataArray] = useState<ListWaifusData[] | null>(null);
    const { dynamicStyles } = useTheme();

    const [noImages, setNoImages] = useState(false);


    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${show_characters}`)

            .then((res) => res.json())
            .then((data) => {
                
                //console.log("data => ", data);
                if (Array.isArray(data) && data.length > 0) {
                    const mappedData: ListWaifusData[] = data.map((item: any) => ({
                        id: parseInt(item.id_personaje),
                        name: item.nombre,
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

    const renderItem = ({ item }: { item: ListWaifusData }) => (
        <TouchableOpacity
            //style={stylesAppTheme.animeCell}
            onPress={() => navigation.navigate("ProfileCharacter", { id: item?.id })}
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

