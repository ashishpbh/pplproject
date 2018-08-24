import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Forget from "./Forget";
import Reset from "./Reset";

import IndexPpl from "./IndexPpl";
import Main from "./Main";
import { Redirect } from "react-router-dom";
import Timeline from "./Timeline";
import SignupVerify from "./SignupVerify";

/*import { validateInstance } from "validate-react";*/
import "./App.css";

class App extends Component {
  render() {

    return (
      <div>
       
        
       {localStorage.getItem("userName")!=null?
       <div>
          <Switch> 
            <Route path="/signupverify/:email" component={SignupVerify} />
          <Route exact path="/forget" component={Forget} />
          <Route path="/reset/:id" component={Reset} />
          <Route path="/timeline" component={Timeline} />
      
          <Route path="/index" component={IndexPpl} />
          <Route path="/" component={Main}/>
          </Switch>
          </div>
       : 
       <Switch> 
   
       <Route path="/reset/:id" component={Reset} />
       <Route exact path="/forget" component={Forget}/>
       <Route path="/" component={Main}/>
        </Switch>}
        
      </div>
    );
  }
}

export default App;