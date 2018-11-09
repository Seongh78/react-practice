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
                <a className="navbar-brand">
                    &nbsp;&nbsp;{appName}
                </a>
                <form className="form-inline">
                <input 
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    // value={findName}
                    // onKeyUp={()=>{ this.findUser() }}
                >
                </input>
                </form>
            </nav>
        )// return 
    } // render 
}

export default Navbar;