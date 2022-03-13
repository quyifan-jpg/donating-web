import React from "react";
import { Link } from "react-router-dom";
//import Button from "@material-ui/core/Button";

import "./cart.css";
import NavigationBar from "../navigationBar/navigationBar";
import ItemShortcut from "../right_display/itemShortcut";

/* Component for the Cart page */
class Cart extends React.Component {
  state={
    username:"user1"
  }

  get_liked_items=(theApp, liked_item) => {
    const likes = theApp.state.UserCurrent.likes
    const all_item = theApp.state.ItemAll
    for (let i=0; i < likes.length; i++) {
      for (let j=0; j < all_item.length; j++) {
        if (likes[i] === all_item[j].id) {
          liked_item.push(all_item[j])
        }
      }
    }
  }


  render() {
      const {theApp} = this.props;

      const liked_item = []


    return (
      <div>

        <NavigationBar theApp={theApp}/>

        <h1>Here are all the furnitures you liked</h1>

        <p>{this.get_liked_items(theApp, liked_item)}</p>

        <div>
          {liked_item.map(item => (
            <div>
              <Link to={{pathname:"./../item_display", state:{item}}}>
                <ItemShortcut
                item1={item}
                theHome={this.props.theApp}
                />
              </Link>
            </div>
          ))}
        </div>


      </div>
    );
  }
}

export default Cart;