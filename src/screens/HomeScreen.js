import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const categories = [
    {
      id: '1',
      name: 'Rings',
      icon: 'https://www.giva.co/cdn/shop/collections/pink_rings_c356f6b3-6547-4e39-9b08-dfdf5ecfc2b0.jpg?v=1742651416',
    },
    {
      id: '2',
      name: 'Necklaces',
      icon: 'https://www.giva.co/cdn/shop/collections/sets_pink.webp?v=1742651410',
    },
    {
      id: '3',
      name: 'Earrings',
      icon: 'https://www.giva.co/cdn/shop/collections/earrings_pink-min.png?v=1742651478',
    },
    {
      id: '4',
      name: 'Bracelets',
      icon: 'https://www.giva.co/cdn/shop/collections/pink_br-min.png?v=1742651417',
    },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Diamond Pendant',
      price: '$899',
      image: 'https://manubhai.in/SocialMedia/post_artworks/AE05136.jpg',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Gold Ring',
      price: '$599',
      image:
        'https://www.caratlane.com/blog/wp-content/uploads/2023/10/2B-14.jpg',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Pearl Necklace',
      price: '$799',
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      isFavorite: false,
    },
  ];

  const newArrivals = [
    {
      id: '4',
      name: 'Silver Bracelet',
      price: '$299',
      image:
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400',
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Ruby Earrings',
      price: '$499',
      image:
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400',
      isFavorite: true,
    },
    {
      id: '6',
      name: 'Sapphire Ring',
      price: '$699',
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      isFavorite: false,
    },
  ];

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Categories', {category: item})}>
      <View style={styles.categoryIconContainer}>
        <Image
          source={{uri: item.icon}}
          style={{height: '100%', width: '100%'}}
        />
        {/* <Icon name={item.icon} size={24} color="#D4AF37" /> */}
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <View style={styles.productImageContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={item.isFavorite ? '#D4AF37' : '#888'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, User</Text>
          <Text style={styles.subGreeting}>Find your perfect jewelry</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Coupons')}>
            <Icon name="gift-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/02/92/56/91/360_F_292569116_Phht4uRj1YIuLFgBhrLu8171npBOcJcr.jpg',
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>30% OFF</Text>
          <Text style={styles.bannerSubtitle}>On selected items</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={featuredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={newArrivals}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  bannerContainer: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  viewAllText: {
    fontSize: 14,
    color: '#D4AF37',
  },
  productsList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  productItem: {
    width: 160,
    marginHorizontal: 5,
  },
  productImageContainer: {
    width: 160,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
});

export default HomeScreen;
