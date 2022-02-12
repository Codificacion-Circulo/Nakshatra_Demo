import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from "../../store";
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Login() {
    const [loading, setLoading] = useState(false)
    const [details, setdetails] = useState({
        email: "",
        password: ""
    })
    const authCtx = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSumbit = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const data = details;
            const response = await axios
                .post(
                    'https://nakshatra-demo.herokuapp.com/api/users/login',
                    data
                )
            if (response) {
                dispatch(authAction.updateData(response.data))
                toast.success(`Welcome Back ${response.data.data.user.name}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setdetails({
                email: "",
                password: ""
            })
            setLoading(false)
            window.location = "/profile";
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <Fragment>
            {loading && <LoadingSpinner />}
            <div className='container'>
                <form onSubmit={handleSumbit}>

                    <h3>Log in</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={details.email} onChange={(e) => setdetails({ ...details, email: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={details.password} onChange={(e) => setdetails({ ...details, password: e.target.value })} required />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="/forgotPassword">password?</a>
                    </p>
                </form>
            </div>
        </Fragment>
    );
}

export default Login
