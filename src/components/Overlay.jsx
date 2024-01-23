import Button from './Button';
import styles from './Overlay.module.css';

export function Overlay() {
  return <div className={styles.overlay}></div>;
}

export function Modal({ onClose, children }) {
  function closeModal() {
    onClose(false);
  }
  return (
    <>
      <Overlay />
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
        <Button onClick={closeModal} type="close">
          Close
        </Button>
      </div>
    </>
  );
}
