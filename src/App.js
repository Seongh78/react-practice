import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* Nav bar */}
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">
            <img src="http://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" />
            &nbsp;&nbsp;Contact
          </a>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </form>
        </nav>
        {/* Nav bar */}


        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>

      </div>
    );
  }
}

export default App;
