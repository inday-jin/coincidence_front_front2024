import { useEffect, useRef } from 'react';

import part5Img1 from '../assets/img/part_cost_comp1_1.jpg';
import part5Img2 from '../assets/img/part_cost_comp1_2.png';

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
    <section className="part_wrap part_cost">
      <div className="inner column_type inday_container">
        <div className="tit_cont">
          <p className="part_type cf ffsd6" ref={(el) => (elementsRef.current[0] = el)}>PART. 0{props.main === undefined ? '5' : '6'}</p>
          <p className="part_tit cf ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">합리적인 비용 책정</span></p>
        </div>
        <div className="desc_cont">
          <div className="comp_box grid_type">
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[2] = el)}>
                <div className="in_bdrs">
                  <p className="type ffsd6">기존결정사</p>
                  <figure className="img"><img src={part5Img1} alt="" /></figure>
                </div>
                <div className="txt">
                  <p className="t1 ffsd6">비싼비용</p>
                  <p className="t2 ffsd6">"한번 매칭에 100~300만원?"</p>
                  <p className="t3">횟수제와 기간제의 불공정 계약을 대입해 보니 <span className="pc_br"></span>한번 만남에 100~300만원 가량?</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[3] = el)}>
                <div className="in_bdrs">
                  <p className="type ffsd6">우연시스템</p>
                  <figure className="img"><img src={part5Img2} alt="" /></figure>
                </div>
                <div className="txt">
                  <p className="t1 ffsd6">합리적인 가격</p>
                  <p className="t2 ffsd6">1년 기간제 가입 기준 25~50% 합리적인 가격 책정!</p>
                  <p className="t3">회원 여러분들의 상황과 고민에 맞게 4개월, 8개월 기간제도 <span className="pc_br"></span>준비되어 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
          {props.main === undefined ?
            <a href="/whypage" className="main_more ma w_type ffsd6" ref={(el) => (elementsRef.current[4] = el)}>자세히 보기</a>
            : ''
          }
        </div>
      </div>
    </section>
  )
}
