import { addDoc} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import {db} from './firebase.config'
import { useLocation, useNavigate,  } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";



export default function Home (){
  const navigate = useNavigate()
  const {state} = useLocation()
  const [massage,setMassage] = useState([])
  const [chatList,setChatList] = useState([])



  useEffect(()=>{

  const q = query(collection(db, "chat"), where(state.uid, "==", true), where(state.myUid, "==", true));
    const unsubscribe = onSnapshot(q, (docSnap) => {
      const list = [];
      docSnap.forEach((doc) => {
          list.push(doc.data());
      });
      const sortList = list.sort((a,b) => a.createdAt - b.createdAt)
      setChatList(sortList)
    });
    return ()=> unsubscribe()

    
    },[])

  const sendMsg = async () =>{
    addDoc(collection(db,'chat'),{
      massage,
      [state.myUid]: true,
      [state.uid]: true,
      senderUid: state.myUid,
      createdAt:Date.now()
    })
    setMassage('')
  }
return(
    <div class="chat-container">
    <div class="profile-container">
      <img 
        src="https://cdn-icons-png.freepik.com/256/10117/10117587.png?semt=ais_hybrid" 
        alt="Back" 
        class="back-button"
        onClick={() => navigate('/home')} 
      />
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtNBgCacCwHhxVPj1ubPRygdT7X_7w_UrLQ&s" 
        alt="User Profile" 
        class="profile-image" 
      />
      <div class="profile-info">
        <h1>{state.name}</h1>
      </div>
    </div>
    <div class='profile-massage'>
{chatList.map((item,index) =>(
   <div class="user-card" key={index} onClick={()=>navigate('/chat',{state:{...item,myUid}})}>
   <div class="user-info">
     <h1 class="user-name">{item.massage}</h1>
     <p class="user-date">{moment(item.createdAt).startOf('second').fromNow()}</p>
   </div>
 </div>
))}
    </div>
  
    <div class="message-container">
      <input value={massage} onChange={e => setMassage(e.target.value)} type="text" placeholder="Type your message..." class="message-input" />
      <button onClick={sendMsg} class="send-button">Send</button>
    </div>
  </div>
)  
}
