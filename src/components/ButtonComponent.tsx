import React, { useContext } from 'react'
import { View, Text, TextStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { stylesAppTheme } from '../theme/AppTheme'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme'
import { ThemeContext } from '../context/ThemeContext'

interface ButtonComponentProps {
    title: string;
    funcion: () => void;
    active: boolean,
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, funcion, active }) => {

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto

    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);

    const additionalStylesTouchableOpacity: TextStyle = {
        backgroundColor: active ? themeData.texto : themeData.vistas,
        borderColor: active ? themeData.texto : themeData.texto,
        borderRadius: 15,
        width: 180,
        height: 30,
        alignItems: 'center',
        justifyContent:'center',
    }

    const additionalStylesText: TextStyle = {
        color: active ? themeData.fondo : themeData.texto,
    }

    return (
            <TouchableOpacity style={[ additionalStylesTouchableOpacity]}
                onPress={active ? funcion : undefined}
                disabled={!active}
            >
                <Text style={[additionalStylesText, stylesAppTheme.textButton]}>{title}</Text>
            </TouchableOpacity>


    )
}   
