import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/UseTheme';

import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { show_images_for_character } from '../const/UrlConfig';
import { NekoImageData } from '../helpers/Interfaces';
import * as ImagePicker from 'expo-image-picker';
import { ShowAlert } from '../helpers/ShowAlert';
import { stylesAppTheme } from '../theme/AppTheme';



export const AdminWallpapers = () => {
    const { dynamicStyles } = useTheme();
    const [idCharacter, setIdCharacter] = useState<number>();
    const [wallpapersWaifu, setWallpapersWaifu] = useState<NekoImageData[]>();

    const [isEditing, setIsEditing] = useState<boolean>(false);


    const Buscar_Personaje = async () => {

        try {

            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${show_images_for_character}?id_personaje=${idCharacter}`);

            const data = await response.json();
            // Retorna los datos para ser usados en el componente




            if (!data.Error) {
                console.log("Al parecer si encotro wallpapers Bv");
                /* for (let i = 0; i < data.length; i++) {
                    console.log(`Wallpapers => ${data[i].url}`);
                } */

                const wallpaperMapeados: NekoImageData[] = data.map((item: any) => ({
                    id: item.id_imagen,
                    id_character: item.id_personaje,
                    url: item.url,
                    /* seed: item.string,
                    public_image: item.boolean,
                    id_base_model: item.number, */
                }));

                setWallpapersWaifu(wallpaperMapeados);

            }
            else
                console.log("No encontro wallpapers Bv");




        } catch (e) {
            console.error(`error buscar wallpapers: ${e}`);
        }
    }


    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            /* aspect: [9, 16], */
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };



    const Registrar = async () => {
        const formData = new FormData();
        /* formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('phone', phoneNumber);
        formData.append('email', email); */

        formData.append('id_personaje', idCharacter);


        if (image /* && profilePhoto.uri */) {
            //const localUri = profilePhoto.uri;
            const localUri = image;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename || '');
            const type = match ? `image/${match[1]}` : `image`;

            console.log(`localUri => ${localUri}`);
            console.log(`filename => ${filename}`);
            console.log(`match => ${match}`);
            console.log(`type => ${type}`);

            formData.append('imagen_perfil', {
                uri: localUri,
                name: filename || 'image',
                type: type,
            } as any);  // Añadimos 'as any' para evitar el error de 'Blob'
        }

        try {
            const response = await fetch(`https://mudisdev.com/waifupaper/src/php/api/gestor_imagenes/subir_imagen.php`, {
                method: 'POST',
                body: formData,

            });

            const data = await response.json();

            if (data.Success) {

                console.log('success', data);
                ShowAlert({ title: 'Subida exitosa', text: '¡Imagen subida correctamente!', buttonOk: 'Ok', onConfirm: () => void {} });
            }
            else if (data.Error) {

                console.warn('error', data);
                ShowAlert({ title: 'Error', text: 'Ocurrió un error durante el registro.', buttonOk: 'Ok', onConfirm: () => void {} });
            }
        }
        catch (e) {
            console.log(`Error al subir imagen al servidor => ${e}`);
        }

    };

    /*  const selectImage = () => {
         launchImageLibrary({ mediaType: 'photo' }, (response) => {
             if (response.assets && response.assets.length > 0) {
                 setProfilePhoto(response.assets[0]);
             }
         });
     }; */


    /*      INSERT INTO Imagen(url, semilla, imagen_listada, id_modelo_base) VALUES
            ('freya_dance.png', '77889900', true, 2);
            
    INSERT INTO Usa_Modelo_Lora(id_imagen, id_modelo_lora, prompt, fuerza) VALUES
            (12, 2, 'battle dancer girl in glowing arena, cyber costume, dynamic pose', 1.2);
    
    INSERT INTO Aparece_En(id_imagen, id_personaje) VALUES
            (3, 3), (4, 4), (5, 5), (6, 6), (7, 7),
            (8, 8), (9, 9), (10, 10), (11, 11), (12, 12);
    
    INSERT INTO Tiene_Etiqueta(id_imagen, id_etiqueta) VALUES(1, 1), (1, 8);
     */
    return (
        <ScrollView style={[/* stylesAppTheme.container,  */dynamicStyles.dynamicScrollViewStyle]}>
            <View style={[/* stylesAppTheme.container,  */{ marginTop: 20 }]}>
                <View style={{ alignItems: 'center'/* , backgroundColor: 'red' */ }}>
                    <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                        Administrar Wallpapers Bv
                    </Text>
                    <Text></Text>
                    {
                        !isEditing && (
                            <><TextInputComponent value={idCharacter?.toString() || ''} action={(text) => setIdCharacter(Number(text))} placeholderText='id waifu' verified={false} isPassword={false} />
                                <Text></Text>
                                <ButtonComponent active={true} funcion={Buscar_Personaje} title='Buscar waifu' />
                                <Text></Text>

                            </>
                        )
                    }
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center', // centra horizontalmente las filas
                        alignItems: 'center', // centra verticalmente los elementos de cada fila
                        gap: 10, // separa las imágenes
                        padding: 10,
                    }}
                >
                    {wallpapersWaifu ? (
                        wallpapersWaifu.map((item) => (
                            <Image
                                key={item.id}
                                source={{ uri: item.url }}
                                style={{
                                    width: 110,
                                    aspectRatio: 9 / 16,
                                    borderRadius: 14,
                                    resizeMode: 'cover',
                                }}
                            />

                        ))
                    ) : (
                        <Text style={dynamicStyles.dynamicText}>No hay wallpapers Bv</Text>
                    )}
                </View>
                {wallpapersWaifu &&
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                }
                {image && <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={{ color: "aqua" }}> imagen = {image}</Text>


                    <Button title="registrar" onPress={Registrar} />


                </>}
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </View >
        </ScrollView >
    )

}
const styles = StyleSheet.create({
    /* container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }, */
    image: {
        width: 200,
        height: 200,
    },
});
