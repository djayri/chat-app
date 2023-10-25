import styles from "./MessageBox.module.css";
const MessageBox = ({ activeUserId, senderId, senderName, content }) => {
  const style = activeUserId === senderId ? styles.mychat : "";
  return (
    <div className={`${styles.container} ${style}`}>
      <div>
        <span>{senderName}</span>
      </div>
      <div>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default MessageBox;
