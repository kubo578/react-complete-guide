import React, { Component} from 'react';

import Aux from '../../../hoc/Auxillary';
import withClass from '../../../hoc/withClass'

import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputRef.focus();
        this.inputRef.current.focus();
        console.log('[person] componentDidMount', this.context.authenticated);
    }

    render() {      
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Login</p> }
                <p onClick= {this.props.click} >I'm { this.props.name } and I am { this.props.age } years old! </p>
                <p>{this.props.children}</p>
                <input 
                    type="text" 
                    onChange= {this.props.changed} 
                    value= {this.props.name}
                    // ref={(inputRef) => {this.inputRef = inputRef}}
                    ref={this.inputRef}

                />
            </Aux>
        );
    }
}

export default withClass(Person, classes.person) ;