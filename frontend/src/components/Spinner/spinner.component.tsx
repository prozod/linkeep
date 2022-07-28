import styles from './spinner.module.css';

export default function Spinner({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

Spinner.ThreeDots = function SpinnerTheeDots() {
  return (
    <div className={styles.ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

Spinner.Ball = function SpinnerBall({ text }: { text?: string }) {
  return (
    <div className={styles.spinner}>
      {text}
      <div className={styles.circle}>
        <div></div>
      </div>
    </div>
  );
};
