import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import colors from 'config/colors';

const Form = styled('form')`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    padding: 64px 0;

    ${above.md} {
        padding: 64px 32px;
    }
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
    background-color: ${colors.white};
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
    background-color: ${colors.white};
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

const LoadingWrapper = styled('div')`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spinner = styled('div')`
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 4px solid ${colors.darkBlue};
    border-right: 4px solid transparent;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;

    @keyframes spinner-border {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

const BookingForm = ({ accommodations, distillery /* restaurants */ }, ref) => {
    const [state, setState] = useState({
        isLoading: false,
        validationError: null,
    });

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        visitors: '4',
        // accommodation: accommodations[0],
        // restaurant: restaurants[0],
    });

    const handleSubmit = e => {
        e.preventDefault();
        setState({
            ...state,
            isLoading: true,
            validationError: null,
        });

        if (Object.values(formValues).every(i => i)) {
            const xhr = new XMLHttpRequest();
            const formUrl = 'https://formspree.io/f/mbjqprqv';

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    setState({
                        ...state,
                        isLoading: false,
                    });
                    if (xhr.response) {
                        const response = JSON.parse(xhr.response);
                        if (response.ok) {
                            navigate(`/tack?email=${formValues.email}`);
                            return;
                        }
                    }

                    setState({
                        ...state,
                        isLoading: false,
                        validationError: 'Något gick fel, försök igen eller kontakta oss gärna',
                    });

                    console.error('Error');
                }
            };

            xhr.open('POST', formUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ ...formValues, distillery, _replyto: formValues.email }));
        } else {
            setState({
                ...state,
                validationError: 'Fyll i all information',
                isLoading: false,
            });
        }
    };

    const handleChange = e => {
        if (state.validationError) {
            setState({
                ...state,
                validationError: null,
            });
        }

        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Form ref={ref} method="post" onSubmit={handleSubmit}>
            <InputWrapper>
                <Label htmlFor="name">Namn</Label>
                <Input type="text" name="name" id="name" onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" id="email" onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor="visitors">Antal personer</Label>
                <Select name="visitors" id="visitors" value={formValues.visitors} onChange={handleChange}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10+">10+</Option>
                </Select>
            </InputWrapper>
            {/* <InputWrapper>
                <Label htmlFor="accommodation">Boende</Label>
                <Select
                    name="accommodation"
                    id="accommodation"
                    value={formValues.accommodation}
                    onChange={handleChange}
                >
                    {accommodations.map((accommodation, index) => (
                        <Option key={index} value={accommodation}>
                            {accommodation}
                        </Option>
                    ))}
                </Select>
            </InputWrapper> */}
            {/* <InputWrapper>
                <Label htmlFor="accommodation">Middagsrestaurang</Label>
                <Select name="accommodation" id="accommodation" value={formValues.restaurants} onChange={handleChange}>
                    {restaurants.map((restaurant, index) => (
                        <Option key={index} value={restaurant}>
                            {restaurant}
                        </Option>
                    ))}
                </Select>
            </InputWrapper> */}
            {!!state.validationError && <span>{state.validationError}</span>}
            <SubmitButton type="submit">BOKA</SubmitButton>
            {state.isLoading && (
                <LoadingWrapper>
                    <Spinner />
                </LoadingWrapper>
            )}
        </Form>
    );
};

BookingForm.propTypes = {
    accommodations: PropTypes.arrayOf(PropTypes.string),
    distillery: PropTypes.string.isRequired,
    // restaurants: PropTypes.arrayOf(PropTypes.string),
};

BookingForm.defaultProps = {
    accommodations: [],
    // restaurants: [],
};

export default forwardRef(BookingForm);
