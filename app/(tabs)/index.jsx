import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Index() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  
  useEffect(() => {
    axios
      .get('https://backend.nepalgadgetstore.com/category')
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://backend.nepalgadgetstore.com/product/')
      .then((response) => {
        setProduct(response.data.results); 
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search/[query]', 
        params: { query: searchQuery },
      });
    } else {
      alert('Please enter a product name to search.');
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.wrapper}>
      
      <View style={styles.container}>
        <TextInput
          placeholder="Search Products"
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch} 
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>All Categories</Text>
          <View style={styles.categoryContainer}>
            {data.map((item) => (
              <Pressable
                style={styles.category}
                key={item.id}
                onPress={() => router.push("/components/pages/category1")}
              >
                <Text style={styles.categoryText}>{item.category_name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

      
        <View style={styles.container}>
          <Text style={styles.headerText}>Featured Products</Text>
          <View style={styles.productContainer}>
            {product.map((item) => (
              <Pressable style={styles.product} key={item.id}>
                <Image
                  source={{ uri: `${item.product_img}` }}
                  style={styles.productImage}
                />
                <Text style={styles.ProductMainTitle}>{item.description}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Stock: {item.stock}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
