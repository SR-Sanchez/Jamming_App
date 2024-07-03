// import React from "react";
import { useState } from "react";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleTermSearch = event => {
		setSearchTerm(event.target.value)
	};

	const handleSubmit = () => { //mockup function as prove of concept - needs to be changed
    alert(JSON.stringify(searchTerm));
		setSearchTerm("")
  };



	return (
		<>
			<input value={searchTerm} onChange={handleTermSearch}></input>
			<button onClick={handleSubmit}>Search</button>
		</>
	);
};

export default SearchBar