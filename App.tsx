import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import { LogIn } from './src/screens/LogIn';

import Constants from 'expo-constants';
//import { Platform, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigators/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/UserContext';
import { ThemeContext, ThemeProvider } from './src/context/ThemeContext';
import { useContext } from 'react';
import { dynamicStylesAppTheme } from './src/theme/DynamicAppTheme';
import { useTheme } from './src/hooks/UseTheme';


export default function App() {
  return (

    <ThemeProvider>
      <UserProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProvider>
    </ThemeProvider>

  );
}

const AppContent = () => {
  // Accede al contexto de tema y maneja el caso de que pueda ser undefined
  const context = useContext(ThemeContext);
  const { themeData, dynamicStyles } = useTheme();


  // Maneja el caso en que el contexto puede ser undefined
  if (!context) {
    return null; // O muestra una pantalla de carga si es necesario
  }

  //const { themeData } = context;

  if (!themeData) {
    return null; // Si el tema aún no está disponible, puedes manejarlo aquí
  }

  // Determina el estilo de la StatusBar en función de si es un tema oscuro o claro
  const statusBarStyle = themeData.isDarkMode ? 'light' : 'dark';

  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <>
      {/* Vista debajo de la barra de estado para aplicar color de fondo */}
      <View style={[{ height: statusBarHeight, }, dynamicStyles.dynamicScrollViewStyle]} />
      <StatusBar style={statusBarStyle} />
      <StackNavigator />
    </>
  );
};