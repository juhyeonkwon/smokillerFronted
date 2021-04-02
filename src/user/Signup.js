/* 
*  /src/user/Login.js
*  회원가입 또는 관리자 생성 컴포넌트
*  날짜     : 21.03.11
*  만든이   : 권주현
*/

import React, { useState }  from 'react' 
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import sha256 from 'crypto-js/sha256';
import axios from 'axios';





function Signup() {

    const [inputs, setInputs] = useState({
        email : '',
        password : '',
        password2 : '',
        name : '',
        rank : ''

    })

    const {email, password, password2, name, rank} = inputs



    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        });        

    }


    const submit = () => {
        console.log(inputs);


    }


    return (
        <Container className="my-auto">
            <Row className="justify-content-md-center align-middle">
                <Col xs lg="4">

                    <Form >
                    
                        <Form.Group controlId="Email">

                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" 
                                placeholder="이메일 주소를 입력해주세요"
                                name="email" 
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
                            <Form.Control as="select" laceholder="직급" name="rank" onChange={onChange}>
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