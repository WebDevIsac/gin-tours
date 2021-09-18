import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import colors from 'config/colors';

const Form = styled('form')`
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

const BookingForm = ({ accommodations, distillery, restaurants }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        visitors: '4',
        accommodation: accommodations[0],
        // restaurant: restaurants[0],
    });

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        if (Object.values(formValues).every(i => i)) {
            const xhr = new XMLHttpRequest();
            const formUrl = 'https://formspree.io/f/mbjqprqv';

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    setIsLoading(false);
                    if (xhr.response) {
                        const response = JSON.parse(xhr.response);
                        if (response.ok) {
                            navigate(`/tack?email=${formValues.email}`);
                            return;
                        }
                    }

                    console.error('Error');
                }
            };

            xhr.open('POST', formUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ ...formValues, distillery, _replyto: formValues.email }));
        } else {
            setIsLoading(false);
        }
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
                <Input type="email" name="email" id="email" onChange={handleChange} />
            </InputWrapper>
            <InputWrapper>
                <Label for="visitors">Antal personer</Label>
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
            <InputWrapper>
                <Label for="accommodation">Boende</Label>
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
            </InputWrapper>
            {/* <InputWrapper>
                <Label for="accommodation">Middagsrestaurang</Label>
                <Select name="accommodation" id="accommodation" value={formValues.restaurants} onChange={handleChange}>
                    {restaurants.map((restaurant, index) => (
                        <Option key={index} value={restaurant}>
                            {restaurant}
                        </Option>
                    ))}
                </Select>
            </InputWrapper> */}
            <SubmitButton type="submit">SKICKA</SubmitButton>
        </Form>
    );
};

BookingForm.propTypes = {
    accommodations: PropTypes.arrayOf(PropTypes.string),
    distillery: PropTypes.string.isRequired,
    restaurants: PropTypes.arrayOf(PropTypes.string),
};

BookingForm.defaultProps = {
    accommodations: [],
    restaurants: [],
};

export default BookingForm;
