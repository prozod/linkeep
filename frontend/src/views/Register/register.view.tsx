import { Form } from '@components/Form';
import { Navigation } from '@components/Navigation';
import useAuth from '@hooks/useAuth';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStyles } from './register.styles';

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
  confirmpassword: string;
};

export type ServicesType = Login | Register;

const Register = () => {
  const [inputData, setInputData] = useState<ServicesType>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const mutation = useAuth('register');
  const userExists = mutation.isSuccess && mutation.data.id !== undefined;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...inputData });

    //todo move the input data out, so that when the email exists but password is incorrect, only remove password.
    setInputData({ email: '', password: '' });
    console.log('user registered');
    navigate('/auth/login');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    localStorage.setItem('access', JSON.stringify(mutation?.data?.access));
    {
      userExists && navigate('/dashboard');
    }
  }, [mutation.isSuccess]);

  return (
    <div className={joinArgs(registerStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(registerStyles.body)}>
        <Form
          type='register'
          onSubmit={onSubmit}
          onChange={onChange}
          data={inputData}
          text='Fill in the fields below to create a new account.'
          ctaText='Register'
        />
        {mutation.isLoading ? 'Loading user data...' : null}
        {mutation.isSuccess ? <div>{mutation.data.message}</div> : null}
        {mutation.isError ? <div>{mutation.error}</div> : null}
      </div>
    </div>
  );
};

export default Register;
