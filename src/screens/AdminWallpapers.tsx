import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../hooks/UseTheme';

import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { register_image, register_image_character, register_image_lora_model, register_image_tag, show_images_for_character, upload_image_to_server } from '../const/UrlConfig';
import { NekoImageData } from '../helpers/Interfaces';
import * as ImagePicker from 'expo-image-picker';
import { ShowAlert } from '../helpers/ShowAlert';
import { stylesAppTheme } from '../theme/AppTheme';



export const AdminWallpapers = () => {
    const { dynamicStyles } = useTheme();
    const [idCharacter, setIdCharacter] = useState<number>();
    const [wallpapersWaifu, setWallpapersWaifu] = useState<NekoImageData[]>();

    const [isAddingWallpaper, setIsAddingWallpaper] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");

    const [seed, setSeed] = useState<string>("");
    const [publicImage, setPublicImage] = useState<number>();
    const [idBaseModel, setIdBaseModel] = useState<number>();
    //id_modelo_lora=1&prompt=prompt&fuerza=1.1etiqueta
    const [idLoraModel, setIdLoraModel] = useState<number>();
    const [prompt, setPrompt] = useState<string>('');
    const [strength, setStrength] = useState<number>();
    const [idTag, setIdTag] = useState<number>();





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
                //const response = await fetch(`${upload_image_to_server}`, {
                method: 'POST',
                body: formData,

            });

            const data = await response.json();

            if (data.Success) {
                /* INSERT INTO Imagen(url, semilla, imagen_listada, id_modelo_base) VALUES
                            ('freya_dance.png', '77889900', true, 2); */
                console.log('IMAGEN SUBIDA => ', data);

                /* const booleanPublicImage = Boolean(publicImage); */

                const response_register_image = await fetch(`${register_image}?url=${data.url}&semilla=${seed}&imagen_listada=${publicImage}&id_modelo_base=${idBaseModel}`)
                const data_response_register_image = await response_register_image.json();
                const id_imagen = data_response_register_image.id_generado;
                if (data_response_register_image.Success) {
                    console.log('IMAGEN REGISTRADA => ', data_response_register_image);
                    const response_register_image_lora_model = await fetch(`${register_image_lora_model}?id_imagen=${id_imagen}&id_modelo_lora=${idLoraModel}&prompt=${prompt}&fuerza=${strength}`)


                    const data_response_register_image_lora_model = await response_register_image_lora_model.json();

                    if (data_response_register_image_lora_model.Success) {

                        const response_register_image_character = await fetch(`${register_image_character}?id_imagen=${id_imagen}&id_personaje=${idCharacter}`)
                        const data_response_register_image_character = await response_register_image_character.json();

                        if (data_response_register_image_character.Success) {


                            const response_register_image_tag = await fetch(`${register_image_tag}?id_imagen=${id_imagen}&id_etiqueta=${idTag}`)
                            const data_response_register_image_tag = await response_register_image_tag.json();

                            if (data_response_register_image_tag.Success) {
                                ShowAlert({ title: 'Subida exitosa', text: '¡Imagen subida correctamente!', buttonOk: 'Ok', onConfirm: () => void {} });
                            }
                            else {
                                ShowAlert({ title: 'Error', text: 'No pudo ser asociada la etiqueta a la IMAGEN.', buttonOk: 'Ok', onConfirm: () => void {} });

                            }

                        }
                        else {
                            ShowAlert({ title: 'Error', text: 'No pudo ser asociada la imagen a la WAIFU.', buttonOk: 'Ok', onConfirm: () => void {} });

                        }

                    }
                    else {
                        ShowAlert({ title: 'Error', text: 'No pudo ser asociada la imagen al LORA.', buttonOk: 'Ok', onConfirm: () => void {} });

                    }


                }
                else if (data_response_register_image.Error) {
                    ShowAlert({ title: 'Error', text: 'No pudo ser registrada la imagen.', buttonOk: 'Ok', onConfirm: () => void {} });

                }

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


    const defaultImage = "https://media.istockphoto.com/id/2221915585/vector/grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg?s=612x612&w=0&k=20&c=9CObBqL8r65oVfHE4hyEqpyb8FwK7VfDqF1qXD5YMz4=";

    const urlImage = (typeof image === "string" && image.trim() !== "")
        ? image
        : defaultImage;

    /*     const [image, setImage] = useState<string>("");
    
        const [seed, setSeed] = useState<string>("");
        const [publicImage, setPublicImage] = useState<number>(0);
        const [idBaseModel, setIdBaseModel] = useState<number>(0);
        //id_modelo_lora=1&prompt=prompt&fuerza=1.1etiqueta
        const [idLoraModel, setIdLoraModel] = useState<number>(0);
        const [prompt, setPrompt] = useState<string>('');
        const [strength, setStrength] = useState<number>(0);
        const [idTag, setIdTag] = useState<number>(0); */

    const activeButton = ((publicImage || !publicImage) && image && seed && idBaseModel && idLoraModel && prompt && strength && idTag) ? true : false;


    return (
        <ScrollView style={[/* stylesAppTheme.container,  */dynamicStyles.dynamicScrollViewStyle]}>
            <View style={[/* stylesAppTheme.container,  */{ marginTop: 20 }]}>
                <View style={{ alignItems: 'center'/* , backgroundColor: 'red' */ }}>
                    <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                        Administrar Wallpapers Bv
                    </Text>
                    <Text></Text>
                    {
                        !isAddingWallpaper && (
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

                    {!isAddingWallpaper &&

                        <>
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
                            {wallpapersWaifu &&


                                <ButtonComponent title='Agregar Wallpaper' active={true} funcion={() => setIsAddingWallpaper(true)} />

                            }

                        </>
                    }

                    {isAddingWallpaper &&
                        <>

                            <TouchableOpacity onPress={pickImage} >
                                <Image source={{ uri: urlImage }}
                                    style={styles.image} />
                            </TouchableOpacity>

                            <ButtonComponent title='regresar' active={true} funcion={
                                () => ShowAlert({ title: "Regresar", text: "Se descartaran los cambios realizados", buttonCancel: "Cancelar", onCancel: () => void {}, buttonOk: "Regresar", onConfirm: () => setIsAddingWallpaper(false) })
                            } />
                        </>
                    }

                </View>
                {image && isAddingWallpaper && <>
                    {/* <Image source={{ uri: image }} style={styles.image} />
                    <Text style={{ color: "aqua" }}> imagen = {image}</Text> */}
                    {/* INSERT INTO Imagen(url, semilla, imagen_listada, id_modelo_base) VALUES
            ('freya_dance.png', '77889900', true, 2); */}
                    <View style={{/* backgroundColor: 'red', */ alignItems:'center'}}>
                        <TextInputComponent value={seed} action={setSeed} placeholderText='Semilla' verified={false} isPassword={false} />
                        <Text></Text>
                        <TextInputComponent value={prompt} action={setPrompt} placeholderText='Prompt' verified={false} isPassword={false} />
                        <Text></Text>
                        <View style={styles.numericContainer} >
                            <TextInputComponent value={publicImage?.toString() || ''} action={(text) => setPublicImage(Number(text))} placeholderText='Imagen listada' verified={false} isPassword={false} isNumericKeybordType />
                            <TextInputComponent value={idBaseModel?.toString() || ''} action={(text) => setIdBaseModel(Number(text))} placeholderText='Id modelo base' verified={false} isPassword={false} isNumericKeybordType />
                            <TextInputComponent value={idLoraModel?.toString() || ''} action={(text) => setIdLoraModel(Number(text))} placeholderText='Id modelo lora' verified={false} isPassword={false} isNumericKeybordType />
                        </View>
                        <Text></Text>

                        <View style={styles.numericContainer} >
                            <TextInputComponent value={strength?.toString() || ''} action={(text) => setStrength(Number(text))} placeholderText='Fuerza' verified={false} isPassword={false} isNumericKeybordType />
                            <TextInputComponent value={idTag?.toString() || ''} action={(text) => setIdTag(Number(text))} placeholderText='Id etiqueta' verified={false} isPassword={false} isNumericKeybordType />
                        </View>
                        <Text></Text>

                        <ButtonComponent title='registrar imagen' active={activeButton} funcion={
                            () => ShowAlert({ title: "Subir imagen", text: "¿Seguro que quieres subir la imagen al servidor?", buttonCancel: "Cancelar", onCancel: () => void {}, buttonOk: "Subir", onConfirm: Registrar })} />
                    </View>

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
    numericContainer: {
        width: '100%',
        /* backgroundColor: "red", */
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4
    }
});
