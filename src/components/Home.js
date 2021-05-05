import React from 'react';
import { useHistory } from 'react-router';


const Home = (props) => {

    const history = useHistory();

    return (
        <div>
            This is home component
             
            <button onClick={() => history.push('/login')}>
                Go to login
            </button>
        </div>
    )
}

export default Home;