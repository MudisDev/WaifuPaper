import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext'
import { /* consult_token, generate_token, */ consult_token, generate_token, login_path } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'
import { TextInputComponent } from '../components/TextInputComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { TextLinkComponent } from '../components/TextLinkComponent'
import { ThemeContext } from '../context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ShowAlert } from '../helpers/ShowAlert'
import { InitialLoadingIndicator } from '../components/LoadingIndicator'
import { useFetch } from '../hooks/useFetch'

interface RespuestaLogin {
    username: string;
    nombre: string;
    telefono: string;
    email: string;
    foto_perfil: string;
    //registerDate: user.fecha_registro,
    id_usuario: number;
    genero: string;
}

interface PeticionLogin {
    username: string;
    password: string;
}

interface interfaceGenerarToken {
    id_usuario: string
}

interface interfaceConsultarToken {
    id_usuario: number;
    token: string
}

interface interfacePerfilTokenPeticion {
    id_usuario: number
}

interface interfacePerfilTokenRespuesta {
    id_usuario: number,
    username: string,
    nombre: string,
    email: string,
    genero: string
}


export const LogIn = () => {

    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const { userData, setUserData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

    const { themeData, dynamicStyles } = useTheme();

    const [localToken, setLocalToken] = useState<string | null>(null);
    const [localIdUser, setLocalIdUser] = useState<string | null>(null);

    const context = useContext(ThemeContext); // Obtiene el contexto
    //const themeData = context?.themeData; // Obtiene themeData del contexto
    const setThemeData = context?.setThemeData;

    const [isLoading, setIsLoading] = useState(true);


    const { /* data: dataLogin, */ fetchData: fetchLogin, error: errorLogin } = useFetch<RespuestaLogin, PeticionLogin>({ endpoint: login_path, metodo: 'POST' });

    const { fetchData: fetchGenerarToken } = useFetch<interfaceGenerarToken>({ endpoint: generate_token, metodo: 'POST' });

    const { fetchData: fetchConsultarToken } = useFetch<interfaceConsultarToken>({ endpoint: consult_token, metodo: 'POST' });

    const { fetchData: fetchDatosPerfilToken } = useFetch<interfacePerfilTokenRespuesta | interfacePerfilTokenPeticion>({ endpoint: /* login_path */consult_token, metodo: 'POST' });


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
        console.log("1. Se presionó el botón");
        console.log("1.5 -> login_path", login_path);
        const datosLogin: PeticionLogin = {
            username: username,
            password: password,
        }
        console.log("2. Datos login:", datosLogin);

        const response = await fetchLogin(datosLogin);

        console.log("3. Respuesta de useFetch:", response);

        if (!response.Error) {
            console.log("Credenciales validas");
            setUserData(response);
            generarToken(response.id_usuario);
            navigation.navigate("BottomTabNavigator");
        }
        else {
            console.log("ERROR LOGIN validas");
            ShowAlert({ title: 'Error', text: 'Credenciales invalidas', buttonOk: 'Ok', onConfirm: () => void {} })
        }
    }




    const generarToken = async (id_usuario) => {
        try {

            const datosGeneracionToken: interfaceGenerarToken = {
                id_usuario: id_usuario,
            }

            const respuesta = await fetchGenerarToken(datosGeneracionToken);

            console.log("data del token -> ", respuesta);

            try {
                console.log("Entra al TRY de  storeData");
                await AsyncStorage.setItem('localToken', String(respuesta.token));
                await AsyncStorage.setItem('localIdUser', String(respuesta.id_usuario));
            } catch (e) {
                console.log("Error al intentar almacenar el token y usuario");

                console.error(`error: ${e}`);
            }

        } catch (e) {
            console.log("Error al intentar generar el token");

            console.error(`error: ${e}`);
        }

    }

    /* const activeButton = (username && password) ? true : false; */


    useEffect(() => {
        const Leer_Datos = async () => {
            try {
                //await AsyncStorage.setItem('localToken', token.token);
                //await AsyncStorage.setItem('localUsername', token.id_usuario);


                //await AsyncStorage.removeItem('localToken');
                //await AsyncStorage.removeItem('localIdUser');


                const token = await AsyncStorage.getItem('localToken');
                const id_usuario = await AsyncStorage.getItem('localIdUser');




                if (token)
                    setLocalToken(token);
                if (id_usuario)
                    setLocalIdUser(id_usuario);

                console.log(`Token leido -> ${token}`);
                console.log(`ID usuario leido -> ${id_usuario}`);

                if (!token || !id_usuario)
                    setIsLoading(false);

            } catch (e) {
                console.log("Error al intentar leer el token almacenado");

                console.error(`error: ${e}`);
            }

        }

        Leer_Datos();
    }, [])



    useEffect(() => {
        const Consultar_Token = async () => {
            /* const token = await AsyncStorage.getItem("localToken");
            const id_usuario = await AsyncStorage.getItem("localIdUser"); */

            if (localToken != null && localIdUser != null) {
                try {

                    const datosConsulta = {
                        id_usuario: localIdUser,
                        token: localToken
                    }

                    const respuesta = await fetchConsultarToken(datosConsulta);
                    console.log("Data de la consulta de token -> ", respuesta);

                    if (respuesta && !respuesta.Error /* && respuesta.token */) {
                        // token válido
                        //RecibirDatoPerfil(localIdUser, localToken);

                        console.log("data de la respuesta al recibir perfil por token -> ", respuesta);

                        if (!respuesta.Error) {

                            const userDataResponse = {
                                username: respuesta.username,
                                nombre: respuesta.nombre,
                                email: respuesta.email,
                                id_usuario: respuesta.id_usuario,
                                genero: respuesta.genero
                            }

                            //console.log(`userdata -> ${userDataResponse}`);
                            //const array = JSON.stringify(userDataResponse);
                            //console.log(Array.isArray(array));

                            setUserData(userDataResponse);

                            console.log(userData?.email);
                            console.log(`id_usuario que genera el token -> ${userDataResponse.id_usuario}`)

                        }

                        navigation.replace("BottomTabNavigator");
                        setIsLoading(false);
                    }


                } catch (e) {
                    setIsLoading(false);

                    console.log(`Error al llamar a delete token -> ${e}`);
                }
            }
        }
        Consultar_Token();
    }, [localToken, localIdUser]);



    /* const RecibirDatoPerfil = async (id_usuario, token) => {
        try {
            console.log("Path login -> ", login_path)

            const datosConsultarToken = {
                id_usuario: id_usuario,
                token: token
            }

            console.log("id_usuario pa la consulta token -> ", id_usuario);

            const respuesta = await fetchDatosPerfilToken(datosConsultarToken);

            console.log("data de la respuesta al recibir perfil por token -> ", respuesta);

            if (!respuesta.Error) {

                const userDataResponse = {
                    username: respuesta.username,
                    nombre: respuesta.nombre,
                    email: respuesta.email,
                    id_usuario: respuesta.id_usuario,
                    genero: respuesta.genero
                }

                //console.log(`userdata -> ${userDataResponse}`);
                //const array = JSON.stringify(userDataResponse);
                //console.log(Array.isArray(array));

                setUserData(userDataResponse);

                console.log(userData?.email);
                console.log(`id_usuario que genera el token -> ${userDataResponse.id_usuario}`)

            }

        } catch (e) {
            console.error(`error: ${e}`);
        }

    } */

    useEffect(() => { if (!errorLogin) return; console.log("Error LOg -> ", errorLogin) }, [errorLogin])


    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    if (isLoading)
        return <InitialLoadingIndicator />


    return (
        <View style={[{ alignItems: 'center', flex: 1, paddingTop: 90 }, dynamicStyles.dynamicScrollViewStyle]}>

            <Text style={[stylesAppTheme.title, dynamicStyles.dynamicText]}>WaifuPaper</Text>

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

            <ButtonComponent title='iniciar sesion' funcion={IniciarSesion} active={username !== "" && password !== ""} />
            <Text></Text>
            <TextLinkComponent text='¿No tienes una cuenta? Registrate' screenNavigation='Register' />
            <TextLinkComponent text='¿Olvidaste tu contraseña?' screenNavigation='RecoverAccount' />

        </View>
    )
}

///////////////////////////