import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View, Animated } from 'react-native'
import slides from '../constants/onboardingSlidesData.js';


const Paginator = ({ scrollX }) => {
    console.log(scrollX)
    const { width } = useWindowDimensions();
    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {slides.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return (
                    <Animated.View
                        style={[
                            styles.dot,
                            // { width: 10 }
                            { width: dotWidth, opacity }
                        ]} key={i.toString()} />

                )
            })}
        </View>
    )
}

export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        // backgroundColor: '#4187FF',
        backgroundColor:'white',
        marginHorizontal: 8,
        // borderWidth:1
    }
})