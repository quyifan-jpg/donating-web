import React from "react";
import NavigationBar from "../navigationBar/navigationBar";

import { changePasswordEmailPhoneNumber } from "../../actions/user";


class Block extends React.Component{

    state = {
        OldPassword:"",
        NewPassword:"",
        newEmail:"",
        newPhoneNumber:""
    }

    handleChange = event =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]:value
        })
    }

    handleChangeEmail = (event) => {
        this.setState({
            newEmail: event.target.value
        })
    }

    handleChangePhoneNumber = (event) => {
        this.setState({
            newPhoneNumber: event.target.value
        })
    }

    updatePassword = (theApp) =>{
        const temp = theApp.state.UserAll
        let exceptChangeUserList = []
        let UID = -3;
        let adm = "";
        let em = "";
        let phone = "";
        let like = [];
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username !== theApp.state.UserCurrent.Username) {
                exceptChangeUserList.push(temp[i])
            } else {
                UID = temp[i].Uid
                adm = temp[i].admin;
                em = temp[i].email;
                phone = temp[i].phone_number;
                like = temp[i].likes;
            }
        }
        changePasswordEmailPhoneNumber(UID, this.state.NewPassword, em, phone)
        const newUser = {Uid:UID, Username:theApp.state.UserCurrent.Username, password:this.state.NewPassword, admin:adm, email:em, phone_number:phone, likes: like}
        exceptChangeUserList.push(newUser)
        theApp.setState({
            UserCurrent: newUser,
            UserAll: exceptChangeUserList
        })
    }

    updateEmail = (theApp) => {
        const temp = theApp.state.UserAll
        let exceptChangeUserList = []
        let UID = -3;
        let adm = "";
        let pass = ""
        let phone = "";
        let like = [];
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username !== theApp.state.UserCurrent.Username) {
                exceptChangeUserList.push(temp[i])
            } else {
                UID = temp[i].Uid
                adm = temp[i].admin;
                pass = temp[i].password;
                phone = temp[i].phone_number;
                like = temp[i].likes;
            }
        }
        changePasswordEmailPhoneNumber(UID, pass, this.state.newEmail, phone)
        const newUser = {Uid:UID, Username:theApp.state.UserCurrent.Username, password:pass, admin:adm, email:this.state.newEmail, phone_number:phone, likes: like}
        exceptChangeUserList.push(newUser)
        theApp.setState({
            UserCurrent: newUser,
            UserAll: exceptChangeUserList
        })
    }

    updatePhoneNumber = (theApp) => {
        const temp = theApp.state.UserAll
        let exceptChangeUserList = []
        let UID = -3;
        let adm = "";
        let pass = ""
        let em = "";
        let like = [];
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username !== theApp.state.UserCurrent.Username) {
                exceptChangeUserList.push(temp[i])
            } else {
                UID = temp[i].Uid
                adm = temp[i].admin;
                pass = temp[i].password;
                em = temp[i].email;
                like = temp[i].likes;
            }
        }
        changePasswordEmailPhoneNumber(UID, pass, em, this.state.newPhoneNumber)
        const newUser = {Uid:UID, Username:theApp.state.UserCurrent.Username, password:pass, admin:adm, email:em, phone_number:this.state.newPhoneNumber, likes: like}
        exceptChangeUserList.push(newUser)
        theApp.setState({
            UserCurrent: newUser,
            UserAll: exceptChangeUserList
        })
    }

    printCheckOldOriginalPassword = (theApp) => {
        if (theApp.state.UserCurrent.password === this.state.OldPassword && this.state.OldPassword !== ""){
            return "errorWhite"
        } else {
            return "errorRed"
        }
    }

    printCheckOldNewPassword = (theApp) => {
        if (this.state.OldPassword !== this.state.NewPassword && this.state.NewPassword !== ""){
            return "errorWhite"
        } else {
            return "errorRed"
        }
    }

    printNotLoginError = (theApp) => {
        if (theApp.state.UserCurrent.Username !== ""){
            return "errorWhite"
        } else {
            return "errorRed"
        }
    }


    printButtonPassword = (theApp) => {
        if (theApp.state.UserCurrent.password === this.state.OldPassword && this.state.OldPassword !== this.state.NewPassword && this.state.NewPassword !== "" && theApp.state.UserCurrent.Username !== "") {
            return "buttonThree"
        } else {
            return "buttonThreeNone"
        }
    }

    printButtonNotLoginError = (theApp) => {
        if (theApp.state.UserCurrent.Username !== ""){
            return "buttonThree"
        } else {
            return "buttonThreeNone"
        }
    }


    removePassword = () => {
        this.setState({
            OldPassword: "",
            NewPassword: ""
        })
    }

    removeEmail = () => {
        this.setState({
            newEmail: ""
        })
    }

    removePhoneNumber = () => {
        this.setState({
            newPhoneNumber: ""
        })
    }

    render() {
        // const {theUser} = this.props.url.location.state.theUser
        const {theApp} = this.props
        //const {theUsername} = this.props.url.location.state
        //const UserList = this.props.theApp.state.UserAll;

        //var Uid = 1;
        var p = "";

          
         // const theUser = UserList.find( element => element.Uid===Uid);
        //   const UserItem = this.props.theApp.state.ItemAll.filter((item)=>{
        //       if (theUser.admin ===1){
        //         return item
        //       } else {
        //         return item.owener === Uid;
        //       }
        //   });

        return (
            <div>
                <NavigationBar theApp={theApp} />
                <h2 className="wordCenter">You can change your password, email address and phone number in this page.</h2>

                <div className="infoBlock">
                    <h2> Your current login username: {theApp.state.UserCurrent.Username} </h2>
                    <h2>Change password</h2>
                    <h1>{p}</h1>
          
                    <input placeholder="  old password"
                        name="OldPassword"
                        className="formBoxThree"
                        value={this.state.OldPassword}
                        onChange={this.handleChange}>
                    </input>
          
                    <input placeholder="  new password"
                        name="NewPassword"
                        className="formBoxThree"
                        value={this.state.NewPassword}
                        onChange={this.handleChange}>
                    </input>

                    <button className={this.printButtonPassword(theApp)} onClick={()=>{this.updatePassword(theApp); this.removePassword(); alert("Reset Password Successfully")}}>change password</button>
                    <p id={this.printCheckOldOriginalPassword(theApp)} className="word">Invalid old password!</p>
                    <p id={this.printCheckOldNewPassword(theApp)} className="word">Same old and new passwords/new password is none!</p>
                    <p id={this.printNotLoginError(theApp)} className="word">You must login to change password!</p>
                </div>

                <div className="changeEmailPhone">
                    <h2>Change email address</h2>

                    <input placeholder="  new email address"
                        name="new email address"
                        className="formBoxThree"
                        value={this.state.newEmail}
                        onChange={this.handleChangeEmail}>
                    </input>

                    <button className={this.printButtonNotLoginError(theApp)} onClick={()=>{this.updateEmail(theApp); this.removeEmail(); alert("Reset Email Address Successfully")}}>change email address</button>
                    <p id={this.printNotLoginError(theApp)} className="word">You must login to change email!</p>
                </div>

                <div className="changeEmailPhone">
                    <h2>Change phone number</h2>

                    <input placeholder="  new phone number"
                           name="new phone number"
                           className="formBoxThree"
                           value={this.state.newPhoneNumber}
                           onChange={this.handleChangePhoneNumber}>
                    </input>

                    <button className={this.printButtonNotLoginError(theApp)} onClick={()=>{this.updatePhoneNumber(theApp); this.removePhoneNumber(); alert("Reset Phone Number Successfully!")}}>change phone number</button>
                    <p id={this.printNotLoginError(theApp)} className="word">You must login to change phone number!</p>
                </div>




            </div>
        );
    }
}

export default Block