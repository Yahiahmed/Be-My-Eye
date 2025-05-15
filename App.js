import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import SavedResponsesScreen from './src/screens/SavedResponsesScreen';
import WorkoutVideosScreen from './src/screens/WorkoutVideosScreen';
import RecipesScreen from './src/screens/RecipesScreen';
import HealthTrackerScreen from './src/screens/HealthTrackerScreen';


// Custom theme for sky blue accent
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A90E2',
    background: '#F5FCFF',
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TopicsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TopicsList" 
        component={TopicsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Resources" 
        component={ResourcesScreen} 
        options={({ route }) => ({ 
          title: route.params?.topicName || 'Resources',
          headerShown: false 
        })}
      />
    </Stack.Navigator>
  );
}

// Custom Tab Bar Component
function CustomTabBarIcon({ route, focused, color, size }) {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Chat') {
    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
  } else if (route.name === 'Topics') {
    iconName = focused ? 'book' : 'book-outline';
  } else if (route.name === 'Workouts') {
    iconName = focused ? 'fitness' : 'fitness-outline';
  } else if (route.name === 'Recipes') {
    iconName = focused ? 'restaurant' : 'restaurant-outline';
  } else if (route.name === 'Health') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (route.name === 'Saved') {
    iconName = focused ? 'save' : 'save-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => 
            <CustomTabBarIcon route={route} focused={focused} color={color} size={size} />,
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#F5FCFF',
            borderTopWidth: 0,
            elevation: 8,
            shadowOpacity: 0.1,
          },
          headerStyle: {
            backgroundColor: '#4A90E2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        })}
      >
     <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="home" size={24} color="#fff" />
                <Text style={styles.headerText}>Bloom Mum</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="chatbubbles" size={24} color="#fff" />
                <Text style={styles.headerText}>Chat Support</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Topics" 
          component={TopicsStack} 
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="book" size={24} color="#fff" />
                <Text style={styles.headerText}>Knowledge Center</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Workouts" 
          component={WorkoutVideosScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="fitness" size={24} color="#fff" />
                <Text style={styles.headerText}>Workout Plans</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Recipes" 
          component={RecipesScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="restaurant" size={24} color="#fff" />
                <Text style={styles.headerText}>Healthy Recipes</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Health" 
          component={HealthTrackerScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="heart" size={24} color="#fff" />
                <Text style={styles.headerText}>Health Tracker</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedResponsesScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Icon name="save" size={24} color="#fff" />
                <Text style={styles.headerText}>Saved Items</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});