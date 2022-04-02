import React from 'react'
import { Image, Pressable, StyleSheet, View, Text } from 'react-native'

const Header = ({ title, navigation }) => {

    return (
        <View style={styles.header}>
            <Pressable style={({ pressed }) => [
                styles.button_container,
                {
                    opacity: pressed ? 0.6 : 1,
                    borderWidth: pressed ? 6 : 4,
                    borderColor: pressed ? '#7900FF' : '#7900FF',
                    elevation: pressed ? 14 : 8,
                },
                { 
                    // backgroundColor: '#EEF2FA' 
                    backgroundColor:'white'
            }
            ]}
                onPress={() => title == 'Home' ? navigation.openDrawer() : navigation.goBack()}>
                {title == 'Home' ?
                    <Image style={{ tintColor: '#7900FF', resizeMode: 'center', height: 15 }} source={require('../constants/images/Menu.png')} />
                    :
                    <Image style={{ tintColor: '#7900FF', resizeMode: 'contain', height: 15 }} source={require('../constants/images/BackArrow.png')} />}

            </Pressable>
            <View style={{ width: 160, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '700', color: 'black' }}>{title}</Text>
            </View>
            <Pressable style={({ pressed }) => [
                styles.button_container,
                {
                    opacity: pressed ? 0.6 : 1,
                    elevation: pressed ? 14 : 8,
                },
                {
                    backgroundColor: 'white',
                }
            ]}>
                <Image style={{ tintColor: '#7900FF', resizeMode: 'center', height: 20 }} source={require('../constants/images/Settings.png')} />
            </Pressable>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        //    borderWidth:1,
        paddingVertical: 25,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#EEF2FA',
        backgroundColor:'white',
        elevation: 16,
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
    }
})