import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Image, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native'

import { search_character, show_images_for_character } from '../const/UrlConfig';

import { useTheme } from '../hooks/UseTheme';
import { WaifuData } from '../helpers/Interfaces';

export const ProfileCharacter = ({ route }) => {
    const navigation = useNavigation();


    const { width } = Dimensions.get('window');
    const { id } = route.params;
    //const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

    const { dynamicStyles } = useTheme();

    const [waifu, setWaifu] = useState<WaifuData[] | null>();

    const [dataArray, setDataArray] = useState<ImageData[] | null>(null);
    //const [dataArray, setDataArray] = useState<NekoImageData[] | null>();
    const [noImages, setNoImages] = useState(false);



    useFocusEffect(
        useCallback(() => {
            Buscar_Personaje();
            //Consultar_Favorito();
            /* Consultar_Etiquetas(); */
        }, [])
    )

    const Buscar_Personaje = async () => {
        console.log("Buscando personaje ");
        try {
            console.log("ENtro al try de buscar personaje");
            console.log(`id personaje => ${id}`)
            const url = `${search_character}?` + `id_personaje=${id}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("Data waifu ->", data);


            console.log("Array Waifu -> ", Array.isArray(data));
            console.log("Waifu buscada =>", data[0]);

            if (Array.isArray(data) && data.length > 0) {
                const mappedData: WaifuData[] = data.map((item: any) => ({
                    id_character: parseInt(item.id_personaje),
                    name: item.nombre,
                    alias: item.alias,
                    description: item.descripcion,
                    history: item.historia,
                    hobbie: item.pasatiempo,
                    occupation: item.ocupacion,
                    day: parseInt(item.dia),
                    month: parseInt(item.mes),
                    age: parseInt(item.edad),
                    //kind: parseInt(item.id_especie),
                    kind: item.especie,
                    profile_photo: item.imagen_perfil,
                    personality: item.personalidades,
                }));

                console.log("MappedData => ", mappedData);

                setWaifu(mappedData);
            } else {
                console.warn("No se encontraron imágenes en la respuesta.");
            }


        } catch (e) {
            console.error(`Error al buscar al personaje: ${e}`);
        }
    }


    useEffect(() => {
        console.log("Intentando mostrar wallpapers");
        if (!waifu || waifu.length === 0) return;
        //fetch("http://192.168.18.5/nekopaper/api/lista/mostrar_imagenes.php")
        fetch(`${show_images_for_character}?id_personaje=${waifu[0].id_character}`)

            .then((res) => res.json())
            .then((data) => {
                //const items = data?.items;
                //const items = data[0];

                //setDataArray(data);

                console.log("wallpapers cargados de la bd Bv");
                if (Array.isArray(data) && data.length > 0) {
                    const mappedData: ImageData[] = data.map((item: any) => ({
                        id: parseInt(item.id_imagen),
                        id_character: item.id_personaje,
                        url: item.url,
                        seed: item.semilla,
                        public_image: parseInt(item.imagen_listada),
                        id_base_model: parseInt(item.id_modelo_base),
                        insertion_date: item.fecha_insercion,
                        update_date: item.fecha_actualizacion,

                    }));
                    console.log("Wallpapers de la waifu Bv");
                    console.log(mappedData);

                    setDataArray(mappedData);
                    setNoImages(false);
                } else {
                    console.warn("No se encontraron imágenes en la respuesta.");
                    setNoImages(true);
                }
                console.log(`id waifu ${waifu[0].id_character}`);



            })
            .catch((err) => console.error("Error al traer imagen:", err));
    }, [waifu]);


    return (
        //<ScrollView contentContainerStyle={[{ flexGrow: 1, alignItems: 'center', paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>
        <ScrollView style={dynamicStyles.dynamicScrollViewStyle} /* style={{marginTop:200}} */>
            <View style={{ padding: 16 }}>
                {/* Nombre y favorito */}
                {waifu &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[dynamicStyles.dynamicText, { fontSize: 24, fontWeight: 'bold' }]}>{waifu[0]?.name} ({waifu[0]?.alias})</Text>
                        {/* <TouchableOpacity onPress={isFavorite ? Borrar_Favorito : Marcar_Favorito}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={themeData.texto} />
                        </TouchableOpacity> */}
                    </View>}

                {/* Imagen + Info básica */}
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    {waifu &&
                        <>
                            <Image
                                source={{ uri: waifu[0]?.profile_photo }}
                                style={{
                                    width: width * 0.4,
                                    aspectRatio: 9 / 16,
                                    borderRadius: 12,
                                    marginRight: 16
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={dynamicStyles.dynamicText}>Edad: {waifu[0]?.age}</Text>
                                <Text style={dynamicStyles.dynamicText}>Ocupación: {waifu[0]?.occupation}</Text>
                                <Text style={dynamicStyles.dynamicText}>Pasatiempo: {waifu[0]?.hobbie}</Text>
                                <Text style={dynamicStyles.dynamicText}>Cumpleaños: {waifu[0]?.day}/{waifu[0]?.month}</Text>
                                <Text style={dynamicStyles.dynamicText}>Especie: {waifu[0]?.kind}</Text>
                                <Text style={dynamicStyles.dynamicText}>Personalidad(es): {waifu[0]?.personality}</Text>
                            </View>
                        </>}
                </View>

                {waifu &&
                    <>
                        {/* Descripción */}

                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                            {waifu[0]?.description}
                        </Text>

                        {/* Historia (expandible si deseas) */}
                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16, fontWeight: 'bold' }]}>Historia:</Text>
                        <Text style={[dynamicStyles.dynamicText]}>
                            {waifu[0]?.history}
                        </Text>
                    </>}

                {waifu &&
                    <>
                        <Text></Text>
                        <Text style={[dynamicStyles.dynamicText, { fontWeight: 'bold' }]}>Wallpapers</Text>
                    </>
                }

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 10, /* backgroundColor: "red", */ justifyContent: 'center' }}>
                    {waifu &&
                        <>
                            {dataArray?.map((item) => (
                                <TouchableOpacity onPress={() => navigation.navigate("Wallpaper", { url: item.url, id: item.id })} key={item.id}>

                                    <Image
                                        source={{ uri: item.url }}
                                        style={{
                                            width: width * 0.25, // un poco más grande
                                            aspectRatio: 9 / 16,
                                            borderRadius: 14,
                                            resizeMode: 'cover', // importante: evita que se estire raro
                                        }}
                                    />
                                </TouchableOpacity>

                            ))
                            }

                        </>
                    }
                </View>


            </View>
        </ScrollView>
    );
};

