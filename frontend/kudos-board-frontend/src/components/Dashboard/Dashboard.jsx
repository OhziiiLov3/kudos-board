import {useState} from 'react'
import "../Dashboard/Dashboard.css"
import Header from "../Header/Header"


const Dashboard = () => {
const [searchQuery, setSearchQuery] = useState("")
  

console.log(searchQuery);


  return (
    <div className="dashboard">
    <Header/>
   <div className="search-bar">
    <input type="text" placeholder="Search spaces..." value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
   </div>
   <div className="category-btns">
    <button className='filter-btn'>
        All
    </button>
    <button className='filter-btn'>
        Recent
    </button>
    <button className='filter-btn'>
       Hi-Five
    </button>
    <button className='filter-btn'>
        Thank You
    </button>
    <button className='filter-btn'>
     Inspiration
    </button>
   </div>
   <div className="create-five-container">
    <button className='create-five-btn filter-btn'>Create a Hi-Five</button>
   </div>
   
    </div>


  )
}

export default Dashboard