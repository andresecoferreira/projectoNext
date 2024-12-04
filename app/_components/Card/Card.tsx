import React from "react";
import styles from "./Card.module.css";

interface CardProps{
  title : string,
  image: string,
  description: string,
  
}

const Card = ({ title, image, description}:CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      
    </div>
  );
};

export default Card;
