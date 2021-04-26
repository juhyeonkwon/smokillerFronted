/* 
*  /src/main/Dashboard.js
*  대시보드 메인 컴포넌트입니다. 대시보드에 통계그래프, 사진 현황등을 보여주게 됩니다
*  날짜     : 21.03.13
*  만든이   : 권주현
*/


import React from "react"
import { Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import Chart from "./chart/Chart"


function Dashboard({ session }) {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <div>

                    <h1>대시보드 메인페이지 </h1>

                    
                    <Chart />

                </div>
            </Row>
        </Container>
    )

};


export default Dashboard;