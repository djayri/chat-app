import styles from "./Button.module.css";
const Button = ({ text, onClick, customClassNames }) => {
  return (
    <button
      className={`${styles.container} ${customClassNames.join(" ")}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
