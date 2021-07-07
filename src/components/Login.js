import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginUser } from '../ducks/user.ducks';

const Login = (_) => {

    const [loginCreds, setLoginCreds] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isFormPristine, setisFormPristine] = useState(true);

    // auth state
    const { error, user } = useSelector(state => state.auth);

    const history = useHistory();
    const dispatch = useDispatch();

    // handle auth errors
    useEffect(() => {
        // on login success
        if (!error && user)
            return history.push('/profile');

        if (error)
            alert('Error occurred while logging you in!');

        // clean up the error once shown
        return () => dispatch(clearAuthError());
    }, [error]);

    const handleInputChange = (e) => {
        // make form touched on initial input
        if (isFormPristine)
            setisFormPristine(false);

        const name = e.target.name;
        const value = e.target.value;
        // clear any auth errors next time user touches the form
        if (error)
            dispatch(clearAuthError());

        // handle form errors for each field
        switch (name) {
            case 'email': {
                // check if the email is not empty
                if (value === '')
                    setFormErrors(prev => ({
                        ...prev,
                        [name]: 'Email cannot be empty!'
                    }));
                else
                    resetFormErrorForName(name);
                break;
            }
            case 'password': {
                // check if the password is not empty
                if (value === '')
                    setFormErrors(prev => ({
                        ...prev,
                        [name]: 'Password cannot be empty!'
                    }));
                else
                    resetFormErrorForName(name);
                break;
            }
            default:
                resetFormErrorForName(name);
        }

        setLoginCreds(prevCreds => ({ ...prevCreds, [name]: value }));
    }

    const resetFormErrorForName = name => {
        setFormErrors(prev => {
            const errors = { ...prev };
            delete errors[name];
            return { ...errors };
        });
    }

    const handleLogin = () => {
        if (loginCreds.email === '' || loginCreds.password === '') return alert('Both are required!');

        dispatch(loginUser({ ...loginCreds }));
    }

    return (
        <div>
            This is login component <br />

            <div className='form-field'>
                <label>Email: </label>
                <input name='email' value={loginCreds.email} onChange={handleInputChange} />
                {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
            </div>
            <div className='form-field'>
                <label>Password: </label>
                <input name='password' value={loginCreds.password} onChange={handleInputChange} />
                {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
            </div>

            <div className='actions'>
                <button disabled={Object.keys(formErrors).length > 0 || isFormPristine} onClick={handleLogin}>Login</button>
            </div>

        </div>
    )
}

export default Login;