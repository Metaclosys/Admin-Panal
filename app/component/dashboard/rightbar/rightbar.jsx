import React from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

function Rightbar() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt="bg" fill className={styles.bg} />
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>🔥 Avalible Now</span>
          <h3 className={styles.title}>
            How to use the new version of admin dashboard
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch Now
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.texts}>
          <span className={styles.notification}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
            New server actions are avalible, partial pre-rendering is coming up!
          </h3>
          <span className={styles.subtitle}>Boost your performance</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            delectus quo consectetur tenetur eaque officiis nemo quaerat
            obcaecati blanditiis dolorem aut excepturi similique perferendis sit
            nostrum perspiciatis, tempora magni totam!
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Learn Mores
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
