import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //   console.log('[Persons.js] getDerivedStateFromProps');
    //   return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     return (nextProps.persons !== this.props.persons);
    // }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'SnapShot'};
    }

    componentDidUpdate(prevProps, prevState, snapShot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapShot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return (this.props.persons.map(( person, index ) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)}
              />
            );
        }));
    }
};

export default Persons;