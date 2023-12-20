import styles from "./Loader.module.css";
export default function Loader({ type = "" }) {
  if (type === "loader-sm") return <div className={styles["loader-sm"]}></div>;
  if (type === "spinner-arr")
    return <div className={styles["spinner-arr"]}></div>;
  if (type === "spinner") return <div className={styles["spinner"]}></div>;
  if (type === "spinner-el")
    return (
      <div className={styles["spinner-el"]}>
        <div className={`${styles.spinner} ${styles.center}`}></div>
        <p className={styles["spinner-text"]}>Securely logging you in</p>
      </div>
    );

  // return (
  //   <>
  //     <div className={styles["spinner"]}></div>
  //     <div className={styles["spinner-arr"]}></div>
  //     <div className={styles["loader-sm"]}></div>
  //   </>
  // );
}
