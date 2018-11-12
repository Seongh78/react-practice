import React, { Component } from 'react';

class Navbar extends Component {

    static defaultProps = {
        appName: 'App name'
    }

    state = {
        testValue : 0
    }

    render(){
        const appName = this.props.appName;

        return(
            <nav className="navbar navbar-light bg-light">
                <a href="/#/" className="navbar-brand">
                    &nbsp;{appName}
                </a>
            </nav>
        )// return 
    } // render 
}

export default Navbar;