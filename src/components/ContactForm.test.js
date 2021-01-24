import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import getPostData from '../utils/getPostData';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

beforeEach(() => {
    jest.resetModules();
})
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
    
    // Act
    userEvent.type(firstNameInput, 'Lambda');
    userEvent.type(LastNameInput, 'Student');
    userEvent.click(submitInput);
    
    // Assert
    waitFor(()=> {
        expect(screen.queryByTestId('pre-element')).toBeNull();
    });
   
});

test("can successfully enter form", async () => {
    // Arrange
    // screen.debug()
    render(<ContactForm />);
    // screen.debug()
   
    const firstNameInput = screen.getByLabelText(/first name/i);
    const LastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitInput = screen.getByRole('button');
    
    // Act
    // type entries into all required fields
    userEvent.type(firstNameInput, 'Lambda');
    userEvent.type(LastNameInput, 'Student');
    userEvent.type(emailInput, 'lambda-student@lambdaschool.com');

    // screen.debug();
    // submit form
    userEvent.click(submitInput);
   
    // Assert
    waitFor(()=> {
        expect(screen.getByTestId('pre-element')).toBeInTheDocument();
    });
    
    // screen.debug();
});

const server = setupServer(
    rest.post('https://reqres.in/api/users', (req,res, ctx) => {
        return res(
            ctx.status(201), 
            ctx.json({
            'firstName': 'Lambda',
            'lastName': 'Student',
            'email': 'lambda-student@lambdastudents.com',
            'message': 'I love tests',
            'id': '320',
            'createdAt': '2020-12-10T16:46:06.240Z'
        }))
    })
);
beforeAll(() => server.listen());
afterAll(() =>server.close());
afterEach(() => server.resetHandlers());

test('can successfully make api post request and display JSON response', async () => {
    // Arrange 
    const data = {
        'firstName': 'Lambda',
        'lastName': 'Student',
        'email': 'lambda-student@lambdastudents.com',
        'message': 'I love tests'
    };
    // Act

    const returnedData = await getPostData(data);
    expect(returnedData).toEqual({
        'firstName': 'Lambda',
        'lastName': 'Student',
        'email': 'lambda-student@lambdastudents.com',
        'message': 'I love tests',
        'id': '320',
        'createdAt': '2020-12-10T16:46:06.240Z'
    })

});

