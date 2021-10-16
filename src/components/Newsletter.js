import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import colors from 'config/colors';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const Wrapper = styled('div')`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.blue};
    padding: 16px;

    ${above.md} {
        height: 600px;
    }
`;

const Heading = styled('span')`
    font-size: 32px;
    line-height: 1em;
    margin-bottom: 32px;
    color: ${colors.white};
    text-align: center;
`;

const Form = styled('form')`
    width: 100%;
    max-width: 440px;

    ${above.md} {
        max-width: 600px;
    }
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

const ButtonWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-top: 32px;
`;

const Button = styled('button')`
    height: 100%;
    width: 120px;
    text-align: center;
    color: white;
    font-size: 24px;
    line-height: 1em;
`;

const SubscribeMsg = styled('div')`
    position: relative;
    width: auto;
    height: 100%;
    color: ${colors.white};
    padding: 8px;

    &.error {
        border-bottom: 1px solid red;
    }
`;

const Msg = styled('span')`
    font-size: 18px;
    line-height: 1em;

    ${above.md} {
        font-size: 20px;
        line-height: 1em;
    }
`;

const Newsletter = () => {
    const [inputEmail, setInputEmail] = useState(null);
    const [statusMsg, setStatusMsg] = useState();
    const inputRef = useRef();

    const inputChange = e => {
        setStatusMsg();
        setInputEmail(e.target.value);
    };

    const submitSignup = async e => {
        e.preventDefault();
        const response = await addToMailchimp(inputEmail);
        const { result, msg } = response;

        if (result === 'success') {
            if (msg.includes('Thank you for subscribing')) {
                setStatusMsg({ text: 'Tack! Du prenumererar nu på vårt nyhetsbrev!', status: 'success' });
            }
        } else if (msg.includes('The email you entered is not valid')) {
            setStatusMsg({ text: 'Du har angett en felaktig e-postadress', status: 'error' });
        } else if (msg.includes('is already subscribed to list')) {
            setStatusMsg({ text: 'Tack! Du prenumererar redan på vårt nyhetsbrev!', status: 'success' });
        }
    };

    const handleMsgClick = () => {
        if (statusMsg.status === 'error') {
            inputRef.current.focus();
        }
    };

    return (
        <Wrapper>
            <Heading>Skriv upp dig på vårt nyhetsbrev</Heading>
            <Form novalidate onSubmit={submitSignup}>
                <InputWrapper>
                    <Input
                        ref={inputRef}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Ange din email"
                        onChange={inputChange}
                    />
                </InputWrapper>
                <ButtonWrapper>
                    {!statusMsg ? (
                        <Button type="submit">Skicka</Button>
                    ) : (
                        <SubscribeMsg className={statusMsg.status} onClick={handleMsgClick}>
                            <Msg>{statusMsg.text}</Msg>
                        </SubscribeMsg>
                    )}
                </ButtonWrapper>
            </Form>
        </Wrapper>
    );
};

Newsletter.propTypes = {};

export default Newsletter;
