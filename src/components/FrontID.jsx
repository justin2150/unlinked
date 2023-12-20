import styles from "./FrontID.module.css";
export default function FrontID() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="./illustrations/front-id.jpg" />
      <div>
        <button>Upload now</button>
        <input
          className={styles.input}
          type="file"
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <p>A front copy of your ID </p>
    </div>
  );
}
