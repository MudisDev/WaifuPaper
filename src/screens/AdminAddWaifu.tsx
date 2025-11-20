import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';
import { assign_personality, register_character } from '../const/UrlConfig';
import { ButtonComponent } from '../components/ButtonComponent';
import * as ImagePicker from 'expo-image-picker';
import { ShowAlert } from '../helpers/ShowAlert';

/* import { Picker } from '@react-native-picker/picker'; */

export const AdminAddWaifu = () => {
    const { themeData, dynamicStyles } = useTheme();

    const [name, setName] = useState<string>('');
    const [alias, setAlias] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [history, setHistory] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [hobbies, setHobbies] = useState<string>('');
    const [day, setDay] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [age, setAge] = useState<number>();
    const [idKind, setIdKind] = useState<number>();
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const [idPersonality, setIdPersonality] = useState<number>();

    const [image, setImage] = useState<string>("");



    /* const [selectedLanguage, setSelectedLanguage] = useState(); */


    const Registrar_Personaje = async (imageUrl) => {

        try {

            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${register_character}?
                nombre=${name}&
                alias=${alias}&
                descripcion=${description}&
                historia=${history}&
                ocupacion=${occupation}&
                pasatiempo=${hobbies}&
                dia=${day}&
                mes=${month}&
                edad=${age}&
                id_especie=${idKind}&
                imagen_perfil=${imageUrl}`);

            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);



            if (!data.Error) {
                console.log("Al parecer registro de personaje exitoso");
                Asignar_Personalidad(data.id_generado);
            }


        } catch (e) {
            console.error(`error registrar personaje: ${e}`);
        }
    }

    const Asignar_Personalidad = async (id_personaje: number) => {

        try {

            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${assign_personality}?id_personaje=${id_personaje}&id_personalidad=${idPersonality}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);


            if (!data.Error) {
                console.log("Parece que se asigno exitosamente la personalidad");

                ShowAlert({ title: 'Registro exitoso', text: 'La waifu fue registrada en la BD.', buttonOk: 'Ok', onConfirm: () => void {} });

            }


        } catch (e) {
            console.error(`error asignar personalidad: ${e}`);
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

    const Subir_Imagen = async () => {
        const formData = new FormData();
        /* formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('phone', phoneNumber);
        formData.append('email', email); */

        formData.append('id_personaje', 0);


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

                Registrar_Personaje(data.url);
                /* const booleanPublicImage = Boolean(publicImage); */


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

    const activeButton = name && alias && description && history && occupation && hobbies && day && month && age && idKind && idPersonality && image;

    return (
        <ScrollView style={[/* stylesAppTheme.container, */ dynamicStyles.dynamicScrollViewStyle,]}>
            <View style={[/* stylesAppTheme.container,  */{ marginTop: 20, marginBottom: 60, alignItems: 'center' }]}>
                <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                    Agregar waifu Bv
                </Text>
                <Text></Text>
                <TextInputComponent value={name} action={setName} placeholderText='Nombre' verified={false} isPassword={false} />
                <Text></Text>
                <TextInputComponent value={alias} action={setAlias} placeholderText='Alias' verified={false} isPassword={false} />
                <Text></Text>
                <TextInputComponent value={description} action={setDescription} placeholderText='Descripcion' verified={false} isPassword={false} />
                <Text></Text>
                <TextInputComponent value={history} action={setHistory} placeholderText='Historia' verified={false} isPassword={false} />
                <Text></Text>
                <TextInputComponent value={occupation} action={setOccupation} placeholderText='Ocupacion' verified={false} isPassword={false} />
                <Text></Text>
                <TextInputComponent value={hobbies} action={setHobbies} placeholderText='Pasatiempos' verified={false} isPassword={false} />
                <Text></Text>
                <View style={style.numericContainer} >
                    <TextInputComponent
                        value={day?.toString() || ''}
                        action={(text) => setDay(Number(text))}
                        placeholderText='Día'
                        verified={false}
                        isPassword={false}
                        isNumericKeybordType
                    />
                    <TextInputComponent
                        value={month?.toString() || ''}
                        action={(text) => setMonth(Number(text))}
                        placeholderText='Mes'
                        verified={false}
                        isPassword={false}
                        isNumericKeybordType
                    />
                    <TextInputComponent
                        value={age?.toString() || ''}
                        action={(text) => setAge(Number(text))}
                        placeholderText='Edad'
                        verified={false}
                        isPassword={false}
                        isNumericKeybordType
                    />
                </View>
                <Text></Text>

                <View style={style.numericContainer} >
                    <TextInputComponent
                        value={idKind?.toString() || ''}
                        action={(text) => setIdKind(Number(text))}
                        placeholderText='Especie'
                        verified={false}
                        isPassword={false}
                        isNumericKeybordType
                    />
                    <TextInputComponent
                        value={idPersonality?.toString() || ''}
                        action={(text) => setIdPersonality(Number(text))}
                        placeholderText='Personalidad'
                        verified={false}
                        isPassword={false}
                        isNumericKeybordType
                    />
                </View>
                <Text></Text>

                {/* <TextInputComponent value={day} action={setDay} placeholderText='Edad' verified={false} isPassword={false} /> */}
                {/* <TextInputComponent value={month} action={setMonth} placeholderText='Mes' verified={false} isPassword={false} />
            <TextInputComponent value={age} action={setAge} placeholderText='Edad' verified={false} isPassword={false} />
            <TextInputComponent value={idKind} action={setIdKind} placeholderText='Especie' verified={false} isPassword={false} /> */}
                {/* <TextInputComponent value={profilePhoto} action={setProfilePhoto} placeholderText='Imagen perfil Url' verified={false} isPassword={false} /> */}
                {/* <TextInputComponent value={idPersonality} action={setIdPersonality} placeholderText='Personalidad' verified={false} isPassword={false} /> */}

                {/* <View style={{ backgroundColor: "red", width: 200 }}>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View> */}
                <TouchableOpacity onPress={pickImage} >
                    <Image source={{ uri: urlImage }}
                        style={style.image} />
                </TouchableOpacity>
                <Text></Text>
                <ButtonComponent active={activeButton} funcion={
                    () => ShowAlert({ title: "Registrar Waifu", text: "¿Seguro que quieres registrar esta waifu?", buttonCancel: "Cancelar", onCancel: () => void {}, buttonOk: "Subir", onConfirm: Subir_Imagen })

                } title='Registrar Waifu' />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    numericContainer: {
        width: '100%',
        /* backgroundColor: "red", */
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4
    },
    image: {
        width: 200,
        height: 200,
    },
});