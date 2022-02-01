import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { backendURL } from './sharedVariables';

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { email, password, name } = inputs;

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    // prevent refresh of page
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch(`${backendURL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      // console.log(parseRes)

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Registered successfully');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    // Register Form
    <Container className="border my-5 registerloginbox">
      <h1 className="text-center">Sign Up</h1>
      <h5>Name</h5>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="form-control my-3"
        value={name}
        onChange={(e) => onChange(e)}
      />
      <h5>Email address</h5>
      <form className="mb-3" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <h5>Password</h5>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button
          type="button"
          className="btn btn-success w-100"
        >
          Sign up

        </button>
      </form>
      <div className="text-center mb-2">
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
}
export default Register;
