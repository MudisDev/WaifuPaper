import React, { useContext, useCallback, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext';
import { show_favorites_images } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { ListImageData } from '../helpers/Interfaces';
import { useFetch } from '../hooks/useFetch';
//import { Wallpaper } from './Wallpaper';
import { adaptarUrlImagen } from '../helpers/helpers';

export const Favorites = () => {

  const [listaWallpapers, setListaWallpapers] = useState<ListImageData[] | null>(null);
  const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido
  const { dynamicStyles } = useTheme();
  const navigation = useNavigation();

  const { fetchData: consultarFavoritos }
    = useFetch<ListImageData[]>({ endpoint: show_favorites_images, metodo: 'GET', params: { id_usuario: userData?.id_usuario } });

  useEffect(() => {
    const listarWallpapers = async () => {

      const response = await consultarFavoritos();
      if (!response.Error) {
        const wallpapersAdaptados = response.map(wallpaper => ({
          ...wallpaper,
          url: adaptarUrlImagen(wallpaper.url)
        }))
        setListaWallpapers(wallpapersAdaptados);
      }
    }
    listarWallpapers();
  }, []);

  const renderItem = ({ item }: { item: ListImageData }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Wallpaper", { url: item?.url, /* tags: item?.tags, */ /* artist_name: item?.artist_name, */ id_imagen: item?.id_imagen })}
    >
      <Image source={{ uri: item.url }} style={{ width: 170, height: 170 }} />
    </TouchableOpacity>
  );

  return (
    <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
      <FlatList
        data={listaWallpapers}
        keyExtractor={(item) => item.id_imagen.toString()}
        renderItem={renderItem}
        numColumns={2}

        //contentContainerStyle={[dynamicStyles.dynamicMainContainer, /* stylesAppTheme.mainContainer, */]}
        //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, /* stylesAppTheme.viewContainer */]} // Estilo para englobar las columnas
        ListHeaderComponent={() => (
          <>
            {listaWallpapers?.length === 0 &&
              <View style={{ justifyContent: 'center' }}>
                <Text style={dynamicStyles.dynamicText}>No hay Wallpapers favoritos Bv</Text>
              </View>}
          </>

        )}
        //ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />

        //onEndReached={fetchAnimes} // Llama a fetchAnimes cuando el usuario alcanza el final de la lista
        onEndReachedThreshold={0.5} // Cargar más datos cuando queda el 50% de la lista visible
      />
    </View>
  )
}