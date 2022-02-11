import React, { useState, Fragment } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import './style.css'
toast.configure();

function ResetPassword() {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [details, setdetails] = useState({
        password: "",
        passwordConfirm: ""
    })
    const handleSumbit = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const data = details;
            if (!(data.password === data.passwordConfirm)) {
                setLoading(false)
                toast.warn("Password Do Not Match !", {
                    position: toast.POSITION.TOP_RIGHT
                });

                return
            }
            const response = await axios
                .post(
                    `https://nakshatra-demo.herokuapp.com/api/users/resetPassword/${params && params.id && params.id}`,
                    data
                )
            console.log(response)
            setdetails({
                password: "",
                passwordConfirm: ""
            })
            setLoading(false)
            toast.success("Password Reset !", {
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

                    <h3>Password Reset</h3>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={details.password} onChange={(e) => setdetails({ ...details, password: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={details.passwordConfirm} onChange={(e) => setdetails({ ...details, passwordConfirm: e.target.value })} required />
                    </div>

                    {/* <div className="form-group">
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" />
        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    </div>
</div> */}

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Reset Password</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="/forgotPassword">password?</a>
                    </p>
                </form>
            </div>
        </Fragment>
    );
}

export default ResetPassword
