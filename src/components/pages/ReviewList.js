import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getData } from "../script/api";

import pagerFirst from "../../assets/img/pager_ico_first.svg";
import pagerPrev from "../../assets/img/pager_ico_prev.svg";
import pagerNext from "../../assets/img/pager_ico_next.svg";
import pagerLast from "../../assets/img/pager_ico_last.svg";


gsap.registerPlugin(ScrollTrigger);

export default function ReviewList({ pathname }) {
  let { id } = useParams();
  
  const [pageNo, setPageNo] = useState(id === undefined ? 1 : id);
  const [totalPage, setTotalPage] = useState(0);
  const [list, setList] = useState([]);

  const reviewType = pathname.indexOf("coupleReview") !== -1 ? 1 : 2;
  const elementsRef = useRef([]);


  const pageSize = 5;
  const startPage = Math.floor((pageNo - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPage);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);


  const CoupleTitle = () => (
    <h2 className="fz40 ffsd6 tac pt120 pb110" ref={(el) => (elementsRef.current[0] = el)}>
      우연에서 만나 소중한 사랑을 키워가는 <span className="pc_br"></span>
      <span className="cp1">커플의 생생 후기</span>를 만나보세요.
    </h2>
  );

  const PartyTitle = () => (
    <h2 className="fz40 ffsd6 tac pt120 pb110" ref={(el) => (elementsRef.current[0] = el)}>
      우연의 파티 키워드는 <span className="cp1">"프라이빗"</span>과 <span className="cp1">"진솔한 대화"</span>에요.
      <br />
      파티에 참가하신 회원분들의 후기를 소개합니다.
    </h2>
  );

  const getList = useCallback(async () => {
    const response = await getData(`/api/review/clientlist?reviewType=${reviewType}&pageIdx=${pageNo}`);
    setList(response.data.data);
    setPageNo(response.data.pageIdx);
    setTotalPage(response.data.totalPage);
  }, [reviewType, pageNo]);

  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    if (list.length > 0) {
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
  }, [list]);

  return (
    <>
      <div className="inday_container pb120">
        {reviewType === 1 ? <CoupleTitle /> : <PartyTitle />}
        <div className="list_wrap pb100">
          {list.map((item, i) => (
            <div className="item" key={i} ref={(el) => (elementsRef.current[i + 1] = el)}>
              <a href={reviewType === 1 ? `/coupleReview/view/${item.no}` : `/partyReview/view/${item.no}`}>
                <div className="img">
                  <img src={`https://d3txsylzm2ga7z.cloudfront.net/${item.thumbnail}`} alt={item.title} />
                </div>
                <div className="txt">
                  <div className="point pb20">
                    {Array.from({ length: item.point }, (_, index) => (
                      <span key={index} className="star">★</span>
                    ))}
                  </div>
                  <p className="t1 fz20 ffsd6 tov2">{item.title}</p>
                  <p className="t2 fz16 c3 tov3">{item.listSummary}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="pagination fz16" ref={(el) => (elementsRef.current[list.length + 2] = el)}>
          {pageNo > 1 && (
            <a href={`/${pathname}/1`}><img src={pagerFirst} alt="" /></a>
          )}
          {startPage > 1 && (
            <a href={`/${pathname}/${startPage - 1}`}><img src={pagerPrev} alt="" /></a>
          )}
          {pageNumbers.map((page) => (
            <a key={page} href={`/${pathname}/${page}`} className={pageNo === page ? 'a' : ''}>{page}</a>
          ))}
          {endPage < totalPage && (
            <a href={`/${pathname}/${endPage + 1}`}><img src={pagerNext} alt="" /></a>
          )}
          {pageNo < totalPage && (
            <a href={`/${pathname}/${totalPage}`}><img src={pagerLast} alt="" /></a>
          )}
        </div>
      </div>
    </>
  );
}
