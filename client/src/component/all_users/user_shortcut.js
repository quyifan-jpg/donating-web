import React from "react"

class User_shortcut extends React.Component{

    render(){
        const {user} = this.props
        //const donor = user.Uid  
        return(
            <div className="user_shortcut">
                <p>Username: {user.Username}</p>
                <p>Email: {user.email}</p>
                <p>Phone number: {user.phone_number}</p>


            </div>
        )
    }
}

export default User_shortcut