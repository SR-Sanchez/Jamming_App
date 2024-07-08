/* eslint-disable react/prop-types */
import "./SearchBar.css"

const SearchBar = ({searchTerm, handleSubmit, handleTermSearch}) => {
	
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