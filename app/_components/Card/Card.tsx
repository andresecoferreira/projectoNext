import React from "react";
import styles from "./Card.module.css";

interface CardProps{
  title : string,
  image: string,
  description: string,
  price:number,
}

const Card = ({ title, image, description,price}:CardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <img src={image} alt={title} className={styles.image} />
      <p className={styles.price}>{price}€</p>      
      <p className={styles.description}>{description}</p>
      
      
    </div>
  );
};

export default Card;
