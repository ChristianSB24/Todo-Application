import React, {useState} from 'react'
import SearchBox from './SearchBox'
import ToDoItem from './ToDoItem'
import InputArea from './InputArea'


function TodoList(props) {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState(props.session.items);
    const [newItem, setNewItem] = useState(false)
    const [edit, setEdit] = useState('')
    const [filtering, setFiltering] = useState(false)
    const [filteredItems, setFilteredItems] = useState([])
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      setInputText(newValue);
    }

    const handleNewItem = () => {
        setNewItem(true)
    }
  
    const addItem = () => {
        if ((inputText.length > 0) && (inputText.length < 25)) {
            setItems((prevItems) => {
                props.saveSession({items: [inputText, ...prevItems]})
                return [inputText, ...prevItems];
              });
              setInputText("");
              setNewItem(false)
        }
    }

    const handleEditState = (id) => {
        setEdit(id)
    }

    const editItem = (id) => {
        const newTodos = [...items];
        if ((inputText.length > 0) && (inputText.length < 25)) {
            newTodos[id] = inputText;
            setItems(newTodos);
            setEdit('')
            setInputText("")
            setFiltering(false)
        }
    }
  
    const deleteItem = (id) => {
      setItems((prevItems) => {
        return prevItems.filter((item, index) => {
          return index !== id;
        });
      });
    }

    const handleFiltering = (event) => {
        const newValue = event.target.value;
        setInputText(newValue);
        setFiltering(true)
        console.log(newValue)
        if (newValue === "") {
            setFiltering(false)
            setFilteredItems([])
            return
        }
        setFilteredItems(items.filter(function(item) {
            return item.toLowerCase().includes(newValue.toLowerCase())
        }))
    }

    const handleLoggedOut = () => {
        props.removeSession()
    }

    return (
    <>
        <div className="logoutbutton">
            <button onClick={handleLoggedOut}>
                <span>Logout</span>
            </button>
        </div>
        <div className="heading">
            <h1>My To-Do List</h1>
        </div>
        <div className="todo-container">
            <div className="top-of-box">
                <div className="addbutton">
                    <button onClick={handleNewItem}>
                        <span>New</span>
                    </button>
                </div>
                <SearchBox onChange={handleFiltering}/>
            </div>
            {newItem && 
            <div className="todoitem">
            <InputArea
            inputText={inputText}
            onChange={handleChange}
            onClick={addItem} /></div>}
        
            {filtering ?
                <div>
                    {filteredItems.map((todoItem, index) => (
                            <ToDoItem
                            key={index}
                            id={index}
                            text={todoItem}
                            onChecked={deleteItem}
                            onClick={editItem}
                            edit={edit}
                            onChange={handleChange}
                            handleEditState={handleEditState}/>
                    ))}
                </div>:
                <div>
                    {items.map((todoItem, index) => (
                        <ToDoItem
                        key={index}
                        id={index}
                        text={todoItem}
                        onChecked={deleteItem}
                        onClick={editItem}
                        edit={edit}
                        onChange={handleChange}
                        handleEditState={handleEditState}/>
                    ))}
                </div>}
        </div>
    </>
    )
}

export default TodoList