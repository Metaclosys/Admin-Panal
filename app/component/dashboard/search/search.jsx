import React from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";

function Search({ placeholder }) {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" className={styles.input} placeholder={placeholder} />
    </div>
  );
}

export default Search;
