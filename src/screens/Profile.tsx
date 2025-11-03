import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextComponent, Alert } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext'
import { useTheme } from '../hooks/UseTheme'
import { ButtonComponent } from '../components/ButtonComponent'
import { TextInputComponent } from '../components/TextInputComponent'
import { update_profile } from '../const/UrlConfig'
import { ShowAlert } from '../helpers/ShowAlert'


export const Profile = () => {

  const { themeData, dynamicStyles } = useTheme();

  const { userData, setUserData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

  const [editarPerfil, setEditarPerfil] = useState<boolean>(false);
  const [datosEditados, setDatosEditados] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  useEffect(() => {

    if (editarPerfil) {
      setName(userData?.name || "");
      setUsername(userData?.username || "");
      setEmail(userData?.email || "");
      setGender(userData?.gender || "");
    }

  }, [editarPerfil, setUserData])

  useEffect(
    () => {
      if (userData?.name != name || userData?.email != email || userData?.gender != gender) {
        setDatosEditados(true);
      }
      else {
        setDatosEditados(false);
      }

    }, [name, email, gender]
  )


  const noFunction = () => { }

  const Alert_Editar_Perfil = () =>
    Alert.alert(
      'Editando perfil',
      '¿Seguro que deseas guardar cambios?',
      [
        {
          text: 'Cancel',
          //onPress: () => { },
          onPress: () => setEditarPerfil(false),
          style: 'cancel',
        },
        {
          text: 'Ok',
          //onPress: () => DeleteProfile(),
          //onPress: () => setEditarPerfil(false),
          onPress: () => ActualizarPerfil(userData?.idUser),

          style: 'destructive',
        },

      ],
      {
        cancelable: true,
        /* onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ), */
      },
    );


  const ActualizarPerfil = async (id_usuario) => {
    try {
      //console.log("Path login -> ", login_path)
      //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
      //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
      const response = await fetch(`${update_profile}?id_usuario=${id_usuario}&nombre=${name}&email=${email}&genero=${gender}`);
      console.log('Paso del await en actualizar');
      console.log(`response => ${response}`);
      const data = await response.json();
      // Retorna los datos para ser usados en el componente
      console.log(data);

      const user = data[0];
      console.log(`user -> ${user}`);
      console.log(`userIsArray -> ${Array.isArray(user)}`);

      if (data.Success) {

        /* const userDataResponse = {
         username: user.username,
         name: user.nombre,
         phoneNumber: user.telefono,
         email: user.email,
         profilePhoto: user.foto_perfil,
         //registerDate: user.fecha_registro,
         idUser: user.id_usuario,
         gender: user.genero
       }  */

        const userDataResponse = {
          username: userData?.username,
          name: name,
          phoneNumber: userData?.phoneNumber || "",
          email: email,
          profilePhoto: userData?.profilePhoto || "",
          //registerDate: user.fecha_registro,
          idUser: userData?.idUser || 0,
          gender: gender
        }

        /* console.log(`userdata -> ${userDataResponse}`);
        const array = JSON.stringify(userDataResponse);
        console.log(Array.isArray(array)); */

        setUserData(userDataResponse);

        /* console.log(userData?.email);
        console.log(`id_usuario que genera el token -> ${userDataResponse.idUser}`) */
        /* Generar_Token(userDataResponse.idUser);
 
 
        navigation.navigate("BottomTabNavigator"); */
        console.log('Update Success');
        ShowAlert({title: 'Acción exitosa', text: 'Perfil actualizado con éxito', buttonOk: 'Ok', onConfirm: () => void {}})
      }
      else if (data.Warning) {
        console.log('Update Warning');

      }
      else if (data.Error) {
        console.log('Update Warning');

      }

      setDatosEditados(false);
      setEditarPerfil(false);


    } catch (e) {
      console.error(`error: ${e}`);
    }
  }

  return (
    // <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
    <View style={[{ alignItems: 'center', flex: 1, paddingTop: 90 }, dynamicStyles.dynamicScrollViewStyle]}>
      {(editarPerfil == false) ?
        <>
          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Nombre: {userData?.name}</Text>
          </View>
          <Text></Text>
          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Username: {userData?.username}</Text>
          </View>
          <Text></Text>

          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Email: {userData?.email}</Text>
          </View>
          <Text></Text>

          {/* <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Telefono: {userData?.phoneNumber}</Text>
          </View>
          <Text></Text> */}

          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Genero: {userData?.gender}</Text>
          </View>
          <Text></Text>
        </> :
        <>
          <TextInputComponent placeholderText='Nombre' action={setName} value={name} isPassword={false} verified={false} />
          <Text></Text>
          {/* <TextInputComponent placeholderText='Usuario' action={setUsername} value={username} isPassword={false} verified={false} />
          <Text></Text> */}
          <TextInputComponent placeholderText='Correo E.' action={setEmail} value={email} isPassword={false} verified={false} />
          <Text></Text>
          <TextInputComponent placeholderText='Genero' action={setGender} value={gender} isPassword={false} verified={false} />
          <Text></Text>

        </>
      }

      {/* <ButtonComponent title={editarPerfil ? 'Guardar cambios' : 'Editar perfil'} funcion={() => setEditarPerfil(!editarPerfil)} active={true} /> */}

      {(editarPerfil == false)
        ?
        <ButtonComponent title='Editar Perfil' funcion={() => setEditarPerfil(true)} active={true} />
        :
        <ButtonComponent title={datosEditados ? 'guardar cambios' : 'regresar'} funcion={datosEditados ?
          () => ShowAlert({title: 'Edicion de perfil', text: '¿Seguro que deseas guardar cambios?', buttonOk: 'Ok', onConfirm: () => ActualizarPerfil(userData?.idUser), buttonCancel: 'Cancelar', onCancel: () => setEditarPerfil(false)})
          
          :
          () => setEditarPerfil(false)} active={true} />

      }

      {/* const Alert_Editar_Perfil = () =>
    Alert.alert(
      'Editando perfil',
      '¿Seguro que deseas guardar cambios?',
      [
        {
          text: 'Cancel',
          //onPress: () => { },
          onPress: () => setEditarPerfil(false),
          style: 'cancel',
        },
        {
          text: 'Ok',
          //onPress: () => DeleteProfile(),
          //onPress: () => setEditarPerfil(false),
          onPress: () => ActualizarPerfil(userData?.idUser),

          style: 'destructive',
        },
 */}

      <Text></Text>
      {/*
      <ButtonComponent title='Cambiar username' funcion={noFunction} active={false}/>
      <Text></Text>
      <ButtonComponent title='Cambiar password' funcion={noFunction} active={false}/>
      <Text></Text> */}


    </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    width: 250,
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    justifyContent: 'center',
  }
});
