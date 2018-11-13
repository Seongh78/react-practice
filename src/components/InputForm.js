import React, {Component} from 'react';
// 리액트부트스트랩 컴포넌트
import { 
    Button,
  } from 'reactstrap';

const initData = {
    name: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
    phone: /^\d{3}-\d{3,4}-\d{4}$/,
    belong: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
    img: /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
}

class InputForm extends Component {

  
    static defalutProps = {
        initData: {
            name : '',
            phone: '',
            belong: '',
            img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        }
    }

    state = {
        name: '',
        phone: '',
        belong: '',
        img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        // name: 'David',
        // phone: '010-2331-2598',
        // belong: '더존비즈온',
        // img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    }

    componentDidMount() {
        const { name, phone, belong } = this.props.initData;
        this.setState({
            name,
            phone,
            belong
        })
    }

    /** ------------------------------
    * 유저데이터 입력
    * -------------------------------
    * 인풋에 입력시 데이터 바인딩
    */
    handleChangeValue = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    /** ------------------------------
     * 서브밋
     * -------------------------------
     * 입력버튼 클릭시 상위컴포넌트로
     */
    handleSubmit = e =>{
        // 페이지 리로딩 방지
        e.preventDefault();
        const { name, phone, belong, img } = this.state;

        // 예외검사
        if(
            !initData.name.test(name)     || !name  ||
            !initData.phone.test(phone)   || !phone ||
            !initData.belong.test(belong) || !belong 
        ){
            return alert('입력오류!!');
        }

        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: '',
            belong: '',
        })
    }

    /** ------------------------------
     * 취소버튼 클릭
     * -------------------------------
     * 
     */
    handleCancel = () => {
        this.props.onCancel();
    }


    render(){
        const {
            name,
            phone,
            belong,
        } = this.state;

        return(
            <form>
                <div className="form-group">
                    <label>이름</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={name} 
                        onChange={this.handleChangeValue} 
                    />
                </div>
                <div className="form-group">
                    <label>연락처</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="phone" 
                        value={phone} 
                        onChange={this.handleChangeValue} 
                    />
                </div>
                <div className="form-group">
                    <label>소속</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="belong" 
                        value={belong} 
                        onChange={this.handleChangeValue} 
                    />
                </div>
                <hr />
                <Button 
                    color="primary" 
                    size="sm"
                    block
                    onClick={this.handleSubmit}
                >
                    등록
                </Button>
            </form>
        )
    }// render

}

export default InputForm;