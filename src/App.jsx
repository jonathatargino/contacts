import { Bookmark, PlusCircle, Search } from "lucide-react"
import Button from "./components/Button"
import Header from "./components/Header"
import styles from "./styles.module.css"
import Input from "./components/Input"
import Select from "./components/Select"
import ContactCard from "./components/ContactCard"
import ContactFormModal from "./components/ContactFormModal"
import { useState } from "react"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"

function App() {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [contacts, setContacts] = useState(
    localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : []
  )
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  function handleSelectedCategoryChange(e) {
    setSelectedCategory(e.target.value)
  } 

  function handleAddContactButtonClick() {
    setIsAddContactModalOpen(true)
  }

  function handleEditContactButtonClick(contact) {
    setIsAddContactModalOpen(true)
    setSelectedContact(contact)
  }

  function addContact(newContact) {
    const newContactList = [...contacts, {...newContact, id: Math.floor(Math.random() * 10000)}]

    setContacts(newContactList)
    
    localStorage.setItem("contacts", JSON.stringify(newContactList))
  }

  function editContact(newContactInfo) {
    const newContactList = contacts.map((contact) => {
      if (contact.id === selectedContact.id) {
        return {...newContactInfo, id: contact.id}
      }

      return contact
    })

    setContacts(newContactList);
    localStorage.setItem("contacts", JSON.stringify(newContactList))
  }

  function deleteContact() {
    const newContactList = contacts.filter((contact) => contact.id !== selectedContact.id)
    setContacts(newContactList)
    localStorage.setItem("contacts", JSON.stringify(newContactList))

    setIsDeleteModalOpen(false)
    setSelectedContact(null)
  }

  function handleDeleteButtonClick(contact) {
    setSelectedContact(contact)
    setIsDeleteModalOpen(true)
  }

  
  const filteredContacts = contacts.filter((contact) => contact.name.toUpperCase().includes(search.toUpperCase()) && contact.category.includes(selectedCategory))

  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.buttonDiv}>
          <Button onClick={handleAddContactButtonClick} icon={<PlusCircle />}>Adicionar contato</Button>
        </div>
        <div className={styles.searchBar}>
          <Input value={search} onChange={handleSearchChange} placeholder="Pesquise um contato" icon={<Search />}/>
          <Select value={selectedCategory} onChange={handleSelectedCategoryChange} icon={<Bookmark />} placeholder="Selecione uma categoria" />
        </div>
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id} 
            contact={contact}
            onEditButtonClick={handleEditContactButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            />
          ))}
      </main>
          <ContactFormModal
            isOpen={isAddContactModalOpen}
            onIsOpenChange={setIsAddContactModalOpen}
            contactBeingEdited={selectedContact}
            onSubmit={selectedContact ? editContact : addContact}
            onSuccess={() => setSelectedContact(null)}
            key={isAddContactModalOpen ? "open" : "closed"} 
          />
          <DeleteConfirmationModal isOpen={isDeleteModalOpen} onIsOpenChange={setIsDeleteModalOpen} contactName={selectedContact?.name} onConfirm={deleteContact}/>
    </>
  )
}

export default App
