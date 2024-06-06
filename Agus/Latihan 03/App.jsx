import React, { useState } from "react"

const App = () => {
  const [items, setItems] = useState(["HTML", "JavaScript"])
  const [newItem, setNewItem] = useState("")
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editedItemText, setEditedItemText] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleKeyPress = (event, index = null) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (index !== null) {
        updateItem(index, editedItemText)
      } else {
        addItem()
      }
    }
  }

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem])
      setNewItem("")
    }
  }

  const updateItem = (index, updatedItem) => {
    const updatedItems = [...items]
    updatedItems[index] = updatedItem
    setItems(updatedItems)
    setEditingIndex(-1)
  }

  const deleteItem = () => {
    const updatedItems = items.filter((_, i) => i !== itemToDelete)
    setItems(updatedItems)
    setShowModal(false)
    setItemToDelete(null)
  }

  const startEditing = (index) => {
    setEditingIndex(index)
    setEditedItemText(items[index])
  }

  const confirmDelete = (index) => {
    setShowModal(true)
    setItemToDelete(index)
  }

  return (
    <div style={styles.container}>
      <div style={styles.shoppingListContainer}>
        <h2 style={{ color: "#6200ea" }}>My Programming Languages List</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Tambahkan item baru"
            style={styles.textArea}
            onKeyPress={handleKeyPress}
          />
          <button style={styles.button} onClick={addItem}>
            Tambah
          </button>
        </div>
        <ul style={styles.listContainer}>
          {items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedItemText}
                    onChange={(e) => setEditedItemText(e.target.value)}
                    placeholder="Edit item"
                    style={styles.textArea}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.button}
                      onClick={() => updateItem(index, editedItemText)}
                    >
                      Simpan
                    </button>
                    <button
                      style={styles.button}
                      onClick={() => setEditingIndex(-1)}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {item}
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.editButton}
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => confirmDelete(index)}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <p>Beneran mau dihapus?</p>
              <div style={styles.modalButtonContainer}>
                <button style={styles.button} onClick={deleteItem}>
                  Iyaa
                </button>
                <button
                  style={styles.button}
                  onClick={() => setShowModal(false)}
                >
                  Tidak Jadi
                </button>
              </div>
            </div>
          </div>
        )}
        <p style={styles.footer}>
          by <a href="https://github.com/MuhammadAgusLuthfi">Suga</a>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  shoppingListContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  textArea: {
    flex: "1",
    padding: "8px",
    border: "none",
    backgroundColor: "#f5f5f5",
    color: "#333",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#6200ea",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "14px",
  },
  listContainer: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    wordBreak: "break-all",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  editButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "14px",
  },
  deleteButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#f44336",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "14px",
  },
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  footer: {
    marginTop: "20px",
    color: "#888",
  },
}

export default App
