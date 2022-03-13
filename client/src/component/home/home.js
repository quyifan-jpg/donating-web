import React from "react";
import LeftBar from "../left_bar/left_bar";
import RightDisplay from "../right_display/rightDisplay"
import NavigationBar from "../navigationBar/navigationBar"
//import Button from "@material-ui/core/Button";

import BottomDisplay from "../bottom_display/bottom_display"

import "./home.css";

/* Component for the Home page */
class Home extends React.Component {

  state = {
      searchItem:"",
      currentID:8,
  }

  getSearch=(data)=>{
      this.setState({
          searchItem: data
      })
  }

  render() {
    const {theApp} = this.props;
    
    // console.log(theApp);
    return (
      <nav>
        <NavigationBar theApp={theApp} />
        {/*<Header title = "shop website" subtitle = "add info button here">*/}
        {/*  header is here*/}
        {/*</Header>*/}

          {/*<div>{this.getSearch}</div>*/}

        <div className="container">
          <LeftBar theHome={theApp} />
          <RightDisplay allItem1={theApp.state.ItemCurrent} theHome={theApp} />

          <BottomDisplay theApp={theApp}/>

        </div>
      </nav>
    );
  }
}

export default Home;
