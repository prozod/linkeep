import styles from "./spinner.module.css";

interface ISpinner {
  text?: string;
}

export default function Spinner({ text }: ISpinner) {
  return (
    <div className={styles.spinner}>
      {text}
      <div className={styles.circle}>
        <div></div>
      </div>
    </div>
  );
}
