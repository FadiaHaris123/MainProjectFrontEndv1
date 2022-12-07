import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Manager.module.css';
import image from './excel.png'
import AddManager from './AddManager';




const Manager = () => {

	const [selectedFile, setState] = useState(null);

	// On file select (from the pop up) 
	const onFileChange = event => {
		// Update the state 
		setState(event.target.files[0]);
	};


	const onFileUpload = (e) => {
		e.preventDefault();
		setState(e.target.files);

		const formData = new FormData();
		formData.append('file', selectedFile);
		fetch('http://localhost:8080/api/managers/upload', { method: 'post', body: formData })
			.then(res => {
				if (res.ok) {
					console.log(res.data);
					alert("File uploaded successfully.")
				}
			});
	};


	const fileData = () => {
		if (selectedFile) {
			return (
				<div className={classes.detailsShown}>
					<h6>File Details:</h6>
					<p>File Name: {selectedFile.name}</p>
					<p>
						Last Modified:{" "}
						{selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h6>Choose before Pressing the Upload button</h6>
				</div>
			);
		}
	};

	

	return (
		<div className={classes.manage}>
			<h1 className={classes.header}>
				Chitty Manager Details
			</h1>
			<div className={classes.upload}>
				<h4>
					Upload employee details
				</h4>
				<div className={classes.sample}>



					<h5>Download Template here :</h5>



					<a href='https://experiontechnologies-my.sharepoint.com/:x:/r/personal/anagha_r_experionglobal_com/Documents/Book1.xlsx?d=wa79df8c53c6548f1ac9a719792c8aac6&csf=1&web=1&e=ybEZHa'>



						<img src={image} height="20px" width="20px" alt="img" />



					</a>



				</div>
				<div>
					<br></br>
					<input type="file" onChange={onFileChange} />
					<button onClick={onFileUpload}>
						Upload!
					</button>
				</div>
				<div className={classes.filedata}>{fileData()}</div>
				{/* <Link to="/employee/managerslist">
					<button className={classes.button}><span>Show</span></button>
				</Link> */}

				{/* <h4>Add a Manager</h4>
				<AddManager/> */}
			</div>

			
		</div>
	);
}


export default Manager;



