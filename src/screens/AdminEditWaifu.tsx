import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../hooks/UseTheme';
import { stylesAppTheme } from '../theme/AppTheme';

export const AdminEditWaifu = () => {
     const { themeData, dynamicStyles } = useTheme();
        return (
           <View style={[stylesAppTheme.container, dynamicStyles.dynamicScrollViewStyle]}>
                <Text style={[dynamicStyles.dynamicText, {fontSize:25}]}>
                    Editar waifu Bv
                </Text>
            </View>
        )
}
