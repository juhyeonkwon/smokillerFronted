/* 
*  ./main/Header.js
*  메인 Container의 header 부분입니당.. 검색 또는 유저 정보 등 보여줌...
*  날짜     : 21.03.15
*  만든이   : 권주현
*/


import React from 'react'
import { Navbar } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';





function Header( {state} ) {




    return (
        <Navbar>
            <Navbar.Brand >Header</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <BiUserCircle />
                Signed in as: <a href="#">{state.name}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

    )


}






export default Header;
