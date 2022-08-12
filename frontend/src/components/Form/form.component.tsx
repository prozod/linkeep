import joinArgs from '@utils/joinArgs';
import { useEffect, useRef } from 'react';
import { formStyles } from './form.styles';

const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className={joinArgs([formStyles.defaults, props?.className])}
    >
      {props.children}
    </form>
  );
};

export default Form;

Form.Input = function FormInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const myRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   myRef?.current?.focus();
  // });

  return (
    <input
      {...props}
      ref={myRef}
      className={joinArgs([formStyles.input, props?.className])}
    />
  );
};

Form.Label = function FormLabel(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={joinArgs([formStyles.label, props?.className])}
    >
      {props.children}
    </label>
  );
};

Form.Button = function FormButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={joinArgs([formStyles.formButton, props?.className])}
    >
      {props.children}
    </button>
  );
};
