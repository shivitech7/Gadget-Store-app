/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, createContext, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Onboarding from './app/components/onboarding/Onboarding';
import Home from './app/components/Home';
import Signup from './app/components/Signup';
import Login from './app/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpScreen from './app/components/OtpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from './app/components/mainScreens/Products';
import ProductDetails from './app/components/mainScreens/ProductDetails';
import CustomDrawer from './app/components/drawerNavigation/CustomDrawer';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store/ConfigureStore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const store = configureStore()
const Stack = createNativeStackNavigator();
export const globalState = createContext();


const App = () => {

  // const [logedin, setLogedin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [cartData, setCartData] = useState([]);
  const [itemPurchased, setItemPurchased] = useState([]);
  const [cartBill, setCartBill] = useState(0);

  function onAuthStateChanged(user) {
    setUser(user);
    console.log('user.........', user)

    setLoading(false);

  }

  useEffect(() => {
    setLoading(true)
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [])

  if (loading == true) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 21, fontWeight: '700', color: 'black' }}>Loading...</Text>
      </View>)
  }

  return (

    <Provider store={store}>
      <NavigationContainer>
        <globalState.Provider value={{
          // logedin: logedin, setLogedin: setLogedin, 
          cartBill: cartBill, setCartBill: setCartBill,
          cartData: cartData, setCartData: setCartData, user: user, setUser: setUser, itemPurchased: itemPurchased, setItemPurchased: setItemPurchased
        }}>
          <Stack.Navigator
            // initialRouteName="onBording"
            screenOptions={{
              headerShown: false,
            }}
          >
            {user != null ?
              (
                <>
                  <Stack.Group>
                    <Stack.Screen name='drawer' component={CustomDrawer} />
                  </Stack.Group>
                </>
              ) :
              (
                <>
                  <Stack.Screen name="onBording" component={Onboarding} />
                  <Stack.Screen name='home' component={Home} />
                  <Stack.Screen name='login' component={Login} />
                  <Stack.Screen name='signup' component={Signup} />
                  <Stack.Screen name='otp' component={OtpScreen} />
                </>
              )
            }


          </Stack.Navigator>
        </globalState.Provider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,

  },
});

export default App;
