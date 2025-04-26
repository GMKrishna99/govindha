import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderTrackingScreen = ({route, navigation}) => {
  const {order} = route.params;

  // Enhanced tracking data for the demo
  const trackingData = {
    steps: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'We have received your order',
        date: order.date,
        time: '10:30 AM',
        completed: true,
      },
      {
        id: '2',
        title: 'Order Processed',
        description: 'Seller is preparing your order',
        date: order.date,
        time: '2:15 PM',
        completed: true,
      },
      {
        id: '3',
        title: order.status === 'Delivered' ? 'Shipped' : 'Shipping',
        description: 'Your item has been shipped',
        date: order.date,
        time: '11:00 AM',
        completed: order.status !== 'Processing',
      },
      {
        id: '4',
        title: 'Out for Delivery',
        description: 'Your item is out for delivery',
        date: order.status === 'Delivered' ? order.date : '',
        time: order.status === 'Delivered' ? '9:30 AM' : '',
        completed: order.status === 'Delivered',
      },
      {
        id: '5',
        title: 'Delivered',
        description: 'Your item has been delivered',
        date: order.status === 'Delivered' ? order.date : '',
        time: order.status === 'Delivered' ? '3:45 PM' : '',
        completed: order.status === 'Delivered',
      },
    ],
    carrier: order.status === 'Delivered' ? 'FedEx' : 'DHL',
    trackingNumber:
      order.status === 'Delivered' ? 'FX123456789' : 'DH987654321',
    estimatedDelivery:
      order.status === 'Delivered' ? order.date : 'Nov 5, 2023',
  };

  const renderTrackingStep = (step, index, allSteps) => {
    const isLastStep = index === allSteps.length - 1;
    const isCurrentStep =
      !step.completed && (index === 0 || allSteps[index - 1].completed);

    return (
      <View key={step.id} style={styles.trackingStep}>
        <View style={styles.stepIndicatorContainer}>
          <View
            style={[
              styles.stepIndicator,
              step.completed && styles.stepCompleted,
              isCurrentStep && styles.stepCurrent,
            ]}>
            {step.completed ? (
              <Icon name="checkmark" size={16} color="#FFF" />
            ) : (
              <View style={styles.stepIndicatorInner} />
            )}
          </View>
          {!isLastStep && (
            <View
              style={[
                styles.stepConnector,
                step.completed && styles.stepConnectorCompleted,
              ]}
            />
          )}
        </View>
        <View style={styles.stepDetails}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
          {step.date && step.time && (
            <Text style={styles.stepTime}>
              {step.date} at {step.time}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.trackingContainer}>
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order #{order.orderNumber}</Text>
          <Text style={styles.summaryStatus}>
            Status:{' '}
            <Text
              style={{
                color: order.status === 'Delivered' ? '#4CAF50' : '#FFA000',
              }}>
              {order.status}
            </Text>
          </Text>

          <View style={styles.trackingInfo}>
            <View style={styles.infoRow}>
              <Icon name="cube-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>
                Carrier: {trackingData.carrier}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="barcode-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>
                Tracking #: {trackingData.trackingNumber}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="calendar-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>
                Estimated Delivery: {trackingData.estimatedDelivery}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>Items in this order</Text>
          {order.items.map(item => (
            <View key={item.id} style={styles.trackingItem}>
              <Image
                source={{uri: item.image}}
                style={styles.trackingItemImage}
              />
              <View style={styles.trackingItemInfo}>
                <Text style={styles.trackingItemName}>{item.name}</Text>
                <Text style={styles.trackingItemPrice}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.trackingSteps}>
          <Text style={styles.sectionTitle}>Tracking History</Text>
          {trackingData.steps.map((step, index) =>
            renderTrackingStep(step, index, trackingData.steps),
          )}
        </View>

        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Need help with your order?</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
  trackingContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  orderSummary: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryStatus: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  trackingInfo: {
    marginTop: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  itemsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  trackingItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  trackingItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  trackingItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trackingItemName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  trackingItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  trackingSteps: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepIndicatorContainer: {
    width: 40,
    alignItems: 'center',
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  stepIndicatorInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
  stepCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stepCurrent: {
    borderColor: '#D4AF37',
  },
  stepCurrentInner: {
    backgroundColor: '#D4AF37',
  },
  stepConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  stepConnectorCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepDetails: {
    flex: 1,
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 12,
    color: '#888',
  },
  helpContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#D4AF37',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OrderTrackingScreen;
