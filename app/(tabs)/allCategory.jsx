import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ScrollView ,Pressable, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, Link } from 'expo-router';
import { useNavigation } from 'expo-router';

const AllCategory = () => {
  const [data, setData] = useState([]);
  const router = useRouter()
  const navigation = useNavigation();

  
  useEffect(() => {
    axios
      .get('https://backend.nepalgadgetstore.com/category')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Categories</Text>
        <ScrollView>
          <View style={styles.imagesContainer}>
            {data.map((item) => (
              <View style={styles.image} key={item.id}>
                <Link href={`/SingleCategory/${item.id}`} asChild>
                <TouchableOpacity>
                <ImageBackground
                  source={{ uri: `https://backend.nepalgadgetstore.com/${item.category_img}` }}
                  style={styles.productImage}
                >
                  <Text style={styles.ProductMaintitle}>{item.category_name}</Text>
                </ImageBackground>
                </TouchableOpacity>
                </Link>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  image: {
    width: '48%', 
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#493628',
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  ProductMaintitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
});
