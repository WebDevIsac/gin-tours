import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import colors from 'config/colors';

const StyledGlide = styled(Glide)`
    & [data-glide-el='controls'] {
        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 35%;
            cursor: pointer;
            background-color: ${colors.white}CC;
            border-radius: 100%;
            padding: 8px;

            ${above.lg} {
                top: 40%;
                padding: 12px;
            }

            &:first-of-type {
                left: 8px;
            }

            &:last-of-type {
                right: 8px;
            }

            & > svg {
                width: 28px;
                height: 28px;

                ${above.lg} {
                    width: 32px;
                    height: 32px;
                }

                & > polyline {
                    stroke: ${colors.blue};
                }
            }
        }
    }
`;

const Slider = ({ children, type, rewind, startAt }) => {
    const gliderRef = useRef(null);

    return (
        <StyledGlide
            bound
            ref={gliderRef}
            throttle={100}
            type={type}
            rewind={rewind}
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
            startAt={startAt}
        >
            {children}
        </StyledGlide>
    );
};

Slider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    rewind: PropTypes.bool,
    startAt: PropTypes.number,
    type: PropTypes.string,
};

Slider.defaultProps = {
    rewind: false,
    startAt: 1,
    type: 'slider',
};

export default Slider;
