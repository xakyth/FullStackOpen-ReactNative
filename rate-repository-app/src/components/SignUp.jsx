import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import theme from '../theme';
import { useSignIn } from '../hooks/useSignIn';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  signUpButton: {
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: theme.colors.backgroundComponent,
    padding: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordCofirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('${label} is required').label('Username'),
  password: yup.string().required('${label} is required').label('Password'),
  passwordCofirmation: yup
    .string()
    .required('${label} is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .label('Password confirmation'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp] = useMutation(CREATE_USER);

  const onSubmit = async ({ username, password }) => {
    await signUp({ variables: { username, password } });
    await signIn({ username, password });
    navigate('/');
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name='username'
            placeholder='Username'
          ></FormikTextInput>
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry
          ></FormikTextInput>
          <FormikTextInput
            name='passwordCofirmation'
            placeholder='Password confirmation'
            secureTextEntry
          ></FormikTextInput>
          <Button
            label='Sign up'
            style={styles.signUpButton}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
