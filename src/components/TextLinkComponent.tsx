import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import { useNavigation } from '@react-navigation/native'
import { stylesAppTheme } from '../theme/AppTheme'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme'
import { ThemeContext } from '../context/ThemeContext'

interface TextLinkComponentProps {
    text: string,
    //screenNavigation: (text: string) => void;
    screenNavigation: string,
}

export const TextLinkComponent : React.FC<TextLinkComponentProps> = ({ text, screenNavigation }) => {

    const navigation = useNavigation();

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);
    return (
        <TouchableOpacity style={[stylesAppTheme.buttonLink/* , {backgroundColor: "red"} */]} onPress={() => {navigation.navigate(screenNavigation)}}>
            <Text style={[dynamicStyles.dynamicText, stylesAppTheme.textLink]}>{text}</Text>
        </TouchableOpacity>
    )
}
