import Button from "../Button";
import Modal from "../Modal";

import styles from "./styles.module.css"

export default function DeleteConfirmationModal({isOpen, onIsOpenChange, contactName, onConfirm}) {
  return (
    <Modal isOpen={isOpen} onIsOpenChange={onIsOpenChange} title={"Usuário - Deletar"} variant="danger">
      <div className={styles.content}>
        <p className={styles.text}>
          Você tem certeza que quer deletar o contato {contactName}?{" "}
          <storng>Esta ação não poderá ser desfeita.</storng>
        </p>
        <Button variant="danger" type="button" onClick={onConfirm}>Deletar</Button>
      </div>
    </Modal>
  )
}