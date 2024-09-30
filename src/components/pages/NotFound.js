import { useEffect } from "react";
import ErrorImg from '../../assets/img/error_404.jpg'

export default function NotFound(){
  useEffect(() =>{
    document.getElementById('header').className = 'header tn blue_logo';
  },[])
  return(
    <>
      <div className="inday_container">
        <div className="error_page pt120 tac">
          <p className="pb80"><img src={ErrorImg}/></p>
          <h2 className="pb50 fz40 ffsd6">페이지를 찾을 수 없습니다.</h2>
          <p className="pb40 fz22 c3">페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br/>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
          <a href="/introduce" className="fz18 ffsd6">메인화면</a>
        </div>
      </div>
    </>
  )
}