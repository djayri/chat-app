import styles from "./MessageBox.module.css";
const MessageBox = ({ activeUserId, senderId, senderName, content }) => {
  const style = activeUserId === senderId ? styles.mychat : "";
  return (
    <div className={`${styles.container} ${style}`}>
      <div>
        <div className={styles.sender}>
          <span>{senderName}</span>
        </div>
        <div className={styles.content}>
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
