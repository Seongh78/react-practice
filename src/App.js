import React, { Component } from 'react';
import Navbar from './layouts/Navbar';
// import Button from './components/Button';

// 리액트부트스트랩 컴포넌트
import { 
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    // 검색목록
    findList: [],
    // 선택유저
    isActive: -1,
    // 검색어
    keyword: '',
    // 모달토글
    toggleModal: false,
    // 유저입력데이터
    inputUser: {
      name: {
        value: '',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      },
      phone: {
        value: '',
        regExp: /^[0-9]*^/ 
      },
      belong: {
        value: '',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      },
      img: {
        value: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      }
      
    },
    // 연락처 리스트
    contact: [
      {
        id: 1,
        name : 'David Lee', 
        phone: '010-2222-3333',
        belong: '더존비즈온',
        img: 'http://git.duzon.com/uploads/-/system/user/avatar/17/untitled.png'
      },
      {
        id: 2,
        name : 'John Lee', 
        phone: '010-3333-4444',
        belong: '키컴',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727800/user-avatar?version=1&modificationDate=1541550362871&api=v2'
      },
      {
        id: 3,
        name : 'James Kim', 
        phone: '010-4444-5555',
        belong: '더존차이나',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727838/user-avatar?version=2&modificationDate=1541568530195&api=v2'
      },
    ]
  } // state

  render() {
    let { 
      contact, 
      findList,
      keyword,
      inputUser,
      isActive,
      toggleModal
    } = this.state
    
    // 검색인경우
    if(keyword){
      contact = findList.slice()
    }

    return (
      <div>
        {/* 네비바 */}
        <Navbar appName="연락처" />

        {/* 리스트 */}
        <ul className="list-group list-group-flush">
          {/* 검색바 */}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <input 
              className="form-control my-1" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              value={keyword}
              onChange={this._handleFindUser}
            />
          </li>
          {/* 검색결과가 없을 경우 */}
          {(contact.length<1) 
            ? <li 
                className="list-group-item d-flex justify-content-between align-items-center" 
              >
              <small>연락처가 없습니다.</small>
              </li>
            : ''
          }
          {/* 리스트 출력 */}
          {contact.map((pp, index)=>
            <div key={index}>
              <li 
                className="list-group-item d-flex justify-content-between align-items-center" 
                onClick={()=>this._handleClickProfile(index)}
              >
                <span>
                <img width="30" height="30.5" className="img-circle" src={pp.img} />&nbsp;&nbsp;
                {pp.name}
                </span>
                {/* <small>{pp.phone}</small> */}
                
              </li>
              {(index === isActive) 
                ? 
                <li className="list-group-item">
                  연락처: {pp.phone} <br/>
                  소속: {pp.belong} <br/>
                  <p>
                    <button type="button" className="btn btn-primary btn-sm">수정</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>{ this._handleRemoveContact(index) }}>삭제</button>
                  </p>
                </li>
                : ''
              }
            </div>
          )}
          
          {/* 추가버튼 */}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <Button 
              className="btn-block"
              color="primary"
              onClick={this._toggle}
            >
              Add +  
            </Button>
          </li>
        </ul>

        {/* 모달 */}
        <Modal isOpen={this.state.toggleModal} toggle={this._toggle}>
          <ModalHeader toggle={this._toggle}>신규 연락처</ModalHeader>
          <ModalBody>
          <form>
            <div className="form-group">
              <label>이름</label>
              <input type="text" className="form-control" name="name" value={inputUser.name.value} onChange={this._handleChangeValue} />
            </div>
            <div className="form-group">
              <label>연락처</label>
              <input type="text" className="form-control" name="phone" value={inputUser.phone.value} onChange={this._handleChangeValue} />
            </div>
            <div className="form-group">
              <label>소속</label>
              <input type="text" className="form-control" name="belong" value={inputUser.belong.value} onChange={this._handleChangeValue} />
            </div>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._handleCreateContact}>확인</Button>{' '}
            <Button color="secondary" onClick={this._toggle}>취소</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  } // render()


  /** ------------------------------
   * 클릭 이벤트 
   * -------------------------------
   * 선택한 사람의 정보출력
   */
  _handleClickProfile = (index)=>{
    const { isActive } = this.state;
    index = index === isActive ? -1 : index
    this.setState({
      isActive : index
    })
  }


  /** ------------------------------
   * 모달 토글
   * -------------------------------
   * 모달 ON/OFF
   */
  _toggle = ()=>{
    this.setState({
      toggleModal : !this.state.toggleModal
    })
    return;
  }


  /** ------------------------------
   * 검색 
   * -------------------------------
   * 
   */
  _handleFindUser = (e)=>{
    const { contact, keyword } = this.state;
    // 검색
    const findList = contact.filter(user=>{
      // 아이디 또는 번호에 일치하는 결과가 있는 경우 리턴
      return user.name.match(e.target.value) || user.phone.match(e.target.value);
    })
    
    // 데이터 변경
    this.setState({
      keyword: e.target.value,
      findList,
    })
    
  } 


  /** ------------------------------
   * 유저데이터 입력
   * -------------------------------
   * 인풋에 입력시 데이터 바인딩
   */
  _handleChangeValue = (e) => {
    let usr = this.state.inputUser;
    usr[e.target.name].value = e.target.value;
    this.setState({ inputUser: usr })
  }


  /** ------------------------------
   * 신규 연락처 생성
   * -------------------------------
   * inputUser에 데이터를 메인 모델로 추가
   */
  _handleCreateContact = ()=>{
    let { contact, inputUser, inputUser2 } = this.state;
    let list = contact.slice() // 리스트 복사
    const initData = {
      name: {
        value: '',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      },
      phone: {
        value: '',
        regExp: /^[0-9]*^/ 
      },
      belong: {
        value: '',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      },
      img: {
        value: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        regExp: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
      }
    }
    
    // 입력 예외처리
    const confirmList = Object.values(inputUser)
    for(var item of confirmList){
      if(!item.regExp.test(item.value) || !item.value){
        alert('입력오류!!');
        return;
      }
    }
    
    // id 만들기 (리스트 마지막 아이디+1)
    inputUser.id = list[list.length-1].id + 1
    // 메인모델로 푸시
    list.push({
      id:     inputUser.id,
      name:   inputUser.name.value,
      phone:  inputUser.phone.value,
      belong: inputUser.belong.value,
      img:    inputUser.img.value
    })

    // 데이터 변경
    this.setState({
      contact:      list,
      inputUser:    initData,
      toggleModal:  !this.state.toggleModal
    }) 
  }


  /** ------------------------------
   * 유저삭제
   * -------------------------------
   * -
   */
  _handleRemoveContact = (index) => {
    if ( !window.confirm('해당 연락처를 삭제하시겠습니까?') ) { 
      return; 
    }
    const { contact } = this.state;
    contact.splice(index, 1);
    this.setState({contact, isActive:-1});
  }

}// class

export default App;
