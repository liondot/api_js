
let news = [];
let menus = document.querySelectorAll('.menus button');
let searchBtn = document.getElementById('search_button');
let url;


menus.forEach((menu) => menu.addEventListener("click", (event => getNewsByTopic(event))))

console.log("menu에 있는 버튼",menus)
const getLatestNews = async() => {
   url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`)
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  let response = await fetch(url, { headers: header }) //데이터를 보내는 방식은 여러개가 있는데 ajax, http, fetch가 있다. 
  // 위에 사용한 fetch는 서버와 통신을 해야 돼서 기다려야 함 
  let data = await response.json()
  console.log("this is data",data)
  news = data.articles;
  console.log(news)

  render()
}

const getNews = async () => {
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render()
}

getLatestNews();

const getNewsByTopic = async (event) => {

  let topic = event.target.textContent.toLowerCase();
   url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
  getNews()
}

const getNewsByKeyword = async () => {
  // 1. 검색 키워드 읽어오기 
  // 2. url에 검색 키워드 부치기 
  // 3. 헤더 준비 
  // 4. url 부르기 
  // 5. 데이터 가져오기 
  // 6. 데이터 보여주기 

  let keyword = document.getElementById('search_input').value;
   url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
   getNews()
}

const render = () => {
  let newsHTML = ''
  newsHTML = news.map((item) => {
    return `<div class="row news">
    <div class="col-lg-4">
        <img class="new_img_size" src="${item.media}">
    </div>
    <div class="col-lg-8">
        <h2>${item.title}
        </h2>
        <p>${item.summary}</p>
        <div>
        ${item.clean_url} ${item.published_date} 
        </div>
    </div>
</div>`
  }).join('')

  document.getElementById("news_board").innerHTML = newsHTML;
}

searchBtn.addEventListener('click', getNewsByKeyword)
