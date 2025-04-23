import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CouponScreen = ({ navigation }) => {
  const coupons = [
    {
      id: '1',
      code: 'WELCOME30',
      discount: '30%',
      description: 'Get 30% off on your first purchase',
      expiry: 'Valid until: 31 Dec 2024',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400'
    },
    {
      id: '2',
      code: 'GOLD50',
      discount: '50%',
      description: '50% off on gold jewelry',
      expiry: 'Valid until: 15 Jan 2025',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400'
    },
    {
      id: '3',
      code: 'DIAMOND25',
      discount: '25%',
      description: '25% off on diamond collection',
      expiry: 'Valid until: 28 Feb 2025',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
    }
  ];

  const renderCoupon = (coupon) => (
    <View key={coupon.id} style={styles.couponContainer}>
      <Image source={{ uri: coupon.image }} style={styles.couponImage} />
      <View style={styles.couponContent}>
        <View style={styles.couponHeader}>
          <Text style={styles.discountText}>{coupon.discount} OFF</Text>
          <Text style={styles.codeText}>{coupon.code}</Text>
        </View>
        <Text style={styles.descriptionText}>{coupon.description}</Text>
        <Text style={styles.expiryText}>{coupon.expiry}</Text>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Coupons</Text>
      </View>
      
      <View style={styles.couponsList}>
        {coupons.map(renderCoupon)}
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  couponsList: {
    padding: 20,
  },
  couponContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  couponImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  couponContent: {
    padding: 15,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  expiryText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  copyButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  copyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CouponScreen; 