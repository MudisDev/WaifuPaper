import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext, use, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext'
import { consult_token, delete_token, generate_token, login_path } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'
import { TextInputComponent } from '../components/TextInputComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { TextLinkComponent } from '../components/TextLinkComponent'
import { ThemeContext } from '../context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ShowAlert } from '../helpers/ShowAlert'
import { InitialLoadingIndicator, LoadingIndicator } from '../components/LoadingIndicator'


export const LogIn = () => {

    const navigation = useNavigation();
    const [username, setUsername] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();


    const { userData, setUserData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

    const { themeData, dynamicStyles } = useTheme();

    const [localToken, setLocalToken] = useState<string | null>(null);
    const [localIdUser, setLocalIdUser] = useState<string | null>(null);

    const context = useContext(ThemeContext); // Obtiene el contexto
    //const themeData = context?.themeData; // Obtiene themeData del contexto
    const setThemeData = context?.setThemeData;

    const [isLoading, setIsLoading] = useState(true);


    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    //const dynamicStyles = dynamicStylesAppTheme(themeData);

    useEffect(() => {
        // Carga el tema al iniciar la app
        const loadStoredTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("themeColors");
            if (storedTheme) {
                //setTheme(JSON.parse(storedTheme));
                setThemeData(JSON.parse(storedTheme));
                console.log("Theme loaded!");
            }
        };
        loadStoredTheme();
    }, []);

    const IniciarSesion = async () => {
        try {
            console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${login_path}?username=${username}&password=${password}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);

            const user = data[0];
            console.log(`user -> ${user}`);
            console.log(`userIsArray -> ${Array.isArray(user)}`);

            if (!data.Error) {

                const userDataResponse = {
                    username: user.username,
                    name: user.nombre,
                    phoneNumber: user.telefono,
                    email: user.email,
                    profilePhoto: user.foto_perfil,
                    //registerDate: user.fecha_registro,
                    idUser: user.id_usuario,
                    gender: user.genero
                }

                /* console.log(`userdata -> ${userDataResponse}`);
                const array = JSON.stringify(userDataResponse);
                console.log(Array.isArray(array)); */

                setUserData(userDataResponse);

                console.log(userData?.email);
                console.log(`id_usuario que genera el token -> ${userDataResponse.idUser}`)
                Generar_Token(userDataResponse.idUser);


                navigation.navigate("BottomTabNavigator");
            }
            else
                ShowAlert({ title: 'Error', text: 'Credenciales invalidas', buttonOk: 'Ok', onConfirm: () => void {} })


        } catch (e) {
            console.error(`error: ${e}`);
        }
    }

    const Generar_Token = async (id_usuario) => {
        try {
            console.log("Entra al TRY de Generar_TOken");
            const response = await fetch(`${generate_token}?id_usuario=${id_usuario}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(`data del token -> ${data}`);

            const token = data;
            /* console.log(`token -> ${token.token}`);
            console.log(`id-usuario -> ${token.id_usuario}`)
            console.log(`fecha token -> ${token.fecha_token}`)
            console.log(`id token -> ${token.id_token}`)
            console.log(`tokenIsArray -> ${Array.isArray(token)}`); */




            try {
                console.log("Entra al TRY de  storeData");
                await AsyncStorage.setItem('localToken', token.token);
                await AsyncStorage.setItem('localIdUser', token.id_usuario);
            } catch (e) {
                console.log("Error al intentar almacenar el token y usuario");

                console.error(`error: ${e}`);
            }


            /* console.log(`userdata -> ${userDataResponse}`);
            const array = JSON.stringify(userDataResponse);
            console.log(Array.isArray(array)); */
            /* 
                        setUserData(userDataResponse);
            
                        console.log(userData?.email);
            
            
            
                        navigation.navigate("BottomTabNavigator");
                     */


        } catch (e) {
            console.log("Error al intentar generar el token");

            console.error(`error: ${e}`);
        }
    }

    const activeButton = (username && password) ? true : false;


    useEffect(() => {
        const Leer_Datos = async () => {
            /*  try { */
            /* await AsyncStorage.setItem('localToken', token.token);
            await AsyncStorage.setItem('localUsername', token.id_usuario); */
            const token = await AsyncStorage.getItem('localToken');
            const id_usuario = await AsyncStorage.getItem('localIdUser');


            /* } catch (e) {
                console.log("Error al intentar leer el token almacenado");

                console.error(`error: ${e}`);
            } */

            if (token)
                setLocalToken(token);
            if (id_usuario)
                setLocalIdUser(id_usuario);

            console.log(`Token leido -> ${token}`);
            console.log(`ID usuario leido -> ${id_usuario}`);

            if (!token || !id_usuario)
                setIsLoading(false);

        }

        Leer_Datos();
    }, [])

    useEffect(() => {
        const Consultar_Token = async () => {
            const token = await AsyncStorage.getItem("localToken");
            const id_usuario = await AsyncStorage.getItem("localIdUser");

            if (token != null && id_usuario != null) {
                try {
                    const respuesta = await fetch(`${consult_token}?id_usuario=${id_usuario}&token=${token}`);
                    const data = await respuesta.json();
                    console.log(`Data de la consulta de token -> ${data}`);
                    if (data && !data.Error && data.token) {
                        // token válido
                        RecibirDatoPerfil(id_usuario);
                        navigation.replace("BottomTabNavigator");
                        setIsLoading(false);
                    }
                } catch (e) {
                    setIsLoading(false);

                    console.error(`Error al llamar a delete token -> ${e}`);
                }
            }
        }
        Consultar_Token();
    }, [localToken, localIdUser]);


    const RecibirDatoPerfil = async (id_usuario) => {
        try {
            console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${login_path}?id_usuario=${id_usuario}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);

            const user = data[0];
            console.log(`user -> ${user}`);
            console.log(`userIsArray -> ${Array.isArray(user)}`);

            if (!data.Error) {

                const userDataResponse = {
                    username: user.username,
                    name: user.nombre,
                    phoneNumber: user.telefono,
                    email: user.email,
                    profilePhoto: user.foto_perfil,
                    //registerDate: user.fecha_registro,
                    idUser: user.id_usuario,
                    gender: user.genero
                }

                /* console.log(`userdata -> ${userDataResponse}`);
                const array = JSON.stringify(userDataResponse);
                console.log(Array.isArray(array)); */

                setUserData(userDataResponse);

                console.log(userData?.email);
                console.log(`id_usuario que genera el token -> ${userDataResponse.idUser}`)
                /* Generar_Token(userDataResponse.idUser);


                navigation.navigate("BottomTabNavigator"); */
            }


        } catch (e) {
            console.error(`error: ${e}`);
        }
    }


    if (isLoading)
        return <InitialLoadingIndicator />


    return (
        <View style={[{ alignItems: 'center', flex: 1, paddingTop: 90 }, dynamicStyles.dynamicScrollViewStyle]}>

            <Text style={[stylesAppTheme.title, dynamicStyles.dynamicText]}>WaifuPaper</Text>

            {/* <TextInput value={username ?? ''} onChangeText={setUsername} style={[stylesAppTheme.textinput, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]} placeholder='Username' placeholderTextColor={themeData.texto} />
            <Text></Text>
            <TextInput value={password ?? ''} onChangeText={setPassword} style={[stylesAppTheme.textinput, dynamicStyles.dynamicText, dynamicStyles.dynamicViewContainer]} placeholder='Password' placeholderTextColor={themeData.texto} />

            <Text></Text> */}

            <TextInputComponent placeholderText='Username' value={username ?? ''} action={setUsername} isPassword={false} verified={false} />
            <Text></Text>
            <TextInputComponent placeholderText='Password' value={password ?? ''} action={setPassword} isPassword={true} verified={false} />
            <Text></Text>

            {/* <TouchableOpacity style={stylesAppTheme.button} onPress={() => navigation.navigate('BottomTabNavigator')}><Text style={stylesAppTheme.textButton}>Home</Text></TouchableOpacity> */}
            {/* <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={IniciarSesion}>
                <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]}>Home</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={() => navigation.navigate('Register')}>
                <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]}>Registro</Text>
            </TouchableOpacity>
            <Text></Text> */}

            <ButtonComponent title='iniciar sesion' funcion={IniciarSesion} active={activeButton} />
            <Text></Text>
            <TextLinkComponent text='¿No tienes una cuenta? Registrate' screenNavigation='Register' />
            <TextLinkComponent text='¿Olvidaste tu contraseña?' screenNavigation='RecoverAccount' />

        </View>
    )
}
