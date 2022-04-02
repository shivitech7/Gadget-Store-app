import React, { useRef, useState } from 'react'
import { ActivityIndicator, Animated, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import data from '../../constants/onboardingSlidesData.js';
import Paginator from '../Paginator.js';
import OnboardingRenderItem from './OnboardingRenderItem.js';

const Onboarding = ({ navigation }) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    console.log(scrollX)
    const dataRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewCoveragePercentThreshold: 50 }).current
    return (
        <View style={{
            flex: 1,
             backgroundColor: 'black',
            // backgroundColor:'#557B83',
            // backgroundColor: '#7F82E2',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'space-around' }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <OnboardingRenderItem item={item} resizeMode='center' />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                    // bounces={false}
                    onViewableItemsChanged={viewableItemChanged}
                    viewableItemChanged={viewConfig}
                    // scrollEventThrottle={32}
                    ref={dataRef}
                />
                <Paginator scrollX={scrollX} />
            </View>
            <View style={styles.bottomContainer}>
                {/* <View> */}
                <Pressable
                    onPress={() => {
                        navigation.navigate('home');
                    }}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.8 : 1,
                            borderWidth: pressed ? 2 : 1,
                            elevation: pressed ? 2 : 8,
                            // borderColor: pressed ? '#139487' : '#139487',
                            borderColor: pressed ? 'white' : 'white'
                        },
                        styles.Button,
                        {
                            //  backgroundColor: '#139487' 
                            backgroundColor: '#7900FF'
                        }
                    ]}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>Get Started</Text>
                </Pressable>
                {/* </View> */}
                {/* <View> */}
                <Pressable
                    onPress={() => {
                        navigation.navigate('home');
                    }}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.8 : 1,
                            borderWidth: pressed ? 2 : 1,
                            elevation: pressed ? 2 : 8,
                            // borderColor: pressed ? '#4187FF' : '#4187FF',
                            borderColor: pressed ? '#7900FF' : '#7900FF'
                        },
                        styles.Button,
                        { backgroundColor: 'white' }
                    ]}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>Login</Text>
                </Pressable>
                {/* </View> */}
            </View>
        </View >
    )
}

export default Onboarding;

const styles = StyleSheet.create({
    bottomContainer: {
        marginBottom: 41,
        alignItems: 'center',
        flex: 0.6,
        width: '100%',
        // borderWidth: 1,
        paddingHorizontal: 25,
        justifyContent: 'space-between'
    },
    Button: {
        // borderWidth: 1,
        // borderColor: 'white',
        width: '100%',
        alignItems: 'center',
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '700',
        marginRight: 5
    }
})