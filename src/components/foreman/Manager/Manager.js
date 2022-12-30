import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Manager.module.css';
import image from './excel.png'
import AddManager from './AddManager';

const Manager = () =>
 {
	const [selectedFile, setState] = useState(null);
	let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

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
		fetch('http://localhost:8080/managers/upload', { method: 'post',headers:{
			'Authorization':token
			
		  }, body: formData })
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
					<a href='https://experiontechnologies-my.sharepoint.com/personal/fadia_haris_experionglobal_com/_layouts/15/download.aspx?e=RlnbwR&share=EX7Iv_icVfRGqTNCAqtQ4IYBiV8EGdoDm-9lZYkkhAeqbg'>
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
			</div>
		</div>
	);
}

export default Manager;



