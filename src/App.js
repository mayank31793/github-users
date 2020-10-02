import React,{ useState, useEffect } from 'react';
import axios from 'axios';

import deleteImg from './assets/delete.svg';
import githubImg from './assets/github.svg';
import locationImg from './assets/location.svg';
import nameImg from './assets/name.svg';
import followersImg from './assets/followers.svg';

import './App.scss';
import Loader from './components/loader/loader';
import List from './components/list/list';

function App() {
	const [search, setSearch] = useState('');
	const [searchDisplay, setSearchDisplay] = useState({});
	const [searchArray, setSearchArray] = useState([]);	
	const [sort,setSort] = useState(null);
	const [typingStart,setTypingStart] = useState(false);

	const handleSearch = (e) => {
		setSearch(e.target.value);
		setTypingStart(true);
		if(e.target.value.length == 0){
			setTypingStart(false);
			setSearchDisplay({});
		}
	}

	const handleCloseSearch = () => {
		setTypingStart(false);
		setSearch('');
		setSearchDisplay({});
	}

	const handleAddUser = (e) => {
		setSearchArray([searchDisplay,...searchArray]);
		localStorage.setItem('items',JSON.stringify([searchDisplay,...searchArray]));
		setTypingStart(false);
		setSearch('');
	}

	useEffect(() => {
		if(localStorage.getItem('items') != null){
			setSearchArray(JSON.parse(localStorage.getItem('items')));
		}
		const timeoutId = setTimeout(() => {
			if(search != ""){
				axios.get(`https://api.github.com/users/${search}`)
				.then(res => setSearchDisplay(res.data))
				.catch(error => setSearchDisplay(error));
			}
		}, 100);
		return () => clearTimeout(timeoutId);
	},[search]);

	const handleDelete = (id,name) => {
		var result = window.confirm('Are you sure you want to delte " '+name+' "');
		if(result){
			var newArr = searchArray.filter(res => res.id !== id);
			setSearchArray(newArr);
			localStorage.setItem('items',JSON.stringify(newArr));
		}
	}

	const handleSort = (e) => {
		setSort(e.target.value);
		if(e.target.value === "followers"){
			setSearchArray(searchArray.sort((a,b) => b.followers - a.followers));
		}
		else if(e.target.value === "name"){
			setSearchArray(searchArray.sort((a,b) =>  a.name.toLowerCase() >  b.name.toLowerCase() ? 1 : -1));
		}
		else if(e.target.value === "location"){
			setSearchArray(searchArray.sort((a,b) => {
				if (a.location===null) a.location='NULL';
				if (b.location===null) b.location='NULL';
				if (''+a.location < ''+b.location) return -1;
				if (''+a.location > ''+b.location) return  1;
				return 0;
			}));
		}
	}

	return (
		<div className="App">
			<div className="searchAndDropdown">
				<div>
					<input type="text" value={search} placeholder="Search" className="searchInput" onChange={handleSearch} />
					{/* <button onClick={handleClick}>Search</button> */}
					<div className="outerSearch" style={{display:typingStart?"block":"none"}}>
						{searchDisplay.name && searchDisplay.name !== "Error" ?
							<div className="innerSearch">
								<div className="innerImageName" onClick={handleAddUser}>
									<div className="searchUserImage">
										<img src={searchDisplay.avatar_url} alt="img" />
									</div>
									<p>{searchDisplay.name}</p>
								</div>
								<span className="closeSearch" onClick={handleCloseSearch}>&times;</span>
							</div>:
							<div className="noResults">
								{searchDisplay.hasOwnProperty('message') ?
									<i><b>Sorry, No result found</b></i>
									:
									<div className="loaderDiv">
										<Loader />
										<span>Loading...</span>
									</div>
								}
							</div>
						}
					</div>
				</div>
				<div className="dropdown">
					<select onChange={handleSort}>
						<option value="sortby">Sort By</option>
						<option value="name">Name</option>
						<option value="location">Location</option>
						<option value="followers">Followers</option>
					</select>
					<span>&#9660;</span>
				</div>
			</div>
			<List searchArray={searchArray} handleDelete={handleDelete} />
		</div>
	);
}

export default App;
