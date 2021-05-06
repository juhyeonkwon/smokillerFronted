/* 
*  ./main/Header.js
*  메인 Container의 header 부분입니당.. 검색 또는 유저 정보 등 보여줌...
*  날짜     : 21.03.15
*  만든이   : 권주현
*/


import {React, useEffect, useState} from 'react'
import { Container, Row, Col, Form, Button, Modal, Navbar, Dropdown } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
import './Header.css'





function Header( {state, head, logout} ) {

    useEffect(() => {
        console.log('헤더 리로드')
        
    }, )

    const [title, setTitle] = useState('home');

    const [passwords, setPasswords] = useState({
        password : '',
        password2 : '',
    })

    const {password, password2} = passwords;

    const onChangePw = (e) => {
        setPasswords({
            ...passwords, [e.target.name] : e.target.value
        });

    }


    function modify() {


        if(password != password2) {
            alert('비밀번호가 일치하지 않습니다.')
            return ;
        }

        axios.post('/api/modify_pw', { idx : state.user_id, password : password}, {withCredentials : true} ).then(response => {
            if(response.data === 1) {
                alert('수정을 완료했습니다.')
                handleClose();
            } else {
                alert('오류가 발생했습니다.')
            }

        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar className="nav">
            <Navbar.Brand >환영합니다</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <BiUserCircle />
                Signed in as: 
                <Dropdown>
                    <Dropdown.Toggle  id="dropdown-basic" className="dropdown">
                             {state.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right" >
                        <Dropdown.Item className="item" onClick={handleShow}>정보수정</Dropdown.Item>
                        <Dropdown.Item className="item" onClick={logout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
                </Navbar.Text>
            </Navbar.Collapse>




            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                     <Modal.Title>비밀번호 변경</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-md-center">
                    
                        <Col md="auto" className="col"> 
                        
                        
                            <Col md="auto">

                                <Col xl>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" className="inputText" name="password" onChange={onChangePw}/>
                                    <br />
                                    <Form.Label>Password Again</Form.Label>
                                    <Form.Control type="password" className="inputText" name="password2" onChange={onChangePw}/>
                                </Col>
                                
                            </Col>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        돌아가기
                    </Button>
                    <Button variant="primary" onClick={modify}>
                        수정하기
                    </Button>
                </Modal.Footer>
            </Modal>



        </Navbar>

    )


}






export default Header;
