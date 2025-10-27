import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
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
    hobbie: string;
    occupation: string;
    day: number;
    month: number;
    age: number;
    kind: number;
    personality: number;
    profile_photo: string;
}

export const AdminEditWaifu = () => {
    const { themeData, dynamicStyles } = useTheme();
    const [idCharacter, setIdCharacter] = useState<number>();
    const [dataWaifu, setDataWaifu] = useState<WaifuData>();

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
                    hobbie: waifu.pasatiempo,
                    kind: waifu.id_especie,
                    month: waifu.mes,
                    name: waifu.nombre,
                    occupation: waifu.ocupacion,
                    personality: waifu.id_personalidad,
                    profile_photo: waifu.imagen_perfil,
                }

                setDataWaifu(mappedData);

            }
            else
                setDataWaifu(undefined);


        } catch (e) {
            console.error(`error registrar personaje: ${e}`);
        }
    }


    return (
        <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
            <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                Editar waifu Bv
            </Text>
            <TextInputComponent value={idCharacter?.toString() || ''} action={(text) => setIdCharacter(Number(text))} placeholderText='id waifu' verified={false} isPassword={false} />
            <ButtonComponent active={true} funcion={Buscar_Personaje} title='Buscar waifu' />
            {
                (dataWaifu) ? (
                    <>
                        <Text style={[dynamicStyles.dynamicText]}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[dynamicStyles.dynamicText, { fontSize: 24, fontWeight: 'bold' }]}>{dataWaifu?.name} ({dataWaifu?.alias})</Text>
                                {/* <TouchableOpacity onPress={isFavorite ? Borrar_Favorito : Marcar_Favorito}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={themeData.texto} />
                        </TouchableOpacity> */}
                            </View>
                            <Image
                                source={{ uri: dataWaifu?.profile_photo }}
                                style={{
                                    //width: width * 0.4,
                                    width: 120,
                                    height: 120,
                                    //aspectRatio: 9 / 16,
                                    borderRadius: 12,
                                    marginRight: 16
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={dynamicStyles.dynamicText}>Edad: {dataWaifu?.age}</Text>
                                <Text style={dynamicStyles.dynamicText}>Ocupación: {dataWaifu?.occupation}</Text>
                                <Text style={dynamicStyles.dynamicText}>Pasatiempo: {dataWaifu?.hobbie}</Text>
                                <Text style={dynamicStyles.dynamicText}>Cumpleaños: {dataWaifu?.day}/{dataWaifu?.month}</Text>
                                <Text style={dynamicStyles.dynamicText}>Especie: {dataWaifu?.kind}</Text>
                                <Text style={dynamicStyles.dynamicText}>Personalidad(es): {dataWaifu?.personality}</Text>
                            </View>
                            <Text style={[dynamicStyles.dynamicText, { marginTop: 16 }]}>
                                {dataWaifu?.description}
                            </Text>

                            {/* Historia (expandible si deseas) */}
                            <Text style={[dynamicStyles.dynamicText, { marginTop: 16, fontWeight: 'bold' }]}>Historia:</Text>
                            <Text style={[dynamicStyles.dynamicText]}>
                                {dataWaifu?.history}
                            </Text>
                        </Text>
                    </>)
                    : (
                        <Text style={[dynamicStyles.dynamicText]}>no hay waifus encontradas</Text>
                    )
            }

        </View>
    )
}