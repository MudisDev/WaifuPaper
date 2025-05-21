import React, { useContext } from 'react'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme';
import { defaultTheme, ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData || defaultTheme;

    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData || defaultTheme);

    if (!context) {
        console.warn("ThemeContext no está disponible");
        return { themeData: defaultTheme, dynamicStyles: dynamicStylesAppTheme(defaultTheme) };
    }

    return { themeData, dynamicStyles/* , setThemeData */ }
}
