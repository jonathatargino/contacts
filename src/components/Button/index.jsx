import styles from "./styles.module.css"

export default function Button({children, variant = "default", icon, onClick, ...props}) {
  return <button {...props} onClick={onClick} className={styles[variant]}>{icon} {children}</button>
}