import React from "react";
import styles from "./search.module.css";
import { SearchOutlined } from "@ant-design/icons";

function Search({ placeholder }) {
  return (
    <div className={styles.container}>
      <SearchOutlined />
      <input type="text" className={styles.input} placeholder={placeholder} />
    </div>
  );
}

export default Search;
