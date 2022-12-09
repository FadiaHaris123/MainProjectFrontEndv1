import { useState } from "react";

const ChangePassword = (props)=>{
    const [changePwd, setChangePwd] = useState("");
    
    const changePasswordHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/user-profile", {
      
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email : "admin@exp",
            // props.employeeId
            newPassword:changePwd,
          })
        }).then(response => {
          console.log("hello change");
          console.log("request: ", response);
          return response.json();
        })
        .then(resJson => {
          alert("Password Change Successfully")
       })
          
    };
        const passwordChange=(event)=>{
            setChangePwd(event.target.value)
        }

    return(
        <div>
            <form onSubmit={changePasswordHandler}>
            <label>Current Password</label> <input className="form-control mt-1" type="password" placeholder='********'/><br></br>
            <label>New Password</label> <input className="form-control mt-1" type="password" placeholder='********'/><br></br>
            <label>Confirm Password</label> <input className="form-control mt-1" onChange={passwordChange} type="password" placeholder='********'/><br></br>
                <button id="submitButton">Change Password</button>
            </form>
        </div>
    )

}

export default ChangePassword;