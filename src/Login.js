import axios from 'axios';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogo from "./assets/img/google.svg"
import auth from './firebase.init';
import './Login.css';


const Login = () => {
    const navigate = useNavigate()
    const [signInWithGoogle, googleUser, googleLoading, goolgeError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [codeError, setCodeError] = useState('')
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const hanldeEmailchange = e => {
        setEmail(e.target.value)

    }
    const hanldePasswordChange = e => {
        setPassword(e.target.value);
    }
    const handleSubmit = async e => {
        e.preventDefault()
        signInWithEmailAndPassword(email, password)



    }
    let location = useLocation();
    let from = location?.state?.from?.pathname || "/";
    if (user || googleUser) {

        navigate(from, { replace: true })


    }
    const hanldePassworReset = async (e) => {
        if (email) {
            await sendPasswordResetEmail(email)
            toast('Password reset email sent')
        }
        else (
            setCodeError("Please Input email first")

        )
    }
    return (
        <div className='mt-5 d-flex align-items-center justify-content-center '>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input onChange={hanldeEmailchange} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="">
                        <label className="form-label">Password</label>
                        <input required onChange={hanldePasswordChange} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    {
                        error && <p style={{ color: 'red' }}>{error?.message}</p>
                    }
                    {
                        codeError && <p style={{ color: 'red' }}>{codeError}</p>
                    }
                    {
                        goolgeError && <p style={{ color: 'red' }}>{goolgeError?.message}</p>
                    }
                    {
                        loading && <Spinner animation="border" variant="warning" />
                    }
                    <div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </div>
                    <span onClick={hanldePassworReset} className='cursor '>Forgot password?</span>
                    <h6 className='text-center mt-3' style={{ cursor: "pointer" }}><Link to="/signup">
                        New to furnob? Signup</Link></h6>



                </form >
                <div className='input-wrapper d-flex justify-content-center'>
                    <button onClick={async () => await signInWithGoogle()} className='google-auth btn w-100 d-flex justify-content-around border mt-2'>
                        <img src={GoogleLogo} alt='' />
                        <p className='mt-2'> Continue with Google </p>
                    </button>
                </div>
            </div>

        </div >
    );
};

export default Login;