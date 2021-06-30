import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../ducks/user.ducks';

const Login = (props) => {

    const [loginCreds, setLoginCreds] = useState({ email: '', password: '' });
    const [isLoginFormInvalid, setisLoginFormInvalid] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        e.persist();
        switch (e.target.name) {
            case 'email':
                setLoginCreds((oldCreds) => ({ ...oldCreds, email: e.target.value }));
                break;
            case 'password':
                setLoginCreds((oldCreds) => ({ ...oldCreds, password: e.target.value }));
                break;
        }
        setisLoginFormInvalid(loginCreds.email === '' || loginCreds.password === '');
    }

    const handleLogin = async () => {
        if (loginCreds.email === '' || loginCreds.password === '') return alert('Both are required!');
        try {
            dispatch(loginUser({ email: loginCreds.email, password: loginCreds.password }));
            history.push('/profile');
        } catch (err) {
            console.error(err.message);
            alert('Error occurred while logging you in!');
        }
    }

    return (
        <div>
            This is login component <br />

            <div className='form-field'>
                <label>Email: </label>
                <input name='email' value={loginCreds.email} onChange={handleInputChange} />
            </div>
            <div className='form-field'>
                <label>Password: </label>
                <input name='password' value={loginCreds.password} onChange={handleInputChange} />
            </div>

            <div className='actions'>
                <button disabled={isLoginFormInvalid} onClick={handleLogin}>Login</button>
            </div>

        </div>
    )
}

export default Login;