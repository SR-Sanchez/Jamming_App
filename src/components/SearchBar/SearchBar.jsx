/* eslint-disable react/prop-types */
import "./SearchBar.css"

const SearchBar = ({searchTerm, handleSubmit, handleTermSearch}) => {

	const handleEnter = ({key}) => {
		if(key === "Enter") {
			handleSubmit()
		}
	}
	
	return (
		<>
			<section id="search">
				<input value={searchTerm} onChange={handleTermSearch} onKeyDown={handleEnter}></input>
				<button onClick={handleSubmit}>SEARCH</button>
			</section>			
		</>
	);
};

export default SearchBar