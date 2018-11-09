import React, { Component } from 'react';

class ListWrap extends Component {
    render(){
        return(
            
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">
                    {/* <img src="http://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" /> */}
                    &nbsp;&nbsp;Contact
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

export default ListWrap;