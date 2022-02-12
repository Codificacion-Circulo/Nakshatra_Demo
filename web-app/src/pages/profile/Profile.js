import "./Profile.css";
import React, { useEffect, useState } from 'react'
import { MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from "../../store";
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')
toast.configure();
const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({})
  const authCtx = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: ""
  })
  const captureFile = async (e) => {
    setLoading(true)
    let file = e.target.files[0];
    const token = localStorage.getItem('token');
      if(token){
        const added = await client.add({path:file.name,content:file},{
          wrapWithDirectory: true,
        })
        const url = `https://ipfs.infura.io/ipfs/${added.cid.toString()}/${file.name}`
        setUser((prevState)=>{ return {...prevState, photo: url }});
    setLoading(false)
   } };
  const handleDelete = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios
        .delete(
          'https://nakshatra-demo.herokuapp.com/api/users/deleteMe', { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true }
        )
      if (response) {
        dispatch(authAction.removeData())
        toast.success("User Account Deleted", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      setLoading(false)
      window.location = "/";
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = user;
      console.log(data)
      const response = await axios
        .patch(
          'https://nakshatra-demo.herokuapp.com/api/users/updateMe', data, { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true }
        )
      if (response) {
        dispatch(authAction.setData(response))
      }
      setLoading(false)
      toast.success("Details Updated!", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  useEffect(() => {
    const getTodo = () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if(authCtx._id){
        axios.get(`https://nakshatra-demo.herokuapp.com/api/users/${authCtx&&authCtx._id}/reports`, { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true })
        .then((response) => {
          setDetails(response.data)
          setLoading(false)
        })
        .catch((e) => {
          console.log('something went wrong :(', e);
          toast.error(e.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false)
        });
      }
    };
    getTodo();
  }, [authCtx]);
  useEffect(() => {
      setUser({
        name: authCtx.name,
        email: authCtx.email,
        photo: authCtx.photo
      })
  }, [authCtx])
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="profile__container d-flex flex-column align-items-center">
        <div className="profile__sectionHeading d-flex justify-content-center">
          <p className="mb-0" style={{color: "#064848"}}>Edit Profile</p>
        </div>
        <div className="profile__infoContainer row">
          <form>
            <div className="profile__imgContainer col-6 d-flex flex-column align-items-center">
              <p className="fw-bolder">Profile Image</p>
              <input
                name="profileImage"
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={captureFile}
              />
              <label htmlFor="profileImage" className="profile__imgLabel"  style={{ backgroundImage: `url(${authCtx && authCtx.photo})`}}></label>
            </div>
            <div className="profile__inputContainer col-6">
              <div className="profile__inputDiv mb-3">
                <label htmlFor="username" className="fw-bolder form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e) => setUser((prevState)=>{ return {...prevState, name: e.target.value }})}
                  value={user && user.name}
                />
              </div>
              <div className="profile__inputDiv mb-3">
                <label htmlFor="email" className="fw-bolder form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={user && user.email}
                  disabled={true}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="profile__submitBtn d-inline">
                <button type="submit" onClick={handleSubmit} className="m-1 fw-bolder">Save Changes</button>
              </div>
              <div className="profile__submitBtnd d-inline">
                <button type="button" onClick={handleDelete} className="m-1 fw-bolder">Delete Account</button>
              </div>

            </div>
          </form>
        </div>

      </div>
      <MDBRow className='row-cols-1 row-cols-md-2 g-4 p-4 d-flex justify-content-center'>
        {details && details.results > 0 && details.data.data.map((el, index) => {
          return <HistoryCard key={index} data={el}></HistoryCard>
        })}
      </MDBRow>
    </>
  );
};

export default Profile;
