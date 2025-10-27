import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { search_character } from '../const/UrlConfig';


interface WaifuData {
    id: number;
    name: string;
    alias: string;
    description: string;
    history: string;
    hobbies: string;
    occupation: string;
    day: number;
    month: number;
    age: number;
    idKind: number;
    idPersonality: number;
    profilePhoto: string;
}

export const AdminEditWaifu = () => {
    const { themeData, dynamicStyles } = useTheme();
    const [idCharacter, setIdCharacter] = useState<number>();
    const [dataWaifu, setDataWaifu] = useState<WaifuData>();
    const [editWaifu, setEditWaifu] = useState<WaifuData>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const Buscar_Personaje = async () => {

        try {

            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${search_character}?id_personaje=${idCharacter}`);

            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            const waifu = data[0];



            if (!data.Error) {
                console.log("Al parecer si encotro waifu Bv");

                /* Asignar_Personalidad(data.id_generado); */

                const mappedData: WaifuData = {
                    id: waifu.id_personaje,
                    age: waifu.edad,
                    alias: waifu.alias,
                    day: waifu.dia,
                    description: waifu.descripcion,
                    history: waifu.historia,
                    hobbies: waifu.pasatiempo,
                    idKind: waifu.id_especie,
                    month: waifu.mes,
                    name: waifu.nombre,
                    occupation: waifu.ocupacion,
                    idPersonality: waifu.id_personalidad,
                    profilePhoto: waifu.imagen_perfil,
                }

                setDataWaifu(mappedData);

            }
            else
                setDataWaifu(undefined);


        } catch (e) {
            console.error(`error registrar personaje: ${e}`);
        }
    }

    useEffect(() => {
        if (isEditing && dataWaifu) {
            setEditWaifu({ ...dataWaifu });
        }
    }, [isEditing])



    return (
        <ScrollView style={[/* stylesAppTheme.container,  */dynamicStyles.dynamicScrollViewStyle]}>
            <View /* style={stylesAppTheme.container} */>
                <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                    Editar waifu Bv
                </Text>
                <TextInputComponent value={idCharacter?.toString() || ''} action={(text) => setIdCharacter(Number(text))} placeholderText='id waifu' verified={false} isPassword={false} />
                <ButtonComponent active={true} funcion={Buscar_Personaje} title='Buscar waifu' />
                {/* <ScrollView style={[dynamicStyles.dynamicViewContainer]}></ScrollView> */}
                {
                    dataWaifu ? (
                        <>
                            {!isEditing ? (
                                <>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[dynamicStyles.dynamicText, { fontSize: 24, fontWeight: 'bold' }]}>{dataWaifu?.name} ({dataWaifu?.alias})</Text>
                                        {/* <TouchableOpacity onPress={isFavorite ? Borrar_Favorito : Marcar_Favorito}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={themeData.texto} />
                        </TouchableOpacity> */}
                                    </View>
                                    <Image
                                        source={{ uri: dataWaifu?.profilePhoto }}
                                        style={{
                                            //width: width * 0.4,
                                            width: 120,
                                            //height: 120,
                                            aspectRatio: 9 / 16,
                                            borderRadius: 12,
                                            marginRight: 16
                                        }}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text style={dynamicStyles.dynamicText}>Edad: {dataWaifu?.age}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Ocupación: {dataWaifu?.occupation}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Pasatiempo: {dataWaifu?.hobbies}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Cumpleaños: {dataWaifu?.day}/{dataWaifu?.month}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Especie: {dataWaifu?.idKind}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Personalidad(es): {dataWaifu?.idPersonality}</Text>
                                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                                            {dataWaifu?.description}
                                        </Text>

                                        {/* Historia (expandible si deseas) */}
                                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16, fontWeight: 'bold' }]}>Historia:</Text>
                                        <Text style={[dynamicStyles.dynamicText]}>
                                            {dataWaifu?.history}
                                        </Text>
                                        <ButtonComponent active={true} funcion={() => { setIsEditing(true) }} title='Editar Waifu' />
                                    </View>
                                </>) :
                                (
                                    <>
                                        <TextInputComponent value={editWaifu?.name || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, name: text }))} placeholderText='Nombre' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.alias || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, alias: text }))} placeholderText='Alias' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.description || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, description: text }))} placeholderText='Descripcion' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.occupation || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, occupation: text }))} placeholderText='Ocupacion' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.hobbies || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, hobbies: text }))} placeholderText='Pasatiempos' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.day ? String(editWaifu.day) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, day: Number(text) }))} placeholderText='Dia' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.month ? String(editWaifu.month) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, month: Number(text) }))} placeholderText='Mes' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.age ? String(editWaifu.age) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, age: Number(text) }))} placeholderText='Edad' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.idKind ? String(editWaifu.idKind) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, idKind: Number(text) }))} placeholderText='Id Especie' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.idPersonality ? String(editWaifu.idPersonality) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, idPersonality: Number(text) }))} placeholderText='Id Personalidad' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.profilePhoto || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, profilePhoto: text }))} placeholderText='Url Imagen Perfil' verified={false} isPassword={false} />
                                        {/* 
                                       
                                        idKind
                                        idPersonality
                                        profilePhoto*/}

                                        {/* <TextInputComponent
                                                            value={age?.toString() || ''}
                                                            action={(text) => setAge(Number(text))}
                                                            placeholderText='Edad'
                                                            verified={false}
                                                            isPassword={false}
                                                            isNumericKeybordType
                                                        /> */}


                                        <ButtonComponent active={true} funcion={() => { setIsEditing(false) }} title='Guardar cambios' />
                                    </>
                                )
                            }
                        </>)
                        : (
                            <Text style={[dynamicStyles.dynamicText]}>no hay waifus encontradas</Text>
                        )
                }
            </View >
        </ScrollView>



    )
}