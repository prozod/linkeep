import { Form } from '@components/Form';
import { Navigation } from '@components/Navigation';
import useAuth from '@hooks/useAuth';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './login.styles';

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

const Login = () => {
  const [inputData, setInputData] = useState<ServicesType>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const mutation = useAuth('login');
  const userExists = mutation.isSuccess && mutation.data.id !== undefined;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...inputData });

    //todo move the input data out, so that when the email exists but password is incorrect, only remove password.
    setInputData({ email: '', password: '' });
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
    <>
      <Navigation />
      <div className={joinArgs(styles.body)}>
        <Form onSubmit={onSubmit} onChange={onChange} data={inputData} />
        {mutation.isLoading ? 'Loading user data...' : null}
        {mutation.isSuccess ? <div>{mutation.data.message}</div> : null}
        {mutation.isError ? <div>{mutation.error}</div> : null}
      </div>
    </>
  );
};

export default Login;
