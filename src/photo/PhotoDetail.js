/* 
*  /src/photo/PhotoDetail.js
*  사진 클릭시 자세한 정보를 받아오는 컴포넌트
*  날짜     : 21.03.14
*  만든이   : 권주현
*/

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import './css/PhotoDetail.css'

function PhotoDetail( { data, setClick, user_info, fetchLists } ) {
   
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

        if(data.smoking === 0) {
            setInputs({
                smoking : 'NO',
            });
        } else if(data.smoking === 1) {
            setInputs({
                smoking : 'YES',
            }) 
        }   
        
        
        return () => {
           setIsFinished('');
           setInputs({
            smoking : 'YES',
            process : 'YES',
            comment : '',
           })
        }
    },[isFinished]);
  


    
    const proceedPhoto = () => {

        let smoke_data

        if(smoking === 'YES') {
            smoke_data = 1
        } else {
            smoke_data = 0
        }

        axios.post('/api/photo/proceed', {photo_id : data.idx, user_id : user_info.user_id, smoking : smoke_data, comment : inputs.comment}, {withCredentials : true}).then(response => {

            console.log(response);
            fetchLists();
            setIsFinished('');
            setClick();
        });
    }


    const modifyPhoto = () => {
      
    }

    
    return ( 
     <Container>
        <Row className="justify-content-md-center">
        
            <Col md="auto" className="col"> 
            
                <Image className="detailImg" src="http://192.168.0.8:3333/images/smoke.png" fluid  rounded/>
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
                
                <Form.Control as="select" placeholder={data.smoking} name="smoking" onChange={onChange} className="inputText" > 
                    <option>YES</option>
                    <option>NO</option>
                </Form.Control>    

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
                //<Button onClick={setClick}> 수정하기 </Button>}
                <div></div>
                }
                

                </Col>

                <br />

                </Col>
                    
                    
            </Col>
        </Row>
     </Container>
    )
}



export default PhotoDetail;