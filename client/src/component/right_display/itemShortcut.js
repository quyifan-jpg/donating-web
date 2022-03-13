import React from "react";

import "./right_display.css";
import "./right_display.css";

/* Component for the Home page */
class Item_shortcut extends React.Component {
    state={
        item_name: "",
        item_location : "",
        item_description : "",
    }
    
  render() {
    const {item1} = this.props
    //console.log(item1)
    return (
      <div className="item_shortcut">
          <p>{item1.name}</p>
          <p>{item1.location}</p>
          <p>{item1.region}</p>
          <p>{item1.description}</p>
      </div>
    );
  }
}

export default Item_shortcut;