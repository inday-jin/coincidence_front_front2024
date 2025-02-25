import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getData, postData } from "../script/api";
import AgreePrivacy from '../AgreePrivacy';
import AgreeMarketing from '../AgreeMarketing';
import Alert from '../Alert';


import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Popup3 from '../Popup3';

gsap.registerPlugin(ScrollTrigger);


export default function ConsultRequest(){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    location: '',
    conGender: '',
    firstDate: '',
    firstDateTime: '',
    secondDate: '',
    secondDateTime: '',
    name: '',
    phone: '',
    phone1: '',
    phone2: '',
    phone3: '',
    kakaoTalkId: '',
    birth_year: '',
    gender: '',
    recommender: '',
    education: '',
    educationKor: '',
    region: '',
    agreePrivacy: '',
    agreeMarketing: '',
    subPath: '',
    subPathInp: '',
  });

  const genderLst = ["남자", "여자", "무관"];
  const reqTimeLst = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const regionLst = ["서울특별시", "인천/경기", "대구/경북", "부산/울산/경남", "대전/세종/충청", "광주/전라", "강원/제주"];
  const subPathLst = ["인스타그램", "인터넷 배너광고", "김달", "블라인드", "네이버 카페", "네이버 검색", "지인", "기타"];
  const reqKorMsg = [
    {name: 'location', txt: '지사'},
    {name: 'conGender', txt: '희망상담사 성별'},
    {name: 'firstDate', txt: '1순위 상담 일정'},
    {name: 'firstDateTime', txt: '1순위 상담 시간'},
    {name: 'secondDate', txt: '2순위 상담 일정'},
    {name: 'secondDateTime', txt: '2순위 상담 시간'},
    {name: 'name', txt: '성함'},
    {name: 'phone1', txt: '연락처'},
    {name: 'phone2', txt: '연락처'},
    {name: 'phone3', txt: '연락처'},
    {name: 'birth_year', txt: '출생년도'},
    {name: 'gender', txt: '성별'},
    {name: 'region', txt: '거주 지역'},
    {name: 'education', txt: '최종학력'},
    {name: 'subPath', txt: '가입 경로'},
    {name: 'subPathInp', txt: '가입 경로'},
    {name: 'agreePrivacy', txt: '개인정보 수집 및 이용 동의'},
  ];

  // 지사
  const [locationList, setLocationList] = useState([]);

  // 알림 메세지
  const [alertMsg, setAlertMsg] = useState('');
  
  // 출생년도
  const [birthYyLst, setBirthYyLst] = useState([]);

  // 신청 불가 날짜 리스트
  const [noSelDate, setNoSelDate] = useState([]);

  // 1순위 신청 불가 시간 리스트
  const [noSelDateTime1, setNoSelDateTime1] = useState([]);

  // 2순위 신청 불가 시간 리스트
  const [noSelDateTime2, setNoSelDateTime2] = useState([]);

  const [educationData, setEducationData] = useState([])

  // 오늘 날짜
  const nowDate = new Date();

  const nowYY = nowDate.getFullYear();
  const nowMM = nowDate.getMonth()+1;
  const nowDD = nowDate.getDate();

  const [today, setToday] = useState(`${nowYY}-${nowMM}-${nowDD}`);

  const [subPathInpView, setSubPathInpView] = useState(false);


  const [reqCheckMsg, setReqCheckMsg] = useState('');

  // 개인정보처리방침, 마케팅 활용 열기 닫기
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openMarketing, setOpenMarketing] = useState(false);

  // submit 버튼 상태
  const [sbmBtnDisabled, setSbmBtnDisabled] = useState(true);
  

  const getOptData = useCallback(async () => {
    // 초기화 데이터(지사, 출생년도, 신청불가일정)

    // 지사 데이터
    const locationResponse = await getData(`/api/location/list`);
    setLocationList(locationResponse.data);

    // 출생년도 데이터
    const yearResponse = await getData(`/api/list/year`);
    setBirthYyLst(yearResponse);

    // 신청 불가 일정 데이터
    const dateResponse = await getData(`/api/counseling/date/busy`);
    setNoSelDate(dateResponse.data.dates);

    // 최종학력
    const educationLst = await getData(`/api/education/list`);
    setEducationData(educationLst.data);


    if(window.kakaoPixel){
      await window.kakaoPixel('2665275622713308583').pageView();
    }

  },[])


  function alertClose(){
    // 알림 메세지 닫기
    setAlertMsg('');
  }


  async function changeValue(e){
    const { name, value, checked } = e.target;


    if(name === 'location'){
      // 지사
      const selLocationData = locationList.filter(data => data.id === Number(value));
      console.log(locationList, selLocationData[0], value);
      setFormData({
        ...formData,
        location: selLocationData[0].id,
      });
      console.log(formData)

    }else if(name === 'conGender'){
      // 희망상담사 성별시 1,2차 선택 날짜, 시간 초기화
      setFormData(prevFormData => ({
        ...prevFormData,
        firstDate: '',
        firstDateTime: '',
        secondDate: '',
        secondDateTime: '',
        [name]: value,
      }));
      setNoSelDateTime1([]);
      setNoSelDateTime2([]);
    }else if(name === 'firstDate' || name === 'secondDate'){
      setAlertMsg('');

      // 1,2 순위 상담 일정 날짜 선택
      const selDateCheck = noSelDate.filter(date => date === value);
      if(selDateCheck.length > 0){

        // alert 메세지 생성 및 출력
        const groupedDates = noSelDate.reduce((acc, date) => {
          const [year, month, day] = date.split('-');
          const yearMonth = `${year}-${month}`;
          if (!acc[yearMonth]) {
            acc[yearMonth] = [];
          }
          acc[yearMonth].push(day);
          return acc;
        }, {});
      
        let resultMsg = '';

        Object.keys(groupedDates)
        .sort()
        .forEach((yearMonth, index, array) => {
          const [, month] = yearMonth.split('-');
          const formattedDays = groupedDates[yearMonth].map(day => parseInt(day, 10)).join('일, ');
          const formattedMonth = `${formattedDays}일`;
          resultMsg += `${parseInt(month, 10)}월-` + formattedMonth;
          if (index !== array.length - 1) {
            resultMsg += '\n';
          }
        });
        resultMsg += '\n\n위 일정들은 신청 마감되었습니다.\n다른 날짜를 선택해주세요.';
        setAlertMsg(resultMsg);
        setFormData({
          ...formData,
          [name]: '',
        });
        return false;
      }else{
        setAlertMsg('');
        // 선택 가능한 시간대 확인
        const params = new URLSearchParams();
        params.append("date", value);
        
        if(formData.conGender === "남자"){
          params.append("gender", "남성");
        }else if(formData.conGender === "여자"){
          params.append("gender", "여성");
        }
        const getTime = await getData(`/api/counseling/date/info/bygender?${params}`);
        if(name === 'firstDate'){
          setNoSelDateTime1(getTime.data.times);
        }else{
          setNoSelDateTime2(getTime.data.times);
        }
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }else if(name.indexOf('phone') !== -1){
      // 연락처 입력
      const phoneN = Number(name.charAt(name.length - 1));
      setFormData({
        ...formData,
        phone: `${phoneN === 1 ? value : formData.phone1}-${phoneN === 2 ? value : formData.phone2}-${phoneN === 3 ? value : formData.phone3}`,
        [name]: value,
      });
    }else if(name === 'education'){
      setFormData({
        ...formData,
        educationKor: educationData[Number(value)-1].name,
        [name]: value,
      });
    }else if(name === 'agreePrivacy' || name === 'agreeMarketing'){
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked ? 'true' : '',
      }));
    }else if(name === 'subPath'){
      // 가입경로 기타 선택할 경우 입력란 활성화
      setFormData({
        ...formData,
        [name]: value,
        subPathInp: '',
      });
      if(value === '기타'){
        setSubPathInpView(true);
      }else{
        setSubPathInpView(false);
      }
    }else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }
  
  async function reqCheck(){
    setAlertMsg(reqCheckMsg);
    //alert(reqCheckMsg)
  }

  const checkEmptyFields = useCallback(() => {
    // submit 버튼 활성화
    const findEmptyFields = (obj) => {
      return Object.entries(obj)
        .filter(([key, value]) => value === "" && key !== "kakaoTalkId" && key !== "agreeMarketing" && key !== "recommender")
        .map(([key]) => key);
    };
    const emptyFields = findEmptyFields(formData);
    
    const missingTexts = Array.from(new Set(
      emptyFields.map(field => {
        if (field === 'subPathInp' && formData.subPath !== '기타') {
          return null;
        }
        const match = reqKorMsg.find(item => item.name === field);
        return match ? match.txt : null;
      }).filter(txt => txt !== null)
    ));
    
    const uniqueTexts = missingTexts.filter((txt, index, self) =>
      !(['연락처', '가입 경로'].includes(txt) && self.indexOf(txt) !== index)
    );

    setReqCheckMsg(`${uniqueTexts.join(', ')}를 입력해주세요.`)


    if(emptyFields.length > 0){
      if(emptyFields.length === 1 && formData.subPath !== '기타'){
        setSbmBtnDisabled(false);  
      }else{
        setSbmBtnDisabled(true);
      }
    }else{
      setSbmBtnDisabled(false);
    }
  }, [formData]);

  async function sbm(e){
    // 등록
    e.preventDefault();

    const body = {
      location: Number(formData.location),
      counselingDates: [
        `${formData.firstDate} ${formData.firstDateTime}:00:00`,
        `${formData.secondDate} ${formData.secondDateTime}:00:00`,
      ],
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
      recommender: formData.recommender,
      education: Number(formData.education),
      ideal_appearance: 9,
      ideal_ability: 0,
      ideal_character: 1,
      counselor_gender: formData.conGender,
      birth_year: Number(formData.birth_year),
      marketing_agree: formData.agreeMarketing ? true : false,
      privacy_agree: formData.agreePrivacy ? true : false,
      region: formData.region,
      kakaoTalkId: formData.kakaoTalkId,
      subPath: formData.subPath !== '기타' ? formData.subPath : `${formData.subPath} ${formData.subPathInp}`,
    };
    const uploadData = await postData(`/api/counseling/request`, body);
    if(uploadData.data === 'success'){
      if (window.wcs) {
        var _conv = {};
        _conv.type = "lead";
        await window.wcs.trans(_conv);
        console.log("window.wcs called");
      } else {
        console.log("window.wcs none");
      }
      if(window.fbq){
        await window.fbq("track", "CompleteRegistration");
        console.log("window.fbq  called");
      } else {
        console.log("window.fbq none");
      }
      
      if(window.kakaoPixel){
        await window.kakaoPixel('2665275622713308583').participation('Consulting');
        console.log("window.kakaoPixel called");
      } else {
        console.log("window.kakaoPixel none");
      }

      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'consultation',
          event_label: 'consultation_request'
        });
      }
	if(window._tfa){
        window._tfa.push({notify: 'event', name: 'lead', id: 1771700});
      }

      const locationKor = locationList.filter(item => item.id === formData.location);

      let ageRanges = [
        { min: 18, max: 21, range: '18-21' },
        { min: 22, max: 24, range: '22-24' },
        { min: 25, max: 29, range: '25-29' },
        { min: 30, max: 34, range: '30-34' },
        { min: 35, max: 39, range: '35-39' },
        { min: 40, max: 44, range: '40-44' },
        { min: 45, max: 49, range: '45-49' },
        { min: 50, max: 54, range: '50-54' },
        { min: 55, max: 59, range: '55-59' },
        { min: 60, max: 64, range: '60-64' },
        { min: 65, max: 69, range: '65-69' },
        { min: 70, max: 74, range: '70-74' }
      ];
      const age = nowDate.getFullYear() - Number(formData.birth_year) +1;
      function getAgeRange(age) {
        const ageRange = ageRanges.find(range => age >= range.min && age <= range.max);
        return ageRange ? ageRange.range : 'Unknown range';
      }
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        ecommerce: {
        currency: 'KRW', // 통화 정보
        value: 500000, // 리드 가치
        },
        branch: locationKor[0].name,
        counselor_gender: formData.conGender,
        first_date: formData.firstDate,
        first_time: formData.firstDateTime,
        second_date: formData.secondDate,
        second_time: formData.secondDateTime,
        birth_year: formData.birth_year,
        age: getAgeRange(age),
        gender: formData.gender === '남자' ? 'Male' : 'Female',
        region: formData.region,
        education: formData.educationKor,
        recommender: formData.recommender !== '' ? 'Y' : 'N',
        subPath: formData.subPath !== '기타' ? formData.subPath : `${formData.subPath} ${formData.subPathInp}`,
      });
      //setIsPopUpVisible(true)


      window.location.href = '/result';
      //navigate('/result');
    }else{}
  }

  const elementsRef = useRef([]);

  const sbmElementRef = useRef(null);
  const [isSbmVisible, setIsSbmVisible] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sbmElementRef.current) {
        const elementTop = sbmElementRef.current.getBoundingClientRect().top + window.scrollY;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= elementTop) {
          setIsSbmVisible(true);
        } else {
          setIsSbmVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



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
    getOptData();
  }, [getOptData]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (클린업)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])


  useEffect(() => {
    checkEmptyFields();
  }, [checkEmptyFields]);
  
  return(
    <>
      {alertMsg !== '' ?
        <Alert alertMsg={alertMsg} alertClose={alertClose} /> 
        : <></>
      }
      {isPopUpVisible?<Popup3></Popup3>:<></>

      }
      <form onSubmit={sbm}>
        <div className="inday_container request_page pb120" ref={sbmElementRef}>
          <h3 className="fz40 ffsd6 tac pt120 pb50" ref={(el) => (elementsRef.current[0] = el)}>원하시는 일정에 맞춰 간편하게 상담 예약하세요.</h3>
          <p className="fz22 c3 tac pb80" ref={(el) => (elementsRef.current[1] = el)}>수도권 회원의 경우 전화 상담은 불가하고 방문 상담만 가능하며, 평일뿐만 아니라 주말, 공휴일도 상담 예약 가능합니다.<br/>한국 국적이 아니신 분들은 상담 및 가입이 불가하오니 양해 바랍니다.</p>
          <div className="request_inp_box">
            <div className="inp_line pb40">
              <div className="inp_item" ref={(el) => (elementsRef.current[2] = el)}>
                <p className="t fz18 ffsd6 pb25">지사 <span className="star fz14 c1">*</span></p>
                {windowWidth > 767 ?
                  <>
                    {locationList.map((item, i) => {
                      return(
                      <label htmlFor={`location${i}`} className="check_label fz16" key={i}>
                        <input type="radio" id={`location${i}`} checked={formData.location === item.id} value={item.id} name="location" onChange={changeValue} />
                        <div className="c">{item.name}</div>
                      </label>
                      )
                    })}
                  </>
                  :
                  <>
                    <select className="inp" name="location" value={formData.location} onChange={changeValue}>
                      <option>지사를 선택해 주세요.</option>
                      {locationList.map((item, i) => {
                        return(
                        <option value={item.id} key={i}>{item.name}</option>
                        )
                      })}
                    </select>
                  </>
                }
              </div>
              <div className="inp_item" ref={(el) => (elementsRef.current[3] = el)}>
                <p className="t fz18 ffsd6 pb25">희망상담사 성별 <span className="star fz14 c1">*</span></p>
                {windowWidth > 767 ?
                  <>
                    {genderLst.map((item, i) => {
                      return(
                        <label htmlFor={`counselor_gender${i}`} className="check_label fz16" key={i}>
                          <input type="radio" id={`counselor_gender${i}`} checked={formData.conGender === item} value={item} name="conGender" onChange={changeValue} />
                          <div className="c">{item}</div>
                        </label>
                      )
                    })}
                  </>
                  :
                  <>
                    <select className="inp" name="conGender" value={formData.conGender} onChange={changeValue}>
                      <option>희망상담사 성별을 선택해 주세요.</option>
                      {genderLst.map((item, i) => {
                        return(
                        <option value={item} key={i}>{item}</option>
                        )
                      })}
                    </select>
                  </>
                }
              </div>
            </div>
            <div className="inp_line pb40">
              <div className="inp_item" ref={(el) => (elementsRef.current[4] = el)}>
                <p className="t fz18 ffsd6 pb25">1순위 상담 일정 <span className="star fz14 c1">*</span></p>
                <div className="date_inp_w">
                  <input type="date" id="date1" min={today} name="firstDate" className="inp inp_date" value={formData.firstDate} onChange={changeValue} />
                  <select name="firstDateTime" className="inp_time" onChange={changeValue}>
                    <option>시간</option>
                    {reqTimeLst.map((time, i) =>{
                      return(
                        <option value={time} key={i} disabled={noSelDateTime1.some(dataTime => time === dataTime)}>{time+':00'}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="inp_item" ref={(el) => (elementsRef.current[5] = el)}>
                <p className="t fz18 ffsd6 pb25">2순위 상담 일정 <span className="star fz14 c1">*</span></p>
                <div className="date_inp_w">
                  <input type="date" id="date1" min={today} name="secondDate" className="inp inp_date" value={formData.secondDate} onChange={changeValue} />
                  <select name="secondDateTime" className="inp_time" onChange={changeValue}>
                    <option>시간</option>
                    {reqTimeLst.map((time, i) =>{
                      return(
                        <option value={time} key={i} disabled={noSelDateTime2.some(dataTime => time === dataTime)}>{time+':00'}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="inp_line pb40">
              <div className="inp_item" ref={(el) => (elementsRef.current[6] = el)}>
                <p className="t fz18 ffsd6 pb25">성함 <span className="star fz14 c1">*</span></p>
                  <input type="text" className="inp"name="name" value={formData.name} onChange={changeValue} />
              </div>
              <div className="inp_item" ref={(el) => (elementsRef.current[7] = el)}>
                <p className="t fz18 ffsd6 pb25">연락처 <span className="star fz14 c1">*</span></p>
                <div className="tel_inp_w">
                  <input type="text" className="inp" name="phone1" onChange={changeValue} maxLength="3" />
                  <input type="text" className="inp" name="phone2" onChange={changeValue} maxLength="4" />
                  <input type="text" className="inp" name="phone3" onChange={changeValue} maxLength="4" />
                </div>
              </div>
            </div>
            <div className="inp_line pb40">
              <div className="inp_item" ref={(el) => (elementsRef.current[8] = el)}>
                <p className="t fz18 ffsd6 pb25">출생년도 <span className="star fz14 c1">*</span></p>
                  <select className="inp" name="birth_year" onChange={changeValue}>
                    <option>출생년도를 선택해 주세요.</option>
                    {birthYyLst.map((item,i) =>{
                      return(
                        <option value={item} key={i}>{item}</option>
                      )
                    })}
                  </select>
              </div>
              <div className="inp_item" ref={(el) => (elementsRef.current[9] = el)}>
                <p className="t fz18 ffsd6 pb25">성별 <span className="star fz14 c1">*</span></p>
                {windowWidth > 767 ?
                  <>
                    {genderLst.map((item, i) => {
                      if(item !== '무관'){
                        return(
                          <label htmlFor={`gender${i}`} className="check_label fz16" key={i}>
                            <input type="radio" id={`gender${i}`} name="gender" checked={formData.gender === item} value={item} onChange={changeValue} />
                            <div className="c">{item}</div>
                          </label>
                        )
                      }
                      return null;
                    })}
                  </>
                :
                  <>
                    <select className="inp" name="gender" value={formData.gender} onChange={changeValue}>
                      <option>성별을 선택해 주세요.</option>
                      {genderLst.map((item, i) => {
                        if(item !== '무관'){
                          return(
                          <option value={item} key={i}>{item}</option>
                          )
                        }
                        return null;
                      })}
                    </select>
                  </>
                }
              </div>
            </div>
            <div className="inp_line_block pb40" ref={(el) => (elementsRef.current[10] = el)}>
              <p className="t fz18 ffsd6 pb25">거주 지역 <span className="star fz14 c1">*</span></p>
              <div className="region_area">
                {windowWidth > 767 ?
                  <>
                    {regionLst.map((item, i) => {
                      return(
                        <label htmlFor={`region${i}`} className="check_label fz16" key={i}>
                          <input type="radio" id={`region${i}`} name="region" checked={formData.region === item} value={item} onChange={changeValue} />
                          <div className="c">{item}</div>
                        </label>
                      )
                    })}
                  </>
                :
                  <>
                    <select className="inp" name="region" value={formData.region} onChange={changeValue}>
                      <option>거주 지역을 선택해 주세요.</option>
                      {regionLst.map((item, i) => {
                        return(
                          <option value={item} key={i}>{item}</option>
                        )
                      })}
                    </select>
                  </>
                }
              </div>
            </div>
            <div className="inp_line_block pb40" ref={(el) => (elementsRef.current[11] = el)}>
              <p className="t fz18 ffsd6 pb25">최종학력 <span className="star fz14 c1">*</span></p>
              <div className="region_area">
                {windowWidth > 767 ?
                  <>
                    {educationData.map((item, i) => {
                      return(
                        <label htmlFor={`education${i}`} className="check_label fz16" key={i}>
                          <input type="radio" id={`education${i}`} name="education" checked={Number(formData.education) === Number(item.id)} value={item.id} onChange={changeValue} />
                          <div className="c">{item.name}</div>
                        </label>
                      )
                    })}
                  </>
                :
                  <>
                    <select className="inp" name="education" value={formData.education} onChange={changeValue}>
                      <option>최종학력을 선택해 주세요.</option>
                      {educationData.map((item, i) => {
                        return(
                          <option value={item.id} key={i}>{item.name}</option>
                        )
                      })}
                    </select>
                  </>
                }
              </div>
            </div>
            <div className="inp_line_block pb40" ref={(el) => (elementsRef.current[17] = el)}>
              <p className="t fz18 ffsd6 pb25">가입 경로 <span className="star fz14 c1">*</span></p>
              <div className="region_area">
                {windowWidth > 767 ?
                  <>
                    {subPathLst.map((item, i) => {
                      return(
                        <label htmlFor={`subPath${i}`} className="check_label fz16" key={i}>
                          <input type="radio" id={`subPath${i}`} name="subPath" checked={formData.subPath === item} value={item} onChange={changeValue} />
                          <div className="c">{item}</div>
                        </label>
                      )
                    })}
                  </>
                :
                  <>
                    <select className="inp" name="subPath" value={formData.subPath} onChange={changeValue}>
                      <option>가입 경로를 선택해 주세요.</option>
                      {subPathLst.map((item, i) => {
                        return(
                          <option value={item.id} key={i}>{item}</option>
                        )
                      })}
                    </select>
                  </>
                }
                {subPathInpView === true ?
                  <><input type="text" className="inp" name="subPathInp" value={formData.subPathInp} onChange={changeValue} placeholder="가입 경로를 입력해 주세요." /></>
                  :
                  <></>
                }
              </div>
            </div>
            
            <div className="inp_line pb40">
              <div className="inp_item" ref={(el) => (elementsRef.current[13] = el)}>
                <p className="t fz18 ffsd6 pb25">카카오톡 ID</p>
                <input type="text" className="inp" name="kakaoTalkId" value={formData.kakaoTalkId} onChange={changeValue} />
                <p className="pt10 c6">*전화번호로 친구 추가 허용을 막아놓은 분들이 많아 업무상 연락이 힘들어 카톡 아이디도 함께 작성 부탁드립니다</p>
              </div>
              <div className="inp_item" ref={(el) => (elementsRef.current[12] = el)}>
                <p className="t fz18 ffsd6 pb25">추천인</p>
                <input type="text" className="inp" name="recommender" value={formData.recommender} onChange={changeValue} />
              </div>
            </div>
            <div className="inp_line_block pb40" ref={(el) => (elementsRef.current[14] = el)}>
              <p className="t fz18 ffsd6 pb25"><span className="ffsd4 c1">(필수)</span> 개인정보 수집 및 이용<button type="button" className="agree_open_btn" onClick={e => setOpenPrivacy(!openPrivacy)}></button></p>
              {openPrivacy ?
                <div className="agree_txt">
                  <AgreePrivacy/>
                </div>
              :
                <></>
              }
              <div className="agree_check">
                <label htmlFor="agree1" className="fz16 c3">
                  <input type="checkbox" id="agree1" name="agreePrivacy" value={formData.agreePrivacy} checked={formData.agreePrivacy === 'true'} onChange={changeValue} />
                  <i></i>개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
            </div>
            <div className="inp_line_block pb40" ref={(el) => (elementsRef.current[15] = el)}>
              <p className="t fz18 ffsd6 pb25"><span className="ffsd4 c9">(선택)</span> 마케팅 활용<button type="button" className="agree_open_btn" onClick={e => setOpenMarketing(!openMarketing)}></button></p>
              {openMarketing ?
                <div className="agree_txt">
                  <AgreeMarketing/>
                </div>
                : 
                <></>
              }
              <div className="agree_check">
                <label htmlFor="agree2" className="fz16 c3">
                  <input type="checkbox" id="agree2" name="agreeMarketing" value={formData.agreeMarketing} checked={formData.agreeMarketing === 'true'} onChange={changeValue} />
                  <i></i>마케팅 활용에 동의합니다.
                </label>
              </div>
            </div>
            {isSbmVisible ? 
              <div className="btn_pos">
                <div className="sbm_btn">
                  {sbmBtnDisabled === true ?
                    <>
                      <span className="req_msg"></span>
                      <span className="sbm fz18 ffsd6" onClick={reqCheck}></span>
                    </>
                    
                    :
                    <button type="submit" className="fz18 ffsd6" disabled={sbmBtnDisabled}>신청하기 {isSbmVisible}</button>
                  }
                </div>
              </div>
              :
              <></>
            }
          </div>
        </div>
      </form>
    </>
  )
}
