import React, { useState, Fragment } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
toast.configure();

function Login() {
    const loginCtx = useSelector(state => state.auth.data)

    const [loading, setLoading] = useState(false)
    const [details, setdetails] = useState({
        email: "",
        password: ""
    })
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
            if(response){
                console.log(response)
                localStorage.setItem('token', response.data.token);
            }
            setdetails({
                email: "",
                password: ""
            })
            setLoading(false)
            toast.success("Login Success !", {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message, {
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

                    {/* <div className="form-group">
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" />
        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    </div>
</div> */}

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
