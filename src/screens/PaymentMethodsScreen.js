import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethodsScreen = ({ navigation }) => {
  // Sample payment methods data - replace with your actual data
  const paymentMethods = [
    {
      id: '1',
      type: 'VISA',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196578.png'
    },
    {
      id: '2',
      type: 'MasterCard',
      last4: '5555',
      expiry: '08/24',
      isDefault: false,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196566.png'
    },
    {
      id: '3',
      type: 'PayPal',
      email: 'user@example.com',
      isDefault: false,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196561.png'
    }
  ];

  const renderPaymentMethod = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentTypeContainer}>
          <Image 
            source={{ uri: item.icon }} 
            style={styles.paymentIcon} 
            resizeMode="contain"
          />
          <Text style={styles.paymentType}>{item.type}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPayment', { method: item })}
        >
          <Icon name="create-outline" size={20} color="#D4AF37" />
        </TouchableOpacity>
      </View>
      
      {item.type === 'PayPal' ? (
        <Text style={styles.paymentDetails}>{item.email}</Text>
      ) : (
        <View>
          <Text style={styles.paymentDetails}>•••• •••• •••• {item.last4}</Text>
          <Text style={styles.paymentDetails}>Expires {item.expiry}</Text>
        </View>
      )}
      
      <View style={styles.paymentActions}>
        {!item.isDefault && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionButtonText, { color: '#E53935' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>
      
      {paymentMethods.length > 0 ? (
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.paymentMethodsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="card-outline" size={60} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No Payment Methods</Text>
          <Text style={styles.emptyText}>You haven't saved any payment methods yet</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddPayment')}
          >
            <Text style={styles.addButtonText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddPayment')}
      >
        <Icon name="add" size={24} color="#FFF" />
      </TouchableOpacity>
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
  paymentMethodsList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  paymentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  editButton: {
    padding: 5,
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  paymentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  actionButton: {
    marginLeft: 15,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
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
  addButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PaymentMethodsScreen;