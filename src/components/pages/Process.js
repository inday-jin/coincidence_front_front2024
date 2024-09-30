import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import process1 from "../../assets/img/process_i1.jpg";
import process2 from "../../assets/img/process_i2.jpg";
import process3 from "../../assets/img/process_i3.jpg";
import process4 from "../../assets/img/process_i4.jpg";
import process5 from "../../assets/img/process_i5.jpg";
import process6 from "../../assets/img/process_i6.jpg";
import process7 from "../../assets/img/process_i7.jpg";
import process8 from "../../assets/img/process_i8.jpg";
import process9 from "../../assets/img/process_i9.jpg";

gsap.registerPlugin(ScrollTrigger);


export default function Process(){
  const elementsRef = useRef([]);

  useEffect(() => {
    elementsRef.current.forEach((element) => {
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
    });
  },[])
  return(
    <>
      <div className="inday_container pb120">
        <h2 className="main_tit fz50 ffsd6 pb40 pt120 tac" ref={(el) => (elementsRef.current[0] = el)}><span className="mark_bg">서비스 절차</span></h2>
        <p className="tac fz22 c3 pb80" ref={(el) => (elementsRef.current[1] = el)}>상담부터 성혼까지 우리의 인연 서비스 절차를 소개합니다.</p>
        <div className="process_lst">
          <div className="item" ref={(el) => (elementsRef.current[2] = el)}>
            <div className="img"><img src={process1} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 01</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">상담신청</p>
              <p className="t2 fz18">원하시는 상담 일자와 선호하시는 상담사 성별을 선택해주세요.</p>
              <p className="t2 fz18">상담 신청은 확정이 아니에요! 예약 부서에서 순차로 연락드린 후 예약이 확정됩니다.</p>
              <a href="/consult/request" className="fz18 ffsd6">상담 신청하러 가기</a>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[3] = el)}>
            <div className="img"><img src={process2} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 02</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">대면 상담</p>
              <p className="t2 fz18">배정된 담당 매니저님과 직접 대면하여 꼼꼼하고 진솔한 상담을 하게 됩니다!</p>
              <p className="t2 fz18">원하시는 이상형과 자신의 가치관, 스타일에 대해 많은 이야기를 해주시는 것이 가장 좋습니다.</p>
              <p className="t2 fz18">평균 연령 30대의 전문 매니저는 우연의 자랑! 마음 편히 상담 받으세요.</p>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[4] = el)}>
            <div className="img"><img src={process3} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 03</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">상담 후 결제</p>
              <p className="t2 fz18">우연과 함께 인연을 만들겠다는 결정을 하셨나요?</p>
              <p className="t2 fz18">상담 시 상세히 안내 받은 대로 가입서 작성 및 결제를 진행하게 됩니다.</p>
              <a href="/consult/request" className="fz18 ffsd6">상담 신청하러 가기</a>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[5] = el)}>
            <div className="img"><img src={process4} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 04</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">서류 제출 및 인증</p>
              <p className="t2 fz18">철저한 검증을 위해 서류 제출을 하게 됩니다.</p>
              <p className="t2 fz18">프로필 사진, 자기소개서는 물론 학력, 자산정보 등 관련 서류들을 받아 법무법인과 함께 철저한 인증 절차를 거치게 됩니다.</p>
            </div>
          </div>
          <div className="item wait" ref={(el) => (elementsRef.current[6] = el)}>
            <div className="img"><img src={process5} alt=""/></div>
            <p className="step fz20 ffsd6">WAIT !</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">프로필 촬영</p>
              <p className="t2 fz18">맘에 드시는 프로필 사진이 없으시다구요?</p>
              <p className="t2 fz18">회원의 매력을 100% 뽑아드리는 우연의 제휴 스냅 작가님을 만나보세요!</p>
              <p className="t2 fz18">우연 고객 한정의 특별 할인 가격으로 우연은 수수료를 일체 받지 않습니다.</p>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[7] = el)}>
            <div className="img"><img src={process6} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 05</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">최종 승인</p>
              <p className="t2 fz18">정성스레 제출 해 주신 인증 서류와 프로필 정보를 면밀히 검토 후 승인이 완료됩니다!</p>
              <p className="t2 fz18">우연과 함께 인연 만들기 준비가 완료되었습니다.</p>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[8] = el)}>
            <div className="img"><img src={process7} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 06</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">서비스 제공</p>
              <p className="t2 fz18">상담을 진행하며 회원님에 대해 가장 잘 이해한 매니저님이 회원 케어와 매칭을 시작하게 됩니다.</p>
              <p className="t2 fz18">주기적인 매칭 카드 제공은 물론 우연의 오프라인 파티 참석까지! 매니저님과 소통하며 평생 인연을 만나보시기 바랍니다.</p>
              <a href="/partyReview" className="fz18 ffsd6">파티 후기 보기</a>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[9] = el)}>
            <div className="img"><img src={process8} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 07</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">매칭 성공</p>
              <p className="t2 fz18">마음에 드시는 회원이 있으시다면 적극적인 메시지로 호감을 표시해 주세요!</p>
              <p className="t2 fz18">서로 호감을 느껴 매칭 성사 시 전담 매니저님이 시간과 장소를 조율해 드리니 멋진 만남만 준비하시면 됩니다!</p>
            </div>
          </div>
          <div className="item" ref={(el) => (elementsRef.current[10] = el)}>
            <div className="img"><img src={process9} alt=""/></div>
            <p className="step fz20 ffsd6">STEP. 08</p>
            <div className="txt">
              <p className="t1 fz30 ffsd6">우리의 인연</p>
              <p className="t2 fz18">내게 꼭 맞는 인연을 만나셨다면 이제 예쁜 사랑을 키워나가세요!</p>
              <p className="t2 fz18">우연은 언제나 회원님들의 사랑을 응원 합니다.</p>
              <a href="/coupleReview" className="fz18 ffsd6">파티 후기 보기</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}