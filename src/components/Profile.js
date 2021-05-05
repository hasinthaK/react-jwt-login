import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../services/ConfigProvider';
import { logout } from '../services/LoginService';

const Profile = (props) => {

    const { auth, setAuth } = useContext(Context);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        setAuth(null);
        history.push('');
    }

    return (
        <div>
            <h1>Profile</h1>

            <section>
                <header>
                    My Info
                </header>

                <div>
                    {auth.fname}
                </div>
            </section>
             
            <div className='actions'>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile;