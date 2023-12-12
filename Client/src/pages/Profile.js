import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row } from "antd";
import Spinner from "../components/Spinner";
import Footer from "./Footer";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/profile/${user.username}`);
        setUserData(response.data);
        
        setEditedEmail(response.data.email);
        setEditedPassword(response.data.password);
        setEditedPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/users/profile/${user.username}`, {
        
        email: editedEmail,
        password: editedPassword,
        phone: editedPhone,
      });
      setUserData({
        ...userData,
        
        email: editedEmail,
        password: editedPassword,
        phone: editedPhone,
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <DefaultLayout>
      <Row className="main-row" justify="center">
        <h1 className="Main-heading-home">
          Here is your<span className="ml-2 mr-2"> Profile</span> 🚗
        </h1>
      </Row>
      <Row className="main-row" justify="center">
        {userData ? (
          <>
            {editMode ? (
              <>
                <label>Username:</label>
                <label>{user.username}</label>
                <label>Email:</label>
                <input value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                <label>Password:</label>
                <input value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} />
                <label>Phone:</label>
                <input value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
              </>
            ) : (
              <>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <p>Password: {userData.password}</p>
                <p>Phone: {userData.phone}</p>
              </>
            )}
            {editMode ? (
              <>
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <button onClick={handleEdit}>Edit</button>
              </>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </Row>
      <Footer />
    </DefaultLayout>
  );
}

export default Profile;
