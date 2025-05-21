import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Favorites } from '../screens/Favorites';
import { Search } from '../screens/Search';
import { Settings } from '../screens/Settings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../hooks/UseTheme';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
    const { themeData, dynamicStyles } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'; // Cambia el icono según si está enfocado o no
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'; // Cambia el icono según si está enfocado o no
                    }
                    else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline'; // Cambia el icono según si está enfocado o no
                    }
                    else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline'; // Cambia el icono según si está enfocado o no
                    }
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline'; // Cambia el icono según si está enfocado o no
                    }

                    // Retorna el ícono correspondiente de Ionicons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: themeData.texto ,  // Cambia el color del ícono cuando la pestaña está activa
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: themeData.fondo  },
            
                tabBarShowLabel: false,

            }
            )}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}