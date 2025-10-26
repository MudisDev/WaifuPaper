import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';

import { Picker } from '@react-native-picker/picker';

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


    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
            <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                Agregar waifu Bv
            </Text>
            <TextInputComponent value={name} action={setName} placeholderText='Nombre' verified={false} isPassword={false} />
            <TextInputComponent value={alias} action={setAlias} placeholderText='Alias' verified={false} isPassword={false} />
            <TextInputComponent value={description} action={setDescription} placeholderText='Descripcion' verified={false} isPassword={false} />
            <TextInputComponent value={history} action={setHistory} placeholderText='Historia' verified={false} isPassword={false} />

            <TextInputComponent value={occupation} action={setOccupation} placeholderText='Ocupacion' verified={false} isPassword={false} />
            <TextInputComponent value={hobbies} action={setHobbies} placeholderText='Pasatiempos' verified={false} isPassword={false} />
            <TextInputComponent value={day} action={setDay} placeholderText='Edad' verified={false} isPassword={false} />
            <TextInputComponent value={month} action={setMonth} placeholderText='Mes' verified={false} isPassword={false} />
            <TextInputComponent value={age} action={setAge} placeholderText='Edad' verified={false} isPassword={false} />
            <TextInputComponent value={idKind} action={setIdKind} placeholderText='Especie' verified={false} isPassword={false} />
            <TextInputComponent value={profilePhoto} action={setProfilePhoto} placeholderText='Imagen perfil Url' verified={false} isPassword={false} />
            <TextInputComponent value={idPersonality} action={setIdPersonality} placeholderText='Personalidad' verified={false} isPassword={false} />
            <View style={{ backgroundColor: "red", width: 200 }}>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            <Image
                /*  key={item.id} */
                source={{ uri: 'https://images.steamusercontent.com/ugc/832454479536053344/8465272211524FA4E79D28F847A70DF9863E5396/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true' }}
                style={{
                    //width: width * 0.25, // un poco más grande
                    width: 50,
                    aspectRatio: 9 / 16,
                    borderRadius: 14,
                    resizeMode: 'cover', // importante: evita que se estire raro
                }}
            />

        </View>
    )
}

/* id_personaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    alias VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    historia TEXT NOT NULL,
    pasatiempo TEXT NOT NULL,
    ocupacion VARCHAR(40) NOT NULL,
    dia INT NOT NULL,
    mes INT NOT NULL,
    edad INT NOT NULL,
    id_especie INT NOT NULL,
    imagen_perfil TEXT NOT NULL,
    FOREIGN KEY (id_especie) REFERENCES Especie (id_especie) */