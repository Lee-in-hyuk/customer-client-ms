import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
// id를 사용하기 위해 작성
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// 데이터 조회하기 위해 가져옴
import useAsync from '../hooks/useAsync';

function DetailCustomer() {
    const param = useParams();
    const { id } = param;
    // console.log(param);
    async function getCustomer(){
        const response = await axios.get(
            `http://localhost:8080/customer/${id}`
        )
        return response.data;
    }
    const state = useAsync(getCustomer);
    const { loading, error, data:customer } = state;
    // console.log(customer);
    // customer가 배열로 넘어오고 필요한 데이터는 0번째 인덱스에 있기때문에
    // 적용할 때 'customer[0].속성값' 이렇게 사용해야 됨
    if(loading) return <div>로딩중.......</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customer) return null;

    // 삭제하기
    const onDelete = () => {
        axios.delete(`http://localhost:8080/customer/${id}`)
        .then((result)=>{
            console.log('삭제되었습니다.');
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{customer[0].c_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{customer[0].c_phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{customer[0].c_birthday}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{customer[0].c_gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{customer[0].c_addr}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <button onClick={onDelete}>삭제</button>
            <button onClick={(e)=>(e.preventDefault())}><Link to='/'>리스트보기</Link></button>
        </div>
    );
}

export default DetailCustomer;