import React from 'react'; 
// 리액트부트스트랩 컴포넌트
import { 
    Button,
    ButtonGroup,
  } from 'reactstrap';

class ContactsDetail extends React.Component {
    static defaultProps = {
        display: false,
        info : {
            id: 0,
            name: 'OOO',
            phone: '010-0000-0000',
            belong: '(주)더존비즈온',
            img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        }
    }

    componentDidMount(){
        console.log(this.props.display);
    }

    /**
     * 항목 선택
     */
    handleSelected = selectedId => {
        this.props.onSelected(selectedId)
    }

    render() {
        const { 
            id, name, phone, belong, img
        } = this.props.info;
        const { display } = this.props;

        return (
            <li>
                <div 
                    style={{borderBottom:'none'}}
                    className="list-group-item d-flex justify-content-between align-items-center" 
                    onClick={()=>this.handleSelected(id)}
                >
                  <span>
                    <img 
                        width="30" 
                        height="30.5" 
                        className="img-circle" 
                        src={img} 
                    />&nbsp;&nbsp;
                    {name}
                  </span>
                  <small>{phone}</small>
                </div>
                
                {/* 상세보기 탭 */}
                {(display) 
                    ? 
                    <div className="list-group-item" style={{clear:'bo'}}>
                    이름: {name} <br/>
                    연락처: {phone} <br/>
                    소속: {belong} <br/>   
                    <ButtonGroup style={{width:'100%', marginTop:'5px'}}>
                        <Button 
                        color="secondary"
                        size="sm" 
                        outline
                        style={{width:'50%'}} 
                        // onClick={()=>{ this.handleUpdateContact(id) }}
                        >
                        수정
                        </Button>
                        <Button 
                        color="danger"
                        size="sm" 
                        outline
                        style={{width:'50%'}} 
                        // onClick={()=>{ this._handleRemoveContact(index) }}
                        >
                        삭제
                        </Button>
                    </ButtonGroup>
                    </div>
                    : ''
                }
            </li>
        );
    }// render()
}

export default ContactsDetail;