import styles from "./InputTextWithIcon.module.css";
import sendIcon from "../send.png";
const InputTextWithIcon = ({
  value,
  placeholder,
  onClick,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.container}>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      <div onClick={onClick}>
        <img src={sendIcon} alt="send" />
      </div>
    </div>
  );
};

export default InputTextWithIcon;
