import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to='/signIn'>
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
