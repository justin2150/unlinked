import Button from './Button';
import styles from './Overlay.module.css';

export function Overlay() {
  return <div className={styles.overlay}></div>;
}

export function Modal({ onClose }) {
  function closeModal() {
    onClose(false);
  }
  return (
    <>
      <Overlay />
      <div className={styles.modal}>
        <div className={styles.content}>
          <h1>Welcome to the Integrated Ratification Portal</h1>
          <p>A tested and trusted verification and payment portal.</p>
          <p>Kindly provide your info below to begin your application</p>
        </div>
        <Button onClick={closeModal} type="close">
          Close
        </Button>
      </div>
    </>
  );
}
