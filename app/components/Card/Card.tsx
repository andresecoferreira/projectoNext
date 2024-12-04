import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, image, description, rating }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.rating}>⭐ {rating}/5</p>
    </div>
  );
};

export default Card;
