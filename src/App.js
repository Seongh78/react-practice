import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      findList: [],
      findName: '',
      contact: [
        {
          id: '0001',
          name : 'David Lee', 
          phone: '010-2222-3333',
          belong: 'Douzone',
          img: 'http://git.duzon.com/uploads/-/system/user/avatar/17/untitled.png'
        },
        {
          id: '0002',
          name : 'John Lee', 
          phone: '010-3333-4444',
          belong: 'Douzone',
          img: 'http://wiki.duzon.com:8080/download/attachments/28727800/user-avatar?version=1&modificationDate=1541550362871&api=v2'
        },
        {
          id: '0003',
          name : 'James Kim', 
          phone: '010-4444-5555',
          belong: 'Douzone',
          img: 'http://wiki.duzon.com:8080/download/attachments/28727838/user-avatar?version=2&modificationDate=1541568530195&api=v2'
        },
      ]
    } // state

  }

  render() {
    const { contact, findList, findName } = this.state
    if(findList.length>0){
      contact = findList.slice()
    }

    return (
      <div>
        
        {/* Nav bar */}
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
              value={findName}
              onKeyUp={()=>{ this.findUser() }}
            >
            </input>
          </form>
        </nav>
        {/* Nav bar */}


        <ul className="list-group list-group-flush">
          {contact.map(pp=>
            <li 
              className="list-group-item d-flex justify-content-between align-items-center" 
              key={pp.id}
              onClick={()=>this.profileDetailView(pp.id)}
            >
              <span>
              <img width="30" className="img-circle" src={pp.img} />&nbsp;&nbsp;
              {pp.name}
              </span>
              <small>{pp.phone}</small>
            </li>
          )}
          
          {/* 추가버튼 */}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-primary btn-md btn-block">Add +</button>
          </li>
        </ul>

      </div>
    );
  } // render()


  /*
   * 클릭 이벤트 
   * - 선택한 사람의 정보출력
   */
  profileDetailView = (userId)=>{
    const { contact } = this.state;
    alert(JSON.stringify(contact.filter(user => {return user.id===userId})[0]))
  } // profileDetailView

  /*
   * 검색 
   */
  findUser = (name)=>{
    const { contact, findName } = this.state;
    const findList = contact.filter(user=>{
      return user.name === name;
    })
    this.setState({findList})
  } // profileDetailView

}

export default App;
