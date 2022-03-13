import React from "react";

//import "./style.css";

/* The Header Component */
class Header extends React.Component {
  render() {
    const { title, subtitle } = this.props;

    return (
        <span></span>
      // <div className="header">
      //   <h1>{title}</h1>
      //   <h3>{subtitle}</h3>
      // </div>
    );
  }
}

export default Header;