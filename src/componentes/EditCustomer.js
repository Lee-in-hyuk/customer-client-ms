import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAsync from '../hooks/useAsync';

function EditCustomer() {
    const navigate = useNavigate();
    const param = useParams();
    const { id } = param;
    const [ formData, setFormData ] = useState({
        c_name:"",
        c_phone:"",
        c_birthday:"",
        c_gender:"",
        c_addr:""
    });
    async function getCustomer(){
        const response = await axios.get(
            `https://customer-server-ms.herokuapp.com/edit/${id}`
        )
        return response.data;
    }
    const datastate = useAsync(getCustomer);
    const { loading, error, data:customer } = datastate;
    if(loading) return <div>로딩중.......</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customer) return null;

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // 폼 submit이벤트
    const onSubmit = (e) => {
        e.preventDefault();
        editCustomer();
        setFormData({
            c_name:"",
            c_phone:"",
            c_birthday:"",
            c_gender:"",
            c_addr:""
        })
    }
    // put전송 axios
    function editCustomer(){
        axios.put(`https://customer-server-ms.herokuapp.com/edit/${id}`,formData)
        .then(function(res){
            navigate(-1);
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
    }

    return (
        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                <Table className='createTable'>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell><input name='c_name' type="text" defaultValue={customer[0].c_name} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell><input name='c_phone' type="text" defaultValue={customer[0].c_phone} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell><input name='c_birthday' type="date" defaultValue={customer[0].c_birthday} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                남성<input name='c_gender' type="radio" value="남성" onChange={onChange}/>
                                여성<input name='c_gender' type="radio" value="여성" onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell><input name='c_addr' type="text" defaultValue={customer[0].c_addr} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type='submit'>등록</button>
                                <button type='reset'>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
}

export default EditCustomer;