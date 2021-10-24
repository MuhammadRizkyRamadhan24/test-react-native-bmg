import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import FirstForm from './src/screens/FirstForm';
import SecondForm from './src/screens/SecondForm';
import ConfirmForm from './src/screens/ConfirmForm';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import ItemDetail from './src/screens/MovieDetail'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const drawer = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      op
      screenOptions={{
        drawerActiveTintColor: '#FF7314',
        drawerInactiveTintColor: '#393534',
        headerShown: false
      }}
      
      >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
};

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
          <Stack.Screen
            name="Dashboard"
            component={drawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MovieDetail"
            component={ItemDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
