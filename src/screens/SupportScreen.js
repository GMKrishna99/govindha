import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = ({navigation}) => {
  const supportOptions = [
    {
      id: '1',
      title: 'FAQs',
      icon: 'help-circle-outline',
      action: () => navigation.navigate('FAQs'),
    },
    {
      id: '2',
      title: 'Contact Us',
      icon: 'chatbubbles-outline',
      action: () => navigation.navigate('Contact'),
    },
    {
      id: '3',
      title: 'Order Support',
      icon: 'cube-outline',
      action: () => navigation.navigate('OrderSupport'),
    },
    {
      id: '4',
      title: 'Live Chat',
      icon: 'chatbox-ellipses-outline',
      action: () => Linking.openURL('https://wa.me/1234567890'),
    },
    {
      id: '5',
      title: 'Call Us',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:+1234567890'),
    },
    {
      id: '6',
      title: 'Email Us',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@jewelryapp.com'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>How can we help you?</Text>
          <Text style={styles.sectionSubtitle}>
            Choose an option below to get assistance
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {supportOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.action}>
              <View style={styles.optionIconContainer}>
                <Icon name={option.icon} size={24} color="#D4AF37" />
              </View>
              <Text style={styles.optionText}>{option.title}</Text>
              <Icon name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyTitle}>Need immediate help?</Text>
          <Text style={styles.emergencyText}>
            Our customer service team is available 24/7
          </Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => Linking.openURL('tel:+1234567890')}>
            <Icon
              name="call"
              size={20}
              color="#FFF"
              style={styles.emergencyIcon}
            />
            <Text style={styles.emergencyButtonText}>Call Now</Text>
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
  content: {
    paddingBottom: 30,
  },
  helpSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  optionsContainer: {
    paddingHorizontal: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  emergencyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emergencyText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
    textAlign: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    backgroundColor: '#D4AF37',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyIcon: {
    marginRight: 8,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupportScreen;
