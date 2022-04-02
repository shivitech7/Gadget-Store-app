import React, { useContext, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';
import { globalState } from '../../../App';
import BottomNav from '../BottomNav';
import Header from '../Header';
import { setSelectedTab } from '../../redux/actions/TabActions';

const OrderHistory = ({ navigation, setSelectedTab }) => {

  useEffect(() => {
    navigation.addListener('focus', () => {
      setSelectedTab('OrderHistory')
    });
  }, [setSelectedTab])
  const { itemPurchased } = useContext(globalState);
  console.log('history', itemPurchased)
  return (
    <View style={styles.container}>
      <Header title='Order History' navigation={navigation} />

      <View style={styles.history_container}>
        <ScrollView style={{ width: '100%', paddingVertical: 25 }}>
          <View style={{ width: '100%', paddingBottom: 120 }}>
            {itemPurchased.map((e, i) => {

              return (
                <View key={i} style={styles.Item_container}>
                  <View style={{ width: '70%' }}>
                    <Text style={styles.label}>{e.productName}</Text>
                    <Text style={styles.cost}>${e.cost}</Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Image style={{ resizeMode: 'center' }} width='100%' height='100%' source={e.image} />
                  </View>
                </View>
              )

            })}
          </View>
        </ScrollView>
      </View>

      {/* /* footer----- */}
      <BottomNav navigation={navigation} />
    </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    // alignItems: 'center',
    // justifyContent: 'center'
    // borderWidth:1
  },
  header: {
    //    borderWidth:1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF2FA',
    elevation: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
    // flex:0.15
  },
  history_container: {
    // borderWidth: 1,
    flex: 1,
    backgroundColor: 'white',
    zIndex: -1
  },
  Item_container: {
    flexDirection: 'row',
    // borderWidth: 1,
    height: 100,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 6,
    marginBottom: 10
  },
  label: {
    color: 'black',
    fontWeight: '500'
  },
  cost: {
    color: 'black',
    fontWeight: '500',
    paddingHorizontal: 5
  },
})