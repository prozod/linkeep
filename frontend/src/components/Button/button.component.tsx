//native imports
import React, { HTMLAttributes } from "react";

//components, utils and interfaces
import joinArgs from "@utils/joinArgs";

//styles/motion/icons/graphics
import { styles } from "@components/Button";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IButton) => {
  return (
    <button className={joinArgs(styles.defaults) + " " + className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
