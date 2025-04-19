import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryScreen = ({ navigation }) => {
  const categories = [
    { id: '1', name: 'Rings', icon: 'https://www.brilliance.com/cdn-cgi/image/f=webp,width=1440,height=1440,quality=90/sites/default/files/vue/collections/engagement-rings-diamond_og.jpg', products: 48 },
    { id: '2', name: 'Necklaces', icon: 'https://www.giva.co/cdn/shop/files/PD02819_5.jpg?v=1744290561&width=713', products: 36 },
    { id: '3', name: 'Earrings', icon: 'https://www.giva.co/cdn/shop/files/ER0482.jpg?v=1742391815&width=713', products: 42 },
    { id: '4', name: 'Bracelets', icon: 'https://www.giva.co/cdn/shop/files/BR0800_5_1eafe12b-f156-4da9-85ca-7a1b6ad51def.jpg?v=1742391741&width=713', products: 30 },
    { id: '5', name: 'Anklets', icon: 'https://karatcart.com/cdn/shop/products/66014863_1.jpg?v=1644492877', products: 24 },
    { id: '6', name: 'Pendants', icon: 'https://www.giva.co/cdn/shop/files/PD003_5_edf26ff4-3438-4542-888c-e0d0365aa541.jpg?v=1738940739&width=713', products: 18 },
  ];

  const products = [
    { 
      id: '1', 
      name: 'Diamond Pendant', 
      price: '$899', 
      image:'https://jewelbox.co.in/wp-content/uploads/2023/07/WPE0119-1-1.jpg',
      isFavorite: false,
      category: 'Necklaces'
    },
    { 
      id: '2', 
      name: 'Gold Ring', 
      price: '$599', 
      image: 'https://m.media-amazon.com/images/I/71rdGrKuT5L._AC_UY1100_.jpg',
      isFavorite: true,
      category: 'Rings'
    },
    { 
      id: '3', 
      name: 'Pearl Necklace', 
      price: '$799', 
      image: 'https://ishhaara.com/cdn/shop/files/ishhaara-traditional-cluster-pearl-temple-necklace-set-61690186394595.jpg?v=1716304688',
      isFavorite: false,
      category: 'Necklaces'
    },
    { 
      id: '4', 
      name: 'Silver Bracelet', 
      price: '$299', 
      image: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/bangle-bracelet-armlet/4/c/g/2-4-2-4-na-1-mkbrad376s-myki-original-imagzsh8z2egeeg8.jpeg?q=90&crop=false',
      isFavorite: false,
      category: 'Bracelets'
    },
    { 
      id: '5', 
      name: 'Ruby Earrings', 
      price: '$499', 
      image: 'https://i.etsystatic.com/19446383/r/il/def4d9/2443527825/il_570xN.2443527825_ez8s.jpg',
      isFavorite: true,
      category: 'Earrings'
    },
    { 
      id: '6', 
      name: 'Sapphire Ring', 
      price: '$699', 
      image: 'https://kuveradiamonds.com/wp-content/uploads/2024/02/2.58CT-Ceylon-Natural-Royal-Blue-Sapphire-Diamond-Ring-1.jpg',
      isFavorite: false,
      category: 'Rings'
    },
    { 
      id: '7', 
      name: 'Rose Gold Heart Anklet', 
      price: '$599', 
      image: 'https://www.giva.co/cdn/shop/files/A0028_2_63b68792-399b-42e4-9274-8b13e16bc6a0.jpg?v=1716375832&width=713',
      isFavorite: true,
      category: 'Anklets'
    },
    { 
      id: '8', 
      name: 'Silver Mini Solitaire Pendant with Link Chain', 
      price: '$599', 
      image: 'https://www.giva.co/cdn/shop/files/PD0115_5.jpg?v=1742392521&width=713',
      isFavorite: true,
      category: 'Pendants'
    },
    { 
      id: '9', 
      name: 'Bloom Diamond Pendant', 
      price: '$599', 
      image: 'https://cdn.joyalukkas.in/media/catalog/product/d/s/dsdp00019798_6.jpg?tr=w-175',
      isFavorite: false,
      category: 'Pendants'
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('1');
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    const category = categories.find(cat => cat.id === selectedCategory);
    setFilteredProducts(products.filter(product => product.category === category.name));
  }, [selectedCategory]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        { backgroundColor: selectedCategory === item.id ? '#D4AF37' : '#F5F5F5' }
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image 
        source={{uri:item.icon}}
        style={{height:100,width:200,borderTopLeftRadius:20,borderTopRightRadius:20,marginBottom:10}}
      />
      <Text 
        style={[
          styles.categoryName,
          { color: selectedCategory === item.id ? '#FFF' : '#333' }
        ]}
      >
        {item.name}
      </Text>
      <Text 
        style={[
          styles.productCount,
          { color: selectedCategory === item.id ? '#FFF' : '#888' }
        ]}
      >
        ({item.products})
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.productImageContainer}>
        <Image source={{uri:item.image}} style={styles.productImage} resizeMode="cover" />
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </View>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesList: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom:10,
   
  },
  categoryName: {
    marginBottom:5
  },
  productCount: {
   marginBottom:10
  },
  productsList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productItem: {
    flex: 1,
    margin: 10,
  },
  productImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit:'fill'
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

export default CategoryScreen;