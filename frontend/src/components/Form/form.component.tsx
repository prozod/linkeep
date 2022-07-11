import joinArgs from '@utils/joinArgs';
import { ServicesType } from '@views/Login/login.view';
import { useState } from 'react';
import { formStyles } from './form.styles';
import LogoLinkeep from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';

const {
  defaults,
  labelandInputWrapper,
  input,
  inputPassword,
  label,
  formButton,
  headerWrapper,
  headerTitle,
  headerParagraph,
  showPasswordButtonActive,
  showPasswordButtonInactive,
  formSuggestion,
  formAltSuggestion,
} = formStyles;

interface IService {
  data: ServicesType;
  ctaText: string | JSX.Element;
  text: string;
  type: 'login' | 'register';
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Form = ({ onSubmit, onChange, data, text, ctaText, type }: IService) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={joinArgs(defaults)} onSubmit={onSubmit}>
      <div className={joinArgs(headerWrapper)}>
        <h1 className={joinArgs(headerTitle)}>
          <img src={LogoLinkeep} width={24} height={24} className='mr-2' />
          Linkeep
        </h1>
        <p className={joinArgs(headerParagraph)}>{text}</p>
      </div>

      <div className={joinArgs(labelandInputWrapper)}>
        <input
          onChange={onChange}
          type='email'
          name='email'
          className={joinArgs(input)}
          placeholder=' '
          value={data.email}
          required
        />
        <label htmlFor='email' className={joinArgs(label)}>
          Email address
        </label>
      </div>

      <div className={joinArgs(labelandInputWrapper)}>
        <input
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          value={data.password}
          className={joinArgs(inputPassword)}
          placeholder=' '
          required
        />
        <label htmlFor='password' className={joinArgs(label)}>
          Password
        </label>

        <span
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          className={
            showPassword
              ? joinArgs(showPasswordButtonActive)
              : joinArgs(showPasswordButtonInactive)
          }
        >
          {showPassword ? 'hide' : 'show'}
        </span>
      </div>

      <button type='submit' className={joinArgs(formButton)}>
        {ctaText}
      </button>

      <div className={joinArgs(formSuggestion)}>
        or
        {type === 'login' ? (
          <Link to='/auth/register' className={joinArgs(formAltSuggestion)}>
            Create a new account now
          </Link>
        ) : (
          <Link to='/auth/login' className={joinArgs(formAltSuggestion)}>
            Already a member? Log in here
          </Link>
        )}
      </div>
    </form>
  );
};

export default Form;
