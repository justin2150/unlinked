import { useState } from "react";
import styles from "./Instruction.module.css";

export default function Instruction({ children }) {
  return <div className={styles.list}>{children}</div>;
}

export function StyledNum({ children }) {
  return <p className={styles.number}>{children}</p>;
}

export function Text({ children }) {
  return <div className={styles.text}>{children}</div>;
}

export function Checkbox() {
  return <input className={styles.checkbox} type="checkbox" />;
}

export function Illustration({ url }) {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsShowing((val) => !val)}
        className={styles.greyed}
      >
        <span
          className={`${styles.arrow} ${isShowing && styles.active}`}
        ></span>
      </div>
      {isShowing && <img className={styles.illustration} src={url} />}
    </>
  );
}
