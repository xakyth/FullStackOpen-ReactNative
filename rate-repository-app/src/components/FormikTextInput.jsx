import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    color: '#d73a4a',
  },
  field: {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 4,
    borderColor: 'darkgray',
    paddingLeft: '1em',
    marginTop: 10,
    height: 40,
    placeholderTextColor: '#586069',
    fontSize: 16,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const fieldStyle = [styles.field, showError && { borderColor: '#d73a4a' }];
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={fieldStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
