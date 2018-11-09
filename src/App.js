import React, { Component } from 'react';
import Navbar from './layouts/Navbar';

class App extends Component {

  constructor(props) {
    super(props);

    

  }

  state = {
    findList: [],
    inputUser: {
      name: '',
      phone: '',
      belong: 'Douzone',
      img: 'http://git.duzon.com/uploads/-/system/user/avatar/17/untitled.png'
    },
    contact: [
      {
        id: 1,
        name : 'David Lee', 
        phone: '010-2222-3333',
        belong: 'Douzone',
        img: 'http://git.duzon.com/uploads/-/system/user/avatar/17/untitled.png'
      },
      {
        id: 2,
        name : 'John Lee', 
        phone: '010-3333-4444',
        belong: 'Douzone',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727800/user-avatar?version=1&modificationDate=1541550362871&api=v2'
      },
      {
        id: 3,
        name : 'James Kim', 
        phone: '010-4444-5555',
        belong: 'Douzone',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727838/user-avatar?version=2&modificationDate=1541568530195&api=v2'
      },
    ]
  } // state

  render() {
    const { 
      contact, 
      findList,
      inputUser
    } = this.state
    if(findList.length>0){
      contact = findList.slice()
    }

    return (
      <div>
        {/* 네비바 */}
        <Navbar appName="연락처" />


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
            <form>
              <div className="row">
                <div className="col">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Name" 
                    value={inputUser.name} 
                  />
                </div>
                <div className="col">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Phone" 
                    value={inputUser.phone} 
                  />
                </div>
              </div>
            </form>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button 
              type="button" 
              className="btn btn-primary btn-md btn-block"
              onClick={this._handleCreateItem}
            >
              Add +
            </button>
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
    const { contact } = this.state;
    const findList = contact.filter(user=>{
      return user.name === name;
    })
    this.setState({findList})
  } // profileDetailView

  /**
   * 유저추가
   */
  _handleCreateItem = ()=>{
    let list = this.state.contact.slice()
    list.push({
      id: Number(list[list.length-1].id)+1,
      name : 'James Kim', 
      phone: '010-4444-5555',
      belong: 'Douzone',
      img: 'http://wiki.duzon.com:8080/download/attachments/28727838/user-avatar?version=2&modificationDate=1541568530195&api=v2'
    })
    this.setState({
      contact : list
    })
  }

}

export default App;
