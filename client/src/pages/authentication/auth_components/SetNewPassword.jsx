import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../assets/api/api';



const SetNewPassword = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({});

  useEffect(() => {
    (async () => {

      try {
        const data = await axios.get(`${baseUrl}/user/setNewPassword/${id}`);
        console.log(data);
      } catch (e) {
        navigate('/error');
      }
    })();
  }, []);
  const onChangeHandler = (e) => {
    const password = e.target.value;
    setNewPassword((pre) => {
      return { ...pre, [e.target.name]: password };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/user/confirmNew/${id}`, newPassword);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor='new'>New Password</label>
        <input
          type='password'
          name='password'
          id='new'
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='conf-new'>Confirm New Password</label>
        <input
          type='password'
          name='confirmPassword'
          id='conf-new'
          onChange={onChangeHandler}
        />
      </div>
      <input type='submit' />
    </form>
  );
};

export default SetNewPassword;
