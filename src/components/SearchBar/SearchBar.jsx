import { useState } from "react";
import "./SearchBar.css"

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
			<section id="search">
				<input value={searchTerm} onChange={handleTermSearch}></input>
				<button onClick={handleSubmit}>SEARCH</button>
			</section>			
		</>
	);
};

export default SearchBar