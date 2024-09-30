import {useEffect, useRef} from 'react';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ResultImg from '../../assets/img/result_ico.svg';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);


export default function Result(){
  const navigate = useNavigate();
  const elementsRef = useRef([]);

  useEffect(() => {
    elementsRef.current.forEach((element) => {
      if (element) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 8000)
    ScrollTrigger.refresh();
  }, []);

  return(
    <>
      <div className="result_page">
        <div className="inday_container pb120">
          <p className="tac pb40" ref={(el) => (elementsRef.current[0] = el)}><img src={ResultImg} alt=""/></p>
          <h2 className="fz40 ffsd6 pb50 tac" ref={(el) => (elementsRef.current[1] = el)}>감사합니다.<br/>상담 신청이 완료되었습니다!</h2>
          <p className="fz18 tac pb40" ref={(el) => (elementsRef.current[2] = el)}>신청해 주신 상담 일자는 아직 확정된 상담 일자가 아닙니다.<br/>예약 부서에서 순차적으로 연락 드린 후 상담일자가 확정 되오니 잠시만 기다려 주시면 감사하겠습니다.</p>
          <div className="link" ref={(el) => (elementsRef.current[3] = el)}>
            <a href="/dashboard" className="fz18 ffsd6">우연 홈으로 돌아가기</a>
          </div>
        </div>
      </div>
    </>
  )
}