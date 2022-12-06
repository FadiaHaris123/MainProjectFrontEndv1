import React, { useEffect, useState } from "react";
// const imageUrl = "./profile1.jpg";
import ImageUrl from '../../../../assets/images/profile1.jpg';

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
