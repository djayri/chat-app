import styles from "./VerticalList.module.css";
const VerticalList = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default VerticalList;
