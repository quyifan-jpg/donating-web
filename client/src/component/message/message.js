import React from "react";
//import Button from "@material-ui/core/Button";
import NavigationBar from "../navigationBar/navigationBar";

import "./message.css"
/* Component for the Home page */
class Message extends React.Component {
  state={
    
  }

  DeleteMessage= (message,theApp)=>{
    
    var notify =  theApp.state.UserCurrent.notification;
    const newUser =theApp.state.UserCurrent;
    const newUserList = theApp.state.UserAll;
    console.log(notify)
    notify = notify.filter(
      s=>{
        console.log(message)
        console.log(s)
        console.log(s !== message)
        return s !== message;
      }
    );
    console.log("change")
    console.log(notify)
    newUser.notification = notify;
   
    for (let i = 0 ; i<newUserList.length; i++){
      if (newUserList[i].Uid === newUser.Uid){
        newUserList[i].notification = notify;
        console.log(newUserList[i])
      }
    }
    theApp.setState({
      UserCurrent:newUser,
      UserAll:newUserList
    })
  }

  render() {
    const {theApp} = this.props;
    
    return (
      <div>
        <NavigationBar theApp={theApp} />
        <div>this is notification table</div>
        <ul >
          {theApp.state.UserCurrent.notification.map(message =>(
            <li>
            <p> {message}</p>
            <button className="delete_this_message"
            onClick={()=>this.DeleteMessage(message,theApp)}>delete this message</button>
          </li>
          ))}

        </ul>
      </div>
    );
  }
}

export default Message;