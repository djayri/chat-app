import styles from "./InputText.module.css";
const InputText = ({ placeholder, label, value, onChange }) => {
  return (
    <input
      className={styles.container}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputText;
