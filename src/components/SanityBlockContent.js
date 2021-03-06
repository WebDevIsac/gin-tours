/* eslint-disable react/display-name, react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';

const Wrapper = styled('div')`
    font-size: 20px;
    line-height: 1.4em;

    a {
        text-decoration: underline;
        transition: opacity 300ms ease;

        &:hover {
            opacity: 0.6;
        }
    }
`;

const SanityBlockContent = ({ blocks }) => {
    const serializers = {
        marks: {
            internalLink: ({ mark, children }) => {
                const { slug = {} } = mark;
                const href = `/${slug.current}`;
                return <Link to={href}>{children}</Link>;
            },
            link: ({ mark, children }) => {
                const { blank, href } = mark;
                return blank ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                ) : (
                    <a href={href}>{children}</a>
                );
            },
        },
    };

    return (
        <Wrapper>
            <BlockContent blocks={blocks} serializers={serializers} />
        </Wrapper>
    );
};

SanityBlockContent.propTypes = {
    blocks: PropTypes.object.isRequired,
};

export default SanityBlockContent;
