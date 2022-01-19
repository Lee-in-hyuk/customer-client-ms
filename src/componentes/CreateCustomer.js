import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';

function CreateCustomer() {
    const [ formData, setFormData ] = useState({
        c_name:"",
        c_phone:"",
        c_birthday:"",
        c_gender:"",
        c_addr:""
    });
    const onChange = (e) => {
        // e.target은 각 인풋에 들어오는 값을 지정하는거고, 그걸 name과 value로 구조분해할당해서 적용
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        console.log(name,value);
    }
    // 폼 submit이벤트
    const onSubmit = (e) => {
        // submit의 기본 이벤트가 실행되면 주소창에 get요청으로 전송되므로,
        // 기본 이벤트를 없애주는 함수
        e.preventDefault();
        // submit 버튼 누를 때 insertCustomer가 실행되어야 하니까 onSubmit 함수 안에 작성
        insertCustomer();
        // submit버튼 누르고 나면 setFormData가 비워지게 세팅
        setFormData({
            c_name:"",
            c_phone:"",
            c_birthday:"",
            c_gender:"",
            c_addr:""
        })
    }
    // post전송 axios
    function insertCustomer(){
        axios.post("http://localhost:8080/addCustomer",formData)
        .then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
    }
    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmit}>
                <Table className='createTable'>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell><input name='c_name' type="text" value={formData.c_name} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell><input name='c_phone' type="text" value={formData.c_phone} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell><input name='c_birthday' type="date" value={formData.c_birthday} onChange={onChange}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                남성<input name='c_gender' type="radio" value="남성"/>
                                여성<input name='c_gender' type="radio" value="여성"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell><input name='c_addr' type="text" value={formData.c_addr} onChange={onChange}/></TableCell>
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

export default CreateCustomer;