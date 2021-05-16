const fs = require("fs");
const path = require("path");
const shortid = require('shortid');


const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (error) {
      throw new Error(error);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      throw new Error(error);
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((e) => String(e.id) === String(contactId));
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      throw new Error(error);
    }
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((e) => {
      return String(e.id) !== String(contactId);
    });
    changeContacts(contactsPath, newContacts);
    console.table(newContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      throw new Error(error);
    }
    const contacts = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...contacts, newContact];
    changeContacts(contactsPath, newContacts);
    console.table(newContacts);
  });
}

function changeContacts(path, newArray) {
  const contacts = JSON.stringify(newArray);
  fs.writeFile(path, contacts, (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};