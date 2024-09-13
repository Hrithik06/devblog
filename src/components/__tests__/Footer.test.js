import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../index';

describe('Footer Test Case', () => {
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>,
    );
    it('Should load Footer', () => {
        const footerHeading = screen.getByRole('heading', { name: 'Company' });
        expect(footerHeading).toBeInTheDocument();
    });
});
