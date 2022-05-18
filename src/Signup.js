import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleLogo from "./assets/img/google.svg"
import auth from './firebase.init';
import { toast } from 'react-toastify';

import { Spinner } from 'react-bootstrap';

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, goolgeError] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [codeError, setCodeError] = useState('')
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [sendEmailVerification, sending, VerificationError] = useSendEmailVerification(auth);

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    const hanldePasswordChange = e => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = e => {
        setConfirmPass(e.target.value)
    }
    const handleSignup = async (e) => {
        e.preventDefault()

        if (password !== confirmPass) {

            setCodeError("two password mismatched")
            return
        }


        createUserWithEmailAndPassword(email, password)
        await sendEmailVerification();




    }
    const navigate = useNavigate()
    let location = useLocation();
    let from = location?.state?.from?.pathname || "/";
    if (user || googleUser) {
        navigate(from, { replace: true })
    }
    const handleGoogle = async e => {
        e.preventDefault()
        await signInWithGoogle()
    }
    if (user) {
        toast('Verification mail sent')
    }

    return (
        <div>
            <div className='mt-5 d-flex align-items-center justify-content-center '>
                <div>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input onChange={handleEmailChange} type="email" className="form-control" name="email" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input onChange={hanldePasswordChange} type="password" className="form-control" required name="password" />
                        </div>
                        <div className="">
                            <label className="form-label">confirm Passoword</label>
                            <input onChange={handleConfirmPassword} type="password" className="form-control" required name="confirmPassword" />
                        </div>
                        <Link to="/login"><h6 className='mt-3'> Already have an account? Login</h6></Link>
                        {
                            codeError && <p style={{ color: 'red' }}>{codeError}</p>
                        }
                        {
                            error && <p style={{ color: 'red' }}>{error?.message}</p>
                        }
                        {
                            goolgeError && <p style={{ color: 'red' }}>{goolgeError?.message}</p>
                        }
                        {
                            loading && <Spinner animation="border" variant="warning" />
                        }
                        <button type="submit" className="btn btn-primary mt-3 w-100">Signup</button>

                    </form>
                    <div className='mb-3 d-flex justify-content-center'>
                        <button onClick={handleGoogle} className='google-auth btn w-100 d-flex justify-content-around border mt-3'>
                            <img src={GoogleLogo} alt='' />
                            <p className='mt-2'> Continue with Google </p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;