
const phrases = {
  "de": {
    "delete": "Löschen",
    "save": "Speichern"
  },
  "en": {
    "delete": "Delete",
    "save": "Save",
    "dialog_delete_item": "Do you really want to delete this item?: {item}"
  }
}

export default (key) => {
  return phrases["en"][key];
}
