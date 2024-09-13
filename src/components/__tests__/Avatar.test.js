import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import { Avatar } from '../index';
import { render, screen } from '@testing-library/react';
describe('Test for Avatar', () => {
    it('Should render JD', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Avatar name={'John Doe'} />
                </Provider>
            </BrowserRouter>,
        );
        const avatarText = screen.getByText('JD');
        expect(avatarText).toHaveTextContent('JD');
    });

    it('Should render J', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Avatar name={'John'} />
                </Provider>
            </BrowserRouter>,
        );
        const avatarText = screen.getByTestId('initials');

        expect(avatarText).toHaveTextContent('J');
    });
});
