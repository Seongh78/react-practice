import React from 'react';
import ContactsDetail from './ContactsDetail';

class ContactsDetailList extends React.Component {
    static defaultProps = {
        data: []
    }

    state = {
        selectedId: -1
    }

    /** 
     * 목록 선택 시
     * 
     */
    handleSelected = selectedId => {
        this.setState(preState => ({ 
            selectedId : preState.selectedId === selectedId ? -1 : selectedId
        }))
    }

    render(){
        const { data } = this.props;
        const { selectedId } = this.state;
        const list = data.map(info => (
            <ContactsDetail 
                key={info.id} 
                info={info} 
                onSelected={this.handleSelected}
                display={selectedId===info.id ? true : false}
            />
        ))

        return (
            <ul className="list-group list-group-flush">
                {/* 검색결과가 없을 경우 */}
                {
                    (list.length<1) 
                    ? <li 
                        className="list-group-item d-flex justify-content-between align-items-center" 
                    >
                    <small>연락처가 없습니다.</small>
                    </li>
                    : ''
                }
                {list}
            </ul>
        )
    }// render
}

export default ContactsDetailList;