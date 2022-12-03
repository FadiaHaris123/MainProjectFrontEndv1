import React, { useEffect, useState } from "react";
const imageUrl = "anaghafoto.jpeg";

const Image =()=>{
    const [img,setImg]=useState();

    const fetchImage=async()=>{
        const res=await fetch(imageUrl);
        const imgBlob=await res.blob();
        const imageObjectURL=URL.createObjectURL(imgBlob);
        setImg(imageObjectURL);
    };
    useEffect(()=>{
    fetchImage();
},[]);
return(<>
    <img src={img} alt="image"/>
    </>
    );
}

export default Image;
