import React from "react";
import ItemShortcut from "./itemShortcut"
import "./right_display.css";
import { Link } from "react-router-dom";

/* Component for the Home page */
class Right_display extends React.Component {
  state={
    current_num:8
  }

  changePublish = ()=>{

  }
  render() {
    const {allItem1,theHome} = this.props;
    return (
      <div className="right_display">
        <h3>Items to browse</h3>
        <p>It's about 3 items/per row to browse, and would change if the buttons on left side changes.</p>
          {allItem1.map(item =>(
            <div>
            {/* <Link to ={`/products/info?orderID=${orderID}`}>{orderID}</Link> */}
            <Link to={{pathname:`./../Item_display`, state:{item}}}>
            <ItemShortcut
            item1={item} 
            theHome={theHome}
            // key={item.Id}
            />
            </Link>
            </div>
          )
          
          )}
      </div>
    );
  }
}

export default Right_display;