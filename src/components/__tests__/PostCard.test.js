import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from '../PostCard';
import mockPostCard from '../../__mocks__/mockPostCard.json';
describe('Test PostCard', () => {
    render(
        <BrowserRouter>
            <PostCard {...mockPostCard} />
        </BrowserRouter>,
    );
    it('should render PostCard with data', () => {
        const headerText = screen.getByRole('heading', {
            name: 'The Benefits of Meditation for Remote Workers',
        });
        expect(headerText).toBeInTheDocument();
    });
});
