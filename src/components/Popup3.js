import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import PopupClose from '../assets/img/popup_close.svg';
import PopupTodayClose from '../assets/img/popup_today_close.svg';
import { useNavigate } from 'react-router-dom';

export default function Popup3(){
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {

    const popupStatus = Cookies.get('popupClosed3');
    if (!popupStatus) {
      setIsPopupVisible(true);
    }else{
    }
  }, []);

  const handleClose = () => {
    setIsPopupVisible(false);
    // navigate('/result');
     window.location.href = '/result'
  };

  const handleDoNotShowForDay = () => {
    // 1일 동안 쿠키를 설정
    Cookies.set('popupClosed3', 'true', { expires: 1 });
    setIsPopupVisible(false);
  };

  if (!isPopupVisible) return null;
  setTimeout(() => {
    // navigate('/result');
     window.location.href = '/result'
  }, 60000)

  return(
    <div className="popup">
      <div className="popup_wrap">
        <div className="popup_cont fz16">
          <p className="fz16 c3">감사합니다.<br/>상담 신청이 완료되었습니다!<br/><br/></p>
          <p className="fz16 c3">1/27~1/30 설날 연휴로 인해 예약 부서의 연락이 조금 늦어질 수 있습니다.
          순차적으로 연락 드릴 예정이오니 조금만 양해 부탁 드립니다.<br/><br/></p>
          <p className="fz16 c3">새해 복 많이 받으시고
          즐겁고 행복한 설 연휴 보내시기 바랍니다.<br/><br/></p>
        </div>
        <div className="popup_ctrl">
          {/* <button onClick={handleDoNotShowForDay} className="fz16"><img src={PopupTodayClose} alt=""/> 하루 동안 보지 않기</button> */}
          <button onClick={handleClose} className="fz16 ffsd6">닫기</button>
        </div>
        </div>
    </div>
  )
}