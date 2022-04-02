import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming, Adaptable } from 'react-native-reanimated'
import ProductDetails from '../mainScreens/ProductDetails';
import Products from '../mainScreens/Products';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../redux/actions/TabActions';
import Cart from '../mainScreens/Cart';
import Profile from '../mainScreens/Profile';
import OrderHistory from '../mainScreens/OrderHistory';
import OrderPlaced from '../mainScreens/OrderPlaced';
import PurchaseSuccessful from '../mainScreens/PurchaseSuccessful';
import Search from '../mainScreens/Search';
// import KeyboardAvoidingWrapper from './Components/KeyboardAvoidingWrapper';

const Stack = createNativeStackNavigator();
const MainLayout = ({ navigation, selectedTab, setSelectedTab }) => {
  useEffect(() => {
    navigation.navigate(selectedTab);
  }, [selectedTab])
  const progress = useDrawerProgress();

  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8],)

    const borderRadius = interpolate(progress.value, [0, 1], [1, 20],)

    return {
      transform: [
        {
          scale,
        },
      ],
      borderRadius,
    }
  })
  return (
    <Animated.View
      style={[
        {
          height: '100%',
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'center',
          // backgroundColor: '#EEF2FA',
          backgroundColor: 'white',
          position: 'relative',
          // display: 'flex',
          // width: '100%',
          // paddingVertical: 30
          // borderWidth: 1
        },
        screenStyle
      ]}>

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
          <Stack.Screen name="Home" component={Products} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name='Cart' component={Cart} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='OrderHistory' component={OrderHistory} />
          <Stack.Screen name='OrderPlaced' component={OrderPlaced} />
          <Stack.Screen name='ItemPurchased' component={PurchaseSuccessful} />
          <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
      </View>

    </Animated.View>
  )
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

const styles = StyleSheet.create({
  header: {
    //    borderWidth:1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF2FA',
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
    // flex:0.15
  },
  button_container: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 50,
  },
  button_container: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 50,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    // position: 'relative',
    bottom: 0,
    backgroundColor: '#EEF2FA',
    elevation: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
    // flex: 0.15
  },
  bottom_navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#21262E',
    height: 90,
    borderRadius: 60,
    zIndex: 4,
    elevation: 6
  }
})