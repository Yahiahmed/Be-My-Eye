import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const features = [
    { id: '1', name: 'Chat Support', icon: 'chatbubbles', screen: 'Chat', color: '#4A90E2' },
    { id: '2', name: 'Knowledge Center', icon: 'book', screen: 'Topics', color: '#50C878' },
    { id: '3', name: 'Workout Plans', icon: 'fitness', screen: 'Workouts', color: '#FFA500' },
    { id: '4', name: 'Healthy Recipes', icon: 'restaurant', screen: 'Recipes', color: '#FF6347' },
    { id: '5', name: 'Health Tracker', icon: 'heart', screen: 'Health', color: '#6A5ACD' },
    { id: '6', name: 'Saved Items', icon: 'save', screen: 'Saved', color: '#4682B4' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Icon name={item.icon} size={30} color={item.color} />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to Bloom Mum!</Text>
        <Text style={styles.subtitle}>Your journey to better health starts here</Text>
      </View>
      
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  grid: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;