import React from "react";
import { Link } from "react-router-dom";
//import Button from "@material-ui/core/Button";
import ItemShortcut from "../right_display/itemShortcut";
import "./info.css";
import NavigationBar from "../navigationBar/navigationBar";

// Importing actions/required methods
import { removeUser } from "../../actions/user";

/* Component for the Home page */
class Info extends React.Component {
  state = {
    OldPassword:"",
    NewPassword:""
  }
  handleChange = event =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]:value
    })
  }
  checkPassword = (theU) =>{
    console.log(theU)
  }


  checkUserMatch = (Uid, cur_user_id) => {
    if (Uid !== cur_user_id) {
      return "differentUser"
    } else {
      return "sameUser"
    }
  }

  delete_user = (theApp, Uid) => {
    removeUser(Uid)
    const filtered_items_current = theApp.state.ItemCurrent.filter(i => {
      return i.owener !== Uid;
    })

    const filtered_item_all = theApp.state.ItemAll.filter(j => {
      return j.owener !== Uid;
    })

    const filtered_user_all = theApp.state.UserAll.filter(k => {
      return k.Uid !== Uid;
    })

    const all_test = theApp.state.ItemAll.filter(j => {
      return j.owener === Uid;
    })
    const username_test = theApp.state.UserAll.filter(k => {
      return k.Uid === Uid;
    })
    var flag;
    for (let i =0; i<filtered_user_all.length;i++){
      flag = false;
      for (let x =0; x<all_test.length; x++){
        for (let y = 0; y<username_test.length; y++){
          if (username_test[y].likes.includes(all_test[x].id)){
            flag = true;
          }
        }
      }
      if (flag){
        filtered_user_all[i].notification.push("some item in your likes disappears since admin delete ")
      }
      filtered_user_all[i].notification.push("admin delete this user and all his/her items since other's report")
    }

    theApp.setState({
      ItemCurrent: filtered_items_current,
      ItemAll: filtered_item_all,
      UserAll: filtered_user_all
    })

    // const n = all_user.length
    // for (let i = 0; i < n; i++) {
      // console.log('aaaaaaaaaaaaaaaaaa')
      // console.log(all_user)
      // console.log(all_user[i].Uid)
      // if (all_user[i].Uid === Uid) {
      //   all_user.splice(i, 1)

      //   theApp.setState({
      //     UserAll: all_user
      //   })
      //   return ""
    //   }
    // }
  }

  check_whether_show_delete = (cur_user_id, Uid) => {
    if (cur_user_id === "61a923d4c07d74136fa89b33") {
      if (Uid !== "61a923d4c07d74136fa89b33") {
        return "show_delete"
      }
    }
    return "not_show_delete"
  }

  render() {
    const theUsername = this.props.url.location.state;
    const UserList = this.props.theApp.state.UserAll;
    const {theApp} = this.props;
    let Uid = 1;
    let p = "";
    
    if (theUsername.donor !== undefined){
      Uid = theUsername.donor
      if (Uid === theApp.state.UserCurrent.Uid) {
        p = "Your"
      } else {
        p = "Other"
      }
    } else if(theUsername.user !== undefined){
      Uid = theUsername.user.Uid
      if (Uid === theApp.state.UserCurrent.Uid) {
        p = "Your"
      } else {
        p = "Other"
      }
    } else {
      const User = UserList.find( element => element.Username===theUsername);
      Uid = User.Uid
      p = "Your"
    }
    
    const theUser = UserList.find( element => element.Uid===Uid);
    const UserItem = this.props.theApp.state.ItemAll.filter((item)=>{
        if (theUser.admin ===1){
          return item
        } else {
          return item.owener === Uid;
        }
    });
    


    const cur_user_id = this.props.theApp.state.UserCurrent.Uid
    
    
    return (
      <div>
        <NavigationBar theApp={theApp} />
        <h1 id="title">This is info page</h1>
        <h1><span>Viewing </span>
          <span className="redWord">{p}</span>
          <span> info page</span></h1>
        {/* <div className="infoBlock">
          <h2> {theUser.Username} </h2>
          
          <input placeholder="old password"
          name="OldPassword"
          value={this.state.OldPassword}
           onChange={this.handleChange}></input>
          
          <input placeholder="new password"
          name="NewPassword"
          value={this.state.NewPassword}
           onChange={this.handleChange}></input>

          <button onClick={()=>this.checkPassword(theUser)}>change password</button>
          <p>invalid old password</p>
          <p>new password and old password are the same</p>
          <p>reset password successfully</p>
        </div> */}

        <div id={this.checkUserMatch(Uid, cur_user_id)}>
        <Link to={{pathname:"./../Block", state:{theUsername}}}>
          <button className="buttonToChangeInfo">
            Change your info
          </button>
        </Link>
        </div>



        <div className="userSuperInfo">
          <h2 className="wordThree">The information of {theUser.Username}</h2>
          <p className="userInfo">Email: {theUser.email}</p>
          <p className="userInfo">Phone number: {theUser.phone_number}</p>
        </div>


        <div className={this.check_whether_show_delete(cur_user_id, Uid)}>
          <Link to={{pathname:"./../Home"}}>
          <button 
            className="buttonToDeleteUser"
            onClick={
              () => this.delete_user(theApp, Uid)
            }
          >
            Delete this user
          </button>
          </Link>
        </div>

        


        <div>
          <h2><span className="redWord">{p}</span>
            <span>'s items</span></h2>
          <div>
          {UserItem.map(item =>(
            <div>
            {/* <Link to ={`/products/info?orderID=${orderID}`}>{orderID}</Link> */}
            <Link to={{pathname:`./../Item_display`, state:{item}}}>
            <ItemShortcut
            item1={item} 
            theHome={this.props.theApp}
            />
            </Link>
            </div>
          )
          
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default Info;