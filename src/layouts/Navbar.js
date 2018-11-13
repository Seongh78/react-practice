import React, { Component } from 'react';

class Navbar extends Component {

    static defaultProps = {
        appName: 'App name'
    }

    state = {
        testValue : 0
    }

    /**
     * 연락처 추가
     */
    handleCreate = () => {
        this.props.onCreate()
    }

    render(){
        const appName = this.props.appName;

        return(
            <nav className="navbar navbar-light bg-light">
                <a href="/#/" className="navbar-brand">
                    &nbsp;{appName}
                </a>
                
                <form className="form-inline">
                    <button 
                        className="btn btn-link my-2 my-sm-0" 
                        type="button"
                        onClick={this.handleCreate}
                        style={{padding:'3.5px'}}
                    >
                        Add +
                    </button>
                </form> 
               
            </nav>
        )// return 
    } // render 
}

export default Navbar;