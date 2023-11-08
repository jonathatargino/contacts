import { X } from "lucide-react";
import styles from "./styles.module.css"

export default function Modal({isOpen, onIsOpenChange, title, children, variant = "default"}) {
  function handleCloseModal() {
    onIsOpenChange(false);
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}` }>
      <div className={styles.dialogBody}>
        <button aria-label="fechar" onClick={handleCloseModal} className={styles.closeButton}>
          <X />
        </button>
        <h1 className={variant === "default" ?  styles.titleDefault : styles.titleDanger}>{title} </h1>
        {children}
      </div>
    </div>
  )
}