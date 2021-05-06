/* 
*  /App.js
*  모든 코드들을 모아둔 파일, 여기서 모든게 이루어진다..
*  날짜     : 21.03.12
*  만든이   : 권주현
*/

//
import React,{useEffect, useRef, useState} from 'react'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Nav, Image } from 'react-bootstrap';
import {BiChalkboard, BiPhotoAlbum, BiUser, BiLogOut, BiGroup} from "react-icons/bi";


//각 컴포넌트들을 imprt 하는 코드들
import Login from './component/user/Login';
import Signup from './component/user/Signup';
import UserList from './component/user/UserList';

import Header from './component/header/Header'
import Dashboard from './component/main/Dashboard';
import Logout from './component/user/Logout';
import Photolist from './component/photo/PhotoList';

import logo from './smokiller.png'


function App() {
  useEffect(()=> {}, []);
  
  //로그인 여부를 확인하기위한 state값입니다... isLogin, user_id, name, email값을 받아와야합니다.
  const [state, setStates]  = useState({ 
      isLogin : false,
      user_id : '',
      name : '',
    });

  const {isLogin, name} = state;


  //로그인을 하게 된다면 state값에 세션에 대한 정보를 저장합니다. 
  const setLogin = (name) => {
    setStates({
      isLogin : true,
      user_id : 1,
      name : name
    });
  }

  //로그아웃을 하게되면 값들을 초기화
  const logout = () => {
    setStates({
      isLogin : false,
      user_id : '',
      name : ''
    });
  }

  //헤더 정보

  const [header, setHeader] = useState('Home')

  function onClickMenu(head) {
    console.log(head)
    setHeader(head);

    console.log(header);

  }


  return (


    <div className="wrap">


      {isLogin && <div className="void">.</div>
      }


      {/*로그인을 하게되면 isLogin의 값이 true가 되며, 사이드 네비게이션과, 메인 화면을 보여줍니다. 
        사이드 네비입니다.*/}
      {isLogin &&
      <div className="side_nav">
        <img src={logo} className="logo"/> 
        <div>
            <ul>
                <li>                    
                    <Link to="/"><BiChalkboard /> Home</Link>        
                </li>
                <li>                    
                    <Link to="/photolist"><BiPhotoAlbum /> Photolist</Link>      
                </li>
                <li>
                    <Link to="/signup" ><BiUser /> Signup</Link>      
                </li>
                <li>
                    <Link to="/userlist" ><BiGroup /> UserList</Link>      
                </li>
            </ul>
        </div>
      </div>
      }



      {/*만약 isLogin의 상태가 false이면 로그인 화면을 보여주게 합니다.*/}

      {!isLogin && 
      <div className="wrap">
        <Login setLogin={setLogin}/>
      </div>
      }

      {isLogin && 
        <Header state={state} head={header} logout={logout}/>
      }

      {/*메인 컨테이너
        Switch를 통해 여러 Route를 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링 시켜줍니다*/}    
      {isLogin &&
      <div className="container_main">   
        <Switch>
          <Route 
            path="/" 
            exact={true}
            render={() => <Dashboard setLogin={setLogin} />} />
            
          <Route path="/signup" exact={true} component={Signup} />

          <Route 
            path="/photolist" 
            exact={true}
            render={() => <Photolist  user_info={state} onClickMenu={onClickMenu}/>}  />

          <Route
            path="/userlist"
            exact={true}
            render={() => <UserList />} />
        </Switch>        
      </div>
      }
    </div>
  );
}

export default App;
