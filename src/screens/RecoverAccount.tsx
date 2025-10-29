import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { useNavigation } from '@react-navigation/native'
import { search_email, send_email } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'
import { TextLinkComponent } from '../components/TextLinkComponent'
import { TextInputComponent } from '../components/TextInputComponent'
import { RegexFormValidator } from '../utils/RegexFormValidator'
import { ButtonComponent } from '../components/ButtonComponent'


export const RecoverAccount = () => {

    const navigation = useNavigation();
    const { themeData, dynamicStyles } = useTheme();

    const [username, setUsername] = useState('');

    const [NameIcon, setNameIcon] = useState(false);
    const [UsernameIcon, setUsernameIcon] = useState(false);
    const [PasswordIcon, setPasswordIcon] = useState(false);
    const [EmailIcon, setEmailIcon] = useState(false);
    const [PhoneIcon, setPhoneIcon] = useState(false);

    useEffect(() => {

        /* setEmailIcon(RegexFormValidator(email, 'verifyEmail')); */
        setUsernameIcon(RegexFormValidator(username, 'verifyUsername'));

    }, [username]);

    const activeButton = (/* NameIcon && PasswordIcon && */ UsernameIcon /* && EmailIcon */ /* && PhoneIcon */) ? true : false;

    const noFunction = () => { };


    const Search_Email = async ( /* username */) => {
        try {
            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${search_email}?username=${username}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);

            const email = data[0];
            console.log(`user email -> ${email}`);
            console.log(`userIsArray -> ${Array.isArray(email)}`);

            if (!data.Error) {
                console.log(`Este es el email => ${data[0].email}`);
                console.log(`Este es el id_usuario => ${data[0].id_usuario}`);
                
                Enviar_Email(data[0].email, data[0].id_usuario);
            }


        } catch (e) {
            console.error(`error: ${e}`);
        }
    }

    const Enviar_Email = async (email: string, id_usuario: number) => {
        console.log(`${username} + ${email}`);
        try {
            console.log("entro al try en enviar email");
            console.log(`email => ${email} id_usuario => ${id_usuario}`);
            //console.log("Path login -> ", login_path)
            //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
            const response = await fetch(`${send_email}?username=${username}&email=${email}&id_usuario=${id_usuario}`);
            const data = await response.json();
            // Retorna los datos para ser usados en el componente
            console.log(data);



            if (!data.Error) {



                console.log("Email enviado al parecer Bv");
            }


        } catch (e) {
            console.error(`error: ${e}`);
        }
    }

    return (
        <View style={[{ alignItems: 'center', flex: 1, paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>
            <Text style={[dynamicStyles.dynamicText, { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }]}>Recuperacion de cuenta</Text>
            <TextInputComponent placeholderText='Usuario' value={username} action={setUsername} isPassword={false} verified={false} />

            <Text></Text>

            <ButtonComponent active={true} title='Recuperar cuenta' funcion={/* () => */ Search_Email} />

            <TextLinkComponent text='Volver' screenNavigation='LogIn' />

        </View>
    )
}
