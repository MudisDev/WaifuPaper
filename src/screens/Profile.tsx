import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { UserContext } from '../context/UserContext'
import { useTheme } from '../hooks/UseTheme'
import { ButtonComponent } from '../components/ButtonComponent'
import { TextInputComponent } from '../components/TextInputComponent'
import { update_profile } from '../const/UrlConfig'
import { ShowAlert } from '../helpers/ShowAlert'
import { useFetch } from '../hooks/useFetch'

interface interfaceActualizarPerfil {
  id_usuario: string,
  nombre: string,
  username: string,
  password: string,
  genero: string,
}

export const Profile = () => {

  const { dynamicStyles } = useTheme();

  const { userData, setUserData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido

  const [editarPerfil, setEditarPerfil] = useState<boolean>(false);
  const [datosEditados, setDatosEditados] = useState<boolean>(false);

  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [genero, setGenero] = useState<string>("");

  const { fetchData: fetchActualizarPerfil } = useFetch<interfaceActualizarPerfil>({ endpoint: update_profile, metodo: 'PUT' });

  useEffect(() => {

    if (editarPerfil) {
      setNombre(userData?.nombre || "");
      //setUsername(userData?.username || "");
      setEmail(userData?.email || "");
      setGenero(userData?.genero || "");
    }

  }, [editarPerfil, userData])

  useEffect(
    () => {
      if (userData?.nombre !== nombre || userData?.email !== email || userData?.genero !== genero) {
        setDatosEditados(true);
      }
      else {
        setDatosEditados(false);
      }

    }, [nombre, email, genero]
  )


  const actualizarPerfilUsuario = async () => {
    try {

      const datosUsuario = {
        id_usuario: userData?.id_usuario,
        nombre: nombre,
        email: email,
        genero: genero,
      }

      const respuesta = await fetchActualizarPerfil(datosUsuario);

      if (respuesta.Success) {
        setUserData({ ...userData, nombre: nombre, email: email, genero: genero })
        ShowAlert({ title: 'Success', text: 'Perfil actualizado con éxito', buttonOk: 'Ok', onConfirm: () => void {} })
      } else if (respuesta.Warning) {
        ShowAlert({ title: 'Warning', text: 'El perfil no se actualizo', buttonOk: 'Ok', onConfirm: () => void {} })
      }
      else if (respuesta.Error) {
        ShowAlert({ title: 'Error', text: 'Error al intentar actualizar el perfil', buttonOk: 'Ok', onConfirm: () => void {} })

      }

    } catch (e) {
      console.error(`error: ${e}`);
    }
  }

  return (
    <View style={[{ alignItems: 'center', flex: 1, paddingTop: 90 }, dynamicStyles.dynamicScrollViewStyle]}>
      {(editarPerfil === false) ?
        <>
          <View style={[dynamicStyles.dynamicViewContainer, styles.labelContainer]}>
            <Text style={dynamicStyles.dynamicText}>Nombre: {userData?.nombre}</Text>
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
            <Text style={dynamicStyles.dynamicText}>Genero: {userData?.genero}</Text>
          </View>
          <Text></Text>
        </> :
        <>
          <TextInputComponent placeholderText='Nombre' action={setNombre} value={nombre} isPassword={false} verified={false} />
          <Text></Text>
          <TextInputComponent placeholderText='Correo E.' action={setEmail} value={email} isPassword={false} verified={false} />
          <Text></Text>
          <TextInputComponent placeholderText='Genero' action={setGenero} value={genero} isPassword={false} verified={false} />
          <Text></Text>

        </>
      }

      {(editarPerfil === false)
        ?
        <ButtonComponent title='Editar Perfil' funcion={() => setEditarPerfil(true)} active={true} />
        :
        <ButtonComponent title={datosEditados ? 'guardar cambios' : 'regresar'} funcion={datosEditados ?
          () => ShowAlert({ title: 'Edicion de perfil', text: '¿Seguro que deseas guardar cambios?', buttonOk: 'Ok', onConfirm: () => actualizarPerfilUsuario(), buttonCancel: 'Cancelar', onCancel: () => setEditarPerfil(false) })

          :
          () => setEditarPerfil(false)} active={true} />
      }
      <Text></Text>
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
