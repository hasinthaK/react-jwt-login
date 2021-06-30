import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../ducks/user.ducks';

const Profile = (props) => {

    const authState = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
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
                    {authState.user.id},
                    {authState.user.email},
                    {authState.user.password}
                </div>
            </section>
             
            <div className='actions'>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile;