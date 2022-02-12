import React, { useState, Fragment } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import './style.css'
toast.configure();

function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [details, setdetails] = useState({
        email: ""
    })
    const handleSumbit = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const data = details;
            const response = await axios
                .post(
                    'http://nakshatra-demo.herokuapp.com/api/users/forgotPassword',
                    data
                )
            console.log(response)
            setdetails({
                email: "",
                password: ""
            })
            setLoading(false)
            toast.success("Mail Sent", {
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

                    <h3>Forgot Password</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={details.email} onChange={(e) => setdetails({ ...details, email: e.target.value })} required />
                    </div>


                    {/* <div className="form-group">
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" />
        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    </div>
</div> */}

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Send Reset Link</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        </Fragment>
    );
}

export default ForgotPassword
