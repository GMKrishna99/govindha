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

const CouponDetailsScreen = ({route, navigation}) => {
  const {coupon} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupon Details</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{uri: coupon.image}} style={styles.couponImage} />

        <View style={styles.couponHeader}>
          <Text style={styles.discountText}>{coupon.discount} OFF</Text>
          <Text style={styles.codeText}>{coupon.code}</Text>
        </View>

        <Text style={styles.descriptionText}>{coupon.description}</Text>
        <Text style={styles.expiryText}>{coupon.expiry}</Text>

        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          {coupon.howToUse.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          {coupon.terms.map((term, index) => (
            <View key={index} style={styles.termContainer}>
              <Icon
                name="ellipse"
                size={8}
                color="#D4AF37"
                style={styles.bulletPoint}
              />
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Coupon</Text>
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  couponImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  discountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  expiryText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  copyButtonText: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  termContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    marginTop: 5,
    marginRight: 10,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  applyButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CouponDetailsScreen;
