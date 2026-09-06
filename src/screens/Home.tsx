import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme';
import { show_images } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { ListImageData } from '../helpers/Interfaces';
import { useFetch } from '../hooks/useFetch';
import { adaptarUrlImagen } from '../helpers/helpers';

export const Home = () => {
    const [listaWallpapers, setListaWallpapers] = useState<ListImageData[] | null>(null);
    const { dynamicStyles } = useTheme();
    const navigation = useNavigation();
    const { fetchData: consultarWallpapers }
        = useFetch<ListImageData[]>({ endpoint: show_images, metodo: 'GET' });

    useEffect(() => {
        const listarWallpapers = async () => {
            const response = await consultarWallpapers();
            if (response) {
                const wallpapersAdaptados = response.map((wallpaper) => ({
                    ...wallpaper,
                    url: adaptarUrlImagen(wallpaper.url),
                }));
                setListaWallpapers(wallpapersAdaptados);
            }
        }
        listarWallpapers();
    }, []);

    const renderItem = ({ item }: { item: ListImageData }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Wallpaper", { url: item?.url, id: item?.id_imagen })}
        >
            <Image
                source={{ uri: item.url }}
                style={{ width: 170, height: 170 }}
            />
        </TouchableOpacity>
    );

    return (
        <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle,]}>
            <FlatList
                data={listaWallpapers}
                keyExtractor={(item) => item.id_imagen?.toString()}
                renderItem={renderItem}
                numColumns={2}
                //contentContainerStyle={[dynamicStyles.dynamicMainContainer, /* stylesAppTheme.mainContainer, */]}
                //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, stylesAppTheme.viewContainer]} // Estilo para englobar las columnas
                ListHeaderComponent={() => (
                    <>{listaWallpapers?.length === 0 && <Text style={dynamicStyles.dynamicText}>No hay Wallpapers en la BD Bv</Text>}</>
                )}
                //ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />
                //onEndReached={fetchAnimes} // Llama a fetchAnimes cuando el usuario alcanza el final de la lista
                onEndReachedThreshold={0.5} // Cargar más datos cuando queda el 50% de la lista visible
            />
        </View>
    )
}
