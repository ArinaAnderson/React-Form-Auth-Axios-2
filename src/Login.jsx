import React, { useRef, useState, useEffect, useContext } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from './context/AuthProvider.jsx'
import axios from './api/axios.js';

const LOGIN_URL = '/auth';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { auth, setAuth } = useContext(AuthContext)

    const [user, setUser] = useState({
        value: '',
        name: 'username',
        isValid: false,
        isFocused: false,
        // errMessage: 'Username must be start with a letter and contain from 4 up to 24 characters',
    });

    const [pwd, setPwd] = useState({
        value: '',
        name: 'pwd',
        isValid: false,
        isFocused: false,
    });

    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMessage('');
    }, [user.value, pwd.value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user: user.value, pwd: pwd.value }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({ user: user.value, pwd: pwd.value, roles, accessToken });

            setUser((prev) => ({...prev, value: '', isValid: false, isFocused: false }));
            setPwd((prev) => ({...prev, value: '', isValid: false, isFocused: false }));
            setSuccess(true);
        } catch(e) {
            if (!e?.response) {
                setErrMessage('No Server Response');
            } else if (e.response?.status === 400) {
                setErrMessage('Missing Username or Password');
            } else if (e.response?.status === 401) {
                setErrMessage('Unathorized');
            } else {
                setErrMessage('Login Failed')
            }
            
            errRef.current.focus();
            // setErrMessage(e.response.data.message);
            // etErrMessage(e.message);
        }
    };

    const handleInputChange = (e) => {
        
    };
  
    return (
        <>
            {success ? (
                <p>You are logged in! Mrrrr</p>
                // redirect to a home page or user personal area
            ) : (
            <section>
            `    <p ref={errRef} className={errMessage.length > 0 ? "errMsg" : "offscreen"} aria-live="assertive">
                    {errMessage}
                </p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="off"
                            value={user.value}
                            ref={userRef}
                            onChange={(e) => setUser((prev) => ({ ...prev, value: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            value={pwd.value}
                            onChange={(e) => setPwd((prev) => ({...prev, value: e.target.value}))}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn"
                    >
                        Log in
                    </button>
                </form>
                <p></p>
                <p className="sign-up-link">Need an account?</p>
                <p className="link-wrap"><a href="#">Sign Up</a></p>
            </section>
        )}
        </>
    )
};

export default Login;
