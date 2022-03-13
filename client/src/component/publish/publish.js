import React from "react";
import "./publish.css";
import Select from "react-select";

// Importing actions/required methods
import { addItem } from "../../actions/item";


/* Component for the Home page */
class Publish extends React.Component {
  state={
    Name:"",
    Description:"",
    Place:"",
    Type:"",
    region:""
  }
  handleInputChange = event =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]:value
    })
  }
  handleInputChange2 = event =>{
    this.setState({
      region:event.value
    })
  }
  handleInputChange3 = event =>{
    //console.log(target)
    this.setState({
      Type:event.value
    })
  }
  addItem = theHome =>{
    //console.log(theHome.state)
    addItem(this, theHome)
    const newItem = {id:theHome.state.IDcurrent,
      name:this.state.Name, region:this.state.region,location:this.state.Place, 
      description:this.state.Description,
       type:this.state.Type, owener:theHome.state.UserCurrent.Uid}
    console.log(newItem)
    const newItemlist = theHome.state.ItemAll
      newItemlist.push(newItem)

    theHome.setState({
      ItemAll:newItemlist,
      ItemCurrent:newItemlist,
      IDcurrent:theHome.state.IDcurrent+1
    })
  }

  wordError = (theHome) => {
    if (this.checkIfInfoComplete(theHome)) {
      return "errorRed";
    } else {
      return "errorWhite";
    }
  }

  buttonError = (theHome) => {
    if (this.checkIfInfoComplete(theHome)) {
      return "buttonNoneTwo";
    } else {
      return "buttonTwo";
    }
  }

  checkIfInfoComplete = (theHome) => {
    return (theHome.state.UserCurrent.Username === "" || this.state.Description === ""
        || this.state.Name === "" || this.state.Place === "" || this.state.region === ""
        || this.state.Type === "");
  }

  removeInfo = () => {
    this.setState({
      Name:"",
      Description:"",
      Place:"",
      Type:"",
      region:""
    })
  }

  render() {
    const {theHome} = this.props
  //   const options1 = [{value:"beds",label:"beds"},{value="chair",label="chair"},
  //   {value:"desk",label:"desk"},{value="storage",label="storage"},
  //   {value:"kitchen",label:"kitchen"},{value="lighting",label="lighting"}
  // ]
  const options1 = [
    { value: 'bed', label: 'bed' },
    { value: 'chair', label: 'chair' },
    { value: 'desk', label: 'desk' },
    { value: 'storage', label: 'storage' },
    { value: 'kitchen', label: 'kitchen' },
    { value: 'lighting', label: 'lighting' },
  ]

  const options2 = [
    { value: 'downtown', label: 'downtown' },
    { value: 'university', label: 'university' },
    { value: 'North York', label: 'North York' },
    { value: 'Scarborough', label: 'Scarborough' },
    { value: 'Richmond Hill', label: 'Richmond Hill' },
  ]

    return (
      <div className="publishBox">
          <h3 className="rightBox">For user to publish their new furniture.</h3>
          <input name="Name"
                 className="formBox"
                 value={this.state.Name}
                 onChange={this.handleInputChange}
                 placeholder="  Item name" />
          <input name="Description"
                 className="formBox"
                 value={this.state.Description}
                 onChange={this.handleInputChange}
                 placeholder="  Description" />
          <Select options={options2}
                  className="formBox"
                  name="region"
                  placeholder="Your region"
                  onChange={this.handleInputChange2} />
          <input name="Place"
                 className="formBox"
                 value={this.state.Place}
                 onChange={this.handleInputChange}
                 placeholder="  Place" />
          <Select options={options1}
                  className="formBox"
                  name="Type"
                  placeholder="Furniture Type"
                  onChange={this.handleInputChange3} />
          <p className={this.wordError(theHome)}>You must login and fill in this form to publish!</p>
          <button className={this.buttonError(theHome)} onClick={()=>{this.addItem(theHome); this.removeInfo()}}>Publish new furniture</button>
      </div>
    );
  }
}

export default Publish;