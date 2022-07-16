
let news = [];
const getLatestNews = async() => {
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`)
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  let response = await fetch(url, { headers: header }) //데이터를 보내는 방식은 여러개가 있는데 ajax, http, fetch가 있다. 
  // 위에 사용한 fetch는 서버와 통신을 해야 돼서 기다려야 함 
  let data = await response.json()
  console.log("this is data",data)
  news = data.articles;
  console.log(news)
}

getLatestNews();