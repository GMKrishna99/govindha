import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WishlistScreen = ({ navigation }) => {
  const [wishlistItems, setWishlistItems] = React.useState([
    { 
      id: '2', 
      name: 'Gold Ring', 
      price: '$599', 
      image: 'https://www.gehnaindia.com/_next/image?url=https%3A%2F%2Fcdn-images.gehnaindia.com%2Fproducts%2Fwebsite_picture3s%2F000%2F014%2F547%2Foriginal%2FGHDICSRG-6039_3.jpg%3F1696492216&w=3840&q=75',
    },
    { 
      id: '5', 
      name: 'Earrings', 
      price: '$499', 
      image: 'https://www.sasitrends.com/cdn/shop/products/Matt-Gold-Plated-AD-Peaock-Pearl-Earrings.jpg?v=1690802666&width=1080',
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const renderWishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <View style={styles.productInfo}>
        <Image source={{uri:item.image}} style={styles.productImage} resizeMode="cover" />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="cart-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Icon name="trash-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.wishlistList}
        />
      ) : (
        <View style={styles.emptyWishlistContainer}>
          <Icon name="heart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyWishlistText}>Your wishlist is empty</Text>
          <TouchableOpacity 
            style={styles.exploreBrowseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreBrowseText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  wishlistList: {
    padding: 20,
  },
  wishlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  productDetails: {
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  removeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyWishlistText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    marginBottom: 30,
  },
  exploreBrowseButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  exploreBrowseText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WishlistScreen;