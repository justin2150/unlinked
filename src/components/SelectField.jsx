import { useSelector } from "react-redux";
import styles from "./SelectField.module.css";

export default function SelectField({
  children,
  flex = "",
  onChange,
  value,
  isFocus,
  setIsFocus,
  error = "",
  data = [],
}) {
  const { disableControl } = useSelector((store) => store.info);

  return (
    <div className={`${styles.wrapper} ${styles[flex]}`}>
      <label
        className={`${styles.label} ${isFocus ? styles["label-focus"] : ""} ${
          error ? styles["label-error"] : ""
        }`}
      >
        {children}
      </label>
      <select
        className={`${styles.select} ${error ? styles["input-error"] : ""}`}
        value={value}
        onChange={onChange}
        disabled={disableControl}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          value === "" && setIsFocus(false);
        }}
      >
        <option value=""></option>
        {data.map((state) => (
          <option key={state.code} value={state.code}>
            {state.code}
          </option>
        ))}
      </select>
      {error && <p className={styles["text-error"]}>{error}</p>}
    </div>
  );
}
