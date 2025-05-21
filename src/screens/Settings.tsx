import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserContext'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme'
import { ThemeContext, ThemeData } from '../context/ThemeContext'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorPaletteTheme } from '../theme/ColorPaletteTheme'
import RNPickerSelect from 'react-native-picker-select';
import { ButtonComponent } from '../components/ButtonComponent'
import { delete_profile } from '../const/UrlConfig'

export const Settings = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext) || { setUserData: () => { } }; // Maneja el caso de que el contexto no esté definido


  const noFunction = () => { }




  const [temaClaro, setTemaClaro] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('claro00'); // Estado para el tema seleccionado en el picker


  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;



  if (!themeData || !setThemeData) {
    return null;
  }

  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  const saveTheme = async (theme: ThemeData) => {
    try {
      await AsyncStorage.setItem("themeColors", JSON.stringify(theme));
      console.log("Theme saved!");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const handleThemeChange = (themeName: string) => {
    const newTheme = ColorPaletteTheme(themeName); // Obtén el tema basado en el nombre
    if (newTheme) {
      setThemeData(newTheme); // Actualiza el contexto solo si es válido
      setSelectedTheme(themeName); // Actualiza el estado del picker
      saveTheme(newTheme); // Guarda el tema en almacenamiento
    } else {
      console.error(`Theme "${themeName}" not found.`);
    }
  };

  const DeleteProfile = async () => {
    try {
      //const response = await fetch(`http://localhost/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
      //const response = await fetch(`http://192.168.18.5/nekopaper/api/usuario/iniciar_sesion.php?username=${username}&password=${password}`);
      const response = await fetch(`${delete_profile}?id_usuario=${userData?.idUser}`);
      const data = await response.json();
      // Retorna los datos para ser usados en el componente
      console.log(data);

      const user = data[0];
      console.log(`user -> ${user}`);
      console.log(`userIsArray -> ${Array.isArray(user)}`);

      if (data.Error) {
        console.log("Error al eliminar la cuenta");
      }
      else if (data.Success) {
        navigation.navigate("LogIn");
        console.log("Success, cuenta eliminada correctamente");
      }
      else if (data.Warning) {
        console.log("Warning, no se elimino la cuenta");
      }


    } catch (e) {
      console.error(`error: ${e}`);
    }
  }


  return (
    <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
      <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]}>Settings Screen Bv</Text>
      <Text></Text>
      {/* <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={() => navigation.navigate("DevTool")}>
        <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]} >DevTool Bv</Text>
      </TouchableOpacity> */}

      {(userData?.idUser == 1) ?
        <ButtonComponent title='DevTool Bv' funcion={() => navigation.navigate("DevTool")} active={true} />
        :
        <ButtonComponent title='DevTool Bv' funcion={() => navigation.navigate("DevTool")} active={false} />
      }



      <Text></Text>
      <ButtonComponent title='Cerrar sesion' funcion={() => { setUserData(null); navigation.navigate('LogIn'); }} active={true} />

      {/* <TouchableOpacity style={[stylesAppTheme.button, dynamicStyles.dynamicViewContainer]} onPress={() => { setUserData(null); navigation.navigate('LogIn'); }}>
        <Text style={[stylesAppTheme.textButton, dynamicStyles.dynamicText]}>Cerrar Sesion</Text>
      </TouchableOpacity> */}
      <Text></Text>

      <ButtonComponent title='eliminar cuenta' funcion={DeleteProfile} active={true} />

      <Text></Text>
      <Text></Text>
      <Text></Text>

      <View
        style={[stylesAppTheme.pickerContainer, dynamicStyles.dynamicViewContainer, { borderColor: themeData.contenedorPrincipal }]}
      >
        <RNPickerSelect
          placeholder={{
            label: 'Selecciona un estado...',
            value: null, // Esto asegura que no se seleccione ninguna opción inicialmente
            color: themeData.texto,
          }}
          onValueChange={(value) => {
            setSelectedTheme(value); // Actualiza el tema seleccionado en el estado
            handleThemeChange(value); // Llama a la función para cambiar el tema
          }}
          value={selectedTheme} // El valor actual del picker
          items={[
            { label: 'Light Clásico', value: 'claro00' },
            { label: 'Light Coralina del Amanecer', value: 'claro01' },
            { label: 'Light Pasión Eterna', value: 'claro02' },
            { label: 'Light Futuro Brillante', value: 'claro03' },
            { label: 'Light Magia Celestial', value: 'claro04' },
            { label: 'Light Destello Solar', value: 'claro05' },
            { label: 'Light Tormenta Eterna', value: 'claro06' },
            { label: 'Light Acero de los Titanes', value: 'claro07' },
            { label: 'Light Vida Eterna', value: 'claro08' },
            { label: 'Light Encanto Kawaii', value: 'claro09' },
            { label: 'Light Nostalgia Épica', value: 'claro10' },

            { label: 'Dark Clásico', value: 'oscuro00' },
            { label: 'Dark Sombras Cibernéticas', value: 'oscuro01' }, // Tema: Eco Metálicos del Silencio
            { label: 'Dark Cyberpunk, caos urbano', value: 'oscuro02' }, // Tema: Sueños Cyberpunk de Neon
            { label: 'Dark Cielo Nocturno del Caos', value: 'oscuro03' }, // Tema: Noche Estrellada del Enigma
            { label: 'Dark Luz del Abismo Esmeralda', value: 'oscuro04' }, // Tema: Luz del Abismo Verde
            { label: 'Dark Elegancia Sombría', value: 'oscuro05' }, // Tema: Elegancia Sombría
            { label: 'Dark Aguas Abisales', value: 'oscuro06' }, // Tema: Aguas Misteriosas
            { label: 'Dark Eclipse de Destrucción', value: 'oscuro07' }, // Tema: Eclipse de Pasión
            { label: 'Dark Reino de los Espíritus Olvidados', value: 'oscuro08' }, // Tema: Reino de los Espíritus
            { label: 'Dark Fuego del Inframundo', value: 'oscuro09' }, // Tema: Fuego del Inframundo
            { label: 'Dark Cenizas de Ruinas Ancestrales', value: 'oscuro10' }, // Tema: Cenizas de la Ruina
          ]}
          style={{
            inputIOS: {
              backgroundColor: themeData.contenedorPrincipal, // Color de fondo en iOS
              color: themeData.texto, // Color del texto seleccionado en iOS
              padding: 10, // Espaciado interno
              borderRadius: 5, // Bordes redondeados
            },
            inputAndroid: {
              color: themeData.texto, // Color del texto seleccionado en Android

            },
            inputAndroidContainer: {
              backgroundColor: "red", // Fondo del contenedor desplegable
            },
            placeholder: {
              color: themeData.texto, // Color del texto del placeholder
            },
          }}
        />
        <Ionicons name='chevron-down-outline' size={15} color={themeData.texto}
          style={{
            position: 'absolute',
            right: 20,
            top: 15,
            backgroundColor: themeData.vistas,
            padding: 5,
            //transform: [{ translateY: -40, }],
          }}
        />
      </View>


    </View>
  )
}
