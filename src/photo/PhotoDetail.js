import React, { useEffect } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import './css/PhotoDetail.css'

function PhotoDetail( { data, setClick } ) {

    useEffect(() => {
        return () => {
        }
    })

    const src = "./smoke.png"


    return ( 
     <Container>
        <Row className="justify-content-md-center">

            <Col md="auto" className="col"> 
            
                <Image className="detailImg"src="http://127.0.0.1:3333/images/smoke.png" fluid  rounded/>
                <br />
                <Col md="auto">

                <Col xl>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder={data.id} readOnly className="inputText" />
                
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder={data.name} readOnly className="inputText" />
                </Col>

                <Col xl>

                <Form.Label>처리여부</Form.Label>
                <Form.Control type="text" placeholder={data.state} readOnly className="inputText" />


                <Form.Label>처리자</Form.Label>         
                <Form.Control type="text" placeholder={data.user_id} readOnly className="inputText" />
                </Col>

                <Col xl>

                <Form.Label>시간</Form.Label>
                <Form.Control type="text" placeholder={data.time} readOnly className="inputText" />


                <Form.Label>위반여부</Form.Label>
                <Form.Control type="text" placeholder={data.isTrue.toString()} readOnly className="inputText" />
                </Col>

                <Col xl>

                <Form.Label>의견</Form.Label>
                <Form.Control as="textarea" placeholder="의견" className="inputText" rows={3}/>
                </Col>

                <br />

                <Col xl>

                <Button onClick={setClick}> 돌아가기 </Button>
                
                <Button onClick={setClick}> 처리하기 </Button>

                </Col>

                <br />

                </Col>
                    
                    
            </Col>
        </Row>

     </Container>
    )
}



export default PhotoDetail;