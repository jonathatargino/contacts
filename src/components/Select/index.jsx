import styles from "./styles.module.css"

export default function Select({placeholder, icon, ...props}) {
  return (
    <div className={styles.container}>
      {icon} 
      <select {...props} required className={styles.select} defaultValue="">
        <option value="" disabled hidden>{placeholder}</option>
        <option>Categoria</option>
        <option>Faculdade</option>
        <option>Trabalho</option>
        <option>Família</option>
        <option>Academia</option>
      </select>
    </div>
  ) 
}