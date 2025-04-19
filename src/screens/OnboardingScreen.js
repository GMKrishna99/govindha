import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const onboardingData = [
    {
      title: 'Exquisite Collection',
      description: 'Discover our handcrafted premium jewelry collection.',
      image: 'https://www.candere.com/media/home_page_images/slider/Lightweight-banner-mobile.jpg',
    },
    {
      title: 'Premium Quality',
      description: 'Each piece is crafted with precision and the finest materials.',
      image: 'https://template.canva.com/EAFAXmikTtM/2/0/1600w-vO8-5CHIUn8.jpg',
    },
    {
      title: 'Expert Craftsmanship',
      description: 'Traditional techniques meet modern design.',
      image: 'https://i.etsystatic.com/21058110/r/il/339a45/5987774999/il_570xN.5987774999_3ecq.jpg',
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      <Image 
        source={{uri : onboardingData[currentPage].image}}
        style={styles.image} 
        resizeMode="contain"
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
        <Text style={styles.description}>{onboardingData[currentPage].description}</Text>
      </View>
      
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentPage ? '#D4AF37' : '#CCCCCC' },
            ]}
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginTop: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;