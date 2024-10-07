import { useEffect, useRef } from 'react';

import part4Img1 from '../assets/img/part_zero_comp1_1.jpg';
import part4Img2 from '../assets/img/part_zero_comp1_2.png';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Part5(props){
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
    ScrollTrigger.refresh();
  }, []);
  return(
    <section className="part_wrap part_zero">
      <div className="inner column_type inday_container">
        <div className="tit_cont">
          <p className="part_type ffsd6" ref={(el) => (elementsRef.current[0] = el)}>PART. 0{props.main === undefined ? '4' : '5'}</p>
          <p className="part_tit ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">불공정 환불 약정 Zero</span></p>
        </div>
        <div className="desc_cont">
          <div className="comp_box grid_type">
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[2] = el)}>
                <div className="in_bdrs">
                  <p className="type ffsd6">기존결정사</p>
                  <figure className="img"><img src={part4Img1} alt="" /></figure>
                </div>
                <div className="txt">
                  <p className="t1 ffsd6">불공정 계약</p>
                  <p className="t2 ffsd6">"몇번 만나지도 않았는데 환불비가..?"</p>
                  <p className="t3">예를 들어 3+3 횟수제 가입자가 3회 만난 후 환불 요청한다면 <br/>환불 금액은 얼마일까요? 놀랍게도 0원! <br/>+3은 서비스 여서 환불 기준에서 제외 되기 때문입니다.</p>
                  <p className="t3">550만원 짜리 기간제의 경우 500만원짜리 약정횟수 규약서와 50만원 짜리 기간 규약서를 두장 쓰는 곳도 있습니다. 약정횟수 이후 환불 시 환불 기준은 적은 금액의 기간제 규약서에 의해 진행되기에 환불금액이 매우 낮습니다.</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[3] = el)}>
                <div className="in_bdrs">
                  <p className="type ffsd6">우연시스템</p>
                  <figure className="img"><img src={part4Img2} alt="" /></figure>
                </div>
                <div className="txt">
                  <p className="t1 ffsd6">우연은 공정거래위원회 국내 결혼 표준 약관을 100% 준수합니다.</p>
                  <p className="t2 ffsd6">약정 횟수? 우연엔 없습니다.</p>
                  <p className="t3">타사는 약정 횟수 이후에는 환불이 어렵지만 <span className="pc_br"></span>우연은 실제 이용 기간만 제외하고 깔끔하게 전액 환불!<br/>성혼이 곧 우연의 목표이기에 자신있게 인연 만들기 제안을 지속합니다.</p>
                </div>
              </div>
            </div>
          </div>
          {props.main === undefined ?
            <a href="/whypage" className="main_more ma ffsd6" ref={(el) => (elementsRef.current[4] = el)}>자세히 보기</a>
            : ''
          }

        </div>
      </div>
    </section>
  )
}
