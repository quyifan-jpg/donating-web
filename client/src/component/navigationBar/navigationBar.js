import React from "react";
import { Link } from "react-router-dom";

import "./navigationBar.css";

// Importing actions/required methods
import { addUser, loginUser } from "../../actions/user";

/* Component for the Navigation Bar page */
class NavigationBar extends React.Component {

    // super(props);

    state = {
        searchItem: "",
        numLogin: 1,
        numRegister: 1,
        loginUsername: "",
        loginPassword: "",
        registerUsername: "",
        registerPassword: "",
        registerRepeatPassword: "",
        // savingUsername:"",
        // savingUserPassword:""
    }

    searchInput = (event) => {
        this.setState({
            searchItem: event.target.value
        })
    }

    loginUsernameInput = (event) => {
        this.setState({
            loginUsername: event.target.value
        })
    }

    loginPasswordInput = (event) => {
        this.setState({
            loginPassword: event.target.value
        })
    }

    registerUsernameInput = (event) => {
        this.setState({
            registerUsername: event.target.value
        })
    }

    registerPasswordInput = (event) => {
        this.setState({
            registerPassword: event.target.value
        })
    }

    registerRepeatPasswordInput = (event) => {
        this.setState({
            registerRepeatPassword: event.target.value
        })
    }

    finishSearch = (theApp) => {
        console.log(theApp);
        const ItemAll1 = theApp.state.ItemAll;
        const newItemList = ItemAll1.filter(
            (s)=>{
                var check = s.name.search(this.state.searchItem);
                var check2 = s.description.search(this.state.searchItem);
                return check !== -1 || check2 !== -1;
            }
        )
        console.log(newItemList);
        this.setState({
            searchItem: ""
        })
        theApp.setState({
            ItemCurrent:newItemList
        })
    }

    changeNumLogin = () => {
        this.setState({
            numLogin: 1 - this.state.numLogin
        })
    }

    checkCSSLogin = () => {
        return this.state.numLogin === 0 ? ["lightBlock", "fadeBlock"] : ["lightNone", "fadeNone"];
    }

    changeNumRegister = () => {
        this.setState({
            numRegister: 1 - this.state.numRegister
        })
    }

    checkCSSRegister = () => {
        return this.state.numRegister === 0 ? ["lightBlock", "fadeBlock"] : ["lightNone", "fadeNone"];
    }

    checkLoginPasswordError = (theApp) => {
        if (this.checkLoginPasswordCorrect(theApp) !== true){
            return "errorRed";
        } else {
            return "errorWhite";
        }
    }

    checkLoginUsernameError = (theApp) => {
        if (this.checkLoginUsernameHasBeenRegistered(theApp) !== true){
            return "errorRed";
        } else {
            return "errorWhite";
        }
    }

    loginButtonDisable = (theApp) => {
        // We need to check if the username and password are correct in dataset.
        return "button"
        if (this.state.loginUsername === "" || this.state.loginPassword === "" ||  this.checkLoginPasswordCorrect(theApp) !== true){
            return "buttonDisable";
        } else {
            return "button";
        }
    }

    checkRegisterPasswordError = () => {
        if (this.state.registerPassword !== this.state.registerRepeatPassword){
            return "errorRed";
        } else {
            return "errorWhite";
        }
    }

    checkRegisterUsernameError = (theApp) => {
        if (this.checkRegisterUsernameHasBeenRegistered(theApp) === true) {
            return "errorRed";
        } else {
            return "errorWhite";
        }
    }

    registerButtonDisable = (theApp) => {
        if (this.state.registerPassword !== this.state.registerRepeatPassword ||
            this.state.registerUsername === "" || this.state.registerPassword === ""
            || this.state.registerRepeatPassword === "" || this.checkRegisterUsernameHasBeenRegistered(theApp) === true){
            return "buttonDisable";
        } else {
            return "button";
        }
    }

    removeLoginInfo = () => {
        this.setState({
            loginUsername: "",
            loginPassword: "",
        })
    }

    removeRegisterInfo = () => {
        this.setState({
            registerUsername: "",
            registerPassword: "",
            registerRepeatPassword: ""
        })
    }

    // checkCurrentUserNone = (event, theApp) => {
    //     // if (theApp.state.UserCurrent.Username === ""){
    //     //     event.preventDefault()
    //     // }
    // }

    savingRegisterUsernamePassword = (theApp) => {
        addUser(this, theApp)
        // const newUser
        // // const newUser = {Uid:theApp.state.UIDCurrent, Username:this.state.registerUsername, password:this.state.registerPassword, admin:0, email:"", phone_number:"", likes:[]}
        // const newUserList = theApp.state.UserAll
        // newUserList.push(newUser)
        // theApp.setState({
        //     UserAll: newUserList,
        //     // UIDCurrent: theApp.state.UIDCurrent + 1
        // })
    }

