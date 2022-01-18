import React from 'react';

function Header({title}) {
    return (
        <div className='header'>
            <h1>{title}</h1>
            <ul>
                <li>고객리스트 보기</li>
                <li>신규 고객 등록하기</li>
                <li>고객 검색</li>
            </ul>
        </div>
    );
}

export default Header;