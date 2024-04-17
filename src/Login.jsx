import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const USER_REGEX = /^[aA-zA][aA-zZ0-9-_]{3, 23}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

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
    };

    const handleInputChange = (e) => {
        
    };
  
    return (
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
                        onChange={(e) => setUser((prev) => ({...prev, value: e.target.value}))}
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
    );
     
};

export default Login;
