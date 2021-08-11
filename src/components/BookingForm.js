import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'config/colors';

const Form = styled('form')`
    padding: 64px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
`;

const InputWrapper = styled('div')`
    margin-bottom: 24px;
    width: 100%;
    position: relative;
`;

const Label = styled('label')`
    font-size: 16px;
    line-height: 1em;
    color: ${colors.grey};
`;

const Input = styled('input')`
    width: 100%;
    height: 40px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 0;
    border: 1px solid ${colors.darkBlue};
    outline: none;
`;

const Select = styled('select')`
    width: 100%;
    height: 40px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 0;
    border: 1px solid ${colors.darkBlue};
    outline: none;
`;

const Option = styled('option')`
    width: 100%;
    height: 40px;
`;

const SubmitButton = styled('button')`
    display: block;
    padding: 12px;
    width: 100%;
    color: ${colors.white};
    background-color: ${colors.darkBlue};
    transition: opacity 300ms ease;

    &:hover {
        opacity: 0.8;
    }
`;

const BookingForm = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        _replyto: '',
        place: '',
    });

    const handleSubmit = e => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        const formUrl = 'https://formspree.io/f/mbjqprqv';
        xhr.open('POST', formUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(formValues));
    };

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Form method="post" onSubmit={handleSubmit}>
            <InputWrapper>
                <Label for="name">Namn</Label>
                <Input type="text" name="name" id="name" onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Label for="email">Email</Label>
                <Input type="email" name="_replyto" id="email" onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Label for="place">Plats</Label>
                <Select name="place" id="place" onChange={handleChange}>
                    <Option value="">Välj destilleri</Option>
                    <Option value="hernö">Hernö</Option>
                    <Option value="härnösand">Härnösand</Option>
                    <Option value="lydens gin">Lydens Gin</Option>
                </Select>
            </InputWrapper>
            <SubmitButton type="submit">SKICKA</SubmitButton>
        </Form>
    );
};

export default BookingForm;
