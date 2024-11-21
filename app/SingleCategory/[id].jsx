import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Alert , TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useLocalSearchParams , Link} from 'expo-router';

const SingleCategory = () => {
  const [data, setData] = useState([]);

  const {id} = useLocalSearchParams();
  
  useEffect(() => {
    axios
      .get('https://backend.nepalgadgetstore.com/product/')
      .then((response) => {
        setData(response.data.results); 
      })
      .catch((error) => {
        Alert.alert('Error fetching product data:', error);
      });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Categories {id}</Text>
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.productContainer}>
            {data.map((item) => (
              <View style={styles.product} key={item.id}>
                <Link href={`/SingleProduct/${item.id}`} asChild>
                <TouchableOpacity>
                  <Image
                    source={{ uri: `${item.product_img}` }}
                    style={styles.productImage}
                  />
                  <Text style={styles.ProductMainTitle}>{item.description}</Text>
                  <Text>Price: ${item.price}</Text>
                  <Text>Stock: {item.stock}</Text>
                </TouchableOpacity>
                </Link>
              </View>
            ))}
          </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SingleCategory;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FEF3E2',
    marginBottom: 50,
    height: '100%',
  },
  container: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 13,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
    width: '98%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  category: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    width: '48%', // Adjusting width for better spacing
    marginBottom: 15, // Adding space between categories
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#432E54',
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  ProductMainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  product: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -5,
  },
});
