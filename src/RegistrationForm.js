import React, { Fragment, useState } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";


class RegistrationForm extends React.Component{

 signUp(){
   const email = document.querySelector("#email").value;
   const password = document.querySelector("#password").value;

   firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((u) =>{
       console.log("Successfully Signed in");
     })
     .catch((err)=> {
       console.log("Error: "+ err.toString());
     })
 }

 render() {
   return (
     <div style={{ textAlign: 'center' }}>
      <div>
        <div>User Name</div>
        <input id="email" placeholder="Enter Email.." type="text"/>
        </div>
       <div>
         <div>Email</div>
         <input id="email" placeholder="Enter Email.." type="text"/>
       </div>
       <div>
         <div>Password</div>
         <input id="password" placeholder="Enter Password.." type="text"/>
       </div>
       <button style={{margin: '10px'}} onClick={this.signUp}>Sign Up</button>
     </div>
   );
 }
}
export default RegistrationForm;
