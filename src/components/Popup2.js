import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import PopupClose from '../assets/img/popup_close.svg';
import PopupTodayClose from '../assets/img/popup_today_close.svg';


export default function Popup2(){
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {

    const popupStatus = Cookies.get('popupClosed2');
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
    Cookies.set('popupClosed2', 'true', { expires: 1 });
    setIsPopupVisible(false);
  };

  if (!isPopupVisible) return null;

  return(
    <div className="popup">
      <div className="popup_wrap">
        <div className="popup_cont fz16">
          <p className="fz16 c3">안녕하세요 우연, 우리의 인연입니다.<br/><br/></p>
          <p className="fz16 c3">2024년, 한 해가 마무리되고 있습니다. 항상 우연을 믿고 이용해 주시는 여러분께 깊은 감사의 인사를 전하며 내년 1월 2일 자로 가격 인상이 예정되어 있어 2024년 12월 31일까지 상담&결제를 모두 완료한 고객님에 한하여 인상 전 가격으로 이용이 가능함을 알려드립니다.<br/><br/></p>
          <p className="fz16 c3">가격 조정에 대한 너그러운 양해를 부탁드리며, 우연을 믿어주신 여러분들의 믿음에 보답하여 2025년 을사년, 우연에서 꼭 좋은 인연을 만나 성혼할 수 있게 최선의 노력을 다할 것을 약속드립니다.<br/><br/></p>
          <p className="fz16 c3">우연 대표 올림</p>
        </div>
        <div className="popup_ctrl">
          <button onClick={handleDoNotShowForDay} className="fz16"><img src={PopupTodayClose} alt=""/> 하루 동안 보지 않기</button>
          <button onClick={handleClose} className="fz16 ffsd6">닫기 <img src={PopupClose} alt=""/></button>
        </div>
        </div>
    </div>
  )
}