import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextComponent, Alert } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext'
import { useTheme } from '../hooks/UseTheme'
import { ButtonComponent } from '../components/ButtonComponent'
import { TextInputComponent } from '../components/TextInputComponent'


export const Profile = () => {

  const { themeData, dynamicStyles } = useTheme();

  const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

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

  }, [editarPerfil])

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
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Ok',
          //onPress: () => DeleteProfile(),
          onPress: () => setEditarPerfil(false),

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

          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Telefono: {userData?.phoneNumber}</Text>
          </View>
          <Text></Text>

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
          () => Alert_Editar_Perfil()
          :
          () => setEditarPerfil(false)} active={true} />

      }

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
