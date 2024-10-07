import { useEffect, useState, useRef } from "react";
import { getData } from "../script/api";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Products(){
  const [prodData, setProdData] = useState([[],[],[]]);

  const elementsRef = useRef([]);

  async function getDataList(){
    const response = await getData(`/api/product/list`);

    const responseObj = [[],[],[]];
    if (response?.data) {
      response.data.forEach((item) => {
        if (item.type === "subscribe") {
          responseObj[0].push(item);
        } else if (item.type === "joinFee") {
          if (! item.name.includes("얼리버드")) {
            responseObj[1].push(item);
          } else {
            responseObj[2].push(item);
          }
        }
      });
    }
    setProdData(responseObj);
  }

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    if (prodData.flat().length > 0) {
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
  }, [prodData]);
  return(
    <>
      <div className="inday_container pb120">
        <h2 className="main_tit fz50 ffsd6 pb40 pt120 tac" ref={(el) => (elementsRef.current[0] = el)}><span className="mark_bg">그들은 내 결혼에 관심이 없구나</span></h2>
        <p className="tac fz22 c3 pb80" ref={(el) => (elementsRef.current[1] = el)}>기간제 서비스는 <span className="c1 ffsd6">기간 내 횟수 제한 없이 만남이 가능</span>한 서비스 입니다.<br/>계약 기간 동안 매니저님과 원활히 소통하여 평생 인연 찾으시기 바랍니다.<br/>*우연은 공정거래위원회 국내결혼 표준 약관을 100% 준수합니다.</p>
        <div className="product_lst subscribe">
          {prodData[0].map((item, i) => {
            const match = item.desc.match(/\[(.*?)\]/);
            const bracketContent = match ? match[0].replace("[", "").replace("]", "") : "";
            const translationMap = {BASIC: "베이직", PREMIUM: "프리미엄", DIAMOND: "다이아몬드",};
            const translatedContent = translationMap[bracketContent] || bracketContent;

            let otherContent = item.desc
              .replace(bracketContent, "")
              .trim()
              .replace("<br>", "\n")
              .replace("[", "")
              .replace("]", "");
              if(otherContent === "-"){
                otherContent = "\n\n";
              }
            return(
              <div className="item" key={i} ref={(el) => (elementsRef.current[i + 2] = el)}>
                <p className="t1 fz30 ffsd6">{translatedContent}</p>
                <div className="bottom_cont">
                  <p className="t2 tac fz20 ffsd6 pb35">{item.name}</p>
                  <i></i>
                  {item.salePrice !== 0 ?
                    <div className="sale_price pb10">
                      <p className="price tac fz20 c9">{String(item.salePrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span className="fz20 ffsd4">원</span></p>
                      <span className="sale_percent fz24 ffsd6 cf">{otherContent}</span>
                    </div>
                  :
                    <></>
                  }
                  <p className="price tac fz30 ffsd6 pb10">{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span className="fz20 ffsd4">원</span></p>
                  <p className="vat tac fz16 c6 pb35">VAT 포함</p>
                  {/* <p className="desc tac c1 fz18">{otherContent}</p> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="membership_lst">
        <div className="inday_container">
          <h2 className="main_tit fz50 ffsd6 pb40 tac" ref={(el) => (elementsRef.current[10] = el)}><span className="mark_bg">우연 횟수제</span></h2>
          <p className="tac fz22 c3 pb80" ref={(el) => (elementsRef.current[11] = el)}>횟수제는 <span className="ffsd6 c1">1회 만남 시 1회권이 소모</span>되는 서비스 입니다.</p>
          <div className="product_lst joinFee">

          {prodData[1].map((item, i) => {
            const match = item.desc.match(/\[(.*?)\]/);
            const bracketContent = match ? match[0].replace("[", "").replace("]", "") : "";
            const translationMap = {BASIC: "베이직", PREMIUM: "프리미엄", DIAMOND: "다이아몬드",};
            const translatedContent = translationMap[bracketContent] || bracketContent;

            let otherContent = item.desc
              .replace(bracketContent, "")
              .trim()
              .replace("<br>", "\n")
              .replace("[", "")
              .replace("]", "");
              if(otherContent === "-"){
                otherContent = "\n\n";
              }
            return(
              <div className="item" key={i} ref={(el) => (elementsRef.current[i + 20] = el)}>
                <p className="t1 fz30 pb25 ffsd6">{translatedContent}</p>
                <div className="bottom_cont">
                  <p className="t2 tac fz20 pb35">{item.name}</p>
                  <i></i>
                  <p className="price tac fz30 ffsd6 pb10">{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span className="fz20 ffsd4">원</span></p>
                  <p className="vat tac fz16 c6 pb35">VAT 포함</p>
                  <p className="desc tac fz18 c3">{otherContent}</p>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </>
  )
}