import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';

export const AdminAddWaifu = () => {
    const { themeData, dynamicStyles } = useTheme();
    return (
       <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
            <Text style={[dynamicStyles.dynamicText, {fontSize:25}]}>
                Agregar waifu Bv
            </Text>
        </View>
    )
}

/* id_personaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    alias VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    historia TEXT NOT NULL,
    pasatiempo TEXT NOT NULL,
    ocupacion VARCHAR(40) NOT NULL,
    dia INT NOT NULL,
    mes INT NOT NULL,
    edad INT NOT NULL,
    id_especie INT NOT NULL,
    imagen_perfil TEXT NOT NULL,
    FOREIGN KEY (id_especie) REFERENCES Especie (id_especie) */