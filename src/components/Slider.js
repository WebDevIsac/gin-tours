import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';

import 'react-glidejs/dist/index.css';

const Slider = ({ children }) => {
    const gliderRef = useRef(null);

    return (
        <Glide
            ref={gliderRef}
            throttle={0}
            type="carousel"
            customSlideAnimation={{
                timeout: 500,
                classNames: 'fade',
            }}
            peek={{
                before: 200,
                after: 200,
            }}
            breakpoints={{
                600: {
                    peek: {
                        before: 60,
                        after: 60,
                    },
                    perView: 1,
                },
                768: {
                    peek: {
                        before: 50,
                        after: 50,
                    },
                    perView: 1.5,
                },
                1024: {
                    peek: {
                        before: 50,
                        after: 50,
                    },
                    perView: 2,
                },
                1440: {
                    peek: {
                        before: 50,
                        after: 50,
                    },
                    perView: 3,
                },
            }}
            perView={3}
            startAt={0}
            slideClassName="slider__frame"
            focusAt="center"
        >
            {children}
        </Glide>
    );
};

Slider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Slider;
