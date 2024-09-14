import { BrowserRouter } from 'react-router-dom';
import { Login } from '../index';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';

jest.mock('../../appwrite/auth', () => {
    return {
        __esModule: true,
        default: {
            client: {
                setEndpoint: jest.fn().mockReturnThis(),
                setProject: jest.fn().mockReturnThis(),
            },
            account: {
                // create: jest.fn().mockResolvedValue({ $id: 'user1234' }),
                createEmailPasswordSession: jest.fn((email, password) => {
                    if (password.length < 8) {
                        return Promise.reject(
                            new Error(
                                'Password must be at least 8 characters long',
                            ),
                        );
                    }
                    return Promise.resolve({
                        $id: 'session1234',
                        userId: 'testUser1234',
                        providerUid: email,
                    });
                }),
                // .mockResolvedValue({ $id: 'session1234' }),
                get: jest.fn().mockResolvedValue({
                    $id: 'testUser1234',
                    name: 'Test User',
                }),
            },
        },
    };
});
describe('Test for Login Page', () => {
    it('Should sign in user', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </BrowserRouter>,
        );
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');
        const loginButton = screen.getByRole('button', {
            name: 'Sign in',
        });

        await act(async () => {
            fireEvent.change(emailInput, {
                target: { value: 'test@gmail.com' },
            });
            fireEvent.change(passwordInput, {
                target: { value: 'Test' },
            });
            fireEvent.click(loginButton);

            const errorMsg = screen.getByTestId('errorMsg');
            console.log(errorMsg);
        });
    });
});
