/* 
*  /src/user/Login.js
*  회원가입 또는 관리자 생성 컴포넌트
*  날짜     : 21.03.11
*  만든이   : 권주현
*/

import React, { useEffect, useState }  from 'react' 
import {Container, Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import sha256 from 'crypto-js/sha256';
import axios from 'axios';





function Signup() {
  

    const [inputs, setInputs] = useState({
        id : '',
        password : '',
        password2 : '',
        name : '',
        rank : '최고관리자',
    })

    const {id, password, password2, name, rank, valid} = inputs



    const onChange = (e) => {
       
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        });        



    }


    const submit = () => {

        if(password != password2) {
            alert('비밀번호가 일치하지 않습니다.')
            return ;
        }

        let access;

        switch (rank) {
            case "최고관리자":
                access = 3
                break;
            case "관리자":
                access = 2
                break;
            case "사원":
                access = 1
                break;    
            default:
                break;
        }

        axios.post('/api/super_user/userInsert', {id : id, name : name, password : password, access : access}, {"Content-Type" : "application/json", withCredentials : true}).then(response => {
            console.log(response.data);
            if(response.data.success === 1) {
                alert('관리자 등록이 완료되었습니다.')
            } else {
                alert('에러가 발생했습니다.')
            }
        })


    }


    return (
        <Container className="my-auto">
            <Row className="justify-content-md-center align-middle">
                <Col xs lg="4">

                    <Form >
                    
                        <Form.Group controlId="Id">

                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="아이디를 입력해주세요"
                                name="id" 
                                onChange={onChange}/>

                        </Form.Group>

                        <Form.Group controlId="Password">

                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="비밀번호를 입력해주세요" 
                                name="password" 
                                onChange={onChange}/>
                       
                        </Form.Group>

                        <Form.Group controlId="Password2">

                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="비밀번호를 다시 한번 입력해주세요" 
                                name="password2" 
                                onChange={onChange}/>
                        </Form.Group>

                        <Form.Group controlId="name">

                           <Form.Label>name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="이름을 입력해주세요"
                                name="name" 
                                onChange={onChange}/>

                        </Form.Group>

                        <Form.Group controlId="">

                            <Form.Label>rank</Form.Label>
                            <Form.Control as="select" placeholder="직급" name="rank" onChange={onChange}>
                                <option>최고관리자</option>
                                <option>관리자</option>
                                <option>사원</option>
                            </Form.Control>
                       
                        </Form.Group>


                        <Button variant="primary" onClick={submit}>
                            회원가입 (관리자 추가)
                        </Button>
                    </Form>
                                    



                </Col>
      
            </Row>



        </Container>


    )
}



export default Signup;