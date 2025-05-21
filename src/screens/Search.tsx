import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextComponent } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../context/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { show_images_for_tag, show_tags } from '../const/UrlConfig';
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme';
import { useTheme } from '../hooks/UseTheme';
import { ButtonComponent } from '../components/ButtonComponent';

interface TagsData {
  id_tag: number;
  name_tag: string;
}

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

export const Search = () => {

  const [dataArray, setDataArray] = useState<TagsData[] | null>(null);
  const [imageArray, setImageArray] = useState<NekoImageData[] | null>(null);
  const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido
  const { themeData, dynamicStyles } = useTheme();
  const [showTags, setShowTags] = useState(false);



  useEffect(() => {
    //fetch("http://192.168.18.5/nekopaper/api/lista/mostrar_etiquetas.php")
    fetch(`${show_tags}`)
      .then((res) => res.json())
      .then((data) => {
        //const items = data?.items;
        //const items = data[0];

        //setDataArray(data);

        console.log("TRAYENDO RESULTADOS DE BD Bv");
        console.log("Data Search -> ", data);
        if (Array.isArray(data) && data.length > 0) {
          const mappedData: TagsData[] = data.map((item: any) => ({
            id_tag: parseInt(item.id_etiqueta),
            name_tag: item.nombre
            /* url: item.url,
            rating: item.clasificacion,
            artist_name: item.artista === "null" ? null : item.artista,
            source_url: item.url_fuente === "null" ? null : item.url_fuente,
            api_source: item.api_origen,
            api_id: item.id_imagen_api,
            insertion_date: item.fecha_insercion,
            update_date: item.fecha_actualizacion, */
          }));
          console.log("mapeados - > ", mappedData);
          setDataArray(mappedData);

          console.log("ARRAY - > ", dataArray?.[0].id_tag);
        } else {
          console.warn("No se encontraron imágenes en la respuesta.");
        }



      })
      .catch((err) => console.error("Error al traer imagen:", err));
  }, []);


  const [imageUrl, setImageUrl] = useState<string | null>(null);



  const navigation = useNavigation();

  //useEffect(() => {
  /*  useFocusEffect(
     useCallback(() => { */
  const Filtrar_Imagenes = (id_tag: number) => {
    //fetch(`http://192.168.18.5/nekopaper/api/lista/mostrar_imagenes_por_etiqueta.php?id_etiqueta=${id_tag}`)
    fetch(`${show_images_for_tag}?id_etiqueta=${id_tag}`)
      .then((res) => res.json())
      .then((data) => {

        console.log("TRAYENDO RESULTADOS DE BD Bv");
        console.log("Imagenes -> ", data);
        if (Array.isArray(data) && data.length > 0) {
          const mappedData: NekoImageData[] = data.map((item: any) => ({
            id: parseInt(item.id_imagen_real),
            url: item.url,
            rating: item.clasificacion,
            artist_name: item.artista === "null" ? null : item.artista,
            source_url: item.url_fuente === "null" ? null : item.url_fuente,
            api_source: item.api_origen,
            api_id: item.id_imagen_api,
            insertion_date: item.fecha_insercion,
            update_date: item.fecha_actualizacion,

          }));
          data.forEach(element => {
            console.log(`Data mapeada -> ${element['id_imagen']}`);
            console.log(`Data mapeada -> ${element['url']}`);

          });
          setImageArray(mappedData);
        } else {
          console.warn("No se encontraron imágenes en la respuesta.");
        }

      })
      .catch((err) => console.error("Error al traer imagen:", err));
  }
  // }, []);

  const renderItem = ({ item }: { item: NekoImageData }) => (
    <TouchableOpacity
      //style={stylesAppTheme.animeCell}
      onPress={() => navigation.navigate("Wallpaper", { url: item?.url, /* tags: item?.tags, */ artist_name: item?.artist_name, id: item?.id })}
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
        data={imageArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}

        //contentContainerStyle={[dynamicStyles.dynamicScrollViewStyle, /* stylesAppTheme.mainContainer, */]}
        //columnWrapperStyle={[dynamicStyles.dynamicViewContainer, /* stylesAppTheme.viewContainer */]} // Estilo para englobar las columnas


        ListHeaderComponent={() => (

          <View style={[stylesAppTheme.container, /* {backgroundColor: "red"} */]}>
            <View style={{ /* padding: 10 */ }}>

             


              <View style={[styles.tagContainer, /* dynamicStyles.dynamicMainContainer */]}>
                {(showTags == false) ?
                  (<ButtonComponent title='mostrar etiquetas' active={true} funcion={() => { setShowTags(true) }} />) :

                  (
                    <>
                      <ButtonComponent title='ocultar etiquetas' active={true} funcion={() => { setShowTags(false) }} />
                      <Text></Text>
                      <View style={[styles.tagContainer, /* dynamicStyles.dynamicMainContainer */]}>
                        {dataArray?.map((tag) => (
                          <TouchableOpacity key={tag.id_tag} onPress={() => Filtrar_Imagenes(tag.id_tag)}>
                            <Text style={[styles.tagText, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]}>{tag.name_tag}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>)

                }




              </View>
            </View>
          </View>

        )}
        //ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />

        //onEndReached={fetchAnimes} // Llama a fetchAnimes cuando el usuario alcanza el final de la lista
        onEndReachedThreshold={0.5} // Cargar más datos cuando queda el 50% de la lista visible
      />
    </View>
  )
}

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
});