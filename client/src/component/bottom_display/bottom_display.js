import React from "react";
import { Link } from "react-router-dom";
import "./bottom_display.css";

class Bottom_display extends React.Component{

    check_is_admin = (theApp) => {
        if (theApp.state.UserCurrent.Uid === "61a923d4c07d74136fa89b33") {
            return "is_admin"
        }
        return "not_admin"
    }

    render(){
        const {theApp} = this.props
        return (
            <div id={this.check_is_admin(theApp)} className="bottom">
                <div>
                    <Link to={{pathname:"./../all_users"}}>
                        <button className="see_all_users">
                            See all the Users
                        </button>
                    </Link>                  
                </div>
            </div>
        )
    }
}

export default Bottom_display