import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme';
import { show_characters } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { ListWaifusData } from '../helpers/Interfaces';
import { useFetch } from '../hooks/useFetch';
import { adaptarUrlImagen } from '../helpers/helpers';

export const Characters = () => {
    const { dynamicStyles } = useTheme();
    const [listaWaifus, setListaWaifus] = useState<ListWaifusData[] | null>(null);
    const navigation = useNavigation();
    const { fetchData: consultarWaifus } = useFetch<ListWaifusData[]>({ endpoint: show_characters, metodo: 'GET' });

    useEffect(() => {
        const listarWaifus = async () => {
            const response = await consultarWaifus();

            if (!response.Error) {
                const waifusAdaptadas = response.map((waifu) => ({
                    ...waifu,
                    imagen_perfil: adaptarUrlImagen(waifu.imagen_perfil)
                }))
                setListaWaifus(waifusAdaptadas);
            }

        }
        listarWaifus();
    }, []);

    const renderItem = ({ item }: { item: ListWaifusData }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProfileCharacter", { id_personaje: item?.id_personaje })}
        >
            <Image
                source={{ uri: item.imagen_perfil }}
                style={{ width: 170, height: 170 }}
            />
            <Text style={[dynamicStyles.dynamicText, stylesAppTheme.animeCellText]} numberOfLines={2} ellipsizeMode="tail">
                {item.nombre}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle,]}>
            <FlatList
                data={listaWaifus}
                keyExtractor={(item) => item.id_personaje.toString()}
                renderItem={renderItem}
                numColumns={2}

                //contentContainerStyle={[dynamicStyles.dynamicMainContainer, /* stylesAppTheme.mainContainer, */]}
                //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, stylesAppTheme.viewContainer]} // Estilo para englobar las columnas
                ListHeaderComponent={() => (
                    <>{listaWaifus?.length === 0 && <Text style={dynamicStyles.dynamicText}>No hay Wallpapers en la BD Bv</Text>}</>
                )}
                //ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />

                //onEndReached={fetchAnimes} // Llama a fetchAnimes cuando el usuario alcanza el final de la lista
                onEndReachedThreshold={0.5} // Cargar más datos cuando queda el 50% de la lista visible
            />
        </View>
    )
}