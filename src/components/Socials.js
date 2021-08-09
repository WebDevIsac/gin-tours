import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import SocialIcon from 'components/icons/SocialIcon';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const LinkTag = styled('a')`
    width: 32px;
    height: 32px;

    &:not(:last-of-type) {
        margin-right: 12px;
    }
`;

const query = graphql`
    query {
        allSocialsJson {
            edges {
                node {
                    name
                    url
                    svgPath
                }
            }
        }
    }
`;

const Socials = () => {
    return (
        <StaticQuery
            query={query}
            render={data => (
                <Wrapper>
                    {data.allSocialsJson.edges.map(({ node: { title, url, svgPath } }) => (
                        <LinkTag key={title} href={url} target="_blank" rel="noopener">
                            <SocialIcon path={svgPath} />
                        </LinkTag>
                    ))}
                </Wrapper>
            )}
        />
    );
};

Socials.propTypes = {};

export default Socials;
