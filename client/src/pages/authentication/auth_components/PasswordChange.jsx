import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../assets/api/api';


const PasswordChange = () => {
  const [email, setEmail] = useState({});
  const navigate = useNavigate();


  const onChangeHandler = (e) => {
    const emailValue = e.target.value;
    setEmail((pre) => {
      return { ...pre, [e.target.name]: emailValue };
    });
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${baseUrl}/user/emailreset`, email);
      console.log(data);
    } catch (err) {
      console.log('hii');
      navigate('/login');
    }
  };


  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>Enter an email for further instructions</label>
        <input
          type='email'
          required
          name='email'
          placeholder='Your Email'
          id='email'
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          value='Send
      '
        />
      </form>
    </div>
  );
};

export default PasswordChange;
