import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect } from 'react';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 10,
    color: 'white',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const [user, setUser] = useState(null);
  const currentUserQuery = useQuery(CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserQuery.data) {
      setUser(currentUserQuery.data.me);
    }
  }, [currentUserQuery.data]);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signIn');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {!user ? (
          <Link to='/signIn'>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        ) : (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
