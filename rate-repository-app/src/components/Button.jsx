import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

const Button = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default Button;
