import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrdersScreen = ({navigation}) => {
  // Sample order data
  const orders = [
    {
      id: '1',
      orderNumber: '#ORD-2023-001',
      date: 'Oct 15, 2023',
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Diamond Pendant',
          price: '$899',
          image: 'https://manubhai.in/SocialMedia/post_artworks/AE05136.jpg',
        },
        {
          id: '2',
          name: 'Gold Ring',
          price: '$599',
          image:
            'https://www.caratlane.com/blog/wp-content/uploads/2023/10/2B-14.jpg',
        },
      ],
      total: '$1498',
    },
    {
      id: '2',
      orderNumber: '#ORD-2023-002',
      date: 'Nov 2, 2023',
      status: 'Shipped',
      items: [
        {
          id: '3',
          name: 'Pearl Necklace',
          price: '$799',
          image:
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
        },
      ],
      total: '$799',
    },
  ];

  const navigateToOrderTracking = order => {
    navigation.navigate('OrderTracking', {order});
  };

  const renderOrderItem = ({item}) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigateToOrderTracking(item)}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text
          style={[
            styles.orderStatus,
            {color: item.status === 'Delivered' ? '#4CAF50' : '#FFA000'},
          ]}>
          {item.status}
        </Text>
      </View>

      <Text style={styles.orderDate}>{item.date}</Text>

      <View style={styles.orderItems}>
        {item.items.map(product => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{uri: product.image}} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: {item.total}</Text>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigateToOrderTracking(item)}>
          <Text style={styles.trackButtonText}>
            {item.status === 'Delivered' ? 'View Details' : 'Track Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="receipt-outline" size={60} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>
            You haven't placed any orders yet
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIconPlaceholder: {
    width: 24,
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
    marginBottom: 15,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trackButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  trackButtonText: {
    color: '#D4AF37',
    fontWeight: '500',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 25,
  },
  shopButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrdersScreen;
