const { readFile, writeFile, appendFile } = require('fs/promises');
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

function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = { listContacts, getContactById, removeContact, addContact };
