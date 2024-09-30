import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getData } from "../script/api";

gsap.registerPlugin(ScrollTrigger);

export default function ReviewView({ pathname }) {
  let { id } = useParams();

  const [viewData, setViewData] = useState(null);

  const reviewType = pathname.indexOf("coupleReview") !== -1 ? 1 : 2;
  const elementsRef = useRef([]);

  const pageNo = id === undefined ? 1 : id;

  const getList = useCallback(async () => {
    const response = await getData(`/api/review/clientview?reviewType=${reviewType}&no=${pageNo}`);
    setViewData(response.data.data);
  }, [reviewType, pageNo]);

  useEffect(() => {
    getList();
  }, [getList]);

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
  }, [viewData]);

  return (
    <>
      <div className="inday_container pb120">
        {viewData ? (
          <>
            <div className="view_top tac">
              <p className="point pb20" ref={(el) => (elementsRef.current[0] = el)}>
                {Array.from({ length: viewData.current.point }, (_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </p>
              <h2 className="fz40 ffsd6 pb170" ref={(el) => (elementsRef.current[1] = el)}>{viewData.current.title}</h2>
            </div>
            <div className="view_cont"  ref={(el) => (elementsRef.current[2] = el)}
              dangerouslySetInnerHTML={{ __html: viewData.current.content }}
            />
            <div className="view_list_btn fz18 ffsd6" ref={(el) => (elementsRef.current[3] = el)}>
              <a href={'/'+pathname}>목록</a>
            </div>
            <div className="view_nav" ref={(el) => (elementsRef.current[4] = el)}>
              <table>
                <tbody>
                    {viewData.previous && (
                    <tr>
                      <th className="fz18 ffsd6">이전글</th>
                      <td className="fz18 c3"><a href={viewData.previous.no}>{viewData.previous.title}</a></td>
                    </tr>
                  )}
                  {viewData.next && (
                    <tr>
                      <th className="fz18 ffsd6">다음글</th>
                      <td className="fz18 c3"><a href={viewData.next.no}>{viewData.next.title}</a></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
