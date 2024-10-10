import { useEffect, useState } from 'react';


const Nav = function(type){
  const [sOpen1, setSopen1] = useState(false);
  const [sOpen2, setSopen2] = useState(false);


  function typeCheck(e,type, i){
    if(type.type === 'mobile'){
      e.preventDefault();
      if(i === 1){
        setSopen1(!sOpen1);
        setSopen2(false);
      }else{
        setSopen1(false);
        setSopen2(!sOpen2);
      }
    }
  }

  return(
    <nav>
      <ul>
        <li className="fz18 ffsb"><a href="/introduce">우연은?</a></li>
        <li className="fz18 ffsb"><a href="/whypage" onClick={e =>typeCheck(e, type, 1)}>서비스 소개</a>
          <ul className={sOpen1 === true ? 'db' : ''}>
            <li className="fz16"><a href="/whypage">왜 우연인가?</a></li>
            <li className="fz16"><a href="/process">우연 프로세스</a></li>
            <li className="fz16"><a href="/products/list">가입 안내</a></li>
          </ul>
        </li>
        <li className="fz18 ffsb"><a href="/coupleReview" onClick={e =>typeCheck(e, type, 2)}>회원 리뷰</a>
          <ul className={sOpen2 ? 'db' : ''}>
            <li className="fz16"><a href="/coupleReview">우연 커플 후기</a></li>
            <li className="fz16"><a href="/partyReview">우연 파티 후기</a></li>
          </ul>
        </li>
        <li className="fz18 ffsb"><a href="/contact">문의 정보</a></li>
        <li className="fz18 ffsb"><a href="/consult/request">상담신청</a></li>
      </ul>
    </nav>
  )
}


export default function Header({blue_logo}){
  const [mobileMenuView, setMobileMenuView] = useState(false);

  useEffect(() =>{
    if (mobileMenuView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },[mobileMenuView])
  return(
    <>
      <header id="header" className={`header ${blue_logo ? 'blue_logo' : 'white_logo'} ${mobileMenuView === true ? 'm_open' : ''} tn`}>
        <div className="header_container">
          <h1><a href="/dashboard" className="header_logo tn">우연 우리의인연</a></h1>
          <Nav/>
          <div className="hd_contact">
            <a href="tel:02-2138-0638">
              <span className="fz16">상담문의</span>
              <span className="fz18 ffsd6">02-2138-0638</span>
            </a>
          </div>
          <button type="button" className={`menu_btn ${mobileMenuView === true ? 'view' : ''}`} onClick={() => setMobileMenuView(prev => !prev)}>
            <span className="tn"></span>
            <span className="tn"></span>
            <span className="tn"></span>
          </button>
        </div>
        <div className={`mobile_menu ${mobileMenuView === true ? 'view' : ''}`}>
          <Nav type={'mobile'}/>
        </div>
      </header>
    </>
  )
}