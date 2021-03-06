import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import Customer from './Customer';
import axios from 'axios';
import useAsync from '../hooks/useAsync';

// async를 함수 앞에 붙인 이유는 비동기형식으로 쓰려고.
// getCustomers - 비동기 전송으로 get요청을 해주는 함수
// 응답받은 데이터를 리턴해줌
async function getCustomers(){
    const response = await axios.get('https://customer-server-ms.herokuapp.com/customers')
    return response.data;
}
function CustomerList() {
    const state = useAsync(getCustomers);
    const { loading, error, data:customers } = state;
    // console.log(customers);
    
    // 로딩중이라면 ?
    if(loading) return <div>로딩중....</div>
    // 에러가 발생했다면 ?
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    // 데이터가 없으면 ?
    if(!customers) return null;
    
    // 위에 작성한 if문들이 모두 아니면 !
    return (
        <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* customers는 객체로 되어있는데, 그 안의 인덱스(data)에
                    필요로 하는 값들이 있어서 customers.data로 사용 */}
                    {customers.map(data=>(
                        <Customer data={data} key={data.c_no}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CustomerList;