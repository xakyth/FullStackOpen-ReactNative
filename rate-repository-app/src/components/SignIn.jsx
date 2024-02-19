import { Formik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';

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

const validationSchema = yup.object().shape({
  username: yup.string().min(3).required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  const buttonBoxStyle = [theme.buttonContainer, { marginTop: 10 }];
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
      <Pressable onPress={onSubmit} style={buttonBoxStyle}>
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
