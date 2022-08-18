import "./message.css";
import { format } from "timeago.js";
import './Chat.css'

export default function Message({ message, own }) {
  return (
    // <div className={own ? "message own" : "message"}>
    //   {/* <div className="messageTop">
    //     <img
    //       className="messageImg"
    //       src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    //       alt=""
    //     />
    //     <div className="messageContainer">
    //      <p className="messageText">{message.text}</p>
    //     </div>
      
    //   </div>
    //   <div className="messageBottom">{format(message.createdAt)}</div> */}
    // </div>
    <>
      <div className="chat__body">
          {
              <p className={`chat__message ${own && 'chat__chatReceiver'}`}>
              {/* <span className='chat__chatName'>{message.name}</span> */}
              {message.text}
              <span className='chat__Timestamp'>{format(message.createdAt)}</span>  
             </p>
          }
        </div>
    </>
  );
}
