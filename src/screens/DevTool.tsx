import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { NekoImageData } from './Home'
import { associate_tags, register_image, register_tag } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'

export const DevTool = () => {

  /*     interface TagInterface {
          name_tag
      } */

  const [dataArray, setDataArray] = useState<NekoImageData[] | null>(null);
  //const [dataArray, setDataArray] = useState<NekoImageData[] | null>(null);

  const [tags, setTags] = useState<string | null>(null);
  const [offset, setOffset] = useState<string | null>(null);
  const [limit, setLimit] = useState<string | null>(null);
  /* const [offset, setOffset] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null); */
  const { themeData, dynamicStyles } = useTheme();



  const ConsumirApi = async () => {
    let baseUrl = 'https://api.nekosapi.com/v4/images';
    let queryParams: string[] = [];

    if (limit && limit.trim() !== '') {
      queryParams.push(`limit=${encodeURIComponent(limit)}`);
    }
    if (offset && offset.trim() !== '') {
      queryParams.push(`offset=${encodeURIComponent(offset)}`);
    }
    if (tags && tags.trim() !== '') {
      queryParams.push(`tags=${encodeURIComponent(tags)}`);
    }

    const url = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const items = data?.items;

      if (!Array.isArray(items) || items.length === 0) {
        console.warn("No se encontraron imágenes en la respuesta.");
        return;
      }

      setDataArray(items);

      const etiquetas: string[] = [];
      const imagenes: {
        id: string,
        url: string,
        rating: string,
        artist_name: string,
        source_url: string,
        tags: string[],
      }[] = [];

      for (const element of items) {
        imagenes.push({
          id: element.id,
          url: element.url,
          rating: element.rating,
          artist_name: element.artist_name,
          source_url: element.source_url,
          tags: element.tags
        });

        for (const tag of element.tags) {
          etiquetas.push(tag);
        }
      }

      const etiquetasUnicas = Array.from(new Set(etiquetas));
      console.log("Etiquetas sin duplicados -> ", etiquetasUnicas);

      console.log("Registrando etiquetas...");
      await Registrar_Etiquetas(etiquetasUnicas); // ✅ Espera que termine

      console.log("Registrando imágenes...");
      await Registrar_Imagenes(imagenes); // ✅ Luego registra imágenes

    } catch (err) {
      console.error("Error al consumir API:", err);
    }
  };

  const Registrar_Etiquetas = async (etiquetas: string[]) => {
    const api_origen = "NekosApi";

    for (const tag of etiquetas) {
      try {
        //const response = await fetch(`http://192.168.18.5/nekopaper/api/etiqueta/registrar_etiqueta.php?name_tag=${encodeURIComponent(tag)}&api_origen=${api_origen}`);
        //const response = await fetch(`http://192.168.18.5/nekopaper/api/etiqueta/registrar_etiqueta.php?nombre=${tag}&api_origen=${api_origen}`);
        const response = await fetch(`${register_tag}?nombre=${tag}&api_origen=${api_origen}`);
        const data = await response.json();
        console.log("Data - >", data);

        if (data.Error || data.Warning) {
          console.log(`Error al insertar la etiqueta "${tag}"`);
        } else {
          console.log(`Etiqueta "${tag}" insertada correctamente`);
        }

      } catch (e) {
        console.error(`Error con la etiqueta "${tag}": ${e}`);
      }
    }
  }

  const Registrar_Imagenes = async (imagenes: {
    id: string,
    url: string,
    rating: string,
    artist_name: string,
    source_url: string,
    tags: string[],
  }[]) => {
    const api_origen = "NekosApi";

    for (const img of imagenes) {
      try {
        //const url = `http://192.168.18.5/nekopaper/api/imagen/registrar_imagen.php?` +
        const url = `${register_image}?` +
          `id_imagen_api=${encodeURIComponent(img.id)}` +
          `&url=${encodeURIComponent(img.url)}` +
          `&clasificacion=${encodeURIComponent(img.rating)}` +
          `&artista=${encodeURIComponent(img.artist_name)}` +
          `&url_fuente=${encodeURIComponent(img.source_url)}` +
          `&api_origen=${api_origen}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log("Data ->", data);

        if (data.Error || data.Warning) {
          console.log(`Error al insertar la imagen "${img.id}"`);
        } else {
          console.log(`Imagen "${img.id}" insertada correctamente`);
          // ✅ Asociar etiquetas con imagen
          await AsociarImagenConEtiquetas(img.id, img.tags);
        }

      } catch (e) {
        console.error(`Error con la imagen "${img.id}": ${e}`);
      }
    }
  };

  const AsociarImagenConEtiquetas = async (idImagen: string, etiquetas: string[]) => {
    const api_origen = "NekosApi";

    try {
      //const url = `http://192.168.18.5/nekopaper/api/imagen/asociar_etiquetas.php?` +
      const url = `${associate_tags}?` +
        `id_imagen_api=${idImagen}` +
        `&etiquetas=${etiquetas}` +
        `&api_origen=${api_origen}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("Data asociacion ->", data);


    } catch (e) {
      console.error(`Error al asociar "${etiquetas}" con imagen "${idImagen}": ${e}`);
    }

  };


  return (
    <ScrollView contentContainerStyle={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}  /* style={{marginTop:200}} */>

      <Text style={dynamicStyles.dynamicText}>DevTool Screen Bv</Text>
      <Text></Text>
      <TextInput style={[stylesAppTheme.textinput, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]} placeholderTextColor={themeData.texto} placeholder='tags' value={tags ?? ''} onChangeText={setTags}/* value={tags ?? ''} onChangeText={setTags} */></TextInput>
      <Text></Text>
      <TextInput style={[stylesAppTheme.textinput, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]} placeholderTextColor={themeData.texto} placeholder='offset' value={offset ?? ''} onChangeText={setOffset} /* value={offset ?? ''} onChangeText={setOffset} */></TextInput>
      <Text></Text>
      <TextInput style={[stylesAppTheme.textinput, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]} placeholderTextColor={themeData.texto} placeholder='limit' value={limit ?? ''} onChangeText={setLimit} /* value={offset ?? ''} onChangeText={setOffset} */></TextInput>
      <Text></Text>
      <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={ConsumirApi}>
        <Text style={dynamicStyles.dynamicText}>Consumir API</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}
