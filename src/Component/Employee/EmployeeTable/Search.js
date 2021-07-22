import React, {useState} from 'react';

const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');

    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }

    return (
        <input type="text" class="form-control" placeholder="Search" value={search} 
        onChange={(e) => onInputChange(e.target.value)}/>
    )
}

export default Search;