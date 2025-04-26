import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethodsScreen = ({navigation}) => {
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'VISA',
      cardName: 'John Doe',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196578.png',
      cardColor: '#1A1F71', // VISA blue
    },
    {
      id: '2',
      type: 'MasterCard',
      cardName: 'John Doe',
      last4: '5555',
      expiry: '08/24',
      isDefault: false,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196566.png',
      cardColor: '#EB001B', // Mastercard red
    },
    {
      id: '3',
      type: 'PayPal',
      email: 'user@example.com',
      isDefault: false,
      icon: 'https://cdn-icons-png.flaticon.com/512/196/196561.png',
      cardColor: '#009cde', // PayPal blue
    },
  ]);

  // Set payment method as default
  const setAsDefault = id => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  // Delete payment method
  const deletePaymentMethod = id => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const newMethods = paymentMethods.filter(
              method => method.id !== id,
            );
            // If we're deleting the default method and there are other methods
            if (
              paymentMethods.find(method => method.id === id)?.isDefault &&
              newMethods.length > 0
            ) {
              newMethods[0].isDefault = true;
            }
            setPaymentMethods(newMethods);
          },
        },
      ],
    );
  };

  // Add new payment method
  const addNewPaymentMethod = () => {
    navigation.navigate('AddPaymentMethod', {
      onSave: newMethod => {
        setPaymentMethods([
          ...paymentMethods,
          {
            ...newMethod,
            id: Date.now().toString(),
            isDefault: paymentMethods.length === 0, // Set as default if first method
          },
        ]);
      },
    });
  };

  // Edit payment method
  const editPaymentMethod = method => {
    navigation.navigate('EditPaymentMethod', {
      method,
      onSave: updatedMethod => {
        setPaymentMethods(
          paymentMethods.map(m =>
            m.id === updatedMethod.id ? updatedMethod : m,
          ),
        );
      },
    });
  };

  const renderPaymentMethod = ({item}) => (
    <View style={[styles.paymentCard, {backgroundColor: item.cardColor}]}>
      <View style={styles.paymentHeader}>
        <Image
          source={{uri: item.icon}}
          style={styles.paymentIcon}
          resizeMode="contain"
        />
        <View style={styles.paymentActionsTop}>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Icon name="checkmark" size={12} color="#4CAF50" />
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editPaymentMethod(item)}>
            <Icon name="create-outline" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePaymentMethod(item.id)}>
            <Icon name="trash-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.cardNumber}>•••• •••• •••• {item.last4}</Text>

      <View style={styles.paymentDetails}>
        <View>
          <Text style={styles.detailLabel}>Card Holder</Text>
          <Text style={styles.detailValue}>{item.cardName}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Expires</Text>
          <Text style={styles.detailValue}>{item.expiry}</Text>
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
          <Text style={styles.emptyText}>
            You haven't saved any payment methods yet
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={addNewPaymentMethod}>
            <Text style={styles.addButtonText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      )}

      {paymentMethods.length > 0 && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={addNewPaymentMethod}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.floatingButtonText}>Add Payment</Text>
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
  paymentMethodsList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  paymentCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  paymentIcon: {
    width: 50,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  paymentActionsTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  editButton: {
    padding: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 5,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 25,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  setDefaultButton: {
    marginTop: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  setDefaultText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
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

export default PaymentMethodsScreen;
