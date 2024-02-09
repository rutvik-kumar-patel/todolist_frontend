import React, { useState } from 'react'
import styles from './Login.module.css';
import login from '../../assets/login.png';
import { Button, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../util/GetError';

const Signup = () => {
  const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { firstName, lastName, email, password } = credentials;
    const host = process.env.REACT_APP_API_HOST

    try {



      setLoading(true);
      e.preventDefault();
      setLoading(true);
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const json = await response.json()
      console.log("res:-", json);
      if (json.success) {
        localStorage.setItem('toDoAppUser', json.authtoken);
        message.success("Logged in Successfully!");
        navigate('/to-do-list');
        setLoading(false);
      }
      else {
        message.error(getErrorMessage(json.errors[0].msg));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Register</h2>
        <div className={styles.input__inline__wrapper}>
          <Input placeholder="First Name" name='firstName' value={credentials.firstName} onChange={onChange} />
          <Input placeholder="Last Name" name='lastName' style={{ marginLeft: '10px' }} value={credentials.lastName} onChange={onChange} />
        </div>

        <div className={styles.input__wrapper}>
          <Input placeholder="email" name="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className={styles.input__wrapper}>
          <Input.Password placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className={styles.input__info}>
          Existing User? <Link to="/login">Login</Link>
        </div>
        <Button loading={loading} type="primary" size="large" disabled={!credentials.email || !credentials.password || !credentials.firstName|| !credentials.lastName} onClick={handleSubmit} >Register</Button>
      </div>
    </div>
  )
}

export default Signup