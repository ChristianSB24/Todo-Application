import React from 'react'

function SearchBox(props) {
  return (
    <div>
        <i className="fas fa-search"></i>
        <input className="searchbox" onChange={props.onChange} type="text" value={props.inputText} />
    </div>
  );
}

export default SearchBox