import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AdminAddWaifu } from '../screens/AdminAddWaifu';
import { AdminEditWaifu } from '../screens/AdminEditWaifu';
import { AdminWallpapers } from '../screens/AdminWallpapers';
import { useTheme } from '../hooks/UseTheme';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tabs = createMaterialTopTabNavigator();

export function TopTabNavigator() {

    const { themeData, dynamicStyles } = useTheme();

    return (
        <Tabs.Navigator

            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'AdminAddWaifu') {
                        iconName = focused ? 'person-add' : 'person-add-outline'; // Cambia el icono según si está enfocado o no
                    } else if (route.name === 'AdminEditWaifu') {
                        iconName = focused ? 'create' : 'create-outline'; // Cambia el icono según si está enfocado o no
                    }
                    else if (route.name === 'AdminWallpapers') {
                        iconName = focused ? 'images' : 'images-outline'; // Cambia el icono según si está enfocado o no
                    }

                    // Retorna el ícono correspondiente de Ionicons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: themeData.texto,  // Cambia el color del ícono cuando la pestaña está activa
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: themeData.fondo },

                tabBarShowLabel: false,

            }
            )}


        >
            <Tabs.Screen name="AdminAddWaifu" component={AdminAddWaifu} options={{ tabBarLabel: 'Add Waifu' }} />
            <Tabs.Screen name="AdminEditWaifu" component={AdminEditWaifu} options={{ tabBarLabel: 'Edit Waifu' }} />
            <Tabs.Screen name="AdminWallpapers" component={AdminWallpapers} options={{ tabBarLabel: 'Wallpapers' }} />

        </Tabs.Navigator>
    );
}
