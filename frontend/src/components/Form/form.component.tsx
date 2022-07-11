import joinArgs from '@utils/joinArgs';
import { ServicesType } from '@views/Login/login.view';
import { useState } from 'react';
import { formStyles } from './form.styles';

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
} = formStyles;

interface IService {
  data: ServicesType;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Form = ({ onSubmit, onChange, data }: IService) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={joinArgs(defaults)} onSubmit={onSubmit}>
      <div className={joinArgs(headerWrapper)}>
        <h1 className={joinArgs(headerTitle)}>Linkeep</h1>
        <p className={joinArgs(headerParagraph)}>
          Please log in below to continue
        </p>
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
        Log In
      </button>
    </form>
  );
};

export default Form;
