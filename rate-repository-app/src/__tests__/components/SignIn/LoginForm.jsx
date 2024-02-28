import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { LoginForm } from '../../../components/SignIn';
import { jest, expect } from '@jest/globals';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<LoginForm onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        return expect(onSubmit).toHaveBeenCalled();
      });
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
