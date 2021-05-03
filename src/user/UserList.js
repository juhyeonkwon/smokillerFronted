/* 
*  /src/user/UserList.js
*  유저 리스트를 받아오고, 삭제, 수정 할수있게 만듬
*  날짜     : 21.05.03
*  만든이   : 권주현
*/


import React, { useEffect, useState }  from 'react' 
import {Container, Row, Col, Form, Button, Modal} from 'react-bootstrap'
import axios from 'axios';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Modify from './Modify';


function UserList() {

    const fetchlist = async function() {
        
        await axios.post('/api/userlist', {withCredentials : true}).then(response => {

            setStates({
                data : response.data,
            });
        
        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        
        fetchlist();

        return () => {


        }

        

    },[]);

        
    const [states, setStates] = useState({
        data : [],
        rowClicked : false
    });

    const { data, rowClicked } = states;


    const [rows, setRows] = useState({
        idx : '',
        id : '',
        name : '',
        access : '',
    });

    const { idx, id, name, access } = rows;


    const columns = [
        {
          dataField: 'idx',
          text: 'No',
          headerStyle: (colum, colIndex) => {
            return { width: '10%', textAlign: 'center'};
          },
          style : (colum, colIndex) => {
            return { width: '10%', textAlign: 'center'};
          }
        }, 
        {
          dataField: 'id',
          text: 'ID',    
        },
        {
            dataField:'name',
            text: 'Name',    
        },
        {
            dataField:'access',
            text: 'Rank',    
        }
    ];

    const rowEvents = {


        onClick: (e, row, rowIndex) => {   

           setRows({
                idx : row.idx,
                id : row.id,
                name : row.name,
                access : row.access
            });

            let temp;

            switch(row.access) {
                case 3 : temp = "최고관리자"; break;
                case 2 : temp = "관리자"; break;
                case 1 : temp = "사원"; break; 
                default : break;
            }

            setParameter({
                paramAccess : temp,
            })

    

            handleShow();


        }
      };



    const [show, setShow] = useState(false);

    
    
    const [parameter, setParameter] = useState({
        paramAccess : '',
    });

    const { paramAccess } = parameter;
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeAccess = (e) => {
        console.log(e.target.value);

        setParameter({
            paramAccess : e.target.value
        })

        

    }

    const modify = () => {

        let param;
        
        switch(paramAccess) {
            case '최고관리자' : param = 3; break;
            case '관리자' : param = 2; break;
            case '사원' : param = 1; break; 
            default : break;
        }


        axios.post('/api/userlist/modify', {idx : rows.idx, access : param}, {withCredentials : true}).then(response => {
            
            if(response.data === 1) {
                alert('수정을 완료했습니다.')
            } else {
                alert('오류가 발생했습니다.')
            }

            

            handleClose();

            fetchlist();


        })


    }

    const deleteUser = () => {

        if(window.confirm('삭제하시겠습니까?')) {
            axios.post('/api/userlist/delete', {idx : idx}, {withCredentials : true}).then(response => {
                if(response.data === 1) {

                    window.alert('삭제를 완료했습니다.')
                    handleClose();

                    fetchlist();
                } else {
                    alert('오류가 발생했습니다.')
                }            
            });


        } else {

        }


    }


    return (
        <Container fluid > 

            <BootstrapTable 
                key={data.idx}
                keyField='idx' 
                data={ data } 
                columns={ columns }
                rowEvents = { rowEvents } 
                bordered={ false }
                hover={true}               
                
            />  
        


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify</Modal.Title>
        </Modal.Header>
         <Modal.Body>
            <Row className="justify-content-md-center">
            
                <Col md="auto" className="col"> 
                
                
                    <Col md="auto">

                        <Col xl>
                            <Form.Label>No</Form.Label>
                            <Form.Control type="text" placeholder={rows.idx} readOnly className="inputText" />
                            <br />
                            
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder={rows.id} readOnly className="inputText" />
                        </Col>
                            <br />

                        <Col xl>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={rows.name} readOnly className="inputText" />
                            <br />

                            <Form.Label>직급</Form.Label>
                            <Form.Control as="select" placeholder={rows.access} defaultValue={paramAccess} name="rank" onChange={onChangeAccess}>
                                <option>최고관리자</option>
                                <option>관리자</option>
                                <option>사원</option>
                            </Form.Control>
                            <br />

                        </Col>
                
                    </Col>                            
                            
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            돌아가기
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            삭제하기
          </Button>
          <Button variant="primary" onClick={modify}>
            수정하기
          </Button>
        </Modal.Footer>
      </Modal>

             
            
        </Container>

    )
}



export default UserList;
