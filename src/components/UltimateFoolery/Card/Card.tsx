import styles from './Card.module.css';

export function Card({title, message}: {title: string, message: string}) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}
