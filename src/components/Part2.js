import { useEffect, useRef } from 'react';

import part2Img1 from '../assets/img/part02_comp1_1.jpg';
import part2Img2 from '../assets/img/part02_comp1_2.jpg';
import part2Img3 from '../assets/img/part02_comp2_1.jpg';
import part2Img4 from '../assets/img/part02_comp2_2.jpg';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Part2(props){
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
    <section className="part_wrap part02">
      <div className="inner reverse_type inday_container">
        <div className="tit_cont">
          <p className="part_type cf ffsd6" ref={(el) => (elementsRef.current[0] = el)}>PART. 02</p>
          <p className="part_tit cf ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">평균 연령 30대<br/>남녀매니저&원매니저 시스템</span></p>
          {props.main === undefined ?
            <a href="/whypage" className="main_more w_type ffsd6" ref={(el) => (elementsRef.current[3] = el)}>자세히 보기</a>
            : ''
          }
          
        </div>
        <div className="desc_cont">
          <div className="comp_box">
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[4] = el)}>
                <figure className="img"><img src={part2Img1} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">높은 연령대의 매니저</p>
                  <p className="t2 ffsd6">"라떼는 말이야....."</p>
                  <p className="t3">높은 연령대 매니저들로 현재 미혼남녀의 니즈가 아닌 오래된 자료를 통한 매칭</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[5] = el)}>
                <figure className="img"><img src={part2Img2} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">평균 나이 30대 남녀<br/> 성혼 전문 매니저</p>
                  <p className="t3">상담과 소통에 있어 편안함을 느낄 수 있는 <span className="pc_br"></span>남녀 평균 30대의 전문 매니저들로 구성 되어 고객의 니즈를 가장 잘 알고 깊게 공감하여 케어하고 있습니다.</p>
                </div>
              </div>
            </div>
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[6] = el)}>
                <figure className="img"><img src={part2Img3} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">매니저 불일치</p>
                  <p className="t2 ffsd6">"나를 상담한 분이 나를 가장 잘 아는데<br/> 매칭은 왜, 다른 사람이 하죠?"</p>
                  <p className="t3">상담 매니저와의 1시간 상담 결과가 매칭 매니저에게 전달되는 건 고작 1-2줄! 횟수 차감 목적의 만남이 될 확률 존재</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[7] = el)}>
                <figure className="img"><img src={part2Img4} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">상담 매니저와 매칭 매니저가<br/> 동일한 원-매니저 시스템</p>
                  <p className="t2 ffsd6">대한민국 최초, 우연의 매니저들은 <span className="pc_br"></span>상담부터 매칭까지!</p>
                  <p className="t3">우연의 상담은 가입만을 위한 상담이 아닌 <span className="pc_br"></span>매칭을 목적으로 한 상담입니다.<br/>여러분을 직접 대면하고 깊이 이해한 <span className="pc_br"></span>매니저가 상담 부터 매칭, 그리고 <span className="pc_br"></span>결혼까지 모두 책임 집니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
