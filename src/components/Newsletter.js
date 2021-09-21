import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'config/colors';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const Wrapper = styled('div')`
    height: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.blue};
`;

const Heading = styled('span')`
    font-size: 32px;
    line-height: 1em;
    margin-bottom: 32px;
    color: ${colors.white};
`;

const Form = styled('form')`
    width: 600px;
    height: 240px;
`;

const InputWrapper = styled('div')``;

const Input = styled('input')`
    width: 100%;
    height: 40px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 0;
    border: 1px solid ${colors.darkBlue};
    background-color: ${colors.white};
    outline: none;
`;

const Button = styled('button')`
    width: 100%;
    height: 40px;
    background-color: white;
    margin-top: 32px;
`;

const ErrorMsg = styled('span')`
    display: inline-block;
    width: 100%;
    margin-top: 12px;
    color: ${colors.red};
    text-align: center;
`;

const SubscribeMsg = styled('span')`
    display: inline-block;
    width: 100%;
    margin-top: 12px;
    color: ${colors.green};
    text-align: center;
`;

const Newsletter = () => {
    const [inputEmail, setInputEmail] = useState(null);
    const [status, setStatus] = useState(null);

    const inputChange = e => {
        setStatus(null);
        setInputEmail(e.target.value);
    };

    const submitSignup = async e => {
        e.preventDefault();
        const response = await addToMailchimp(inputEmail);
        const { result, msg } = response;

        if (result === 'success') {
            if (msg.includes('Thank you for subscribing')) {
                setStatus('success');
            }
        } else if (msg.includes('The email you entered is not valid')) {
            setStatus('notValid');
        } else if (msg.includes('is already subscribed to list')) {
            setStatus('alreadySubscribed');
        }
    };

    return (
        <Wrapper>
            <Heading>Skriv upp dig för vårt nyhetsbrev</Heading>
            <Form novalidate onSubmit={submitSignup}>
                <InputWrapper>
                    <Input type="email" name="email" id="email" placeholder="Ange din email" onChange={inputChange} />
                </InputWrapper>
                <Button type="submit">Skicka</Button>
                {status === 'notValid' && <ErrorMsg>Du har angett en felaktig e-postadress</ErrorMsg>}
                {status === 'success' && <SubscribeMsg>Tack! Du prenumererar nu på vårt nyhetsbrev!</SubscribeMsg>}
                {status === 'alreadySubscribed' && (
                    <SubscribeMsg>Tack! Du prenumererar redan på vårt nyhetsbrev!</SubscribeMsg>
                )}
            </Form>
        </Wrapper>
    );
};

Newsletter.propTypes = {};

export default Newsletter;
