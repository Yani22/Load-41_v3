import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Assets/landingPage.css';
import { supabase } from '../firebase';
import Swal from 'sweetalert2';
import { userID } from '../Reducers/userReducer';
import { useDispatch } from 'react-redux';
import Logo from '../Assets/Load_41_logo.png';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Bowser from 'bowser';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [user, setUser] = useState('Broker');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [forgotpassword, setForgotpassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [message, setMessage] = useState(false);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const browser = Bowser.getParser(window.navigator.userAgent);
  const deviceInfo = browser.getResult();

  async function logUserLogin(userId, deviceInfo, location,tokenData) {
    const { data } = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/user-logins',{ user_id: userId, device_info: JSON.stringify(deviceInfo), location: location },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenData?.token  // Use stored JWT token
    }
   })

    if (!data) {
        console.error('Error logging user login:', 'Tracked failed!');
    }
}

  const reset = () => {
    setName('');
    setPassword('');
    setGroup('');
    setUser('');
    setUsername('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(name, {
        redirectTo: 'https://load41.com/update-password',
      });
      if (data) {
        setEmailMessage(true);
        setMessage(true);
      } else {
        alert(error.message);
      }
    } catch (error) {
      alert('User not found, try again!');
      setName('');
      setMessage(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      try {
        setLoad(true);
        const {data}  = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/signup',{
          email: name,
          password: password,
          username: username,
          group_name: group,
          user_type: user,
          role:'user',
          is_admin: false
        });
        if (data) {
          setLoad(false);
          reset();
          setRegister(!register);
          Swal.fire({
            title: 'Signup Success!',
            icon: 'success',
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: 'Signup Failed',
            icon: 'error',
            timer: 2000,
          });
        }
      } catch (e) {
        setLoad(false);
        reset();
        Swal.fire({
          title: e.message,
          icon: 'error',
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        title: 'Passwords do not match!',
        icon: 'error',
        timer: 2000,
      });
    }
  };

  const fetchAllTokens = async (credentials) => {

    try {
        const response = await fetch('https://dr48nfhb-5000.use.devtunnels.ms/get_tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (data.direct_token && data.truckstop_token && data.truckerpath_token) {
          data.dat_user_access_token && localStorage.setItem('token',data?.dat_user_access_token?.dat_user_access_token)
          data.dat_token && localStorage.setItem('dat_token',data.dat_user_access_token?.access_token)
          localStorage.setItem('direct_token',data.direct_token)
          localStorage.setItem('trucks_token',data.truckstop_token)
          localStorage.setItem('trucker_token',data.truckerpath_token)
          localStorage.setItem('direct-api-key',data.direct_api_key)
          localStorage.setItem('credentials',JSON.stringify({...credentials,access_token:data.dat_user_access_token?.access_token}))
        } else {
          console.log('Failed to fetch one or more tokens.');
        }
    } catch (err) {
        console.log('Error fetching tokens.');
    }
};

  const onLogin = async (e) => {
    e.preventDefault();
    setLoad(true);
    const credentials = {
      username: name,
      password: password,
      access_token: localStorage.getItem('dat_token') ? localStorage.getItem('dat_token') : ''
  };
    try {
      const {data} = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/login',{
        email: name,
        password: password,
      });
      console.log(data)
      if (data?.data) {
        setLoad(false);
        reset();
        if (data?.data?.user) {
          localStorage.setItem('authentication',JSON.stringify(data?.data))
          const uid = data?.data.user.id;
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const location = `Lat: ${latitude}, Long: ${longitude}`;
            logUserLogin(uid, deviceInfo, location,data?.data);
          });
          localStorage.setItem('id', uid);
          dispatch(userID(data?.data.user));
          if(data?.data.user?.role === 'admin'){
            fetchAllTokens(credentials);
            setInterval(()=>fetchAllTokens(JSON.parse(localStorage.getItem('credentials'))),300000);
          }
          navigate('/dashboard');
        } else {
          dispatch(userID([]));
          localStorage.removeItem('id');
          navigate('/');
          Swal.fire({
            title: 'Login Failed',
            icon: 'error',
            timer: 2000,
          });
        }
      } else {
        Swal.fire({
          title: 'Login Failed',
          icon: 'error',
          timer: 2000,
        });
      }
    } catch (error) {
      setLoad(false);
      Swal.fire({
        title: error.message,
        icon: 'error',
        timer: 2000,
      });
    }
  };

  return (
    <div style={{ textAlign: 'left', background: '#555', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <Image style={{ width: '8vw', height: '15vh' }} src={Logo} alt="Load41" />
        <strong style={{ fontSize: '2.5em', position: 'relative', top: '10px' }}>LOAD 41</strong>
      </div>
      <Container style={{ textAlign: 'left', background: '#555' }}>
        {!register && !forgotpassword && (
          <Form onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="button_login">
              {load ? 'loading' : 'Login'}
            </Button>
          </Form>
        )}
        {register && !forgotpassword && (
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                onChange={(e) => setCpassword(e.target.value)}
                value={cpassword}
                required
              />
              {password !== cpassword && (
                <span style={{ fontSize: 10, color: 'red' }}>Passwords do not match</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="company name"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="button_login">
              {load ? 'loading' : 'Register'}
            </Button>
          </Form>
        )}
        {forgotpassword && !register && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {message && (
                <span style={{ fontSize: 10, color: emailMessage ? 'green' : 'red' }}>
                  {emailMessage ? 'Email sent' : 'Not found'}
                </span>
              )}
            </Form.Group>
            <Button type="submit" className="button_login">
              Reset
            </Button>
          </Form>
        )}
        <p>
          {!register ? 'Create new account' : 'Already have an account'}{' '}
          <strong
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => {
              setRegister(!register);
              setForgotpassword(false);
            }}
          >
            {!register ? 'Register' : 'Sign in'}
          </strong>
        </p>
      </Container>
    </div>
  );
};

export default Login;