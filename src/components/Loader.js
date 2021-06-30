import React from 'react';
import { useSelector } from 'react-redux';

// Loader component
const Loader = () => {

    const loader = useSelector(state => state.loader);

    const renderLoader = () => {
        // render app-level loader if the loader is for app
        if (loader.request === 'app' && loader.loading)
            return <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100vh', fontSize: '4rem', backgroundColor: 'grey', zIndex: '10000' }}>
                Loading..
            </div>;

        return null;
    }

    return (
        <>
            {renderLoader()}
        </>
    )
}

export default Loader;