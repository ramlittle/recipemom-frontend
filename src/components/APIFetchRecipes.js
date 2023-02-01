import React, { useEffect, useState } from "react";
import axios from 'axios';

//COMPONENTS
import RecipeList from './RecipeList.js';
import Pagination from './Pagination.js';

//CSS
import '../css/APIFetchRecipes.css';
const APIFetchRecipes =()=>{
  //FETCH DATA using axios
  const [data, setData] = useState([]);
  const [category,setCategory]=useState('chicken');
  
  const fetchData = () => {
    return axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${category}&app_id=3265345c&app_key=7bfa7e02012d5b7fc29611c822c15802`)
          .then((response) => {
            setData(response.data.hits)
          })
          .catch(()=>{
            alert('data failed to load from API')
          })
  }
  //RENDER/DISPLAY of data
  useEffect(() => {
    fetchData();
  },[])
  //PLACED THE DESIRED RECIPE DATA in the array
  let obtainedRecipes=[];
  for(let i =0;i<data.length;i++){
    obtainedRecipes.push(data[i].recipe);
  }

  console.log('data from APIFetch',obtainedRecipes)
  
  //SEARCH CATEGORY
  const onSearchHandler =(e)=>{
    e.preventDefault();
    //call the fetching of data again, after search is clicked
    fetchData();
  }
  //PAGINATION
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(4);

  //indices of first and last record
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = obtainedRecipes.slice(indexOfFirstRecord, indexOfLastRecord);
  
  //Count of pages
  const nPages = Math.ceil(data.length / recordsPerPage)
  
  return(
        <div className='container'>
          <div>
            <form onSubmit = {onSearchHandler}>
              <label htmlFor = 'category'>Search: </label>
              <input 
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                name='category'
                placeholder='enter food here'
                required
              />
              <button type ='submit'>Submit</button>
            </form>
          </div>

          <Pagination
            nPages = { nPages }
            currentPage = { currentPage } 
            setCurrentPage = { setCurrentPage }
          />

          <center><small>Retrieved <strong>{obtainedRecipes.length}</strong></small></center>
          <RecipeList 
            currentRecords={currentRecords}
          />

        </div>
    )
}

export default APIFetchRecipes;