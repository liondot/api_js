
let news = [];
let page = 1; 
let total_page = 0; 
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
  news = data.articles;
  total_pages = data.total_pages;
  page = data.page;
  console.log(news)

  render()
}

const getNews = async () => {
  try {
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  url.searchParams.set('page', page); //&page=
  console.log("url은", url)
  let response = await fetch(url, { headers: header });
  let data = await response.json();

  if(response.status == 200) {
    if(data.total_hits == 0) {
      throw new Error("검색된 결과값이 없습니다.")
    }
    console.log("받는 데이터가 뭐지?", data)
    news = data.articles;
    total_page = data.total_page;
    page = data.page;
    console.log(news);
    render()
    pagenation()
  } else {
    throw new Errro (data.message);
  }
} catch (error) {
  console.log("잡힌 에러는", error.message);
  errorRender(error.message)
}

};


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

const pagenation = () => {
  let pagenationHTML = ``;
  // pagenation 작업할 때 알아야 할 정보 
  // total_page 정보 
  // page 정보
  // page group 찾기 
  let pageGroup = Math.ceil(page / 5);
  // last 페이지가 뭔지 
  let last = pageGroup * 5
  // first 페이지가 뭔지 
  let first = last - 4
  // first~last 페이지 프린트 

  for(let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
  }
  
  document.querySelector(".pagination").innerHTML = pagenationHTML;
}

const moveToPage = (pageNum) => {
  // 1. 이동하고 싶은 페이지를 알아야함 
  page = pageNum; 
  // console.log(page);
  // 2. 이동하고 싶은 페이지를 가지고 api를 다시 호출 

}

searchBtn.addEventListener('click', getNewsByKeyword)
getLatestNews();
