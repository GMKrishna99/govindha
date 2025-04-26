import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckoutScreen = ({navigation}) => {
  const [activeStep, setActiveStep] = useState('shipping');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const cartItems = [
    {
      id: '1',
      name: 'Diamond Pendant',
      price: 899,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Gold Ring',
      price: 599,
      quantity: 2,
    },
  ];

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    navigation.navigate('OrderConfirmation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.stepsContainer}>
          <TouchableOpacity
            style={[
              styles.stepButton,
              activeStep === 'shipping' && styles.activeStep,
            ]}
            onPress={() => setActiveStep('shipping')}>
            <Text
              style={[
                styles.stepText,
                activeStep === 'shipping' && styles.activeStepText,
              ]}>
              Shipping
            </Text>
          </TouchableOpacity>
          <View style={styles.stepDivider} />
          <TouchableOpacity
            style={[
              styles.stepButton,
              activeStep === 'payment' && styles.activeStep,
            ]}
            onPress={() => setActiveStep('payment')}>
            <Text
              style={[
                styles.stepText,
                activeStep === 'payment' && styles.activeStepText,
              ]}>
              Payment
            </Text>
          </TouchableOpacity>
          <View style={styles.stepDivider} />
          <TouchableOpacity
            style={[
              styles.stepButton,
              activeStep === 'review' && styles.activeStep,
            ]}
            onPress={() => setActiveStep('review')}>
            <Text
              style={[
                styles.stepText,
                activeStep === 'review' && styles.activeStepText,
              ]}>
              Review
            </Text>
          </TouchableOpacity>
        </View>

        {activeStep === 'shipping' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>

            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>Home</Text>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressName}>Emily Johnson</Text>
              <Text style={styles.addressDetails}>123 Main Street, Apt 4B</Text>
              <Text style={styles.addressDetails}>New York, NY 10001</Text>
              <Text style={styles.addressDetails}>United States</Text>
              <Text style={styles.addressPhone}>+1 (555) 123-4567</Text>
            </View>

            <TouchableOpacity style={styles.addAddressButton}>
              <Icon name="add" size={24} color="#D4AF37" />
              <Text style={styles.addAddressText}>Add New Address</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, {marginTop: 20}]}>
              Shipping Method
            </Text>

            <TouchableOpacity
              style={[
                styles.shippingMethodCard,
                shippingMethod === 'standard' && styles.selectedCard,
              ]}
              onPress={() => setShippingMethod('standard')}>
              <View style={styles.shippingMethodLeft}>
                <View
                  style={[
                    styles.radioButton,
                    shippingMethod === 'standard' && styles.radioButtonSelected,
                  ]}>
                  {shippingMethod === 'standard' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View>
                  <Text style={styles.shippingMethodTitle}>
                    Standard Shipping
                  </Text>
                  <Text style={styles.shippingMethodSubtitle}>
                    3-5 Business Days
                  </Text>
                </View>
              </View>
              <Text style={styles.shippingMethodPrice}>$10.00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.shippingMethodCard,
                shippingMethod === 'express' && styles.selectedCard,
              ]}
              onPress={() => setShippingMethod('express')}>
              <View style={styles.shippingMethodLeft}>
                <View
                  style={[
                    styles.radioButton,
                    shippingMethod === 'express' && styles.radioButtonSelected,
                  ]}>
                  {shippingMethod === 'express' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View>
                  <Text style={styles.shippingMethodTitle}>
                    Express Shipping
                  </Text>
                  <Text style={styles.shippingMethodSubtitle}>
                    1-2 Business Days
                  </Text>
                </View>
              </View>
              <Text style={styles.shippingMethodPrice}>$25.00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setActiveStep('payment')}>
              <Text style={styles.continueButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeStep === 'payment' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Payment Method</Text>

            <TouchableOpacity
              style={[
                styles.paymentMethodCard,
                paymentMethod === 'card' && styles.selectedCard,
              ]}
              onPress={() => setPaymentMethod('card')}>
              <View style={styles.paymentMethodLeft}>
                <View
                  style={[
                    styles.radioButton,
                    paymentMethod === 'card' && styles.radioButtonSelected,
                  ]}>
                  {paymentMethod === 'card' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.paymentMethodIcon}>
                  <Icon name="card" size={24} color="#333" />
                </View>
                <Text style={styles.paymentMethodTitle}>Credit/Debit Card</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            {paymentMethod === 'card' && (
              <View style={styles.cardDetailsContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View
                    style={[styles.inputContainer, {flex: 1, marginRight: 10}]}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputContainer, {flex: 1}]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name on Card</Text>
                  <TextInput style={styles.input} placeholder="John Doe" />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.paymentMethodCard,
                paymentMethod === 'paypal' && styles.selectedCard,
              ]}
              onPress={() => setPaymentMethod('paypal')}>
              <View style={styles.paymentMethodLeft}>
                <View
                  style={[
                    styles.radioButton,
                    paymentMethod === 'paypal' && styles.radioButtonSelected,
                  ]}>
                  {paymentMethod === 'paypal' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.paymentMethodIcon}>
                  <Icon name="logo-paypal" size={24} color="#333" />
                </View>
                <Text style={styles.paymentMethodTitle}>PayPal</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setActiveStep('review')}>
              <Text style={styles.continueButtonText}>Continue to Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeStep === 'review' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            {cartItems.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>
                  {item.name} × {item.quantity}
                </Text>
                <Text style={styles.orderItemPrice}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>${getSubtotal()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={styles.summaryValue}>
                ${shippingMethod === 'standard' ? '10.00' : '25.00'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Tax</Text>
              <Text style={styles.summaryValue}>$20.00</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>
                $
                {getSubtotal() + (shippingMethod === 'standard' ? 10 : 25) + 20}
              </Text>
            </View>

            <View style={styles.addressSummary}>
              <Text style={styles.summaryLabel}>Shipping Address:</Text>
              <Text style={styles.summaryAddressText}>Emily Johnson</Text>
              <Text style={styles.summaryAddressText}>
                123 Main Street, Apt 4B
              </Text>
              <Text style={styles.summaryAddressText}>New York, NY 10001</Text>
            </View>

            <View style={styles.paymentSummary}>
              <Text style={styles.summaryLabel}>Payment Method:</Text>
              <Text style={styles.summaryPaymentText}>
                {paymentMethod === 'card'
                  ? 'Credit/Debit Card ending in 3456'
                  : 'PayPal'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  stepButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeStep: {
    backgroundColor: '#D4AF37',
  },
  stepText: {
    fontSize: 14,
    color: '#888',
  },
  activeStepText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  stepDivider: {
    width: 30,
    height: 1,
    backgroundColor: '#DDD',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressType: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 14,
    color: '#D4AF37',
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addAddressText: {
    fontSize: 16,
    color: '#D4AF37',
    marginLeft: 5,
  },
  shippingMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: '#D4AF37',
    backgroundColor: '#FAF6E9',
  },
  shippingMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#D4AF37',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
  },
  shippingMethodTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  shippingMethodSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  shippingMethodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  continueButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  paymentMethodTitle: {
    fontSize: 16,
    color: '#333',
  },
  cardDetailsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputRow: {
    flexDirection: 'row',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  orderItemName: {
    fontSize: 16,
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  addressSummary: {
    marginTop: 20,
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryAddressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  paymentSummary: {
    marginBottom: 30,
  },
  summaryPaymentText: {
    fontSize: 14,
    color: '#666',
  },
  placeOrderButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
