import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='*' element={<Navigate replace to='/' />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/repositoryList/:id' element={<SingleRepository />} />
        <Route path='/createReview' element={<CreateReview />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;
