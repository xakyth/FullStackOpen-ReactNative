import { Formik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundComponent,
    display: 'flex',
    padding: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput name='username' placeholder='Username' />
        <FormikTextInput
          name='password'
          placeholder='Password'
          secureTextEntry
        />
      </View>
      <Pressable onPress={onSubmit} style={theme.buttonContainer}>
        <Text style={theme.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (props) => {
    console.log('login', props);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
