import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('Test Error Page', () => {
    it('Should render Error Page', () => {
        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>,
        );
        const errorText = screen.getByRole('heading', { name: '404' });
        expect(errorText).toBeInTheDocument();
    });
});
