import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "student", // or other roles as needed
    class_id: "", // if applicable
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosClient.get("/api/classes");
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/api/auth/register", formData);
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="crancy-wc__heading">
        <h3 className="crancy-wc__form-title crancy-wc__form-title__one">
          Create your account
        </h3>
      </div>
      <form className="crancy-wc__form-main" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              type="text"
              name="username"
              placeholder="Username"
              required="required"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              type="email"
              name="email"
              placeholder="Email"
              required="required"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group__input">
            <input
              className="crancy-wc__form-input"
              placeholder="Password"
              id="password-field"
              type="password"
              name="password"
              required="required"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="crancy-wc__toggle">
              <i className="fas fa-eye" id="toggle-icon"></i>
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group__input">
            <select
              className="crancy-wc__form-input"
              name="class_id"
              required="required"
              value={formData.class_id}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="crancy-wc__check-inline">
            <div className="crancy-wc__checkbox">
              <input
                className="crancy-wc__form-check"
                id="checkbox"
                name="checkbox"
                type="checkbox"
              />
              <label htmlFor="checkbox">
                By proceeding, you agree to the{" "}
                <a href="#">Terms and Conditions</a>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group form-mg-top25">
          <div className="crancy-wc__button">
            <button className="ntfmax-wc__btn" type="submit">
              Sign up with email
            </button>
          </div>
        </div>
        <div className="form-group form-mg-top30">
          <div className="crancy-wc__bottom">
            <p className="crancy-wc__text">
              Already have an account ? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
