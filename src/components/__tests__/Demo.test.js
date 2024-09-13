import { render, screen } from '@testing-library/react';
import Demo from '../Demo';
describe('Demo Page Test Cases', () => {
    test('button should be in the document', () => {
        render(<Demo />);
        const button = screen.getByRole('button');
        // console.log(button);

        expect(button).toBeInTheDocument(); // Use matcher correctly
    });

    test('Input Field should be in the document', () => {
        render(<Demo />);
        const inputPlaceHolder = screen.getByPlaceholderText('input');
        // console.log(inputPlaceHolder);

        expect(inputPlaceHolder).toBeInTheDocument(); // Use matcher correctly
    });
    test('Number Input Field should be in the document', () => {
        render(<Demo />);
        const numberInput = screen.getByRole('spinbutton');
        // console.log(numberInput);

        expect(numberInput).toBeInTheDocument(); // Use matcher correctly
    });
    it('Should contain 2 textBox inputs in the document', () => {
        render(<Demo />);
        const textInput = screen.getAllByRole('textbox');
        expect(textInput).toHaveLength(2);
        expect(textInput.length).toBeTruthy();
        textInput.forEach((element) => {
            expect(element).toBeInTheDocument();
        });

        // expect(textInput).toBeInTheDocument(); // Use matcher correctly
    });
});
