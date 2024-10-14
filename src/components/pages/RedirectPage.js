import { useEffect } from 'react';

export default function RedirectToExternal() {
  useEffect(() => {
    // 현재 경로를 가져오기
    const currentPath = window.location.pathname;
    
    // 새로운 도메인과 경로를 결합하여 리디렉션
    const newDomain = 'https://web.coincidence.co.kr';
    window.location.href = `${newDomain}${currentPath}`;
  }, []);

  return null;
}