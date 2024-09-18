import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {auth, db} from './firebase.config'
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";


export default function Home (){
const [myUid,setUid] = useState('')
const [users,setUsers] = useState([])
const navigate = useNavigate()


  useEffect(()=>{
getUsers()
  },[])

  const getUsers = async () => {
    let uid = await localStorage.getItem('userId')
    setUid(uid)
    const list =[]
    const dbSnap = await getDocs(collection(db,'users'))
    dbSnap.forEach(item =>{
      list.push(item.data())
    })
setUsers(list)    
  }

return(
<div class="users-list-container">
  <div class="header">
    <h1>Users List</h1>
    {/* <button onClick={Logout()}>Logout</button>  */}
  </div>



  {users.map(item => (
    <div class="user-card" key={item.uid} onClick={()=>navigate('/chat',{state:{...item,myUid}})}>
      <div class="user-image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtNBgCacCwHhxVPj1ubPRygdT7X_7w_UrLQ&s" alt="User Profile" />
      </div>
      <div class="user-info">
        <h2 class="user-name">{item.name}</h2>
        <p class="user-email">{item.email}</p>
      </div>
      <button class="message-button">Message</button>
    </div>
  ))}
</div>

)
}




































// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           ChatApp
//         </Link>
//         <ul className="navbar-menu">
//           <li className="navbar-item">
//             <Link to="/home" className="navbar-link">Home</Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/chats" className="navbar-link">Chats</Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/profile" className="navbar-link">Profile</Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/settings" className="navbar-link">Settings</Link>
//           </li>
//         </ul>
//         <div className="navbar-actions">
//           <button className="navbar-button">Logout</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // export default Navbar;
// // import React from 'react';

// const Home = () => {
//   const userName = localStorage.getItem('userName') || 'Guest';

//   return (
//     <div className="home-container">
//       <h1>Welcome, {userName}!</h1>
//       <p>This is your home page.</p>
//       {}
//     </div>
//   );
// };

// export default Home;
