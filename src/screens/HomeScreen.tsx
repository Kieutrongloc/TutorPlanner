import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can replace with the desired icon library
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faBook, faUser } from '@fortawesome/free-solid-svg-icons';

import HomeNavigation from './components/HomeNavigation';
import ProfileNavigation from './components/ProfileNavigation';
import AuditNavigation from './components/AuditNavigation';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ tabBarIcon: () => <FontAwesomeIcon icon={ faHome } />   }}
        component={HomeNavigation}
      />
      <Tab.Screen
        name="Audit"
        options={{ tabBarIcon: () => <FontAwesomeIcon icon={ faBook } />   }}
        component={AuditNavigation}
      />
      <Tab.Screen
        name="Profile"
        options={{ tabBarIcon: () => <FontAwesomeIcon icon={ faUser } /> }}
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
