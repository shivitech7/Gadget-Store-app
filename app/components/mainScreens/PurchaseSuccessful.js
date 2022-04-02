import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const PurchaseSuccessful = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={{color:'black'}}>Your Order Has been successfuly placed !</Text>
            <Pressable
                style={({ pressed }) => [
                    styles.orderSuccess,
                    {
                        opacity: pressed ? 0.6 : 1,
                        elevation: pressed ? 1 : 3,
                    },
                ]}
                onPress={() => navigation.popToTop()}><Text style={{ color: 'blue', fontSize: 16, fontWeight: '700' }}>Back to home</Text></Pressable>

        </View>
    )
}

export default PurchaseSuccessful;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    orderSuccess: {
        backgroundColor: 'white',
        marginTop: 10
    }
})