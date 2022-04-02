import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <View style={{
                width: '100%',
                height: 40,
                // backgroundColor: '#21262E',
                backgroundColor: '#7900FF',
                // backgroundColor:'white',
                position: 'absolute',
                bottom: 0,
                elevation: 6,
            }}>

            </View>
            <View style={styles.bottom_navigation}>
                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        elevation: pressed ? 14 : 16
                    },
                ]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image style={{ tintColor: '#EEF2FA', resizeMode: 'center', height: 24 }} source={require('../constants/images/Home.png')} />
                </Pressable>

                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        elevation: pressed ? 20 : 16
                    },
                ]}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Image style={{ tintColor: '#EEF2FA', resizeMode: 'center', height: 24 }} source={require('../constants/images/Search.png')} />
                </Pressable>

                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        elevation: pressed ? 20 : 16
                    },
                ]}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Image style={{ tintColor: '#EEF2FA', resizeMode: 'center', height: 24 }} source={require('../constants/images/Profile.png')} />
                </Pressable>

                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        elevation: pressed ? 20 : 16
                    },
                ]}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Image style={{ tintColor: '#EEF2FA', resizeMode: 'center', height: 24 }} source={require('../constants/images/Shop.png')} />
                </Pressable>
            </View>
        </View>
    )
}

export default BottomNav;

const styles = StyleSheet.create({
    button_container: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 50,
        backgroundColor: '#7900FF',
    },
    footer: {
        position: 'absolute',
        width: '100%',
        // position: 'relative',
        bottom: 0,
    },
    bottom_navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: '#21262E',
        backgroundColor: '#7900FF',
        // backgroundColor: '#139487',
        height: 90,
        borderRadius: 60,
        zIndex: 4,
        elevation: 10,
        shadowColor: 'black',
    }
})