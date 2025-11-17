import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';
import { assign_personality, register_character } from '../const/UrlConfig';
import { ButtonComponent } from '../components/ButtonComponent';

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


    /* const [selectedLanguage, setSelectedLanguage] = useState(); */


    const Registrar_Personaje = async () => {

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
                imagen_perfil=${profilePhoto}`);

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

            }


        } catch (e) {
            console.error(`error asignar personalidad: ${e}`);
        }
    }

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
                <TextInputComponent value={profilePhoto} action={setProfilePhoto} placeholderText='Imagen perfil Url' verified={false} isPassword={false} />
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
                <Image
                    /*  key={item.id} */
                    source={{ uri: profilePhoto }}
                    style={{
                        //width: width * 0.25, // un poco más grande
                        width: 50,
                        aspectRatio: 9 / 16,
                        borderRadius: 14,
                        resizeMode: 'cover', // importante: evita que se estire raro
                    }}
                />
                <ButtonComponent active={true} funcion={() => Registrar_Personaje()} title='Registrar Waifu' />
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
    }
});