import React, { Component } from 'react';
// import Navbar from './layouts/Navbar';
import { Navbar } from './layouts';
import { 
  InputForm,
  ContactsDetailList,
  SearchForm
} from './components';

// 리액트부트스트랩 컴포넌트
import { 
  ButtonGroup,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody,
} from 'reactstrap';

class App extends Component {
  

  state = {
    // 선택유저
    selectedId: -1,
    // 검색어
    keyword: '',
    // 모달타이틀
    modalTitle: '',
    // 모달토글
    toggleModal: false,
    // 수정시 사용할 데이터 변수
    initData: {
      name: '',
      phone: '',
      belong: '',
    },
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
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjG3yURv-evWPcWu3xE07EgN9cvCkhZU4OeIgLZJjcp_4171fP'
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
      keyword,
      selectedId,
      toggleModal,
      initData
    } = this.state
    
    // 검색
    if(keyword){
      contact = contact.filter(user=>{
        return user.name.match(keyword) || user.phone.match(keyword);
      })
    }

    return (
      <div>
        {/* 네비바 */}
        <Navbar appName="연락처" />

        {/* 검색바 */}
        <SearchForm onSearch={this.handleSearch} />

        {/* 리스트 */}
        <ContactsDetailList data={contact} />
          
        {/* 추가버튼 */}
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <Button 
            className="btn-block"
            color="primary"
            onClick={this.handleToggle}
          >
            Add +  
          </Button>
        </div>

        {/* 모달 */}
        <Modal isOpen={toggleModal} toggle={this.handleToggle}>
          <ModalHeader toggle={this.handleToggle}>연락처</ModalHeader>
          <ModalBody>
            {/* 입력폼 */}
            <InputForm 
              onCreate={this.handleCreateContact} 
              onCancel={this.handleToggle}  
              initData={initData}
            />
            {/* 입력폼 */}
          </ModalBody>
        </Modal>

      </div>
    );
  } // render()


  /** ------------------------------
   * 클릭 이벤트 
   * -------------------------------
   * 선택한 사람의 정보출력
   */
  handleClickProfile = index =>{
    const { selectedId } = this.state;
    index = index === selectedId ? -1 : index
    this.setState({
      selectedId : index
    })
  }


  /** ------------------------------
   * 검색창 초기화 
   * -------------------------------
   * 검색창 입력내용 초기화
   */
  handleKeywordClear = ()=>{
    this.setState({keyword : ''})
  }


  /** ------------------------------
   * 모달 토글
   * -------------------------------
   * 모달 ON/OFF
   */
  handleToggle = ()=>{
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
  handleFindUser = e =>{
    this.setState({
      keyword: e.target.value
    })
  } 


  /** ------------------------------
   * 검색 
   * -------------------------------
   * 
   */
  handleSearch = keyword =>{
    this.setState({ keyword })
  } 


  /** ------------------------------
   * 신규 연락처 생성
   * -------------------------------
   * inputUser에 데이터를 메인 모델로 추가
   */
  handleCreateContact = e => {
    const { 
      contact, //연락처
      toggleModal, //모달토글
      selectedId
    } = this.state;
    let list = contact.slice(); // 리스트 복사
    let inputUser = e;
    console.log(inputUser);
    

    // 업데이트일경우
    if(selectedId > 0){
      const findIndex = list.findIndex(item=>{
        return selectedId === item.id
      })
      // 수정된 정보 반영
      list[findIndex].name = inputUser.name
      list[findIndex].phone = inputUser.phone
      list[findIndex].belong = inputUser.belong
    }
    // 신규일경우
    else{
      // id 만들기 (리스트 마지막 아이디+1)
      inputUser.id = list[list.length-1].id + 1
      // 메인모델로 푸시
      list.push({
        id:     inputUser.id,
        name:   inputUser.name,
        phone:  inputUser.phone,
        belong: inputUser.belong,
        img:    inputUser.img
      })
    }

    // 데이터 변경
    this.setState({
      contact: list,
      selectedId: -1,
      toggleModal: !toggleModal
    }) 
  }


  /** ------------------------------
   * 업데이트
   * -------------------------------
   * -
   */
  handleUpdateContact = id => {
    const { toggleModal, inputUser, contact } = this.state;
 
    // 데이터변경
    this.setState(preState => ({
      initData: contact[contact.findIndex(item=>item.id===id)],
      toggleModal: !preState.toggleModal
    }))
    
  }


  /** ------------------------------
   * 유저삭제
   * -------------------------------
   * -
   */
  _handleRemoveContact = index => {
    if ( !window.confirm('해당 연락처를 삭제하시겠습니까?') ) { 
      return; 
    }
    const { contact } = this.state;
    contact.splice(index, 1);
    this.setState({contact, selectedId:-1});
  }

}// class

export default App;
