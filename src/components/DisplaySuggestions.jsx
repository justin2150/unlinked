import { useRef } from "react";
import styles from "./DisplaySuggestions.module.css";
import useOutsideClick from "../hooks/useOutsideClick";

export default function DisplaySuggestions({
  suggestions,
  setCurSug,
  setShowSugs,
  setIsManual,
}) {
  // Clicks outside of suggestion
  const ulRef = useRef(null);
  const revert = () => {
    setCurSug(null);
    setShowSugs(false);
  };
  useOutsideClick(ulRef, revert);
  const handleManualEntry = () => {
    setShowSugs(false);
    setCurSug(null);
    setIsManual(true);
  };
  return (
    <ul className={styles["list-box"]} ref={ulRef}>
      {suggestions.map((addr, index, sugs) => (
        <ListItem
          addr={addr}
          onClick={() => {
            setCurSug(sugs.at(index));
            setShowSugs(false);
          }}
          key={index}
        />
      ))}
      <li className={styles.manual} onClick={handleManualEntry}>
        Enter address manually
      </li>
    </ul>
  );
}
function ListItem({ addr, onClick }) {
  return (
    <li className={styles["list-item"]} onClick={onClick}>
      <img src="marker.svg" />
      <div>
        <p>
          <strong>{`${addr.num} ${addr.name}, `}</strong>
        </p>
        <p>{`${addr.city}, ${addr.stateCode} ${addr.zipCode}`}</p>
      </div>
    </li>
  );
}
