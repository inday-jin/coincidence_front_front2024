import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import markerImg from '../../assets/img/map_marker.svg';

const {kakao} = window;

gsap.registerPlugin(ScrollTrigger);

export default function Contact(){
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


    const container = document.getElementById('map');
    let coords;
		const geocoder = new kakao.maps.services.Geocoder();
		geocoder.addressSearch('서울특별시 서초구 서초동 1330-3 엔데버빌딩 9층 2호', function(result, status) {
			 if (status === kakao.maps.services.Status.OK) {
				coords = new kakao.maps.LatLng(result[0].y, result[0].x);
			}
			const mapContainer = container,
				mapOption = {
					center: coords,
					level: 2
				};
			const map = new kakao.maps.Map(mapContainer, mapOption);
      
			const imageSrc = markerImg;
			const imageSize = new kakao.maps.Size(70, 80);

			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
			const markerPosition = coords;

			const marker = new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage
			});
			marker.setMap(map);
		});

  }, [])
  return(
    <>
      <div className="inday_container pb120">
        <h3 className="fz40 ffsd6 tac pt120 pb90" ref={(el) => (elementsRef.current[0] = el)}>우리의 인연 오시는 길을 안내해드립니다.</h3>
				<div className="map_wrap mb100" ref={(el) => (elementsRef.current[1] = el)}>
        	<div id="map" className="map"></div>
					<div className="addr_txt">
						<p className="fz20">
							<span className="ffsd6">주소</span>서울특별시 서초구 서초동 1330-3 엔데버빌딩 9층 2호
						</p>
						<p className="fz20">
							<span className="ffsd6">대중교통</span>지하철 강남역 2호선 5번출구
						</p>
					</div>
				</div>
				<div className="bottom_contact">
					<div className="item tel" ref={(el) => (elementsRef.current[2] = el)}>
						<i></i>
						<div className="txt">
							<p className="t1 fz30 ffsd6 pb25">전화문의</p>
							<p className="t2 fz18 pb25 c3">대표 번호 연락을 통해 가장 빠르게 문의를 남기세요.</p>
							<table>
								<tbody>
									<tr>
										<th className="fz18 ffsd6">TEL</th>
										<td className="fz18 c3">02-2138-0638</td>
									</tr>
									<tr>
										<th className="fz18 ffsd6">Office Hour</th>
										<td className="fz18 c3">10:00 ~ 18:00 (월-금)</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="item email" ref={(el) => (elementsRef.current[3] = el)}>
						<i></i>
						<div className="txt">
							<p className="t1 fz30 ffsd6 pb25">E-Mail 문의</p>
							<p className="t2 fz18 pb25 c3">상담, 광고, 제휴 등 문의 사항이 있으면 아래 메일로 문의주세요.</p>
							<table>
								<tbody>
									<tr>
										<th className="fz18 ffsd6" rowSpan={2}>E-mail</th>
										<td className="fz18 c3">help@woo-yeon.com</td>
									</tr>
									<tr>
									<td className="fz18 c3">mkt@woo-yeon.com</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
      </div>
    </>
  )
}