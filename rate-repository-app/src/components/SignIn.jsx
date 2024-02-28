import { Formik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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

export const LoginForm = ({ onSubmit }) => {
  const buttonBoxStyle = [theme.buttonContainer, { marginTop: 10 }];
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <View>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput
              name='password'
              placeholder='Password'
              secureTextEntry
            />
          </View>
          <Pressable onPress={handleSubmit} style={buttonBoxStyle}>
            <Text style={theme.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
