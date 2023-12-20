import { useSelector } from "react-redux";
import styles from "./InputField.module.css";

export default function Input({
  children,
  flex = "",
  onChange,
  value,
  isFocus,
  setIsFocus,
  error = "",
}) {
  const { disableControl } = useSelector((store) => store.info);
  return (
    <div className={`${styles.wrapper} ${styles[flex]}`}>
      {
        <label
          className={`${styles.label} ${isFocus ? styles["label-focus"] : ""} ${
            error ? styles["label-error"] : ""
          }`}
        >
          {children}
        </label>
      }
      <input
        className={`${styles.input} ${error ? styles["input-error"] : ""}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          value === "" && setIsFocus(false);
        }}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disableControl}
      />
      {error && <p className={styles["text-error"]}>{error}</p>}{" "}
    </div>
  );
}
