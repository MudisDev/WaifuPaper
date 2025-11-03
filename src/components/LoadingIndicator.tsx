import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
/* import { dynamicStylesAppTheme } from '../Theme/DynamicAppTheme';
import { ThemeContext } from '../Context/ThemeContext';
import { stylesAppTheme } from '../Theme/AppTheme';
import { TitleComponent } from './TitleComponent'; */

export const InitialLoadingIndicator = () => {

    //const context = useContext(ThemeContext); // Obtiene el contexto
    //const themeData = context?.themeData; // Obtiene themeData del contexto
    // Genera los estilos dinámicos pasando themeData
    //const dynamicStyles = dynamicStylesAppTheme(themeData);

    /* if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    } */

    return (
        <View
            style={[
                //dynamicStyles.dynamicScrollViewStyle,
                //stylesAppTheme.scrollViewStyle,
                styles.fondo,
            ]}
        >
            {/* <TitleComponent title='AnimeBox' /> */}
           {/*  <Text style={stylesAppTheme.titleScreen}>AnimeBox</Text> */}

            <View style={{ marginTop: 30 }}>
                <ActivityIndicator size={60} color={"black"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fondo: {
        height: "100%",
        paddingTop: 260,
    },
});


