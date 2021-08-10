import React from 'react';
import styled from '@emotion/styled';

const Form = styled('form')``;

const BookingForm = () => {
    return (
        <Form method="post" action="https://formspree.io/kundservice@gintours.se">
            <label>Email</label>
            <input type="email" name="_replyto" />
            <button type="submit">SKICKA</button>
        </Form>
    );
};

export default BookingForm;
