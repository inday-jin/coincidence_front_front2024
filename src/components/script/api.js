//const defaultUrl = 'https://www.coincidence.co.kr';
const defaultUrl = 'http://localhost:4000';

export async function getData(url){
  const res = await fetch(`${defaultUrl}${url}`, 
    {
      method: 'get',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        withCredentials: true,
      },
    }
  );
  return await res.json();
}

export async function postData(url, body){
  const res = await fetch(`${defaultUrl}${url}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}