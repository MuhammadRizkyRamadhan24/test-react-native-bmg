import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import FirstForm from './src/screens/FirstForm';
import SecondForm from './src/screens/SecondForm';
import ConfirmForm from './src/screens/ConfirmForm';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const drawer = () => {
//   return (
//     <Drawer.Navigator
//       drawerStyle={styles.drawer}
//       drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Search" component={Search} />
//       <Drawer.Screen name="EditProfile" component={EditProfile} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="Promo" component={Promo} />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawer: {
//     backgroundColor: 'transparent',
//     width: 324,
//   },
// });

const App = props => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="FirstForm"
            component={FirstForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SecondForm"
            component={SecondForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmForm"
            component={ConfirmForm}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
