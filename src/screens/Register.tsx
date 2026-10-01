import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { register_user } from '../const/UrlConfig'
import { useTheme } from '../hooks/UseTheme'
import { TextLinkComponent } from '../components/TextLinkComponent'
import { TextInputComponent } from '../components/TextInputComponent'
import { RegexFormValidator } from '../utils/RegexFormValidator'
import { ButtonComponent } from '../components/ButtonComponent'
import { ShowAlert } from '../helpers/ShowAlert'
import { useFetch } from '../hooks/useFetch'

interface interfaceRegistro {
  nombre: string,
  username: string,
  password: string,
  email: string,
  genero: string,
}

export const Register = () => {

  const { dynamicStyles } = useTheme();

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  //const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [genero, setGenero] = useState('');
  //const [profilePhoto, setProfilePhoto] = useState('');

  const [NameIcon, setNameIcon] = useState(false);
  const [UsernameIcon, setUsernameIcon] = useState(false);
  const [PasswordIcon, setPasswordIcon] = useState(false);
  const [EmailIcon, setEmailIcon] = useState(false);
  //const [PhoneIcon, setPhoneIcon] = useState(false);

  const { fetchData: fetchRegistrarCuenta } = useFetch<interfaceRegistro>({ endpoint: register_user, metodo: 'POST' });

  useEffect(() => {
    setNameIcon(RegexFormValidator(nombre, 'verifyName'));
    setUsernameIcon(RegexFormValidator(username, 'verifyUsername'));
    setPasswordIcon(RegexFormValidator(password, 'verifyPassword'));
    setEmailIcon(RegexFormValidator(email, 'verifyEmail'));
    //setPhoneIcon(RegexFormValidator(phone, 'verifyPhone'));
  }, [nombre, username, password, email, /* phone */]);

  const activeButton = (NameIcon && PasswordIcon && UsernameIcon && EmailIcon /* && PhoneIcon */) ? true : false;


  const registrarCuenta = async () => {

    try {
      const datosRegistro: interfaceRegistro = {
        nombre: nombre,
        username: username,
        password: password,
        email: email,
        genero: genero,
      }

      const respuesta = await fetchRegistrarCuenta(datosRegistro);

      if (respuesta.Success) {
        ShowAlert({ title: 'Registro exitoso', text: 'El usuario fue registrado', buttonOk: 'Ok', onConfirm: () => void {} })
      }
      else if (respuesta.Warning) {
        ShowAlert({ title: 'Warning', text: 'La operacion SQL se realizó, pero no se registró el usuario', buttonOk: 'Ok', onConfirm: () => void {} })

      } else if (respuesta.Error) {
        ShowAlert({ title: 'Error', text: 'Ocurrió un error al intentar registrar el usuario', buttonOk: 'Ok', onConfirm: () => void {} })

      }
    } catch (e) {
      console.log("Error al registrar cuenta ->", e);
    }
  }

  return (
    <View style={[{ alignItems: 'center', flex: 1, paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>

      <Text style={[stylesAppTheme.title, dynamicStyles.dynamicText]}>Registrar Cuenta</Text>
      <TextInputComponent value={nombre} action={setNombre} placeholderText='Nombre' verified={NameIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={username} action={setUsername} placeholderText='Username' verified={UsernameIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={password} action={setPassword} placeholderText='Password' verified={PasswordIcon} isPassword={true} />
      <Text></Text>
      <TextInputComponent value={email} action={setEmail} placeholderText='Email' verified={EmailIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={genero} action={setGenero} placeholderText='Genero' verified={false} isPassword={false} />
      <Text></Text>

      <ButtonComponent title='Registrar' funcion={registrarCuenta} active={activeButton} />
      <Text></Text>
      <TextLinkComponent text='¿Tienes una cuenta? Inicia sesion' screenNavigation='LogIn' />

    </View>
  )
}
