/* 
*  /App.js
*  모든 코드들을 모아둔 파일, 여기서 모든게 이루어진다..
*  날짜     : 21.03.12
*  만든이   : 권주현
*/

//
import react,{useRef, useState} from 'react'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Nav } from 'react-bootstrap';
import {BiChalkboard, BiPhotoAlbum, BiUser, BiLogOut} from "react-icons/bi";


//각 컴포넌트들을 imprt 하는 코드들
import Login from './user/Login';
import Signup from './user/Signup';


//main Container
import Header from './main/Header'
import Dashboard from './main/Dashboard';
import Logout from './user/Logout';
import Photolist from './photo/PhotoList';


function App() {
  
  //로그인 여부를 확인하기위한 state값입니다... isLogin, user_id, name, email값을 받아와야합니다.
  const [state, setStates]  = useState({ 
      isLogin : false, 
      name : 'log',
    });


  const {isLogin, name} = state;


  //로그인을 하게 된다면 state값에 세션에 대한 정보를 저장합니다. 
  const setLogin = () => {
    setStates({
      ...state, isLogin : !isLogin
    })
  }

  //로그아웃을 하게되면 값들을 초기화시키고, 세션을 해제합니다.
  const logout = () => {
    setStates({
      isLogin : false,
      name : ''
    });

    /*
      세션을 해제를 요청하는 코드 

    */
  }

  return (


    <Container fluid className="App">



    {/*로그인을 하게되면 isLogin의 값이 true가 되며, 사이드 네비게이션과, 메인 화면을 보여줍니다. 
      사이드 네비입니다.*/}
    {isLogin &&
      <div className="side_nav">

    <div className="logo">Smokiller</div>
  
    <div>
        <ul>
            <li>
                
                <Link to="/"><BiChalkboard />  Home</Link>        
            </li>

            <li>
                
                <Link to="/photolist"><BiPhotoAlbum /> photolist</Link>      
            </li>

            <li>
                <Link to="/signup"><BiUser /> signup</Link>      
            </li>

            <li>
                <a href="" onClick={logout}><BiLogOut /> logout</a>      
            </li>
        </ul>
    </div>




    </div>
    }

    {/*만약 isLogin의 상태가 false이면 로그인 화면을 보여주게 합니다.*/}

    {!isLogin &&
      <Login setLogin={setLogin}/>
    }



    {/*메인 컨테이너
       Switch를 통해 여러 Route를 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링 시켜줍니당*/}    
    {isLogin &&
    <div className="container_main">   

      <Header state={state}/>
      


      <Switch>
      <Route 
        path="/" 
        exact={true}
        render={() => <Dashboard setLogin={setLogin} />} />
         
      <Route path="/signup" exact={true} component={Signup} />

      <Route 
        path="/photolist" 
        exact={true}
        render={() => <Photolist setLogin={setLogin} />} />

      </Switch>


      
    </div>
  }
    


    </Container>
  );
}

export default App;
