import React, { Component } from 'react';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from'../hoc/withClass';
import Aux from '../hoc/Auxillary';
import AuthContext from '../context/auth-context';

import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: '111', name: 'Person1', age: 29},
      {id: '222', name: 'Person2', age: 30},
      {id: '333', name: 'Person3', age: 31}
    ],
    showPersons: false,
    showCockpit: true,
    authenticated: false
  }

  static getDerivedStateFromProps (props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }
  
  togglePersonsHandler = () => {
    this.setState((prevState, props) => {
      return {
        showPersons: !prevState.showPersons
      };
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    
//    const person = object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person

    this.setState({persons: persons});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;
    console.log(this.state.showPersons)
    if ( this.state.showPersons ) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
    }

  return (
      <Aux>
        <button
           onClick={() => {
             this.setState({ showCockpit: false });
           }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}
        >
          {this.state.showCockpit ? (
              <Cockpit
                appTitle={this.props.appTitle} 
                showPersons={this.state.showPersons} 
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
              />
          ) : null}   
          {persons}
        </AuthContext.Provider>

      </Aux>
    );
  }
}

export default withClass(App, classes.App);
