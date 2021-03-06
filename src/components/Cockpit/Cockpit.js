import React, {useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log('[Cockpit] authcontext.authenticated', authContext)

  useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // Http request...
      // setTimeout(()=> {
      //   alert('Saved data to clound!');
      // }, 1000);
      
     toggleBtnRef.current.click();
      return () => {
        console.log('[Cockpit.js] cleanup work in useEffect');
      }
    }, []);

    useEffect(()=> {
      console.log('[Cockpit.js] 2nd useEffect');
      return() => {
        console.log('[Cockpit.js cleanup work in 2nd useEffect');
      };
    })
     
    const assignedClasses = [];

    let btnClass = '';

    if (props.showPersons) {
      btnClass = classes.red
    }

    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }

    return ( 
        <div className={classes.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>This is working</p>
            <button
               ref={toggleBtnRef}
               className={btnClass}
               onClick={() => props.clicked()}>Toggle Persons
            </button>
            <button onClick={authContext.login}>Login in</button> 
        </div>
    );

};

export default React.memo(cockpit);