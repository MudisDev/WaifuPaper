import { StyleSheet } from "react-native"
import { useContext } from "react"
import { ThemeContext, ThemeData } from "../context/ThemeContext"


export const dynamicStylesAppTheme = (themeData: ThemeData) => {

    return StyleSheet.create({
        dynamicScrollViewStyle: {
            backgroundColor: themeData.fondo,
        },

        dynamicMainContainer: {
            backgroundColor: themeData.contenedorPrincipal,
        },

        dynamicViewContainer: {
            backgroundColor: themeData.vistas,
        },
        dynamicText: {
            color: themeData.texto,
        },
        dynamicBorder: {
            borderColor: themeData.texto,
            borderWidth: 1,
        },
        dynamicButton: {
            backgroundColor: themeData.contenedorPrincipal,
        }
    })
}