export default function Alert({ alertMsg, alertClose }){
  return(
    <div className="alert">
      <div className="popup_wrap">
        <div className="popup_cont fz16">
          <p className="fz16 c3">{alertMsg}</p>
        </div>
        <div className="popup_ctrl">
          <button onClick={alertClose} className="fz16 ffsd6">닫기</button>
        </div>
        </div>
    </div>
  )
}