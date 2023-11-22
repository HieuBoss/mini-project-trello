import React, { useEffect, useState } from "react";
import Styles from "./Login.module.scss/";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { authSlice, authLogin } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, info } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target.value;
    setEmail(input);
  };

  useEffect(() => {
    if (info && info.apiKey) {
      console.log(info);
      toast.success("Đăng nhập thành công");
      navigate("/home");
    }
  }, [info]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(email));
  };

  return (
    <>
      <div className={clsx(Styles.form_login)}>
        <div className={clsx(Styles.overlay)}></div>
        <form
          className={clsx(Styles.form_login_wrapper)}
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChange}
            type="text"
            placeholder="Vui lòng nhập Email..."
            className={clsx(Styles.form_login_input)}
          />
          <button type="submit" className={clsx(Styles.btn_submit)}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
