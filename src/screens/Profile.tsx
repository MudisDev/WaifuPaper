import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { UserContext } from '../context/UserContext'
import { useTheme } from '../hooks/UseTheme'
import { ButtonComponent } from '../components/ButtonComponent'


export const Profile = () => {

  const { themeData, dynamicStyles } = useTheme();

  const { userData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

  const [editarPerfil, setEditarPerfil] = useState<boolean>(false);


  const noFunction = () => { }

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
        <></>
      }
      {(editarPerfil == false) ?
        <ButtonComponent title='Editar perfil' funcion={() => setEditarPerfil(true)} active={true} />
        :
        <ButtonComponent title='Guardar Cambios' funcion={() => setEditarPerfil(false)} active={true} />
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
