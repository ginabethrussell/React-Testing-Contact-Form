import React from 'react';
import {act, render, rerender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test("renders Contact Form component without errors", () => {
    render(<ContactForm />);
})

test("can add name to First Name field", () => {
    // Arrange
    render(<ContactForm />);
   
    
    // failing, no id match for firstName label, added id in ContactForm.js
    const firstNameInput = screen.getByLabelText(/first name/i);

    // Act
    userEvent.type(firstNameInput, 'Lambda');
    
    // Assert
    expect(firstNameInput).toHaveValue('Lambda');
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
   
    // id is incorrect for email input/mislabeled lastName, edited id in ContactForm.js
    const emailInput = screen.getByLabelText(/email/i);

    // Act
    userEvent.type(emailInput, 'student@lambdaschool.com');
   
    // Assert
    expect(emailInput).toHaveValue('student@lambdaschool.com');
});

test("can add a message to the message field", () => {
    // Arrange
    render(<ContactForm />);

    // id is incorrect for email input/mislabeled lastName, edited id in ContactForm.js
    const messageInput = screen.getByLabelText(/message/i);

    // Act
    userEvent.type(messageInput, 'I love Lambda School! Austen Alred is the bomb.');
    
    // Assert
    expect(messageInput).toHaveValue('I love Lambda School! Austen Alred is the bomb.');
});

test("can not enter a form without email", () => {
    // Arrange
    render(<ContactForm />);
   
    const form = screen.getByTestId('form-element');
    const firstNameInput = screen.getByLabelText(/first name/i);
    const LastNameInput = screen.getByLabelText(/last name/i);
    const submitInput = screen.getByRole('button');
    const preElement = screen.queryByRole('pre');
    

    // Act
    userEvent.type(firstNameInput, 'Lambda');
    userEvent.type(LastNameInput, 'Student');
    userEvent.click(submitInput);
    
    // Assert
    expect(form).not.toContainHTML(preElement);
});

test("can successfully enter form", () => {
    // Arrange
    render(<ContactForm />);
   
    const form = screen.getByTestId('form-element');
    const firstNameInput = screen.getByLabelText(/first name/i);
    const LastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitInput = screen.getByRole('button');
    // const preElement = screen.queryByRole('pre');
    
    // Act
    userEvent.type(firstNameInput, 'Lambda');
    userEvent.type(LastNameInput, 'Student');
    userEvent.type(emailInput, 'lambda-student@lambdaschool.com');
    userEvent.type(messageInput, 'I Love Lambda');

    act(() => {
        userEvent.click(submitInput);
    })

    const preElement = screen.queryByRole('pre');
    // Assert
    expect(firstNameInput).toHaveValue('Lambda');
    expect(preElement).toBeTruthy();
    
});

