import { useEffect, useState } from 'react';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(1024);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return windowWidth;
};

export { useWindowWidth };
