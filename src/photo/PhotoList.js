/* 
*  /src/photo/Photolist.js
* 사진 리스트를 받아오는 컴포넌트입니다. axios 통신으로 json값으로 리스트를 받아옵니다.
*  날짜     : 21.03.14
*  만든이   : 권주현
*/


import React, {useEffect, useState} from "react";
import { Container, Table } from "react-bootstrap";
import { Route } from "react-router";

import PhotoDetail from './PhotoDetail'

//table을 원할하게 사용하기 위해 react-bootstrap-table2 사용합니다람쥐
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from "axios";
import { Button } from "react-bootstrap";



function Photolist({ user_info }) { 
    
    //page를 받아와 리스트 값을 가져옵니다..
    const fetchLists = async (page) => {
        
        axios.post('/api/photo/list', {page : page}, {withCredentials : true}).then(response => {

            response.data.map(data => {
                if(data.process === 0) {
                    data.process = 'yet'
                } else {
                    data.process = 'done'
                }
            })

            setStates({
                ...states, data : response.data
            });
        }).catch(err => {
            console.log(err);
        })

        /*

        axios.post('/api/boardtest/list.json', {withCredentials : true}).then(response => {
            console.log(response.data.list);

        })

        */

    }

    const setClick = () => {
        setRows({
            clickedRow : '',
            isClicked : !isClicked,
            detailData : '',
        })
    }


    const [states, setStates] = useState({
        currentPage : 1,
        data : [],
    });

    const [rows, setRows] = useState({
        clickedRow : '',
        isClicked : false,
        detailData : ''
    })
   
    const {currentPage, data} = states;


    const { clickedRow, isClicked, detailData } = rows;

    //useEffect해당 컴포넌트를 불러오면 axios 통신을 통해 리스트를 받아옵니당..
    useEffect(() => {
       

        fetchLists(states.currentPage);
        return () => {

        }
    }, [])

    //table 세팅입니다.
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
      dataField: 'time',
      text: 'Time',

    },
    {
        dataField:'process',
        text: 'State',

    }];


    // row를 클릭할 시 일어나는 이벤트
    // row를 클릭하면 해당 row의 상세정보를 ajax통신으로 값을 받아와서 사용자에게 보여준다..
    const rowEvents = {
        onClick: (e, row, rowIndex) => {            
                axios.post('/api/photo/detail', {id : row.idx, process : row.process }, {withCredentials : true}).then(response => {

                    setRows({
                        clickedRow : row,
                        isClicked : true,
                        detailData : response.data[0]
                    })
                    
                }).catch(err => {
                    console.log(err);
                });            


        }
      };


    


    return (
        <Container fluid > 
                
            {!isClicked &&
            <BootstrapTable 
                key={data.id}
                keyField='idx' 
                data={ data } 
                columns={ columns }
                rowEvents = { rowEvents } 
                bordered={ false }
                hover={true}
                
                
            />
            }
            
            {isClicked &&
            <div>

                <PhotoDetail data={detailData} setClick={setClick} user_info={user_info} fetchLists={fetchLists}/>

            </div>
            }
           
        </Container>
    )
}

export default Photolist;

