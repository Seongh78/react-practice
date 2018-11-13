import React from 'react';

class SearchForm extends React.Component {

    state = {
        // 검색어
        keyword: ''
    }

    /** ------------------------------
     * 값변경
     * -------------------------------
     * 입력버튼 클릭시 상위컴포넌트로
     */
    handleChange = e =>{
        this.setState({ keyword: e.target.value })
        this.props.onSearch(e.target.value)
    }

    render(){
        const { keyword } = this.state;
        return (
            <div 
                className="container" 
                style={{
                    borderTop:'1px solid #d7d7d7', 
                    padding:'13px 15.5px'
                }}
            >
                <div className="input-group">
                    {/* 검색바 */}
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search"
                        value={keyword}
                        onChange={this.handleChange}
                    />

                    {/* Clear 버튼 */}
                    <div className="input-group-append">
                        <button className="btn" >X</button>
                    </div>
                </div>
            </div>
        )
    }// render
}

export default SearchForm;