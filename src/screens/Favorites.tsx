import React, { useContext, useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FlatList, } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext';
import { show_favorites_images } from '../const/UrlConfig';
import { useTheme } from '../hooks/UseTheme';
import { ListImageData } from '../helpers/Interfaces';

export const Favorites = () => {
  //const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [dataArray, setDataArray] = useState<ListImageData[] | null>(null);
  const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido
  const { dynamicStyles } = useTheme();
  const [noFavorites, setNoFavorites] = useState<boolean>(false);
  const navigation = useNavigation();

  //useEffect(() => {
  useFocusEffect(
    useCallback(() => {
      fetch(`${show_favorites_images}?id_usuario=${userData?.idUser}`)
        .then((res) => res.json())
        .then((data) => {

          console.log("TRAYENDO RESULTADOS DE BD Bv");
          console.log("Imagenes -> ", data);
          if (Array.isArray(data) && data.length > 0) {
            const mappedData: ListImageData[] = data.map((item: any) => ({
              id_image: parseInt(item.id_imagen),
              url: item.url,
              //date_favorite: item.fecha_favorito,
            }));
            data.forEach(element => {
              console.log(`Data mapeada -> ${element['id_imagen']}`);
              console.log(`Data mapeada -> ${element['url']}`);
              console.log(`Data mapeada fecha favorito -> ${element['date_favorite']}`);

            });
            setDataArray(mappedData);
            setNoFavorites(false);
          } else {
            console.warn("No se encontraron imágenes en la respuesta.");
            setNoFavorites(true);
          }

        })
        .catch((err) => console.error("Error al traer imagen:", err));
    }, []));

  const renderItem = ({ item }: { item: ListImageData }) => (
    <TouchableOpacity
      //style={stylesAppTheme.animeCell}
      onPress={() => navigation.navigate("Wallpaper", { url: item?.url, /* tags: item?.tags, */ /* artist_name: item?.artist_name, */ id: item?.id_image })}
    >
      <Image
        source={{ uri: item.url }}
        style={{ width: 170, height: 170 }}

      />

    </TouchableOpacity>
  );

  return (
    <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
      <FlatList
        data={dataArray}
        keyExtractor={(item) => item.id_image.toString()}
        renderItem={renderItem}
        numColumns={2}

        //contentContainerStyle={[dynamicStyles.dynamicMainContainer, /* stylesAppTheme.mainContainer, */]}
        //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, /* stylesAppTheme.viewContainer */]} // Estilo para englobar las columnas
        ListHeaderComponent={() => (
          <>
            {noFavorites &&
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
