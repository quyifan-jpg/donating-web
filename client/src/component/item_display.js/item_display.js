import React from "react";
//import Button from "@material-ui/core/Button";

import "./item_display.css";

import NavigationBar from "../navigationBar/navigationBar";

import ItemInfo from "./item_info"

/* Component for the Home page */
class Item_display extends React.Component {
  state={
    username:"user1"
  }

  render() {
    //const {id} = this.props.match.params;
    //console.log(useParams())
    //console.log(this.props);
    const itemInfo = this.props.url.location.state.item;
    //console.log(id);

    const {theApp} = this.props
    

    return (
      <div>
        <NavigationBar theApp={theApp} />
        
      {/* <div>...</div>
        <div>
          <Link  to={"./../"}> */}
                { /* Using the global state variable from App.js */}
            {/* <div> {this.props.appState.term} back to home </div>
          </Link> 
        </div> */}

        <h1 id="titleTwo">This is item page</h1>
        <div>
          {/* <h1> {itemInfo.name}</h1>
          <h2> {itemInfo.region} </h2>
          <h2> {itemInfo.location} </h2>
          <h2> {itemInfo.email} </h2>
          <h2> {this.state.username} </h2> */}
          <ItemInfo cur_item={itemInfo} allUser={theApp.state.UserAll} donor={itemInfo.owener} theApp={theApp}/>
        </div>

        {/* <button>finish denote this item</button>
        <p></p>
        <button>I may pick this item</button> */}
        
      </div>
    );
  }
}

export default Item_display;