import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';

export const AdminWallpapers = () => {
    const { themeData, dynamicStyles } = useTheme();
       return (
          <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
               <Text style={[dynamicStyles.dynamicText, {fontSize:25}]}>
                   Administrar Wallpapers Bv
               </Text>
           </View>
       )
}
