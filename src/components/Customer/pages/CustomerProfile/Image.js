import React, { useEffect, useState } from "react";
const imageUrl = " https://www.google.com/imgres?imgurl=https%3A%2F%2Favatars2.githubusercontent.com%2Fu%2F17686879%3Fv%3D4&imgrefurl=https%3A%2F%2Fdev.to%2Fbaruchiro%2Fhow-to-sync-component-state-with-router-bn7&tbnid=__h-WuES9ECV8M&vet=12ahUKEwjw56aFqNH7AhVH_TgGHbkRDHUQMygCegQIARBC..i&docid=0DZ7kpxc6yvd0M&w=460&h=460&q=man%20image%20with%20url%20for%20react&ved=2ahUKEwjw56aFqNH7AhVH_TgGHbkRDHUQMygCegQIARBC";

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
