import { Mail, Pencil, Phone, Trash } from "lucide-react";
import styles from "./styles.module.css"

export default function ContactCard({contact, onEditButtonClick, onDeleteButtonClick}) {
  return (
    <div className={styles.card}>
      <div>
        <header className={styles.header}>
          <h2 className={styles.title}>{contact.name} - {contact.profession}</h2>
          <span className={styles.categoryBadge}>{contact.category}</span>
        </header>
        <div className={styles.contact}>
          <div className={styles.contact}>
            <Mail />
            <span>{contact.email}</span>
          </div>
          <div className={styles.contact}>
            <Phone />
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>
      <div className={styles.actionsBox}>
        <button onClick={() => onEditButtonClick(contact)} type="button" aria-label="edit" className={styles.action}>
          <Pencil />
        </button>
        <button onClick={() => onDeleteButtonClick(contact)} type="button" aria-label="delete" className={styles.action}>
          <Trash />
        </button>
      </div>
    </div>
  )
}