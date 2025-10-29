import React, { useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';
import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { show_images_for_character } from '../const/UrlConfig';
import { NekoImageData } from './ProfileCharacter';



export const AdminWallpapers = () => {
    const { themeData, dynamicStyles } = useTheme();
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


    return (
        <ScrollView style={[/* stylesAppTheme.container,  */dynamicStyles.dynamicScrollViewStyle]}>
            <View /* style={stylesAppTheme.container} */>
                <Text style={[dynamicStyles.dynamicText, { fontSize: 25 }]}>
                    Administrar Wallpapers Bv
                </Text>
                {
                    !isEditing && (
                        <><TextInputComponent value={idCharacter?.toString() || ''} action={(text) => setIdCharacter(Number(text))} placeholderText='id waifu' verified={false} isPassword={false} />
                            <ButtonComponent active={true} funcion={Buscar_Personaje} title='Buscar waifu' />
                        </>
                    )
                }
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


            </View >
        </ScrollView >
    )
}
