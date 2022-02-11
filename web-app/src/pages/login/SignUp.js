import React, {useState,Fragment} from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import './style.css'
toast.configure();
function SignUp() {
    const [loading, setLoading] = useState(false)
    const [details, setdetails] = useState({
        name:"",
        email:"",
        password:"",
        passwordConfirm:""
    })
    const handleSumbit= async (event)=>{
        event.preventDefault()
        setLoading(true);
        try {
            const data=details;
            if(!(data.password===data.passwordConfirm)){
                setLoading(false)
                toast.warn("Password Do Not Match !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                
                return
            }
            const response=await axios
                .post(
                    'https://nakshatra-neuraldescent.herokuapp.com/api/users/signup',
                    data
                )
                console.log(response)
            setdetails({
                name:"",
                email:"",
                password:"",
                passwordConfirm:""
            })
            setLoading(false)
            toast.success("SignUp Success !", {
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
        {loading&&<LoadingSpinner/>}
            <div className="container">
            <form onSubmit={handleSumbit}>
            <h3>Register</h3>

<div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="Name" value={details.name} onChange={(e)=>setdetails({...details,name:e.target.value})} required='true'/>
</div>

<div className="form-group">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="Enter email" value={details.email} onChange={(e)=>setdetails({...details,email:e.target.value})} required='true'/>
</div>

<div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Enter password" value={details.password} onChange={(e)=>setdetails({...details,password:e.target.value})} required='true'/>
</div>

<div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Enter password" value={details.passwordConfirm} onChange={(e)=>setdetails({...details,passwordConfirm:e.target.value})} required='true'/>
</div>

<button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
<p className="forgot-password text-right">
    Already registered <a href="#">log in?</a>
</p>
            </form>
        </div>
        </Fragment>
    );
}


export default SignUp