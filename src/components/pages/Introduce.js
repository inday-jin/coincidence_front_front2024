import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Popup from '../Popup';

import mainSlide1 from '../../assets/img/main_slide_pc1.png';
import mainSlide1m from '../../assets/img/main_slide_m1.png';
import mainSlide2 from '../../assets/img/main_slide_pc2.png';
import mainSlide2m from '../../assets/img/main_slide_m2.png';

import introImg from '../../assets/img/main_intro_img.png';

import Part1 from '../Part1';
import Part2 from '../Part2';
import Part3 from '../Part3';
import Part4 from '../Part4';
import Part5 from '../Part5';

import {getData} from '../script/api';

gsap.registerPlugin(ScrollTrigger);

export default function Main(){
  const elementsRef = useRef([]);
  const [reviewLst, setReviewLst] = useState([]);

  async function getReviewLst(){
    const list = await getData(`/api/review/clientmainlist`);
    setReviewLst(list.data.data);
  }
  useEffect(() =>{
    getReviewLst();
  },[]);
  useEffect(() => {
    if (reviewLst.length > 0) {
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
    }
  }, [reviewLst]);
  
  return(
    <>
      {/* <Popup/> */}
      <main className="main_wrap">
        <div className="main_slide">
          <section className="main_slide">
            <Swiper
              spaceBetween={0}
              effect="fade"
              slidesPerView={1}
              loop={1}
              autoplay={{ 
                delay: 5000,
                disableOnInteraction: false
              }}
              pagination={{
                clickable: true,
                el: '.main_pagi',
                renderBullet: (index, className) => {
                  return `<span class="${className} custom-bullet"><svg class="circle" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle class="circle_bg" cx="60" cy="60" r="50"></circle></svg></span>`;
                }
              }}
              modules={[EffectFade, Autoplay, Pagination]}
              onSlideChangeTransitionEnd={(e) => {
                let classTxt = document.getElementById('header').className;
                if(e.realIndex === 0){
                  document.getElementById('header').className = classTxt.replace('white_logo', 'blue_logo');
                }else{
                  document.getElementById('header').className = classTxt.replace('blue_logo', 'white_logo');
                }
              }}
            >
              <SwiperSlide>
                <picture className="bg">
                  <source srcSet={mainSlide1} media="(min-width: 767px)" />
                  <img src={mainSlide1m} alt="" />
                </picture>
              </SwiperSlide>
              <SwiperSlide>
                <picture className="bg">
                  <source srcSet={mainSlide2} media="(min-width: 767px)" />
                  <img src={mainSlide2m} alt="" />
                </picture>
              </SwiperSlide>
            </Swiper>
            <div className="main_pagi"></div>
          </section>
        </div>
        <section className="main_intro inday_container">
          <p className="main_type ffsd6" ref={(el) => (elementsRef.current[0] = el)}>"여러 결혼정보회사에 4,000만원을 쓰고 깨달았습니다."</p>
          <p className="main_tit ffsd6" ref={(el) => (elementsRef.current[1] = el)}><span className="mark_bg">그들은 내 결혼에 관심이 없구나</span></p>
          <div className="inner">
            <figure className="img" ref={(el) => (elementsRef.current[2] = el)}>
              <img src={introImg} alt="" />
              <figcaption>우리의 인연 대표<p className="name ffsd6">강바다</p></figcaption>
            </figure>
            <div className="txt">
              <p className="t1" ref={(el) => (elementsRef.current[3] = el)}>안녕하세요. 우연, 우리의 인연 강바다 대표입니다.<br/>여러 결정사에 고액의 비용을 쓰고나니 이들이 정말 내 결혼을 시켜줄 의지가 <span className="pc_br"></span>있는 것인지 나를 이용해서 매출 증대만 꾀하는 것인지 의문이 들었습니다.</p>
              <p className="t1 mt40" ref={(el) => (elementsRef.current[4] = el)}>그리고 다짐했습니다.<br/>"회원들의 성혼만을 목표로 하는 정직한 결혼 정보회사를 직접 만들자"<br/><span className="c1 ffsd6" ref={(el) => (elementsRef.current[5] = el)}>"불합리한 모든 것을 바꾸어 결정사의 새 기준을 세우는 그런 결정사를 만들자"</span><br/>지금도 가장 결정사 다운 결정사를 만들기 위해 노력하고 있습니다.</p>
              <figure className="vdo mt40" ref={(el) => (elementsRef.current[6] = el)}>
              <iframe src="https://player.vimeo.com/video/1014234794?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;title=0&amp;byline=0&amp;portrait=0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write"></iframe>
              </figure>
              <p className="t1 mt20" ref={(el) => (elementsRef.current[7] = el)}>여러분의 행복한 결혼 성사만을 바라기 위해 우연은 구독자 90만 명을 보유한 연애 분야 1위 유튜버 김달님께서 기획 및 개발에 함께 참여하였습니다.</p>
            </div>
          </div>
        </section>
        <Part1/>
        <Part2/>
        <Part3/>
        <Part4/>
        <Part5/>
        <section className="main_review">
          <div className="tit_cont">
            <p className="main_type ffsd6" ref={(el) => (elementsRef.current[8] = el)}>REVIEW</p>
            <p className="main_tit ffsd6" ref={(el) => (elementsRef.current[9] = el)}><span className="mark_bg">우연에서 만난<br/> 인연을 소개해요</span></p>
            <p className="main_desc" ref={(el) => (elementsRef.current[10] = el)}>우연에서 사랑을 만난 회원들의 리뷰를 만나보세요.</p>
            <a href="/coupleReview" className="main_more ffsd6" ref={(el) => (elementsRef.current[11] = el)}>회원 리뷰 확인 하기</a>
          </div>
          <div className="desc_cont" ref={(el) => (elementsRef.current[12] = el)}>
            <div className="main_review_slide">
              <Swiper
                spaceBetween={40}
                slidesPerView={2.5}
                loop={0}
                autoplay={{ 
                  delay: 5000,
                  disableOnInteraction: false
                }}

                pagination={{
                  clickable: true,
                  el: '.main_review_slide .slide_control .progress',
                  type: 'progressbar',
                }}

                navigation={{
                  nextEl: '.main_review_slide .slide_control .next',
                  prevEl: '.main_review_slide .slide_control .prev',
                }}

                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  621: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1441: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                  },
                }}
              >
                {reviewLst.map((item, i) => {
                  return(
                  <SwiperSlide key={i}>
                    <a href={(item.reviewType === 1 ? 'coupleReview' : 'partyReview') +'/view/'+ item.no}>
                      <figure className="img"><img src={'https://d3txsylzm2ga7z.cloudfront.net/'+item.thumbnail} alt="" /></figure>
                      <div className="txt">
                        <div className="point">
                          {Array.from({ length: item.point }, (_, index) => (
                            <span key={index} className="star">★</span>
                          ))}
                        </div>
                        <p className="t1 tov2 ffsd6">{item.title}</p>
                        <p className="t2 tov3">{item.listSummary}</p>
                      </div>
                    </a>
                  </SwiperSlide>
                  )
                })}
                <div className="slide_control">
                    <div className="arrow_btns">
                      <button type="button" className="btn prev"></button>
                      <button type="button" className="btn next"></button>
                    </div>
                    <div className="progress"></div>
                  </div>
              </Swiper>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}