import { useEffect, useRef } from 'react';
import part1Img1 from '../assets/img/part01_comp1_1.jpg';
import part1Img2 from '../assets/img/part01_comp1_2.jpg';
import part1Img3 from '../assets/img/part01_comp2_1.jpg';
import part1Img4 from '../assets/img/part01_comp2_2.jpg';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Part1(props){
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

  return (
    <section className="part_wrap part01">
      <div className="inner inday_container">
        <div className="tit_cont">
          <p className="part_type ffsd6" ref={(el) => (elementsRef.current[0] = el)}>PART. 01</p>
          <p className="part_tit ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">오직 성혼만을<br />목표로한 새 기준</span></p>
          {props.main === undefined ?
            <a href="/whypage" className="main_more ffsd6" ref={(el) => (elementsRef.current[2] = el)}>자세히 보기</a>
            : ''
          }
        </div>
        <div className="desc_cont">
          <div className="comp_box">
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[3] = el)}>
                <figure className="img"><img src={part1Img1} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">성혼에는 관심없는 너</p>
                  <p className="t2 ffsd6">결정사 평균 성혼율 3%, 나는 솔로 성혼률 5%</p>
                  <p className="t3">정작 중요한 결혼에는 관심없고 매칭 통한 상대방 횟수 차감에 목적</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[4] = el)}>
                <figure className="img"><img src={part1Img2} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">오직 성혼, 성혼만을 바라보는 우연</p>
                  <p className="t2 ffsd6">우연과 회원님들의 공동 목표, 행복한 결혼 성사!</p>
                  <p className="t3">목표를 이루기 위해 타사 대비 월등한 <span className="pc_br"></span>매니저 성혼 인센티브 50%를 지급합니다.<br />* 성혼 사례비 기준</p>
                </div>
              </div>
            </div>
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[5] = el)}>
                <figure className="img"><img src={part1Img3} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">진정성 없는 만남</p>
                  <p className="t2 ffsd6">차감, 미차감 시스템</p>
                  <p className="t3">미차감 만남을 권유하는 등 <span className="pc_br"></span>횟수 차감 목적의 만남이나 한 쪽이 <span className="pc_br"></span>심리적 우위에 있을 수 밖에 없는 <span className="pc_br"></span>특정 직군 우대 시스템</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[6] = el)}>
                <figure className="img"><img src={part1Img4} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">진정성 있는 만남만을 추구</p>
                  <p className="t2 ffsd6">모두에게 동일한 가격과 서비스를 제공 합니다.</p>
                  <p className="t3">진정성 있는 인연 만들기만을 원칙으로 <span className="pc_br"></span>횟수 차감 목적의 만남 권유, <span className="pc_br"></span>매니저의 만남 부탁 등 진정성 없는 시스템을 타파하였습니다. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
