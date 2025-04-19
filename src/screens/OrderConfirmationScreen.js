import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmationScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successIconContainer}>
        <Icon name="checkmark-circle" size={80} color="#D4AF37" />
      </View>
      
      <Text style={styles.successTitle}>Order Placed Successfully!</Text>
      <Text style={styles.successMessage}>
        Thank you for your purchase. Your order has been placed successfully and will be processed shortly.
      </Text>
      
      <View style={styles.orderInfoContainer}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Order Number:</Text>
          <Text style={styles.orderInfoValue}>#ORD1234567</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Date:</Text>
          <Text style={styles.orderInfoValue}>April 17, 2025</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Total Amount:</Text>
          <Text style={styles.orderInfoValue}>$2,127.00</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Payment Method:</Text>
          <Text style={styles.orderInfoValue}>Credit Card</Text>
        </View>
      </View>
      
      <Text style={styles.emailMessage}>
        We've sent a confirmation email with all the details to your registered email address.
      </Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.trackOrderButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.trackOrderButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.continueShoppingButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android'?StatusBar.currentHeight:0,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  orderInfoContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#888',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emailMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '100%',
  },
  trackOrderButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  trackOrderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueShoppingButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  continueShoppingButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen;