import joinArgs from "@utils/joinArgs";
import { useRef } from "react";
import { formStyles } from "./form.styles";

const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className={
        props?.className !== undefined
          ? joinArgs([...formStyles.defaults, props.className])
          : joinArgs(formStyles.defaults)
      }
    >
      {props.children}
    </form>
  );
};

export default Form;

Form.Input = function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const myRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   myRef?.current?.focus();
  // });

  return (
    <input
      {...props}
      ref={myRef}
      className={
        props?.className !== undefined ? joinArgs([...formStyles.input, props.className]) : joinArgs(formStyles.input)
      }
    />
  );
};

Form.Label = function FormLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={
        props?.className !== undefined ? joinArgs([...formStyles.label, props.className]) : joinArgs(formStyles.label)
      }
    >
      {props.children}
    </label>
  );
};

Form.Button = function FormButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        props?.className !== undefined
          ? joinArgs([...formStyles.formButton, props.className])
          : joinArgs(formStyles.formButton)
      }
    >
      {props.children}
    </button>
  );
};
