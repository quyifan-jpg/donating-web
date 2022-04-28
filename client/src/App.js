/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './index.css';

// Importing the Queue and our simple Home Page
import Info from './component/info/info';
import Home from './component/home/home';
import Message from './component/message/message';
import ItemDisplay from './component/item_display.js/item_display';
import Cart from "./component/cart/cart";
import NavigationBar from "./component/navigationBar/navigationBar";
import Block from "./component/info/block"
import BottomDisplay from "./component/bottom_display/bottom_display"
import AllUsers from "./component/all_users/all_users"

// Importing actions/required methods
import { getUsersList,checkSession } from "./actions/user";
import { getItemsList } from "./actions/item";

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
  state = {
    username: undefined,
    test:"test_info",
    ItemAll:[],
    ItemCurrent:[
    ],
    IDcurrent:8,
    UserCurrent: {Uid:-2, Username:"", password:"", admin:0, email:"", phone_number:"", likes:[], notification:["Please log in first"] },
    // UserAll:[
    //   {Uid:-1, Username:"admin", password:"admin", admin:1, email:"admin@mail.com", phone_number:"309309", likes:[],notification:["you are now log in as admin"] },
    //   {Uid:0, Username:"user1", admin:0, email:"user1@mail.com", phone_number:"111111", likes:[],notification:["welcome to furniture cycle"] },
    //   {Uid:1, Username:"user2", password:"user2", admin:0, email:"user2@mail.com", phone_number:"222222", likes:[],notification:["welcome to furniture cycle"] },
    //   {Uid:2, Username:"user3", password:"user3", admin:0, email:"user3@mail.com", phone_number:"333333", likes:[],notification:["welcome to furniture cycle"] },
    // ],
    UserAll:[],
    UIDCurrent:3
  }

  constructor(props) {
    super(props);
    getUsersList(this);
    getItemsList(this);
    
  }
  componentDidMount() {
    console.log("did mount")
    checkSession(this); // sees if a user is logged in
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                (<Home theApp={this}/>)}/>
            <Route exact path='/info' render={(url) =>
                (<Info url={url} theApp={this}/>)}/>
            <Route exact path='/message' render={(url) =>
                (<Message url={url} appState={this.state} theApp={this}/>)}>
            </Route>
            <Route path='/item_display/' render={(url) =>
                (<ItemDisplay url={url} theApp={this}/>)}>
            </Route>
            <Route exact path='/cart' render={() =>
                (<Cart appState={this.state} theApp={this}/>)}>
            </Route>
            <Route exact path='/navigationBar' render={() =>
                (<NavigationBar appState={this.state} theApp={this}/>)}>
            </Route>

            <Route exact path='/block' render={(url) =>
                (<Block url={url} theApp={this}/>)}>
            </Route>

            <Route exact path='/all_users' render={(url) =>
                (<AllUsers url={url} theApp={this}/>)}>
            </Route>

            <Route exact path='/bottom_display' render={(url) =>
                (<BottomDisplay url={url} theApp={this}/>)}>
            </Route>

            <Route exact path='/home' render={(url) =>
                (<Home url={url} theApp={this}/>)}>
            </Route>


          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
