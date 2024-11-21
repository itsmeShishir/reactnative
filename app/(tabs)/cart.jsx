import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
  return (
    <SafeAreaView style={styles.wrapper}>
        <Text style={styles.headerText}>Cart Page</Text>
        <ScrollView style={styles.scrollView}>
            <View style={styles.productContainer}>
                <Text style={styles.headerTextProduct}>Products</Text>
                <View style={styles.productList}>
                  <View style={styles.Singleproduct}>
                    <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.productImage} />
                    <View style={styles.productPrice}>
                    <Text style={styles.productName}>Product Name</Text>

                      <Text style={styles.productPriceText}>400$ </Text>
                    </View>
                    <View style={styles.productPrice}>
                    <Text style={styles.productPriceText}>1 </Text>
                    </View>
                  </View>
                  <View style={styles.Singleproduct}>
                    <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.productImage} />
                    <View style={styles.productPrice}>
                    <Text style={styles.productName}>Product Name</Text>

                      <Text style={styles.productPriceText}>400$ </Text>
                    </View>
                    <View style={styles.productPrice}>
                    <Text style={styles.productPriceText}>1 </Text>
                    </View>
                  </View>
                  <View style={styles.Singleproduct}>
                    <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.productImage} />
                    <View style={styles.productPrice}>
                    <Text style={styles.productName}>Product Name</Text>

                      <Text style={styles.productPriceText}>400$ </Text>
                    </View>
                    <View style={styles.productPrice}>
                    <Text style={styles.productPriceText}>1 </Text>
                    </View>
                  </View>
                
                </View>
            </View>
        </ScrollView>  
        <View>
          <Text>Total</Text>
          <Text>1200 </Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FEF3E2',
    marginBottom: 60,
    height: '100%',
  },
  headerText:{
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  productImage:{
    width: 70,
    height: 50,
    objectFit: 'contain',
    borderRadius: 10,
    marginBottom: 10
  },
  scrollView:{
    padding: 20,
    backgroundColor: '#FEF3E2',
    height: '100%',
  },
  productContainer: {
    marginBottom: 20,
    borderBottomColor: '#555',
    borderBottomWidth: 3,
    paddingBottom: 20,
  },
  headerTextProduct:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    maerginBottom: 20
  },
  productList:{
    flexDirection: 'column',
    marginBottom: 20
  },
  Singleproduct:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  productName:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  productPrice:{
    flexDirection: 'column',
    marginBottom: 10,
    marginRight: 60
  },
  productPriceText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    marginBottom: 300
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  }


})