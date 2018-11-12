import React, { Component } from 'react';
import Navbar from './layouts/Navbar';

// 리액트부트스트랩 컴포넌트
import { 
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap';



const initData = {
  name: {
    value: '',
    regExp: /[a-zA-Z|가-힣]/
  },
  phone: {
    value: '',
    regExp: /^\d{3}-\d{3,4}-\d{4}$/
    // regExp: /^[0-9]*^/ 
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
    // 모달타이틀
    modalTitle: '',
    // 모달토글
    toggleModal: false,
    // 유저입력데이터
    inputUser: initData,
    // 연락처 리스트
    contact: [
      {
        id: 1,
        name : '이창민', 
        phone: '010-2222-3333',
        belong: '더존비즈온',
        img: 'http://git.duzon.com/uploads/-/system/user/avatar/17/untitled.png'
      },
      {
        id: 2,
        name : '이지훈', 
        phone: '010-3333-4444',
        belong: '키컴',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727800/user-avatar?version=1&modificationDate=1541550362871&api=v2'
      },
      {
        id: 3,
        name : '김성훈', 
        phone: '010-4444-5555',
        belong: '더존차이나',
        img: 'http://wiki.duzon.com:8080/download/attachments/28727838/user-avatar?version=2&modificationDate=1541568530195&api=v2'
      },
      {
        id: 4,
        name : '이겸목', 
        phone: '010-1223-5555',
        belong: '더존재팬',
        img: 'data:image/jpeg;base64,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'
      },
      {
        id: 5,
        name : '김성희', 
        phone: '010-1223-2455',
        belong: '더존비즈온',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzix6zlJLz7MDcz907yfj-wRJnZ1FvktyrFmfJYuEPPOV7jVv52g'
      },
      {
        id: 6,
        name : '김준수', 
        phone: '010-6644-2222',
        belong: '더존다스',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_yvJchQBTJqxFQshNnQCg8BBsxEQUEbGGw_th_lZXD_iQR_K'
      },
      {
        id: 7,
        name : '최명근', 
        phone: '010-6244-2222',
        belong: '더존다스',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjG3yURv-evWPcWu3xE07EgN9cvCkhZU4OeIgLZJjcp_4171fP'
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
          {/* 검색 */}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="input-group">
              {/* 검색바 */}
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search"
                value={keyword}
                onChange={this._handleFindUser}
              />
              {/* Clear 버튼 */}
              <div className="input-group-append">
                <button className="btn" onClick={this._handleKeywordClear}>X</button>
              </div>
            </div>

          </li>
          {/* 검색결과가 없을 경우 */}
          {
            (contact.length<1) 
            ? <li 
                className="list-group-item d-flex justify-content-between align-items-center" 
              >
              <small>연락처가 없습니다.</small>
              </li>
            : ''
          }
          {/* 리스트 출력 */}
          {
            contact.map((pp, index)=>
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
                    <button type="button" className="btn btn-primary btn-sm" onClick={()=>{ this._handleUpdateContact(pp.id) }}>수정</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>{ this._handleRemoveContact(index) }}>삭제</button>
                  </p>
                </li>
                : ''
              }
            </div>
            )
          }
          
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
          <ModalHeader toggle={this._toggle}>연락처</ModalHeader>
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
   * 검색창 초기화 
   * -------------------------------
   * 검색창 입력내용 초기화
   */
  _handleKeywordClear = ()=>{
    this.setState({
      keyword : ''
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
    let { 
      contact, //연락처
      inputUser, //입력데이터
      toggleModal //모달토글
    } = this.state;
    let list = contact.slice() // 리스트 복사
    

    // 예외검사
    if(
      !inputUser.name.regExp.test(inputUser.name.value) || !inputUser.name.value ||
      !inputUser.phone.regExp.test(inputUser.phone.value) || !inputUser.phone.value ||
      !inputUser.belong.regExp.test(inputUser.belong.value) || !inputUser.belong.value 
    ){
      return alert('입력오류!!');
    }

    // 업데이트일경우
    if(inputUser.id){
      const findIndex = list.findIndex(item=>{
        return inputUser.id === item.id
      })
      // 수정된 정보 반영
      list[findIndex].name = inputUser.name.value
      list[findIndex].phone = inputUser.phone.value
      list[findIndex].belong = inputUser.belong.value
    }
    // 신규일경우
    else{
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
    }

    // 데이터 변경
    this.setState({
      contact:      list,
      inputUser:    initData,
      toggleModal:  !toggleModal
    }) 
  }


  /** ------------------------------
   * 업데이트
   * -------------------------------
   * -
   */
  _handleUpdateContact = (id) => {
    const { toggleModal, inputUser, contact } = this.state;
    // 아이디 찾기
    const findIndex = contact.findIndex(item=>{
      return item.id === id
    })
    
    inputUser.id = contact[findIndex].id
    inputUser.name.value = contact[findIndex].name
    inputUser.phone.value = contact[findIndex].phone
    inputUser.belong.value = contact[findIndex].belong
    
    // 데이터변경
    this.setState({
      inputUser,
      toggleModal: !toggleModal
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
