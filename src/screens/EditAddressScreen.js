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

const EditAddressScreen = ({navigation, route}) => {
  const {address, onSave} = route.params;

  // State for edited address
  const [editedAddress, setEditedAddress] = useState({
    name: '',
    type: 'Home',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    isDefault: false,
  });

  // Initialize with the passed address
  useEffect(() => {
    if (address) {
      setEditedAddress(address);
    }
  }, [address]);

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedAddress(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save the edited address
  const handleSave = () => {
    if (!validateForm()) return;

    onSave(editedAddress);
    navigation.goBack();
  };

  // Form validation
  const validateForm = () => {
    const {name, address, city, state, zip, phone} = editedAddress;

    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }

    if (!address.trim()) {
      Alert.alert('Validation Error', 'Please enter your address');
      return false;
    }

    if (!city.trim()) {
      Alert.alert('Validation Error', 'Please enter your city');
      return false;
    }

    if (!state.trim()) {
      Alert.alert('Validation Error', 'Please enter your state');
      return false;
    }

    if (!zip.trim()) {
      Alert.alert('Validation Error', 'Please enter your ZIP code');
      return false;
    }

    if (!phone.trim()) {
      Alert.alert('Validation Error', 'Please enter your phone number');
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
        <Text style={styles.headerTitle}>Edit Address</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Address Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedAddress.type === 'Home' && styles.typeButtonActive,
              ]}
              onPress={() => handleChange('type', 'Home')}>
              <Icon
                name="home-outline"
                size={20}
                color={editedAddress.type === 'Home' ? '#D4AF37' : '#888'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  editedAddress.type === 'Home' && styles.typeButtonTextActive,
                ]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                editedAddress.type === 'Work' && styles.typeButtonActive,
              ]}
              onPress={() => handleChange('type', 'Work')}>
              <Icon
                name="business-outline"
                size={20}
                color={editedAddress.type === 'Work' ? '#D4AF37' : '#888'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  editedAddress.type === 'Work' && styles.typeButtonTextActive,
                ]}>
                Work
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={editedAddress.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Enter your full name"
            placeholderTextColor="#888"
          />
        </View>

        {/* Address Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={editedAddress.address}
            onChangeText={text => handleChange('address', text)}
            placeholder="Enter your street address"
            placeholderTextColor="#888"
          />
        </View>

        {/* City, State, ZIP */}
        <View style={styles.row}>
          <View style={[styles.inputContainer, {flex: 2, marginRight: 10}]}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={editedAddress.city}
              onChangeText={text => handleChange('city', text)}
              placeholder="City"
              placeholderTextColor="#888"
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1, marginRight: 10}]}>
            <Text style={styles.inputLabel}>State</Text>
            <TextInput
              style={styles.input}
              value={editedAddress.state}
              onChangeText={text => handleChange('state', text)}
              placeholder="State"
              placeholderTextColor="#888"
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.inputLabel}>ZIP</Text>
            <TextInput
              style={styles.input}
              value={editedAddress.zip}
              onChangeText={text => handleChange('zip', text)}
              placeholder="ZIP"
              placeholderTextColor="#888"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={editedAddress.phone}
            onChangeText={text => handleChange('phone', text)}
            placeholder="Enter your phone number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </View>

        {/* Default Address Toggle */}
        <TouchableOpacity
          style={styles.defaultContainer}
          onPress={() => handleChange('isDefault', !editedAddress.isDefault)}>
          <View style={styles.checkbox}>
            {editedAddress.isDefault && (
              <Icon name="checkmark" size={16} color="#FFF" />
            )}
          </View>
          <Text style={styles.defaultText}>
            Set as default shipping address
          </Text>
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
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  defaultText: {
    fontSize: 14,
    color: '#333',
  },
});

export default EditAddressScreen;
