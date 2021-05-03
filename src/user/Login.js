/* 
*  /src/user/Login.js
*  로그인 컴포넌트, Email 값과 PW값을 받아서 서버에 ajax 통신 후 값을 받아온다.
*  날짜     : 21.03.11
*  만든이   : 권주현
*/


import React, { useState }  from 'react' 
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import './css/Login.css';


function Login( {setLogin} ) {

    const [inputs, setInputs] = useState({email : '', password : ''});

    const {email, password} = inputs;

    const onChange = function(e) {
        setInputs({
            ...inputs, [e.target.name] : e.target.value
        }); 
    }

    const submit = async function() { 

        //패스워드는 암호화를 해서 서버에 전송해야 안전하기 때문에 
        //sha256으로 암호화를 한 후서버에 전송합니다
        const cryptoPw = sha256(password).toString();

      
        //axios로 ajax 통신을 진행합니다. withCredentials : true 값을 속성으로 줘야합니당..      
       await axios.post('/api/login', {id : email, password : cryptoPw}, 
                    {withCredentials : true}).then(response => {

                        setLogin(response.data.name);       

        }).catch((err) => {
            console.log(err);
        })
        

    }


    return (
        <Container className="loginCon"> 
            
            <Row className="justify-content-md-center align-middle">
            
                <Col xs lg="4">

                    <Form className="login">
                    
                        <Form.Group controlId="Email">

                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email" name="email" onChange={onChange}/>

                        </Form.Group>

                        <Form.Group controlId="Password">

                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" name="password" onChange={onChange}/>
                       
                        </Form.Group>

                        <Button className="btn" variant="primary" onClick={submit}>
                            sign in
                        </Button>
                    </Form>                              

                </Col>
      
            </Row>
          


        </Container>
    )
}


export default Login;



