import React from "react";
import "./item_info.css"

import { Link } from "react-router-dom";

// Importing actions/required methods
import { removeItem } from "../../actions/item";

class Item_info extends React.Component{

    remove_item=(item, theApp) => {
        removeItem(item)
        const filtered_items_current = theApp.state.ItemCurrent.filter(i => {
            return i.id !== item.id;
          })

        const filtered_item_all = theApp.state.ItemAll.filter(j => {
            return j.id !== item.id;
        })
        //console.log('start');
        for(let i = 1; i < theApp.state.UserAll.length; i++){
            let message = "has deleted the item :";
            let message1 = theApp.state.UserCurrent.Username.concat(' ', message);
            let message2 = message1.concat(' ', item.name);
            if (item.owener === theApp.state.UserAll[i].Uid){
                // console.log("own")
                // console.log(theApp.state.UserAll[i]);
                theApp.state.UserAll[i].notification.push(message2);
                
            }
            else if (theApp.state.UserAll[i].likes.includes(item.id)){
                // console.log("like")
                // console.log(theApp.state.UserAll[i]);
                theApp.state.UserAll[i].notification.push(message2);
            }
            

        }
        //console.log('end');
        theApp.setState({
            ItemCurrent: filtered_items_current,
            ItemAll: filtered_item_all
        })
    }


    check_item_exist=(item, theApp) => {
        for (let i = 0; i < theApp.state.ItemCurrent.length; i++) {
            if (theApp.state.ItemCurrent[i].id === item.id) {
                return "exist"
            }
        }
        return "not_exist"
    }

    check_user_match=(donor, cur_user_id) => {
        if (donor === cur_user_id) {
            return "match"
        } else if (cur_user_id === "61a923d4c07d74136fa89b33") {
            return "match"
        } else {
            return "dismatch"
        }
    }

    like_item=(theApp, item) => {
        const new_user_current = theApp.state.UserCurrent
        new_user_current.likes.push(item.id)

        const new_all_user = theApp.state.UserAll
        for (let i=0; i < new_all_user.length; i++) {
            if (new_all_user[i].Uid === new_user_current.Uid) {
                new_all_user[i] = new_user_current
            }
        }
        
        theApp.setState({
            UserCurrent: new_user_current,
            UserAll: new_all_user
        })
    }

    cancel_like_item=(theApp, item) => {
        const new_user_current = theApp.state.UserCurrent
        const n = new_user_current.likes.length
        for (let i=0; i < n; i++) {
            if (new_user_current.likes[i] === item.id) {
                new_user_current.likes.splice(i, 1)
            }
        }

        const new_all_user = theApp.state.UserAll
        for (let j=0; j < new_all_user.length; j++) {
            if (new_all_user[j].Uid === new_user_current.Uid) {
                new_all_user[j] = new_user_current
            }
        }

        theApp.setState({
            UserCurrent: new_user_current,
            UserAll: new_all_user
        })
    }

    check_liked_this_item=(theApp, item) => {
        const likes = theApp.state.UserCurrent.likes
        for (let i=0; i < likes.length; i++) {
            if (likes[i] === item.id) {
                return "like_this_item"
            }
        }
        return "no_like_this_item"
    }

    check_no_liked_this_item=(theApp, item) => {
        let no_like = true
        const likes = theApp.state.UserCurrent.likes
        for (let i=0; i < likes.length; i++) {
            if (likes[i] === item.id) {
                no_like = false
            }
        }
        if (no_like === true) {
            return "like_this_item"
        } else {
            return "no_like_this_item"
        }
    }




    render() {
        const {cur_item} = this.props
        const {allUser} = this.props
        const {donor} = this.props
        const {theApp} = this.props

        const cur_user_id = theApp.state.UserCurrent.Uid

        // console.log('check likes hahahahaha')
        // console.log(theApp.state.UserCurrent.likes)
        // console.log(theApp.state.UserCurrent)

        let cur_donor = null
        for (let i = 0; i < allUser.length; i++) {
            // console.log(allUser[i].Uid)
            // console.log("=============")
            // console.log(donor)
            // console.log("=============")
            if (allUser[i].Uid === donor) {
                cur_donor = allUser[i]
            }
        }

        return (
            <div className="item_info">

                <div id={this.check_item_exist(cur_item, theApp)}>
                <div className="item_basic_info">
                    <h2>Item information</h2>
                    <p>Item name: {cur_item.name}</p>
                    <p>Item description: {cur_item.description}</p>
                    <p>Location: {cur_item.location}</p>
                    
                    <div className={this.check_user_match(donor, cur_user_id)}>
                        <button 
                          className="delete_item"
                          onClick={
                              () => this.remove_item(cur_item, theApp)
                          }
                        >
                          Delete this item
                        </button>
                    </div>

                    <button id={this.check_liked_this_item(theApp, cur_item)}
                      className="like_item"
                      onClick={
                          () => this.like_item(theApp, cur_item)
                      }
                    >
                      Like this item
                    </button>

                    <button id={this.check_no_liked_this_item(theApp, cur_item)}
                      className="cancel_like_item"
                      onClick={
                          () => this.cancel_like_item(theApp, cur_item)
                      }
                    >
                      Cancel like this item
                    </button>

                </div>
                </div>

                <Link to={{pathname: "./../info", state:{donor}}}>

                <div className="donor_info">
                    <h2>Donor contact information</h2>
                    <p>Donor username: {cur_donor.Username}</p>
                    <p>Email: {cur_donor.email}</p>
                    <p>Phone number: {cur_donor.phone_number}</p>
                </div>

                </Link>
            </div>

            

        )
    }
}

export default Item_info