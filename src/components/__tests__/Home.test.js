import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { Provider } from 'react-redux';
import store from '../../store/store';
describe('Home Page Test', () => {
    render(
        <Provider store={store}>
            <Home />
        </Provider>,
    );
    it('should load home page with Heading', () => {
        const headerText = screen.getByRole('heading', {
            name: 'Welcome to theblog',
        });
        expect(headerText).toBeInTheDocument();
    });
});
