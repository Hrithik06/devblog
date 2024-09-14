import { BrowserRouter } from 'react-router-dom';
import { Login } from '../index';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import mockAppwrite from '../../__mocks__/mockAppwrite';

jest.mock('appwrite', () => ({
    Client: jest.fn(() => mockAppwrite),
}));
describe('Test for Login Page', () => {
    it('Should sign in user', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </BrowserRouter>,
            );
        });
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');
        const loginButton = screen.getByRole('button', {
            name: 'Sign in',
        });
        fireEvent.change(emailInput, {
            target: { value: 'test@gmail.com' },
        });
        fireEvent.change(passwordInput, {
            target: { value: 'Test@1234' },
        });
        fireEvent.click(loginButton);
    });
});
