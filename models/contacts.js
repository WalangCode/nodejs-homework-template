// const fs = require('fs/promises')
import fs from "fs/promises"
import {nanoid} from "nanoid"


const contactPath = path.join("models","contacts.json")


const listContacts = async () => {
 const contacts = await fs.readFile(contactPath)
 return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts
  const results = contacts.find((contact)=>contact.id === contactId)
  return results || null
}

const removeContact = async (contactId) => {
 const contacts = await listContacts()
 const index = contacts.findIndex((index)=> index.id === contactId)
 if(index === -1){
  return null
 }
 const deleteContacts = contacts.splice(index,1)
 await fs.writeFile(contactPath,JSON.stringify(contacts,null,2))
 return deleteContacts
}

const addContact = async ({name , email, phone}) => {
 const contacts = await listContacts()
 const newContacts = {
  id:nanoid(),
  name,
  email,
  phone,
 }
 const allcontacts = [...contacts,newContacts]
 await fs.writeFile(contactPath,JSON.stringify(allcontacts,null,2))

 return allcontacts
}

const updateContact = async ( {id,name ,email,phone}) => {
  const contact = await listContacts()
  const index = contact.findIndex((item)=>item.id === id)

  if (index === -1){
    return null
  }
  contacts[index] = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  await fs.writeFile(contactPath,JSON.stringify(contacts,null,2))
 return contacts[index]
}

exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
