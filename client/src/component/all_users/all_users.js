import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../navigationBar/navigationBar";
import ItemShortcut from "./user_shortcut";
import "./all_users.css";

class All_users extends React.Component{

    render(){
        const {theApp} = this.props

        return(
            <div>
                <NavigationBar theApp={theApp} />
                <p>this is the all_users page</p>
                <h1>Below are all the users</h1>

                {theApp.state.UserAll.map(user =>(
                    <div>
                        <Link to={{pathname:"./../info", state:{user}}}>
                            <ItemShortcut
                            user={user}
                            />
                        </Link>
                    
                    </div>
                ))}


            </div>

        )
    }
}

export default All_users