import React, {useState} from 'react';
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

const AddPaymentScreen = ({navigation, route}) => {
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'Credit Card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false,
  });

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

    const newMethod = {
      ...paymentMethod,
      id: Date.now().toString(),
      last4: paymentMethod.cardNumber.slice(-4),
      icon: getCardIcon(paymentMethod.cardNumber),
      expiry: paymentMethod.expiryDate,
    };

    navigation.goBack();
  };

  const getCardIcon = cardNumber => {
    if (/^4/.test(cardNumber)) {
      return 'https://cdn-icons-png.flaticon.com/512/196/196578.png'; // VISA
    } else if (/^5[1-5]/.test(cardNumber)) {
      return 'https://cdn-icons-png.flaticon.com/512/196/196566.png'; // MasterCard
    }
    return 'https://cdn-icons-png.flaticon.com/512/196/196578.png'; // Default
  };

  const validateForm = () => {
    const {cardNumber, expiryDate, cvv, cardholderName} = paymentMethod;

    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid 16-digit card number',
      );
      return false;
    }

    if (!expiryDate || expiryDate.length !== 5) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid expiry date (MM/YY)',
      );
      return false;
    }

    if (!cvv || cvv.length < 3) {
      Alert.alert('Validation Error', 'Please enter a valid CVV');
      return false;
    }

    if (!cardholderName.trim()) {
      Alert.alert('Validation Error', 'Please enter cardholder name');
      return false;
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
        <Text style={styles.headerTitle}>Add Payment Method</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Payment Method Type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Payment Method</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                paymentMethod.type === 'Credit Card' && styles.typeButtonActive,
              ]}
              onPress={() => handleChange('type', 'Credit Card')}>
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
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                paymentMethod.type === 'PayPal' && styles.typeButtonActive,
              ]}
              onPress={() => handleChange('type', 'PayPal')}>
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
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod.type === 'Credit Card' ? (
          <>
            {/* Card Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={formatCardNumber(paymentMethod.cardNumber)}
                onChangeText={text =>
                  handleChange('cardNumber', text.replace(/\s/g, ''))
                }
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                maxLength={19}
              />
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

            {/* Expiry and CVV */}
            <View style={styles.row}>
              <View style={[styles.inputContainer, {flex: 1, marginRight: 10}]}>
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
              <View style={[styles.inputContainer, {flex: 1}]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={paymentMethod.cvv}
                  onChangeText={text =>
                    handleChange('cvv', text.replace(/\D/g, ''))
                  }
                  placeholder="123"
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default AddPaymentScreen;
