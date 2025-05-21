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


export const Register = () => {

  const navigation = useNavigation();
  const { themeData, dynamicStyles } = useTheme();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const [NameIcon, setNameIcon] = useState(false);
  const [UsernameIcon, setUsernameIcon] = useState(false);
  const [PasswordIcon, setPasswordIcon] = useState(false);
  const [EmailIcon, setEmailIcon] = useState(false);
  const [PhoneIcon, setPhoneIcon] = useState(false);

  useEffect(() => {
    setNameIcon(RegexFormValidator(name, 'verifyName'));
    setUsernameIcon(RegexFormValidator(username, 'verifyUsername'));
    setPasswordIcon(RegexFormValidator(password, 'verifyPassword'));
    setEmailIcon(RegexFormValidator(email, 'verifyEmail'));
    setPhoneIcon(RegexFormValidator(phone, 'verifyPhone'));
  }, [name, username, password, email, phone]);

  const activeButton = (NameIcon && PasswordIcon && UsernameIcon && EmailIcon /* && PhoneIcon */) ? true : false;


  const Registrar = async () => {
    try {
      const response = await fetch(`${register_user}?
                username=${username}&password=${password}&nombre=${name}&email=${email}&telefono=${phone}&genero=${gender}`);

      const data = await response.json();
      // Retorna los datos para ser usados en el componente
      console.log(data);
      const respuesta = JSON.stringify(data);
      if (data.Error) {
        console.log("respuesta -> ", respuesta);
        console.log("Error de registro Bv");
      }
      else if (data.Success) {
        console.log("Registro exitoso");
      }
      const user = data[0];
      console.log(`user -> ${user}`);
      console.log(`userIsArray -> ${Array.isArray(user)}`);

    } catch (e) {
      console.error(`error: ${e}`);
    }
  }

  return (
    <View style={[{ alignItems: 'center', flex: 1, paddingTop: 40 }, dynamicStyles.dynamicScrollViewStyle]}>

      <Text style={[stylesAppTheme.title, dynamicStyles.dynamicText]}>NekoPaper</Text>

      {/* <TextInput value={name ?? ''} onChangeText={setName} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Nombre' />
      <Text></Text>
      <TextInput value={username ?? ''} onChangeText={setUsername} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Username' />
      <Text></Text>
      <TextInput value={password ?? ''} onChangeText={setPassword} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Password' />
      <Text></Text>
      <TextInput value={email ?? ''} onChangeText={setEmail} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Email' />
      <Text></Text>
      <TextInput value={gender ?? ''} onChangeText={setGender} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Genero' />
      <Text></Text>
      <TextInput value={phone ?? ''} onChangeText={setPhone} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Telefono' />
      <Text></Text>
      <TextInput value={profilePhoto ?? ''} onChangeText={setProfilePhoto} style={[stylesAppTheme.textinput, dynamicStyles.dynamicViewContainer, dynamicStyles.dynamicText]} placeholderTextColor={themeData.texto} placeholder='Foto Perfil' />
      <Text></Text> */}

      <TextInputComponent value={name} action={setName} placeholderText='Name' verified={NameIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={username} action={setUsername} placeholderText='Username' verified={UsernameIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={password} action={setPassword} placeholderText='Password' verified={PasswordIcon} isPassword={true} />
      <Text></Text>
      <TextInputComponent value={email} action={setEmail} placeholderText='Email' verified={EmailIcon} isPassword={false} />
      <Text></Text>
      <TextInputComponent value={gender} action={setGender} placeholderText='Gender' verified={false} isPassword={false} />
      <Text></Text>
      {/* <TextInputComponent value={phone} action={setPhone} placeholderText='Phone' verified={PhoneIcon} isPassword={false} />
      <Text></Text> */}

      {/* <TouchableOpacity style={stylesAppTheme.button} onPress={() => navigation.navigate('BottomTabNavigator')}><Text style={stylesAppTheme.textButton}>Home</Text></TouchableOpacity> */}
      {/* <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={Registrar}  >
        <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]}>registrar</Text>
      </TouchableOpacity> */}

      <ButtonComponent title='registrar' funcion={Registrar} active={activeButton} />
      <Text></Text>
      <TextLinkComponent text='¿Tienes una cuenta? Inicia sesion' screenNavigation='LogIn' />

    </View>
  )
}
