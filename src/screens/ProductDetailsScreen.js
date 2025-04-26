import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const ProductDetailsScreen = ({route, navigation}) => {
  const {product} = route.params;
  const [selectedSize, setSelectedSize] = useState('Small');
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(product.isFavorite);

  const sizes = ['Small', 'Medium', 'Large'];

  const productImages = [
    product.image,
    'https://www.giva.co/cdn/shop/files/AVNP009_5.jpg?v=1723123861&width=713',
    'https://www.giva.co/cdn/shop/files/AVNP009_2.jpg?v=1723123861&width=713',
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setFavorite(!favorite)}>
          <Icon
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? '#D4AF37' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const slideIndex = Math.round(
              event.nativeEvent.contentOffset.x / width,
            );
            setActiveImageIndex(slideIndex);
          }}>
          {productImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{uri: image}}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.pagination}>
          {productImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === activeImageIndex ? '#D4AF37' : '#CCCCCC',
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This stunning piece features exquisite craftsmanship and premium
            materials. Perfect for special occasions or as an everyday luxury
            piece.
          </Text>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizesContainer}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  {borderColor: selectedSize === size ? '#D4AF37' : '#DDD'},
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text
                  style={[
                    styles.sizeText,
                    {color: selectedSize === size ? '#D4AF37' : '#888'},
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}>
              <Icon name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}>
              <Icon name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>
            ${(parseInt(product.price.substring(1)) * quantity).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width,
    height: 350,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: '#D4AF37',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sizeText: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  totalText: {
    fontSize: 12,
    color: '#888',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  addToCartButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  addToCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
