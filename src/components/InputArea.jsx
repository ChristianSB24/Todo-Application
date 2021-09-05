import React from "react";

function InputArea(props) {
  return (
      <div>
        <input className="inputarea" onChange={props.onChange} type="text" value={props.inputText} />
        <div className="addbutton">
            <button onClick={props.onClick}>
                <span>Save</span>
            </button>
        </div>
    </div>
  );
}

export default InputArea