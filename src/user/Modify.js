/* 
*  /src/user/Modify.js
*  유저정보 변경, 삭제
*  날짜     : 21.05.03
*  만든이   : 권주현
*/

import React, { useEffect, useState }  from 'react' 
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios';

function Modify({ rows, onClickBack}) {





    return (
        <Container>
            <Row className="justify-content-md-center">
        
                <Col md="auto" className="col"> 
                
                  
                    <Col md="auto">

                    <Col xl>
                        <Form.Label>No</Form.Label>
                        <Form.Control type="text" placeholder={rows.idx} readOnly className="inputText" />
                        
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder={rows.id} readOnly className="inputText" />
                    </Col>

                    <Col xl>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder={rows.name} readOnly className="inputText" />

                        <Form.Label>등급</Form.Label>
                        <Form.Control type="text" placeholder={rows.access} readOnly className="inputText" />

                    </Col>


                    <Button onClick={onClickBack}> 돌아가기 </Button>                    
                                        
                    <Button> 수정하기 </Button>
                  
                    



                    </Col>
                        
                        
                </Col>
            </Row>


        </Container>

    )


}

export default Modify;