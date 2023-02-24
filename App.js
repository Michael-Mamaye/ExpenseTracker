import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider, { ExpensesContext } from './store/expenses-context';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();



export default function App() {

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }
  const ExpensesOverview = () => {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarInactiveTintColor: GlobalStyles.colors.gray700,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('ManageExpense');
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }

  const AuthenticatedStack = () => {
    return (

      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',

        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: 'modal',
            headerRight: ({ tintColor }) => (
              <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />
            )
          }}
        />
      </Stack.Navigator>

    );
  }

  const authCtx = useContext(ExpensesContext)

  return <>
    <StatusBar style="light" />
    <ExpensesContextProvider>
      <NavigationContainer>
        {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
    </ExpensesContextProvider>
  </>
}