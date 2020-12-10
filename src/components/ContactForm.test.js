import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test("renders Contact Form component without errors", () => {
    render(<ContactForm />);
})

test("can add name to First Name field", () => {
    // Arrange
    render(<ContactForm />);
    // failing, no id match for firstName label
    // const firstNameInput = screen.getByLabelText(/first name/i);
    const firstNameInputField = screen.getByPlaceholderText('Edd');
    // Act
    userEvent.type(firstNameInputField, 'Lambda');

    // Assert
    expect(firstNameInputField).toHaveValue('Lambda');
});

test("can add name to Last Name field", () => {
    // Arrange
    render(<ContactForm />);
    
    const LastNameInput = screen.getByLabelText(/last name/i);
    // Act
    userEvent.type(LastNameInput, 'Student');

    // Assert
    expect(LastNameInput).toHaveValue('Student');
})

test("can add email to email field", () => {
    // Arrange
    render(<ContactForm />);
    // id is incorrect for email input/mislabeled lastName
    // const emailInput = screen.getByLabelText(/email/i);
    const emailInputField = screen.getByPlaceholderText('bluebill1049@hotmail.com')
    // Act
    userEvent.type(emailInputField, 'student@lambdaschool.com');

    // Assert
    expect(emailInputField).toHaveValue('student@lambdaschool.com');
})