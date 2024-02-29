import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
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

const Button = ({ style, label, onPress }) => {
  const buttonBoxStyle = [style, styles.container];
  return (
    <Pressable onPress={onPress} style={buttonBoxStyle}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default Button;
