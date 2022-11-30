import './Search.css'

function Search(props) {

 const onChangeSearch = (event) => {
  props.search(event.target.value)
 } 
 
return(
  <div className="search">
      <input
          type="text"
          placeholder="Search..."
          onChange={onChangeSearch}
          />
  </div>

);

}

export default Search;