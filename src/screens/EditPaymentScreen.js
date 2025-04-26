import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditPaymentScreen = ({navigation, route}) => {
  const {method, onSave} = route.params;

  const [paymentMethod, setPaymentMethod] = useState({
    type: 'Credit Card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false,
  });

  useEffect(() => {
    if (method) {
      setPaymentMethod({
        type: method.type,
        cardNumber:
          method.type === 'Credit Card' ? `•••• •••• •••• ${method.last4}` : '',
        expiryDate: method.expiry || '',
        cvv: '',
        cardholderName: method.cardholderName || '',
        isDefault: method.isDefault,
        email: method.email || '',
      });
    }
  }, [method]);

  const handleChange = (field, value) => {
    setPaymentMethod(prev => ({...prev, [field]: value}));
  };

  const formatCardNumber = input => {
    const v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return input;
  };

  const formatExpiryDate = input => {
    const expiryDate = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (expiryDate.length >= 3) {
      return `${expiryDate.slice(0, 2)}/${expiryDate.slice(2, 4)}`;
    }
    return expiryDate;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedMethod = {
      ...method,
      ...paymentMethod,
      expiry: paymentMethod.expiryDate,
    };

    onSave(updatedMethod);
    navigation.goBack();
  };

  const validateForm = () => {
    if (paymentMethod.type === 'PayPal' && !paymentMethod.email) {
      Alert.alert('Validation Error', 'Please enter your PayPal email');
      return false;
    }

    if (paymentMethod.type === 'Credit Card') {
      if (
        !paymentMethod.cardNumber ||
        paymentMethod.cardNumber.replace(/\s/g, '').length < 16
      ) {
        Alert.alert('Validation Error', 'Please enter a valid card number');
        return false;
      }

      if (!paymentMethod.expiryDate || paymentMethod.expiryDate.length !== 5) {
        Alert.alert(
          'Validation Error',
          'Please enter a valid expiry date (MM/YY)',
        );
        return false;
      }

      if (!paymentMethod.cardholderName.trim()) {
        Alert.alert('Validation Error', 'Please enter cardholder name');
        return false;
      }
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Payment Method</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Payment Method Type (readonly) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Payment Method</Text>
          <View style={styles.typeContainer}>
            <View
              style={[
                styles.typeButton,
                styles.typeButtonReadonly,
                paymentMethod.type === 'Credit Card' && styles.typeButtonActive,
              ]}>
              <Icon
                name="card-outline"
                size={20}
                color={
                  paymentMethod.type === 'Credit Card' ? '#D4AF37' : '#888'
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  paymentMethod.type === 'Credit Card' &&
                    styles.typeButtonTextActive,
                ]}>
                Credit Card
              </Text>
            </View>

            <View
              style={[
                styles.typeButton,
                styles.typeButtonReadonly,
                paymentMethod.type === 'PayPal' && styles.typeButtonActive,
              ]}>
              <Icon
                name="logo-paypal"
                size={20}
                color={paymentMethod.type === 'PayPal' ? '#D4AF37' : '#888'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  paymentMethod.type === 'PayPal' &&
                    styles.typeButtonTextActive,
                ]}>
                PayPal
              </Text>
            </View>
          </View>
        </View>

        {paymentMethod.type === 'Credit Card' ? (
          <>
            {/* Card Number (readonly last 4) */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View style={[styles.input, styles.inputReadonly]}>
                <Text style={styles.readonlyText}>
                  {paymentMethod.cardNumber}
                </Text>
              </View>
            </View>

            {/* Cardholder Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                value={paymentMethod.cardholderName}
                onChangeText={text => handleChange('cardholderName', text)}
                placeholder="Name on card"
                placeholderTextColor="#888"
                autoCapitalize="words"
              />
            </View>

            {/* Expiry Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={formatExpiryDate(paymentMethod.expiryDate)}
                onChangeText={text =>
                  handleChange('expiryDate', text.replace(/\D/g, ''))
                }
                placeholder="MM/YY"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </>
        ) : (
          /* PayPal Email */
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PayPal Email</Text>
            <TextInput
              style={styles.input}
              value={paymentMethod.email}
              onChangeText={text => handleChange('email', text)}
              placeholder="email@example.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        {/* Default Payment Toggle */}
        <TouchableOpacity
          style={styles.defaultContainer}
          onPress={() => handleChange('isDefault', !paymentMethod.isDefault)}>
          <View
            style={[
              styles.checkbox,
              paymentMethod.isDefault && {backgroundColor: '#D4AF37'},
            ]}>
            {paymentMethod.isDefault && (
              <Icon name="checkmark" size={16} color="#FFF" />
            )}
          </View>
          <Text style={styles.defaultText}>Set as default payment method</Text>
        </TouchableOpacity>
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
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    padding: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '500',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 10,
  },
  typeButtonActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9F0',
  },
  typeButtonReadonly: {
    backgroundColor: '#F5F5F5',
  },
  typeButtonText: {
    marginLeft: 8,
    color: '#888',
  },
  typeButtonTextActive: {
    color: '#D4AF37',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputReadonly: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  readonlyText: {
    color: '#666',
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  defaultText: {
    fontSize: 14,
    color: '#333',
  },
});

export default EditPaymentScreen;
