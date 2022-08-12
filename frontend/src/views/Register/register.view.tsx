import { Form, formStyles } from '@components/Form';
import { Navigation } from '@components/Navigation';
import useAuth from '@hooks/useAuth';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerStyles } from './register.styles';
import LogoLinkeep from '../../../assets/logo.svg';
import { UserServicesType } from 'types/dataTypes';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // add confirmpassword, add pfp
  const [inputData, setInputData] = useState<UserServicesType>({
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
    localStorage.setItem('isAuthenticated', 'true');
    {
      userExists && navigate('/dashboard');
    }
  }, [mutation.isSuccess]);

  return (
    <div className={joinArgs(registerStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(registerStyles.body)}>
        <Form
          onSubmit={onSubmit}
          className={joinArgs(formStyles.authFormDefaults)}
        >
          <div className={joinArgs(formStyles.headerWrapper)}>
            <h1 className={joinArgs(formStyles.headerTitle)}>
              <img src={LogoLinkeep} width={24} height={24} className='mr-2' />
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
          <Form.Button type='submit'>Register</Form.Button>
          <div className={joinArgs(formStyles.formSuggestion)}>
            Already an existing user?
            <Link
              to='/auth/login'
              className={joinArgs(formStyles.formAltSuggestion)}
            >
              Log in here
            </Link>
          </div>
        </Form>
        {mutation.isLoading ? 'Loading user data...' : null}
        {mutation.isSuccess ? <div>{mutation.data.message}</div> : null}
        {mutation.isError ? <div>{mutation.error}</div> : null}
      </div>
    </div>
  );
};

export default Register;
