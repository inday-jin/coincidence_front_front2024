import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageTop({ topPath }) {
  const elementRef = useRef(null);

  const pathClassSlice = topPath.pathname.split('/');
  const titleObj = {
    dashboard: '우리의 인연',
    introduce: '우연은?',
    whypage: '왜 우연인가?',
    process: '우연 프로세스',
    products: '가입 안내',
    coupleReview: '우연 커플 후기',
    partyReview: '우연 파티 후기',
    contact: '문의 정보',
    consult: '상담신청'
  }

  useEffect(() => {
    document.title = pathClassSlice[1] === 'dashboard' ? titleObj[pathClassSlice[1]] : titleObj[pathClassSlice[1]]+' | 우리의 인연';

    gsap.fromTo(
      elementRef.current, 
      {
        opacity: 0, 
        y: 100,
      }, 
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <>
      <>
        {pathClassSlice[1] === 'privacy' || 
        pathClassSlice[1] === 'claimProcedure' || 
        pathClassSlice[1] === 'marriageTerms' || 
        pathClassSlice[1] === 'terms' || 
        topPath.pathname.indexOf('/coupleReview/view') !== -1 || 
        topPath.pathname.indexOf('/partyReview/view') !== -1 
          ? (
            <div className="page_top_padding"></div>
          ) : (pathClassSlice[1] === 'dashboard' || pathClassSlice[1] === 'introduce') ? (
            <div className={`main_bg ${pathClassSlice[1]}`} ref={elementRef}></div>
          ) : (pathClassSlice[1] === 'result') ? (
            <></>
          ) : (
            <div className={`top_bg ${pathClassSlice[1]}`}>
              <h2 className="fz60 ffsd6" ref={elementRef}>{titleObj[pathClassSlice[1]]}</h2>
            </div>
          )
        }
      </>
    </>
  );
}
