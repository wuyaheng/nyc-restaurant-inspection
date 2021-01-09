import React from "react";
import "./style.css";

function SearchForm({ results, handleInputChange }) {
  return (
    <div className="input-group mb-3">
      <select 
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleInputChange}
      >
        {results.map((ele, i) => ele !== "0" ? 
          (<option key={i + "-el"} value={ele}>{ele}</option>): null)} 
      </select>
    </div>
  );
}

SearchForm.defaulProps = {
  results: [],
};

export default SearchForm;
