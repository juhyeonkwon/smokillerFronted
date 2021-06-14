/* 
*  /src/photo/PhotoDetail.js
*  사진 클릭시 자세한 정보를 받아오는 컴포넌트
*  날짜     : 21.03.14
*  만든이   : 권주현
*/

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import './css/PhotoDetail.css'

function PhotoDetail( { data, setClick, user_info, fetchLists, handleHeader } ) {
   
    const [isFinished, setIsFinished] = useState(false);

    const [ inputs, setInputs ] = useState({
        smoking : 'YES',
        process : 'YES',
        comment : '',

    })

    const {smoking, process, comment} = inputs;

    const onChange = function(e) {
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        }); 
    
    }

    useEffect(() => {
        if(data.process === 0) {
            setIsFinished(false);
            setInputs({
                ...inputs, process : 'NO',
            });
        } else if(data.process === 1){
            setIsFinished(true);
            setInputs({
                ...inputs, process : 'YES',
            });      
        }     

        if(data.process == 1) {
            if(data.smoking == 0) {
                setInputs({
                    smoking : 'NO',
                });
            } else if(data.smoking == 1) {
                setInputs({
                    smoking : 'YES',
                }) 
            }   
        }
        
        
        return () => {
           setIsFinished('');
           setInputs({
            smoking : 'YES',
            process : 'YES',
            comment : '',
           });
        }
    },[isFinished]);
  


    
    const proceedPhoto = () => {

        let smoke_data

        if(smoking == "YES") {
            smoke_data = 1
        } else {
            smoke_data = 0
        }

        console.log(smoking);
        console.log(smoke_data);


        axios.post('/api/photo/proceed', {photo_idx : data.idx, user_idx : parseInt(user_info.user_id), smoking : smoke_data, comment : inputs.comment}, 
                    {"Content-Type" : "application/json", withCredentials : true}).then(response => {
            if(response.data.suceed === 1) {
                alert('처리가 완료되었습니다.')
            } else {
                alert('에러가 발생했습니다.')
            }
            console.log(response.data);
            fetchLists();
            setIsFinished('');
            setClick();

        });
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return ( 
     <Container>
        <Row className="justify-content-md-center">
        
            <Col md="auto" className="col"> 
            
                <Image className="detailImg" src={"http://175.200.110.202:8000/" + data.src} fluid rounded onClick={handleShow}/>
                <br />
                <Col md="auto">

                <Col xl>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder={data.idx} readOnly className="inputText" />
                
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" placeholder={data.time} readOnly className="inputText" />
                </Col>

                <Col xl>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder={data.location} readOnly className="inputText" />

                </Col>
             

                <Col xl>

                

                <Form.Label>처리여부</Form.Label>
                <Form.Control type="text" placeholder={data.process ===1 ? "YES" : "NO"} readOnly className="inputText" />


                <Form.Label>처리자</Form.Label>
                {!isFinished ?
                <Form.Control type="text" placeholder={user_info.name} readOnly className="inputText" />
                :
                <Form.Control type="text" placeholder={data.name} readOnly className="inputText" />
                }                     
                
                </Col>

                <Col xl>

                <Form.Label>처리 시간</Form.Label>
                <Form.Control type="text" placeholder={data.processed_time} readOnly className="inputText" />

                <Form.Label>위반여부</Form.Label>
                {!isFinished ?
                <Form.Control as="select" placeholder={data.smoking} name="smoking" onChange={onChange} className="inputText" readOnly> 
                    <option>YES</option>
                    <option>NO</option>
                </Form.Control>
                :
                <Form.Control type="text" placeholder={smoking} readOnly name="smoking" className="inputText"></Form.Control>
                }
             

                </Col>

                <Col xl>

                <Form.Label>의견</Form.Label>
                <Form.Control as="textarea" placeholder="의견" value={data.comment != null ? data.comment : comment} name="comment" className="inputText" rows={3} onChange={onChange}/>

                </Col>

                <br />

                <Col xl>

                <Button onClick={setClick}> 돌아가기 </Button>
                
                {!isFinished ?
                <Button onClick={proceedPhoto}> 처리하기 </Button>
                :
                <div></div>
                }
                

                </Col>

                <br />

                </Col>
                    
                    
            </Col>
        </Row>


            <Modal show={show} onHide={handleClose} size="xl" centered>

                    <Modal.Body>
                    <Row className="justify-content-md-center">

                        <Image className="imgModal" src={"http://175.200.110.202:8000/" + data.src} fluid rounded onClick={handleShow}/>

                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            돌아가기
                        </Button>
                    </Modal.Footer>
            </Modal>
     </Container>
    )
}



export default PhotoDetail;