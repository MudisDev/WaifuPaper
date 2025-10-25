import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { useNavigation } from '@react-navigation/native'
import { register_user } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'
import { TextLinkComponent } from '../components/TextLinkComponent'
import { TextInputComponent } from '../components/TextInputComponent'
import { RegexFormValidator } from '../utils/RegexFormValidator'
import { ButtonComponent } from '../components/ButtonComponent'


export const RecoverAccount = () => {

    const navigation = useNavigation();
    const { themeData, dynamicStyles } = useTheme();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');


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


    return (
        <View style={[{ alignItems: 'center', flex: 1, paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>
            <Text style={[dynamicStyles.dynamicText, { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }]}>Recuperacion de cuenta</Text>
            <TextInputComponent placeholderText='Usuario' value={username} action={setUsername} isPassword={false} verified={UsernameIcon} />

            <Text></Text>

            <ButtonComponent active={activeButton} title='Recuperar cuenta' funcion={noFunction} />

            <TextLinkComponent text='Volver' screenNavigation='LogIn' />

        </View>
    )
}
