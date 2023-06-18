const { readFile, writeFile, appendFile } = require('fs/promises');
const { v4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const fileOperation = async ({ action }) => {
  switch (action) {
    case 'read':
      const result = (await readFile(contactsPath)).toString();
      console.log(result);
      break;
    case 'write':
      const append = await appendFile(contactsPath, '\n hello');
      break;
    default:
      console.log('Unkhown operation');
      break;
  }
};

async function listContacts() {
  const result = await readFile(contactsPath);
  const contacts = JSON.parse(result);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = contacts[index];
  contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: v4(),
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
