import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
//import Display from './Display'
import Pusher from 'pusher-js'
//require("dotenv").config();

function Newnote(){
	const [date,setDate]=useState('');
	const [content,setContent]=useState('');
	const [conArray,setConArray]=useState([]);
	useEffect(()=>{
		axios.get(`${process.env.REACT_APP_DOMAIN}/get`)
		.then(jsonRes=>setConArray(jsonRes.data))
	})
	useEffect(()=>{
		const pusher = new Pusher('2ba2c2d4fcf289e8295a', {
	      cluster: 'ap2'
	    });
	    const channel = pusher.subscribe('content');
	    channel.bind('insert', (newContent)=> {
	    	console.log(newContent)
	      setConArray([...conArray,newContent])
	    }); 
	},[])

	 function handleClick(e){
		e.preventDefault();
		const newContent={
			date:date,
			content:content
		}
		axios.post(`${process.env.REACT_APP_DOMAIN}/create`,newContent)
		
		setDate('');
		setContent('') 
	}
	function handleDelete(un){
		axios.delete(`${process.env.REACT_APP_DOMAIN}/delete/${un}`)
	}
	return(
		<React.Fragment>
		  <form>
			<input type="text"
				value={date}
				onChange={(e)=>{setDate(e.target.value)}} 
				name="date" 
				placeholder="Enter date"/><br/>
			<input type="text" 
				value={content}
				onChange={(e)=>{setContent(e.target.value)}} 
				name="content" 
				placeholder="Enter note"/><br/>
			<button onClick={handleClick}>Send</button>
		  </form>
		  {
			  	conArray.map((re,index)=>(
			  		<React.Fragment key={re._id}>
			  			<p>Time:{re.date}&&Note:{re.content}</p>
			  			<Delete onClick={handleDelete} un={re._id}/>
			  		</React.Fragment>
			  	))
		  }
		</React.Fragment>
	)
}

function Delete(props){
	return(
		<button onClick={()=>{props.onClick(props.un)}}>Delete</button>
	)
}


export default Newnote;