import './fonts.css';

export const baseStyle = `
    html {
        font-family: 'EBGaramond';
        height: 100%;
        color: #000;
    }
    
    h1,h2,h3,h4,h5 {
        font-family: 'Lato';

    }

    body {
        padding: 0;
        margin: 0;
        position: relative;
        font-size: 16px;
        line-height: 1em;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;

        &.prevent-scroll {
            overflow: hidden;

            @supports (-webkit-overflow-scrolling: touch) {
                position: fixed;
                width: 100%;
            }
        }
    }

    #root {
        height: 100%;
    }
`;

export const resetStyle = `
    *,
    *::before,
    *::after {
        box-sizing: border-box; /* 1 */
    }

    button {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        &:active, &:focus {
            outline: 0;
        }
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
