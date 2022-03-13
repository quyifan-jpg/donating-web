import React from "react";

import "./left_bar.css";
import Publish from "../publish/publish";

/* Component for the Home page */
class Left_bar extends React.Component {
  displayAll = (theHome) =>{
    theHome.setState({
      ItemCurrent:theHome.state.ItemAll
    })
  }

  fillItem = (theHome,name)=>{
    // const allItem = theHome.state.ItemAll.slice()
    // console.log(theHome.state.ItemAll)

    const currentFilled = theHome.state.ItemAll.filter(
      s=>{
        return s.type === name
      }
    )
    // console.log(currentFilled)
    theHome.setState({
      ItemCurrent:currentFilled
    })
  }

  fillItemRegion = (theHome,name)=>{
    const currentFilled = theHome.state.ItemAll.filter(
      s=>{
        return s.region === name
      }
    )
    console.log(currentFilled)
    theHome.setState({
      ItemCurrent:currentFilled
    })
  }

  render() {
    const {theHome} = this.props;
    // console.log(this.props.theHome);
    return (
      <div>
        <div className="left_bar">
        <h3 className="word">Get for free furniture</h3>

          <p className="word">Please select furniture type.</p>
          <ul id="ulCSS">
            <li><button name="beds" className="buttonBar" onClick={()=>this.fillItem(theHome,"bed")}>beds</button></li>
            <li><button name="chair" className="buttonBar" onClick={()=>this.fillItem(theHome,"chair")}>chair</button></li>
            <li><button name="desk" className="buttonBar" onClick={()=>this.fillItem(theHome,"desk")}>desk</button></li>
            <li><button name="storage" className="buttonBar" onClick={()=>this.fillItem(theHome,"storage")}>storage</button></li>
            <li><button name="kitchen" className="buttonBar" onClick={()=>this.fillItem(theHome,"kitchen")}>kitchen</button></li>
            <li><button name="lighting" className="buttonBar" onClick={()=>this.fillItem(theHome,"lighting")}>lighting</button></li>
            <li><button name="all"  className="buttonBar" onClick={()=>this.displayAll(theHome)}>all</button></li>
          </ul>
          <p className="word">Please select region.</p>
          <ul id="ulCSS2">
            <li><button name="downtown" className="buttonBar" onClick={()=>this.fillItemRegion(theHome,"downtown")}>downtown</button></li>
            <li><button name="university" className="buttonBar" onClick={()=>this.fillItemRegion(theHome,"university")}>university</button></li>
            <li><button name="North York" className="buttonBar" onClick={()=>this.fillItemRegion(theHome,"North York")}>North York</button></li>
            <li><button name="Scarborough" className="buttonBar" onClick={()=>this.fillItemRegion(theHome,"Scarborough")}>Scarborough</button></li>
            <li><button name="Richmond Hill" className="buttonBar" onClick={()=>this.fillItemRegion(theHome,"Richmond Hill")}>Richmond Hill</button></li>

            <li><button name="all"  className="buttonBar" onClick={()=>this.displayAll(theHome)}>all</button></li>
          </ul>
        </div>
        {/*<div className="rightBar">*/}
        {/*    <p>*/}
        {/*        right_display for Browse furniture.*/}
        {/*        it's about 2x4 item to Browse, and would change if the checkbox on left changes.*/}
        {/*    </p>*/}
            {/*<p><button  id="showButton"> I want to publish </button></p>*/}
            <Publish  display="block" theHome={theHome} />

      </div>
    );
  }
}

export default Left_bar;