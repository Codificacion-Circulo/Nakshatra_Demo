import "./Profile.css";
import React, { useEffect, useState } from 'react'
import { MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();
const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({})
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo:""
  })

  useEffect(() => {
    const getTodo = () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const reqOne = axios.get('https://nakshatra-demo.herokuapp.com/api/users/me', { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true })
      const reqTwo = axios.get('https://nakshatra-demo.herokuapp.com/api/reports', { headers: { "Authorization": `Bearer ${token}` }, withCredentials: true })
      axios.all([reqOne, reqTwo]).then(axios.spread((...responses) => {
        setDetails(responses[1].data)
        setUser(responses[0].data.data.data)
        setLoading(false)
      }))
        .catch((e) => {
          console.log('something went wrong :(', e);
          toast.error(e.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false)
        });
    };
    getTodo();
  }, []);
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="profile__container d-flex flex-column align-items-center">
        <div className="profile__sectionHeading d-flex justify-content-center">
          <p className="mb-0">Edit Profile</p>
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
              />
              <label htmlFor="profileImage" className="profile__imgLabel">
              {user && user.photo ? (
                  <div
                    className="select-asset-image"
                    style={{ backgroundImage: `url(${user&&user.photo})` }}
                  ></div>
                ) : (
                  <i className="fas fa-image"></i>
                )}
              </label>
            </div>
            <div className="profile__inputContainer col-6">
              <div className="profile__inputDiv mb-3">
                <label htmlFor="username" className="fw-bolder form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e)=>setUser({...user,name:e.target.value})}
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
                  onChange={(e)=>setUser({...user,email:e.target.value})}
                  value={user && user.email}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="profile__submitBtn d-inline">
                <button type="submit" className="m-1 fw-bolder">Submit</button>
              </div>
              <div className="profile__submitBtnd d-inline">
                <button type="button" className="m-1 fw-bolder">Delete Account</button>
              </div>

            </div>
          </form>
        </div>

      </div>
      <MDBRow className='row-cols-1 row-cols-md-2 g-4 p-4'>
        {details && details.results > 0 && details.data.data.map((el, index) => {
          return <HistoryCard key={index} data={el}></HistoryCard>
        })}
      </MDBRow>
    </>
  );
};

export default Profile;
