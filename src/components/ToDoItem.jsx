import React from "react";

function ToDoItem(props) {

    if (props.edit === props.id) {
        return (
        <div className="todoitem"> 
                <input className="inputarea" onChange={props.onChange} type="text" value={props.inputText} />
                <div className="addbutton">
                    <button onClick={() => props.onClick(props.id)}>
                        <span>Save</span>
                    </button>
                </div> 
            </div>
        )
    }

    return (
        <div>
            <p className="todoitem">{props.text} 
                <i onClick={() => {props.onChecked(props.id)}} className="fas fa-trash-alt"></i>
                <i onClick={() => props.handleEditState(props.id)} className="fas fa-pencil-alt"></i> 
            </p>
        </div>
    );
}

export default ToDoItem;