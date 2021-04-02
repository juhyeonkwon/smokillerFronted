/* 
*  /src/user/Logoutjs
*  로그아웃 컴포넌트, isLoged의 값을 false로, 세션값을 버린다.
*  날짜     : 21.03.13
*  만든이   : 권주현
*  미사용
*/


import React, { useEffect } from 'react'




function Logout( {logout} ) {
    useEffect(()=> {
        logout();
    })
  
    return (
        <div >
        


        </div>
    )


    
}


export default Logout;