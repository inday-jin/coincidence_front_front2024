import { useEffect, useRef } from 'react';

import part3Img1 from '../assets/img/part03_comp1_1.jpg';
import part3Img2 from '../assets/img/part03_comp1_2.jpg';
import part3Img3 from '../assets/img/part03_comp2_1.jpg';
import part3Img4 from '../assets/img/part03_comp2_2.jpg';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Part3(props){
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
    <section className="part_wrap part03">
      <div className="inner inday_container">
        <div className="tit_cont">
          <p className="part_type ffsd6" ref={(el) => (elementsRef.current[0] = el)}>PART. 03</p>
          <p className="part_tit ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">확실한 <br/>검증 시스템</span></p>
          {props.main === undefined ?
            <a href="/whypage" className="main_more ffsd6" ref={(el) => (elementsRef.current[2] = el)}>자세히 보기</a>
            : ''
          }
        </div>
        <div className="desc_cont">
          <div className="comp_box">
            <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[3] = el)}>
                <figure className="img"><img src={part3Img1} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">불확실한 정보</p>
                  <p className="t2 ffsd6">부채를 포함한 자산 정보</p>
                  <p className="t3">아파트가 10억, 부채가 5억<br/>그렇다면 재산은 5억? 10억?</p>
                  <p className="t3">* 제출 서류 <br/><span className="c6">재직증명서, 연봉계약서</span></p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[4] = el)}>
                <figure className="img"><img src={part3Img2} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">오해를 줄이는 정확하게 검증된 정보</p>
                  <p className="t2 ffsd6">법인 미인증 자산은 표기하지 않습니다.</p>
                  <p className="t3">자산과 부채를 법무법인과 함께 명확하게 인증하고 구분하여 프로필에 기재하고 있습니다.</p>
                  <p className="t3">* 제출 서류<br/><span className="c6">재직 증명서, 연봉 계약서, 은행&주식 잔고 확인서, 등기부 등본 (부채 표시)</span></p>
                </div>
              </div>
            </div>
            {props.main === undefined ? (
              <div className="line">
              <div className="box" ref={(el) => (elementsRef.current[5] = el)}>
                <figure className="img"><img src={part3Img3} alt="" /></figure>
                <p className="type ffsd6">기존결정사</p>
                <div className="txt">
                  <p className="t1 ffsd6">실물과는 다른 그대</p>
                  <p className="t2 ffsd6">실물과는 다른 사진으로 가능한<br/> 결정사 프로필</p>
                  <p className="t3">"프사기"를 방조하는 결정사, 각종 보정이 난무하는 스튜디오 사진, 심지어 결정사가 동의 없이 보정까지 한다고?</p>
                </div>
              </div>
              <div className="box blue_type" ref={(el) => (elementsRef.current[6] = el)}>
                <figure className="img"><img src={part3Img4} alt="" /></figure>
                <p className="type ffsd6">우연시스템</p>
                <div className="txt">
                  <p className="t1 ffsd6">철저한 프로필 검증</p>
                  <p className="t2 ffsd6">프사기, 키사기로 인한 시간 낭비와<br/> 감정소모가 없습니다.</p>
                  <p className="t3">대표와 매니저가 프로필 등록 사진을 상담 시 확보한 실물 사진과 직접 대조하여 승인, 관리하고 있습니다. 프사기, 키사기 문제 방조 시 매니저님들은 징계를 받습니다.</p>
                </div>
              </div>
            </div>
            ) : <></>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
