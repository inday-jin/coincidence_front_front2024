import footerLogo from "../assets/img/footer_logo.svg";

export default function Footer({topPath}){
  console.log('topPath', topPath.pathname)
  return(
    <footer className="footer">
      <div className="inday_container">
        <div className="f_logo"><img src={footerLogo} alt="" /></div>
        <div className="f_nav pb50">
          <a href="/terms" className="fz16 ffsd6 cf">이용약관</a>
          <a href="/privacy" className="fz16 ffsd6 cf">개인정보처리방침</a>
          <a href="/marriageTerms" className="fz16 ffsd6 cf">국내결혼중개 표준약관</a>
          <a href="/claimProcedure" className="fz16 ffsd6 cf">손해배상 청구절차</a>
        </div>
        <p className="f_info tac pb25">
          <span className="dib">회사명 <b>우리의 인연</b></span>
          <span className="dib">대표이사 <b>김여정</b></span>
          <span className="dib">사업자등록번호 <b>869-03-03028</b></span>
          <span className="dib">국내 결혼중개업 신고번호 <b>서울-강남-국내-24-0001호</b></span>
        </p>
        <p className="f_info tac pb50">
          <span className="dib">주소 <b>서울특별시 서초구 서초동 1330-3 엔데버빌딩 9층 2호</b></span>
          <span className="dib">TEL <b>02-2138-0638</b></span>
          <span className="dib">통신판매업신고 <b>2024-서울강남-02849</b></span>
          <span className="dib">E-mail <b>coihelp@naver.com</b></span>
        </p>
        <p className="f_copyright tac pb100">Copyright@ 2024 우연 Co. Ltd. All Rights Reserved.</p>
      </div>
      <div className="floating_link">
        {topPath.pathname !== '/consult/request' ?
          <a href="tel:02-2138-0638" className="request ffsd6">상담<br/>신청</a>
          :
          <></>
        }
      </div>
    </footer>
  )
}

