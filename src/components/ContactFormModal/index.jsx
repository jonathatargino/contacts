import { Bookmark, Briefcase, Mail, Phone, User2 } from "lucide-react"
import Input from "../Input"
import Select from "../Select"
import styles from "./styles.module.css"
import Button from "../Button"
import { useState } from "react"
import Modal from "../Modal"

export default function ContactFormModal({isOpen, onIsOpenChange, onSubmit, contactBeingEdited, onSuccess}) {
  const [name, setName] = useState(contactBeingEdited?.name ?? "");
  const [profession, setProfession] = useState(contactBeingEdited?.profession ?? "");
  const [email, setEmail] = useState(contactBeingEdited?.email ?? "");
  const [phone, setPhone] = useState(contactBeingEdited?.phone ?? "");
  const [category, setCategory] = useState(contactBeingEdited?.category ?? "")
  const [formErrors, setFormErrors] = useState(null)

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleProfessionChange(e) {
    setProfession(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value)
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value)
  }

  function handleCloseModal() {
    onIsOpenChange(false);
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormErrors(null)

    const errors = getFormErrors()

    if (Object.keys(errors).length > 0) {
      return setFormErrors(errors)
    }

    onSubmit({name, profession, email, phone, category})

    onSuccess();
    handleCloseModal();
  }

  function getFormErrors() {
    const errors = {}

    if (!name) {
      errors.name = {message: "Esse campo não pode ser vazio"}
    }

    if (!profession) {
      errors.profession = {message: "Esse campo não pode ser vazio"}
    }
    
    if (!email) {
      errors.email = {message: "Esse campo não pode ser vazio"}
    }

    if (!phone) {
      errors.phone = {message: "Esse campo não pode ser vazio"}
    }

    if (!category) {
      errors.category = {message: "Esse campo não pode ser vazio"}
    }

    return errors
  }

  return (
        <Modal isOpen={isOpen} onIsOpenChange={onIsOpenChange} title={contactBeingEdited ? "Contato - Editar" : "Contato - Adicionar"}>
            <form onSubmit={handleSubmit} className={styles.form} >
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Nome"
                  icon={<User2 />}
                  value={name}
                  onChange={handleNameChange}
                />
                {formErrors?.name && (
                  <span className={styles.errorText}>{formErrors?.name?.message}</span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Input 
                  placeholder="Trabalho" 
                  icon={<Briefcase />} 
                  value={profession} 
                  onChange={handleProfessionChange}
                />
                {formErrors?.profession && (
                  <span className={styles.errorText}>{formErrors?.profession?.message}</span>
                )}
              </div>
              
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Email"
                  icon={<Mail />}
                  value={email}
                  onChange={handleEmailChange}
                />
                {formErrors?.email && (
                  <span className={styles.errorText}>{formErrors?.email?.message}</span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Telefone"
                  icon={<Phone />}
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {formErrors?.phone && (
                  <span className={styles.errorText}>{formErrors?.phone?.message}</span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Select
                  placeholder="Categoria"
                  icon={<Bookmark />}
                  value={category}
                  onChange={handleCategoryChange}
                />
                {formErrors?.category && (
                  <span className={styles.errorText}>{formErrors?.category?.message}</span>
                )}
              </div>

              <Button>{contactBeingEdited ? "Editar" : "Adicionar"}</Button>
            </form>
        </Modal>
  )
}