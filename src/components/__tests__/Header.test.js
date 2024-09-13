const { render, screen, fireEvent } = require('@testing-library/react');
import { Provider } from 'react-redux';
import store from '../../store/store';
import { Header } from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </BrowserRouter>,
        );
    });
    it('Should render the Home button', () => {
        const headerBtn = screen.getByRole('button', { name: 'Home' });
        expect(headerBtn).toBeInTheDocument();
    });
    it('Should render Login Button', () => {
        const loginBtn = screen.getByRole('button', { name: 'Login' });
        expect(loginBtn).toBeInTheDocument();
    });

    it('Should render Login Page', () => {
        const loginBtn = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginBtn);
        // console.log(loginBtn);

        // console.log(fireEvent.click(loginBtn));
        expect(window.location.pathname).toBe('/login');
        // const loginPage = screen.getByPlaceholderText('johndoe@abc.com');
        // expect(loginPage).toBeInTheDocument();
    });
    it('Should render CreateAccount Button', () => {
        const signUpBtn = screen.getByRole('button', {
            name: 'Create Account',
        });
        expect(signUpBtn).toBeInTheDocument();
    });
});
