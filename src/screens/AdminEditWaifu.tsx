import React, { StrictMode, useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { edit_profile, search_character } from '../const/UrlConfig';


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
    kind: string;
    //idPersonality: number;
    personalities: string;
    profilePhoto: string;
}

export const AdminEditWaifu = () => {
    const { themeData, dynamicStyles } = useTheme();
    const [idCharacter, setIdCharacter] = useState<number>();
    const [dataWaifu, setDataWaifu] = useState<WaifuData>();
    const [editWaifu, setEditWaifu] = useState<WaifuData>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const isModified = JSON.stringify(dataWaifu) != JSON.stringify(editWaifu);

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
                    kind: waifu.especie,
                    month: waifu.mes,
                    name: waifu.nombre,
                    occupation: waifu.ocupacion,
                    //idPersonality: waifu.id_personalidad,
                    personalities: waifu.personalidades,
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


    const Editar_Perfil = async () => {

        try {

            const params = new URLSearchParams({
                id_personaje: String(idCharacter),
                nombre: editWaifu?.name || '',
                alias: editWaifu?.alias || '',
                descripcion: editWaifu?.description || '',
                historia: editWaifu?.history || '',
                pasatiempo: editWaifu?.hobbies || '',
                ocupacion: editWaifu?.occupation || '',
                dia: String(editWaifu?.day) || '',
                mes: String(editWaifu?.month || ''),
                edad: String(editWaifu?.age || ''),
                imagen_perfil: editWaifu?.profilePhoto || ''

            });
            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${edit_profile}?id_personaje=${idCharacter}&${params.toString()}`);


            /* nombre VARCHAR(40) NOT NULL,
            alias VARCHAR(30) NOT NULL,
            descripcion TEXT NOT NULL,
            historia TEXT NOT NULL,
            pasatiempo TEXT NOT NULL,
            ocupacion VARCHAR(40) NOT NULL,
            dia INT NOT NULL,
            mes INT NOT NULL,
            edad INT NOT NULL,
            id_especie INT NOT NULL,
            imagen_perfil TEXT NOT NULL, */

            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            const waifu = data[0];
            console.log(`datos editados => ${waifu}`);


            if (!data.error) {
                console.log("Al parecer si edito a la waifu Bv");

                /* Asignar_Personalidad(data.id_generado); */

                /* const mappedData: WaifuData = {
                    id: waifu.id_personaje,
                    age: waifu.edad,
                    alias: waifu.alias,
                    day: waifu.dia,
                    description: waifu.descripcion,
                    history: waifu.historia,
                    hobbies: waifu.pasatiempo,
                    idKind: waifu.id_especie,
                    kind: waifu.especie,
                    month: waifu.mes,
                    name: waifu.nombre,
                    occupation: waifu.ocupacion,
                    //idPersonality: waifu.id_personalidad,
                    personalities: waifu.personalidades,
                    profilePhoto: waifu.imagen_perfil,
                } */

                //setDataWaifu(mappedData);

                setIsEditing(false);

            }



        } catch (e) {
            console.error(`error al editar el perfil de waifu: ${e}`);
        }
    }


    return (
        <ScrollView style={[/* stylesAppTheme.container,  */dynamicStyles.dynamicScrollViewStyle]}>
            <View /* style={stylesAppTheme.container} */>
                <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                    Editar waifu Bv
                </Text>
                {
                    dataWaifu && !isEditing && (
                        <><TextInputComponent value={idCharacter?.toString() || ''} action={(text) => setIdCharacter(Number(text))} placeholderText='id waifu' verified={false} isPassword={false} />
                            <ButtonComponent active={true} funcion={Buscar_Personaje} title='Buscar waifu' />
                        </>
                    )
                }

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
                                        <Text style={dynamicStyles.dynamicText}>Especie: {dataWaifu?.kind}</Text>
                                        <Text style={dynamicStyles.dynamicText}>Personalidad(es): {dataWaifu?.personalities}</Text>
                                        <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                                            Descripcion: {dataWaifu?.description}
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
                                        <Text style={dynamicStyles.dynamicText}>Nombre:</Text>
                                        <TextInputComponent value={editWaifu?.name || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, name: text }))} placeholderText='Nombre' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Alias:</Text>
                                        <TextInputComponent value={editWaifu?.alias || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, alias: text }))} placeholderText='Alias' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Descripcion:</Text>
                                        <TextInputComponent value={editWaifu?.description || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, description: text }))} placeholderText='Descripcion' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Ocupacion:</Text>
                                        <TextInputComponent value={editWaifu?.occupation || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, occupation: text }))} placeholderText='Ocupacion' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Pasatiempos:</Text>
                                        <TextInputComponent value={editWaifu?.hobbies || ''} action={(text) => setEditWaifu(pre => ({ ...pre!, hobbies: text }))} placeholderText='Pasatiempos' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Dia:</Text>
                                        <TextInputComponent value={editWaifu?.day ? String(editWaifu.day) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, day: Number(text) }))} placeholderText='Dia' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Mes:</Text>
                                        <TextInputComponent value={editWaifu?.month ? String(editWaifu.month) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, month: Number(text) }))} placeholderText='Mes' verified={false} isPassword={false} />
                                        <Text style={dynamicStyles.dynamicText}>Edad:</Text>
                                        <TextInputComponent value={editWaifu?.age ? String(editWaifu.age) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, age: Number(text) }))} placeholderText='Edad' verified={false} isPassword={false} />
                                        {/* <TextInputComponent value={editWaifu?.idKind ? String(editWaifu.idKind) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, idKind: Number(text) }))} placeholderText='Id Especie' verified={false} isPassword={false} />
                                        <TextInputComponent value={editWaifu?.idPersonality ? String(editWaifu.idPersonality) : ''} action={(text) => setEditWaifu(pre => ({ ...pre!, idPersonality: Number(text) }))} placeholderText='Id Personalidad' verified={false} isPassword={false} /> */}
                                        <Text style={dynamicStyles.dynamicText}>Url imagen de perfil:</Text>
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

                                        {isModified ?
                                            <ButtonComponent active={true} funcion={() => { Editar_Perfil() }} title='Guardar cambios' />
                                            :
                                            <ButtonComponent active={true} funcion={() => { setIsEditing(false) }} title='Volver' />

                                        }
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