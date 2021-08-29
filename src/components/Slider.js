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
                before: 500,
                after: 500,
            }}
            breakpoints={{
                800: {
                    peek: {
                        before: 50,
                        after: 50,
                    },
                },
            }}
            perView={1}
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
