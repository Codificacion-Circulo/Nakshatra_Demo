import "./Profile.css";

const Profile = () => {
  return (
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
              {/* {profile && profile.profileImage ? (
                      <div
                        className="select-asset-image"
                        style={{ backgroundImage: `url(${profileImage || profile.profileImage})` }}
                      ></div>
                    ) : (
                      <i className="fas fa-image"></i>
                    )} */}
            </label>
          </div>
          <div className="profile__inputContainer col-6">
            <div className="profile__inputDiv mb-3">
                <label htmlFor="username" class="fw-bolder form-label">Name</label>
                <input
                type="text"
                className="form-control"
                id="username"
              />
            </div>
            <div className="profile__inputDiv mb-3">
              <label for="email" class="fw-bolder form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="profile__submitBtn">
                <button type="submit" className="fw-bolder">Submit</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
