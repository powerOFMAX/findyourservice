import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* Main Component */
class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        services: [],
    }
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/services')
        .then(response => {
            return response.json();
        })
        .then(services => {
            //Fetched product is stored in the state
            this.setState({ services });
        });
  }
 
 renderProducts() {
    return this.state.services.map(service => {
        return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li key={service.id} >
                { service.title }
            </li>      
        );
    });
  }
   
  render() {
   /* Some css code has been removed for brevity */
    return (
        <div>
              <ul>
                { this.renderProducts() }
              </ul> 
            </div> 
       
    );
  }
}