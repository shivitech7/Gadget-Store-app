import React, { useContext, useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import firestore from '@react-native-firebase/firestore';
import { globalState } from '../../../App';
import BottomNav from '../BottomNav';
import Header from '../Header';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../redux/actions/TabActions.js';

const Profile = ({ navigation, selectedTab, setSelectedTab }) => {
  console.log(selectedTab)

  useEffect(() => {
      navigation.addListener('focus', () => {
          setSelectedTab('Profile')
      });
  }, [setSelectedTab])
  const { user } = useContext(globalState);
  const [userDetails, setUserDetails] = useState('');

  const getUserData = async (id) => {
    const getUser = await firestore().collection('users').doc(id).get();
    // console.log(getUser.data())
    setUserDetails(getUser.data())
    // setUserData(getUser.data())
  }

  // console.log(userData)

  useEffect(() => {
    console.log(user.uid);
    getUserData(user.uid)
  }, [])

  const progress = useDrawerProgress();
  // console.log(progress)
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
    // <Animated.View
    //   style={[
    //     styles.container,
    //     screenStyle
    //   ]}>
    <View style={styles.container}>
      <Header title='Profile' navigation={navigation} />

    { /* Profile section-------- */ }
    <View style={styles.profile_container}>
      <ScrollView style={{ width: '100%', paddingVertical: 25 }}>
        <View style={styles.profile_image_container}>
          <Image style={{ tintColor: 'black' }} source={require('../../constants/images/Profile.png')} />
        </View>
        <View style={styles.user_details_container}>
          <View style={styles.detail_container}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.detail_field}>{userDetails.name}</Text>
          </View>
          <View style={styles.detail_container}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.detail_field}>{user.email}</Text>
          </View>
          <View style={styles.detail_container}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.detail_field, { marginRight: 5 }]}>{userDetails.countryCode}</Text>
              <Text style={styles.detail_field}>{userDetails.phoneNumber}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    
    {/* /* footer----- */ }
    <BottomNav navigation={navigation} />
    </View>
    // </Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    // alignItems: 'center',
    // justifyContent: 'center'
    // borderWidth:1
  },
  // header: {
  //   //    borderWidth:1,
  //   paddingVertical: 25,
  //   paddingHorizontal: 25,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#EEF2FA',
  //   elevation: 16,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20
  //   // flex:0.15
  // },
  button_container: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 50,
  },
  profile_container: {
    // borderWidth: 1,
    flex: 1,
    backgroundColor:'white',
    zIndex:-1
  },
  profile_image_container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    marginBottom: 15
  },
  user_details_container: {
    // borderWidth: 1,
    paddingVertical: 15,
    height: '100%'
  },
  detail_container: {
    // borderWidth: 1,
    paddingHorizontal: 25,
    marginBottom: 20
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '500',
    color: 'black'
  },
  detail_field: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6F737B'
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