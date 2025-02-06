import { useEffect, useRef } from 'react';
import Part1 from '../../components/Part1';
import Part2 from '../../components/Part2';
import Part3 from '../../components/Part3';
import Part4 from '../../components/Part4';
import Part5 from '../../components/Part5';

import whyPart4img1 from '../../assets/img/why_part4_1.jpg';
import whyPart4img2 from '../../assets/img/why_part4_2.jpg';

import partyImg from '../../assets/img/part_party_img1.jpg';

import photoImg1 from '../../assets/img/part_photo_img1_1.jpg';
import photoImg2 from '../../assets/img/part_photo_img1_2.jpg';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function Whypage(path){
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
    <>
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[0] = el)}>
            <span>비싼 비용을 냈는데</span>
            <span className="point">왜 내가 원하는 이성을 소개해주지 않을까?</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[1] = el)}>상담 시에는 모든 조건을 다 맞춰줄 것처럼 하더니, 정작 매칭은 내 니즈에 맞지 않거나 진정성 없는 만남만 이루어졌었습니다.<br/>진짜 인연은 만나지 못하고 시간과 돈만 낭비되는 것을 느끼며 <span className="ffsbb">"이들은 내 결혼에 관심이 없구나"</span> 란 생각이 들었습니다.<br/>결혼을 인생의 숙제가 아닌 축제로 만들기 위해, 진짜 결정사 다운 결정사를 만들자고 다짐했습니다.</p>
        </section>
      </div>
      <Part1 main={false} />
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[2] = el)}>
            <span>나를 잘 모르는 분들이 과연</span>
            <span className="point">내게 맞는 좋은 인연을 소개해줄까?</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[3] = el)}>한시간 넘게 50대 상담사 분들과 상담하고, 정작 매칭도 50대의 다른 분이 해주시는 걸 알았을 때 <span className="pc_br"></span><span className="c1 ffsbb">"이 분들이 과연 20대, 30대들의 트렌드와 니즈를 잘 파악할 수 있을까?"</span><br/><span className="c1 ffsbb">"나를 모르는데 나와 맞는 사람을 잘 소개해줄까?"</span> 하는 의구심이 들었습니다.<br/>그래서 고안 한 것이 평균 연령 30대의 남녀 상담사와 원-매니저 시스템입니다.</p>
        </section>
      </div>
      <Part2 main={false}/>
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[4] = el)}>
            <span>대형 결정사여서 인증 받기가 까다로울 줄 알았는데</span>
            <span className="point">의외로 너무 간단하거나 자산인증을 아예 안해서 놀랐어요</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[5] = el)}>내가 말하는 대로만 적고, 사실 여부는 확인하지 않은 채 오로지 규약서에만 의지한 인증을 거치면서 과연 이 인증이 철저하고 제대로 된 인증이었을까, <span className="pc_br"></span>관계가 깊어졌을 때 오해가 생겨 관계가 틀어지진 않을까 하는 걱정이 들었습니다.<br/>그래서 법무 법인을 통한 철저한 자산 인증 시스템을 구축했습니다.</p>
        </section>
      </div>
      <Part3 main={false}/>
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[6] = el)}>
            <span>프로필을 보고 이상형이라 생각하고 만났더니</span>
            <span className="point">사진과 실물이 정말 다른 분이 나오셔서 당황했어요</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[7] = el)}>작은 눈이 큰 눈으로, 173cm가 180cm로, 당사자 동의 없이 사진을 보정하고 프로필을 수정한 것을 알았을 때 내가 만날 분들도 그러겠단 생각이 들었습니다.<br/>횟수 차감 목적으로 이루어진 과도한 보정과 프로필 수정으로 상대방도, 당사자도 감정 소모와 시간이 낭비되는 것에 <span className="pc_br"></span>염증을 느껴 프사기, 키사기 방지 시스템을 구축하게 되었습니다.</p>
        </section>
      </div>
      <section className="part_wrap why_part04">
        <div className="inner reverse_type inday_container">
          <div className="tit_cont">
            <p className="part_type ffsd6" ref={(el) => (elementsRef.current[8] = el)}>PART. 04</p>
            <p className="part_tit ffsd6" ref={(el) => (elementsRef.current[9] = el)}><span className="mark_bg">프사기, 키사기<br/>방지 시스템</span></p>
          </div>
          <div className="desc_cont">
            <div className="comp_box">
              <div className="line">
                <div className="box" ref={(el) => (elementsRef.current[10] = el)}>
                  <figure className="img"><img src={whyPart4img1} alt="" /></figure>
                  <p className="type ffsd6">기존결정사</p>
                  <div className="txt">
                    <p className="t1 ffsd6">실물과는 다른 그대</p>
                    <p className="t2 ffsd6">실물과는 다른 사진으로 가능한 결정사 프로필</p>
                    <p className="t3">"프사기"를 방조하는 결정사, 각종 보정이 난무하는 스튜디오 사진, 심지어 결정사가 동의 없이 보정까지 한다고?</p>
                  </div>
                </div>
                <div className="box blue_type" ref={(el) => (elementsRef.current[11] = el)}>
                  <figure className="img"><img src={whyPart4img2} alt="" /></figure>
                  <p className="type ffsd6">우연시스템</p>
                  <div className="txt">
                    <p className="t1 ffsd6">철저한 프로필 검증</p>
                    <p className="t2 ffsd6 c1">프사기, 키사기로 인한 시간 낭비와 감정소모가 없습니다.</p>
                    <p className="t3">대표와 매니저가 프로필 등록 사진을 상담 시 확보한 실물 사진과 직접 대조하여 승인, 관리하고 있습니다. 프사기, 키사기 문제 방조 시 매니저님들은 징계를 받습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[12] = el)}>
            <span>나와 맞지 않는 사람만 소개해주셔서</span>
            <span className="point">환불 신청을 했더니 환불 금액은 고작?</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[13] = el)}>수천만원을 들여 가입한 노블사, 수백만원을 들여 가입한 일반사 모두 만족할 수 없어서 환불 요청을 했더니 약정 횟수, 과도한 서비스 이용 부금 등 <span className="pc_br"></span>너무 불합리한 환불 시스템이 있다는 걸 알았습니다.<br/><span className="c1 ffsbb">"환불을 염두에 두고 운영하는건가"</span> 하는 생각까지 들 정도였습니다.<br/>기간제 약정 횟수를 모두 없애고 진실되게 서비스하고 공정하게 환불하자고 다짐 했습니다.</p>
        </section>
      </div>
      <Part4 main={false}/>
      
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[14] = el)}>
            <span>한 두시간 커피 먹고 대화하는데</span>
            <span className="point">100~300만원은 과하지 않나요?</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[15] = el)}>누구보다 정직하게, 가격 거품을 빼고 합리적으로 더 다양하고 많은 분들을 모셔 좋은 인연을 만들고자 했습니다.</p>
        </section>
      </div>
      <Part5 main={false}/>
      
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[16] = el)}>
            <span>고급 와인바에서 프라이빗 하게 즐기는 우연 파티</span>
            <span className="point">우연 오프라인 파티</span>
          </h3>
        </section>
      </div>
      <section className="part_wrap part_party">
        <div className="it_inner">
          <div className="img_cont">
            <figure className="img" ref={(el) => (elementsRef.current[17] = el)}><img src={partyImg} alt="" /></figure>
          </div>
          <div className="txt_cont">
            <p className="part_tit ffsd6" ref={(el) => (elementsRef.current[18] = el)}><span className="mark_bg">만족도 최상,<br/>우연 오프라인 와인 파티</span></p>
            <p className="mt40 fz18 c3" ref={(el) => (elementsRef.current[19] = el)}>“정말 멋지고 예쁘고, 매너 좋은 분들이 너무 많으셨어요.<br/>역시 직접 만나서 이야기 해보니까 <span className="pc_br"></span>저에 대해 많이 돌아볼 수 있었고, 좋은 인연을 만나서 너무 좋았습니다“</p>
            <p className="mt20 fz18 c3" ref={(el) => (elementsRef.current[20] = el)}>우연의 오프라인 파티는 "진솔한 대화"에 중점을 두고 기획하고 있습니다.</p>
            <p className="mt20 fz18 c3" ref={(el) => (elementsRef.current[21] = el)}>매칭 소개로만 회원님들을 어필하기 아쉬워서 <span className="pc_br"></span>직접 여러 회원분들이 서로 만나 인연을 찾는 자리를 <span className="pc_br"></span>적극적으로 만들어가고 있습니다.</p>
            <a href="/partyReview" className="part_more" ref={(el) => (elementsRef.current[22] = el)}>파티 후기 보러가기</a>
          </div>
        </div>
      </section>
      <div className="inday_container">
        <section className="center_txt_cont">
          <h3 className="fz50 ffsbb" ref={(el) => (elementsRef.current[23] = el)}>
            <span>회원의 매력을</span>
            <span className="point">100% 뽑아드립니다.</span>
          </h3>
          <p className="ffsb fz22 ffsbr" ref={(el) => (elementsRef.current[24] = el)}><span className="c1 ffsbb">매력을 살려주는 전문 작가의 자연스러운 야외 촬영 사진 매력적인 프로필 사진은 아주 중요합니다.</span><br/>혹시 본인의 매력을 어필할 수 있는 사진이 부족하다면 우연의 스냅사진 서비스를 이용해 보시는 건 어떠신가요?<br/>우연의 전속 계약 작가님이 과한 보정 없이, 자연스러운 회원님만의 매력이 담긴 사진을 제공해 드립니다.</p>
        </section>
      </div>
      <section className="part_wrap part_photo">
        <div className="inday_container">
          <div className="photo_inner">
            <div className="img_cont">
              <figure className="img" ref={(el) => (elementsRef.current[25] = el)}><img src={photoImg1} alt="" /></figure>
              <figure className="img" ref={(el) => (elementsRef.current[26] = el)}><img src={photoImg2} alt="" /></figure>
            </div>
            <div className="txt_cont">
              <div className="ico_txt_lst">
                <ul>
                  <li>
                    <i className="ico ico1_1"></i>
                    <div className="txt">
                      <p className="fz24 fwb c0 ffsd6" ref={(el) => (elementsRef.current[27] = el)}>전문 사진 작가가 찍어주는<br/> 자연스러운 야외 촬영 사진</p>
                      <p className="mt20 fz18 c3" ref={(el) => (elementsRef.current[28] = el)}>본인의 장점과 매력을 극대화할 수 있는<br/> 최고의 사진을 제공해드리겠습니다.</p>
                    </div>
                  </li>
                  <li>
                    <i className="ico ico1_2"></i>
                    <div className="txt">
                      <p className="fz24 fwb c0 ffsd6" ref={(el) => (elementsRef.current[29] = el)}>전문가가 선정하는 매력적인<br/> 사진과 자기소개 작성</p>
                      <p className="mt20 fz18 c3" ref={(el) => (elementsRef.current[30] = el)}>이성이 좋아하는 사진 선정 & 자기소개 작성<br/> 컨설팅 서비스</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="price_box" ref={(el) => (elementsRef.current[31] = el)}>
            <div className="box box_l">
              <dl>
                <dt className="fz24 fwb c0 ffsd6">야외 촬영</dt>
                <dd className="fz18">
                  <p className="p_line">
                    <del className="c3">15만원</del>
                    <b className="price fz24 ffsd6">12만원</b>
                  </p>
                  <span className="percent"><em className="fz24 ffsd6">20</em>%</span>
                </dd>
              </dl>
            </div>
            <div className="box box_r">
              <dl>
                <dt className="fz24 fwb c0 ffsd6">보정본 3장</dt>
                <dd className="fz18">5장 제공 + 원본 사진 모두 제공</dd>
              </dl>
            </div>
            <div className="box box_b">
              <p className="fz18 fwb cf tac ffsd6">* 본 서비스는 우연 고객 한정 특별 할인된 가격으로 우연은 수수료를 일체 받지 않습니다. *</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