    checkRegisterUsernameHasBeenRegistered = (theApp) => {
        const temp = theApp.state.UserAll
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username === this.state.registerUsername) {
                return true
            }
        }
        return false
    }

    checkLoginUsernameHasBeenRegistered = (theApp) => {
        let temp = theApp.state.UserAll
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username === this.state.loginUsername) {
                return true
            }
        }
        return false
    }

    checkLoginPasswordCorrect = (theApp) => {
        // return this.checkLoginUsernameHasBeenRegistered(theApp)[1] === this.state.loginPassword;
        let temp = theApp.state.UserAll
        for (let i=0; i < temp.length; i++) {
            if (temp[i].Username === this.state.loginUsername && temp[i].password === this.state.loginPassword) {
                return true
            }
        }
        return false
    }

    buttonDisplay = (theApp) => {
        if (theApp.state.UserCurrent.Username === "") {
            return "buttonNone";
        } else {
            return "buttonBox";
        }
    }

    buttonDisplayReverse = (theApp) => {
        if (theApp.state.UserCurrent.Username !== "") {
            return "buttonNone";
        } else {
            return "buttonBox";
        }
    }

    savingLoginUsernamePassword = (theApp) => {
        //
        // const temp = theApp.state.UserAll
        // let UID = -3;
        // let adm = "";
        // let em = "";
        // let phone = "";
        // let like = [];
        // let notify = [];
        // for (let i=0; i < temp.length; i++) {
        //     if (temp[i].Username === this.state.loginUsername) {
        //         UID = temp[i].Uid
        //         adm = temp[i].admin;
        //         em = temp[i].email;
        //         phone = temp[i].phone_number;
        //         like = temp[i].likes;
        //         notify = temp[i].notification;
        //     }
        // }
        // console.log("login begin")
        // const newUser = {Uid:UID, Username:this.state.loginUsername, password:this.state.loginPassword, admin:adm, email:em, phone_number:phone, likes: like, notification:notify}
        loginUser(this, theApp)
        //
        // theApp.setState({
        //     UserCurrent: newUser
        // })

    }

    removeLoginState(theApp) {
        const newUser = {Uid:"", Username:"", password:"", admin:0, email:"", phone_number:"", likes: [], notification: ["Please log in first"] }
        theApp.setState({
            UserCurrent: newUser
        })
    }


    render() {
        const {theApp} = this.props;

        return (
            <div className="navigationBar">
                <input className="searchBox" value={this.state.searchItem}
                       onChange={this.searchInput}
                       type="text"
                       name="searchInfo"
                       placeholder="What are you looking for?"
                />
                <button className="buttonBox"
                        onClick={()=>this.finishSearch(theApp)}>
                    Search
                </button>
                <ul id="navigation">
                    <li>
                        <Link to={{pathname:`./../Message`, state: theApp.state.UserCurrent.Username}}>
                            
                            <button className="buttonBox">notice</button>
                        </Link>
                    </li>
                    <li><Link to="/"><button className="buttonBox">Home</button></Link></li>
                    {/*<li><Link to="/Cart" onClick={this.checkCurrentUserNone(theApp)}>Cart</Link></li>*/}
                    <li><Link to="/Cart"><button className="buttonBox">Like</button></Link></li>
                    <li>Login User Info:
                        {/*<Link to={{pathname:`./../Info`, state:theApp}} onClick={this.checkCurrentUserNone}>*/}
                        <Link to={{pathname:`./../Info`, state: theApp.state.UserCurrent.Username}}>
                            { /* Using the global state variable from App.js */}
                            <button className={this.buttonDisplay(theApp)}>{theApp.state.UserCurrent.Username}</button>
                        </Link>
                        <button className={this.buttonDisplay(theApp)} onClick={() => {this.removeLoginState(theApp)}}>Logout</button>
                    </li>
                    <li>
                        <button className={this.buttonDisplayReverse(theApp)} onClick={() =>{this.changeNumLogin()}}>Login</button>
                        <button className="buttonBox" onClick={() =>{this.changeNumRegister()}}>Register</button>
                        <div id={this.checkCSSLogin()[0]} className="white_content">
                            <div className="font">Login</div>
                            <form method="post" id="form_submit">
                                <input id="usernameLogin" className="formControl" value={this.state.loginUsername} onChange={this.loginUsernameInput} type="text" placeholder=" Username" name="username" />
                                <input id="passwordLogin" className="formControl" value={this.state.loginPassword} onChange={this.loginPasswordInput} type="password" placeholder=" Password" name="password" />
                                <p id={this.checkLoginUsernameError(theApp)} className="formNoBoundary">Invalid Username!</p>
                                {/*<p id={this.checkLoginPasswordError(theApp)} className="formNoBoundary">Invalid Password!</p>*/}
                                <input type="button" value="Login" className={this.loginButtonDisable(theApp)} onClick={() =>{this.savingLoginUsernamePassword(theApp); this.changeNumLogin(); this.removeLoginInfo()}} />
                                <input type="button" value="Cancel" className="button" onClick={() =>{this.changeNumLogin(); this.removeLoginInfo()}} />
                            </form>
                        </div>
                        <div id={this.checkCSSLogin()[1]} className="black_overlay" />
                        <div id={this.checkCSSRegister()[0]} className="white_content">
                            <div className="font">Register</div>
                            <form method="post" id="form_submit">
                                <input id="usernameRegister" className="formControl" value={this.state.registerUsername} onChange={this.registerUsernameInput} type="text" placeholder=" Username" name="username" />
                                <input id="passwordRegister" className="formControl" value={this.state.registerPassword} onChange={this.registerPasswordInput} type="password" placeholder=" Password" name="password" />
                                <input id="passwordConfirmation" className="formControl" value={this.state.registerRepeatPassword} onChange={this.registerRepeatPasswordInput} type="password" placeholder=" Repeat Password" name="password confirmation" />
                                <p id={this.checkRegisterUsernameError(theApp)} className="formNoBoundary">Username has been used!</p>
                                <p id={this.checkRegisterPasswordError()} className="formNoBoundary">Password does not match!</p>
                                <input type="button" value="Register" className={this.registerButtonDisable(theApp)} onClick={() =>{this.savingRegisterUsernamePassword(theApp); this.changeNumRegister(); this.removeRegisterInfo()}} />
                                <input type="button" value="Cancel" className="button" onClick={() =>{this.changeNumRegister(); this.removeRegisterInfo()}} />
                            </form>
                        </div>
                        <div id={this.checkCSSRegister()[1]} className="black_overlay" />
                    </li>
                    
                </ul>
            </div>
        );
    }
}
export default NavigationBar;