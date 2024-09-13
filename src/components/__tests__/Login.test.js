import { BrowserRouter } from 'react-router-dom';
import { Login } from '../index';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { render, screen } from '@testing-library/react';
describe('Test for Login Page', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </BrowserRouter>,
        );
    });
    it('Should contain Heading', () => {
        const headingtText = screen.getByRole('heading');
        expect(headingtText).toBeInTheDocument();
    });
    it('Should contain Sign in Button', () => {
        const loginButton = screen.getByRole('button', { name: 'Sign in' });
        expect(loginButton).toBeInTheDocument();
    });
});
