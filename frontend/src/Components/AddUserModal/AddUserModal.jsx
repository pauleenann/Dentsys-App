import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import "./AddUserModal.css";

const AddUserModal = ({ open, close, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    account_type: "",
    u_fname: "",
    u_lname: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.account_type) newErrors.account_type = "Account type is required.";
    if (!formData.u_fname) newErrors.u_fname = "First name is required.";
    if (!formData.u_lname) newErrors.u_lname = "Last name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:80/api2/user/save", {
        action: "check",
        username: formData.username,
      });

      if (response.data.exists) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      const addResponse = await axios.post("http://localhost:80/api2/user/save", {
        action: "addUser",
        ...formData,
      });

      if (addResponse.data.success) {
        alert("User added successfully!");
        onSuccess();
        close(); // Close the modal
      } else {
        alert("Error adding user: " + addResponse.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add user. Please try again.");
    }
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <div className="add-user-modal-container">
      <div className="add-user-modal-overlay" onClick={close}></div>
      <div className="add-user-modal-box">
        <div className="add-user-modal-header row">
          <span className="col-7">Add User</span>
          <div className="col-5 text-end">
            <button className="edit-user-close" onClick={close}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="add-user-modal-inputs row">
          <div className="add-user-modal-input col-4">
            <label>First Name:</label>
            <input type="text" name="u_fname" value={formData.u_fname} onChange={handleInputChange} />
            {errors.u_fname && <p className="error">{errors.u_fname}</p>}
          </div>
          <div className="add-user-modal-input col-4">
            <label>Last Name:</label>
            <input type="text" name="u_lname" value={formData.u_lname} onChange={handleInputChange} />
            {errors.u_lname && <p className="error">{errors.u_lname}</p>}
          </div>
          <div className="add-user-modal-input col-4">
            <label>Role:</label>
            <select name="account_type" value={formData.account_type} onChange={handleInputChange}>
              <option value="">Select Role</option>
              <option value="dentist">Dentist</option>
              <option value="staff">Staff</option>
            </select>
            {errors.account_type && <p className="error">{errors.account_type}</p>}
          </div>
          <div className="add-user-modal-input col-4">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="add-user-modal-input col-4">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="add-user-modal-input col-4">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="add-user-modal-button-container">
          <button className="add-user-modal-button" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AddUserModal;
