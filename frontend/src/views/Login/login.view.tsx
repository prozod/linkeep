import { Form, formStyles } from '@components/Form';
import { Navigation } from '@components/Navigation';
import { Spinner } from '@components/Spinner';
import useAuth from '@hooks/useAuth';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserServicesType } from 'types/dataTypes';
import { loginStyles } from './login.styles';
import LogoLinkeep from '../../../assets/logo.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState<UserServicesType>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const mutation = useAuth('login');
  const userExists = mutation.isSuccess && mutation.data.id !== undefined;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('loginFormData:', { ...inputData });
    mutation.mutate({ ...inputData });

    //todo move the input data out, so that when the email exists but password is incorrect, only remove password.
    setInputData({ email: '', password: '' });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', 'true');
    {
      userExists && navigate('/dashboard');
    }
  }, [mutation.isSuccess]);

  return (
    <div className={joinArgs(loginStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(loginStyles.body)}>
        {mutation.isLoading ? (
          <Spinner.ThreeDots />
        ) : (
          <Form onSubmit={onSubmit}>
            <div className={joinArgs(formStyles.headerWrapper)}>
              <h1 className={joinArgs(formStyles.headerTitle)}>
                <img
                  src={LogoLinkeep}
                  width={24}
                  height={24}
                  className='mr-2'
                />
                Linkeep
              </h1>
              <p className={joinArgs(formStyles.headerParagraph)}>
                Please log in below to continue
              </p>
            </div>
            <div className={joinArgs(formStyles.labelandInputWrapper)}>
              <Form.Input
                onChange={onChange}
                type='email'
                name='email'
                placeholder=' '
                value={inputData.email}
                required
              />
              <Form.Label htmlFor='email'>Email address</Form.Label>
            </div>
            <div className={joinArgs(formStyles.labelandInputWrapper)}>
              <Form.Input
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={inputData.password}
                className={joinArgs(formStyles.inputPassword)}
                placeholder=' '
                required
              />
              <Form.Label htmlFor='password'>Password</Form.Label>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className={
                  showPassword
                    ? joinArgs(formStyles.showPasswordButtonActive)
                    : joinArgs(formStyles.showPasswordButtonInactive)
                }
              >
                {showPassword ? 'hide' : 'show'}
              </span>
            </div>
            {mutation?.data?.message ? (
              <div className={joinArgs(loginStyles.error)}>
                {mutation?.data.message}
              </div>
            ) : null}
            <Form.Button type='submit'>Log In</Form.Button>
            <div className={joinArgs(formStyles.formSuggestion)}>
              or
              <Link
                to='/auth/register'
                className={joinArgs(formStyles.formAltSuggestion)}
              >
                Create a new account now
              </Link>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Login;
