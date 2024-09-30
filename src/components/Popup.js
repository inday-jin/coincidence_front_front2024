import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import PopupClose from '../assets/img/popup_close.svg';
import PopupTodayClose from '../assets/img/popup_today_close.svg';


export default function Popup(){
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {

    const popupStatus = Cookies.get('popupClosed');
    if (!popupStatus) {
      setIsPopupVisible(true);
    }else{
    }
  }, []);

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  const handleDoNotShowForDay = () => {
    // 1일 동안 쿠키를 설정
    Cookies.set('popupClosed', 'true', { expires: 1 });
    setIsPopupVisible(false);
  };

  if (!isPopupVisible) return null;

  return(
    <div className="popup">
      <div className="popup_wrap">
        <div className="popup_cont fz16">
          <p className="fz16 c3">[가격 인상 안내]<br/><br/>그동안 최소한의 비용으로 최선의 매칭서비스를 제공해드리고자 진행했던 횟수제와 기간제 4개월 프로그램 비용이 10월 1일(화) 부로 횟수제 5회권 기존 110만원에서 140만원(VAT포함), 기간제 4개월 150만원에서 170만원 (VAT포함)으로 인상됩니다.<br/><br/>이전 가격 적용은<br/><br/>1) 9월 30일까지 상담&결제 완료된 회원<br/><br/>2) 9월7일(토) 이전에 신청하였으나 10월 1일(화) 이후 상담오셔서 상담&결제한 회원이오니<br/><br/>이 점 널리 양해 부탁드립니다<br/><br/>*가입비 인상과 별도로 당일 결제 시 기간서비스 추가 & 야외 사진촬영 지원& 미팅파티 할인 혜택이 확대되었으니 많은 관심과 상담신청 부탁드립니다</p>
        </div>
        <div className="popup_ctrl">
          <button onClick={handleDoNotShowForDay} className="fz16"><img src={PopupTodayClose} alt=""/> 하루 동안 보지 않기</button>
          <button onClick={handleClose} className="fz16 ffsd6">닫기 <img src={PopupClose} alt=""/></button>
        </div>
        </div>
    </div>
  )
}