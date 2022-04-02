import React from 'react'
import { View, useWindowDimensions, StyleSheet, Image, Text } from 'react-native'

const OnboardingRenderItem = ({ item}) => {
    const { width } = useWindowDimensions()
    
    // console.log({item, resizeMode})
    return (
        <View style={[styles.container, { width: width}]}>
           <Image style={{ width:350, height:250, marginTop:50, resizeMode:'contain'}} source={item.image} />
           {/* <Image style={{  marginTop:50, resizeMode:'cover',marginLeft:50 */}
            {/* //  width: imageWidth && imageWidth, height: imageHeight && imageHeight */}
            {/* }} */}
              {/* source={item.image} />  */}
           <View>
               <Text style={styles.title}>
                   {item.title}
               </Text>
           </View>
        </View>
    )
}

export default OnboardingRenderItem;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        // borderWidth: 1,
        paddingHorizontal: 20,
        // paddingTop: 140,
        alignItems:'center',
        justifyContent:'space-around'
    },
    title:{
        fontSize:38,
        fontWeight:'700',
        color:'white',
        textAlign:'center'
    }
})