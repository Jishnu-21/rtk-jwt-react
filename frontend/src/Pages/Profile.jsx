import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changeUserImage, getUserData } from '../features/auth/authSlice';
import Header from '../components/Header';

const Profile = () => {
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "my-app");
      data.append("cloud_name", "dkgjl08a5");

      const response = await fetch("https://api.cloudinary.com/v1_1/dkgjl08a5/image/upload", {
        method: "post",
        body: data,
      });
      const responseData = await response.json();
      dispatch(changeUserImage(responseData.url));
      toast.success("Image successfully updated");
      dispatch(getUserData()); // Fetch updated user data
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a delay
      }, 2000); // Refresh after 2 seconds (adjust the delay as needed)
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error);
    }
  };

  return (
    <>
      <Header/>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={user?.image_url || "../public/user-profile-icon-vector-avatar-600nw-2247726673.webp"}
                      alt='Profile Picture'
                      className="img-fluid"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="card-title">Name: {user?.name}</h5>
                    <p className="card-text">Email: {user?.email}</p>

                    <form onSubmit={handleAddPhoto}>
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                        <input type="file" id="formFileLg" onChange={handlePhotoChange} />
                      </div>
                      <div className="d-flex pt-1">
                        <button type="submit" className="me-1 flex-grow-1 btn btn-dark">Add Profile Picture</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
