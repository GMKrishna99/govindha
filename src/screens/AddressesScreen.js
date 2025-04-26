import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddressesScreen = ({navigation}) => {
  // State for addresses
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'John Doe',
      type: 'Home',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '(123) 456-7890',
      isDefault: true,
    },
    {
      id: '2',
      name: 'John Doe',
      type: 'Work',
      address: '456 Business Ave, Floor 10',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      phone: '(123) 456-7890',
      isDefault: false,
    },
  ]);

  // Set address as default
  const setAsDefault = id => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  // Delete address
  const deleteAddress = id => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const newAddresses = addresses.filter(addr => addr.id !== id);
            // If we're deleting the default address and there are other addresses
            if (
              addresses.find(addr => addr.id === id)?.isDefault &&
              newAddresses.length > 0
            ) {
              newAddresses[0].isDefault = true;
            }
            setAddresses(newAddresses);
          },
        },
      ],
    );
  };

  // Add new address
  const addNewAddress = () => {
    navigation.navigate('AddAddress', {
      onSave: newAddress => {
        setAddresses([
          ...addresses,
          {
            ...newAddress,
            id: Date.now().toString(),
            isDefault: addresses.length === 0, // Set as default if first address
          },
        ]);
      },
    });
  };

  // Edit address
  const editAddress = address => {
    navigation.navigate('EditAddress', {
      address,
      onSave: updatedAddress => {
        setAddresses(
          addresses.map(addr =>
            addr.id === updatedAddress.id ? updatedAddress : addr,
          ),
        );
      },
    });
  };

  const renderAddressItem = ({item}) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTypeContainer}>
          <Icon
            name={item.type === 'Home' ? 'home-outline' : 'business-outline'}
            size={18}
            color="#D4AF37"
            style={styles.addressIcon}
          />
          <Text style={styles.addressType}>{item.type}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Icon name="checkmark" size={12} color="#4CAF50" />
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.addressActionsTop}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editAddress(item)}>
            <Icon name="create-outline" size={20} color="#D4AF37" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteAddress(item.id)}>
            <Icon name="trash-outline" size={20} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressDetails}>
        <Text style={styles.addressName}>{item.name}</Text>
        <View style={styles.addressRow}>
          <Icon
            name="location-outline"
            size={16}
            color="#888"
            style={styles.detailIcon}
          />
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
        <View style={styles.addressRow}>
          <Icon
            name="navigate-outline"
            size={16}
            color="#888"
            style={styles.detailIcon}
          />
          <Text style={styles.addressText}>
            {item.city}, {item.state} {item.zip}
          </Text>
        </View>
        <View style={styles.addressRow}>
          <Icon
            name="call-outline"
            size={16}
            color="#888"
            style={styles.detailIcon}
          />
          <Text style={styles.addressText}>{item.phone}</Text>
        </View>
      </View>

      {!item.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => setAsDefault(item.id)}>
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Addresses</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.addressesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="location-outline" size={60} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No Addresses Saved</Text>
          <Text style={styles.emptyText}>
            You haven't saved any addresses yet
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={addNewAddress}>
            <Text style={styles.addButtonText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}

      {addresses.length > 0 && (
        <TouchableOpacity style={styles.floatingButton} onPress={addNewAddress}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.floatingButtonText}>Add Address</Text>
        </TouchableOpacity>
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
  addressesList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    marginRight: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  addressActionsTop: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 5,
  },
  addressDetails: {
    marginLeft: 26, // Align with icon
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    marginRight: 10,
    width: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  setDefaultButton: {
    marginTop: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
  },
  setDefaultText: {
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
    flexDirection: 'row',
    bottom: 30,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default AddressesScreen;
