import React, { useState } from 'react'
import styles from './Login.module.css';
import login from '../../assets/login.png';
import { Button, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../util/GetError';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_HOST

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await response.json()

      if (json.authtoken) {
        localStorage.setItem('toDoAppUser', json.authtoken);
        message.success("Logged in Successfully!");
        navigate('/to-do-list');
        setLoading(false);
      }
      else {
        message.error(getErrorMessage(json.error));
        setLoading(false);
      }
    } catch (err) {
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Login</h2>
        <div className={styles.input__wrapper}>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.input__wrapper}>
          <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={styles.input__info}>
          New User? <Link to="/signup">Register</Link>
        </div>
        <Button loading={loading} type="primary" size="large" disabled={!email || !password} onClick={handleSubmit} >Login</Button>
      </div>
    </div>
  )
}

export default Login