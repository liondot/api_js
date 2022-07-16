
let news = [];
let menus = document.querySelectorAll('.menus button')

menus.forEach((menu) => menu.addEventListener("click", (event => getNewsByTopic(event))))

console.log("menu에 있는 버튼",menus)
const getLatestNews = async() => {
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`)
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  let response = await fetch(url, { headers: header }) //데이터를 보내는 방식은 여러개가 있는데 ajax, http, fetch가 있다. 
  // 위에 사용한 fetch는 서버와 통신을 해야 돼서 기다려야 함 
  let data = await response.json()
  console.log("this is data",data)
  news = data.articles;
  console.log(news)

  render()
}

getLatestNews();

const getNewsByTopic = async(event) => {

  let topic = event.target.textContent.toLowerCase();
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
  let header = new Headers({"x-api-key": "7e5MmopN4uLr2-sEBt-sYPzqM57FC8TBYZJjjQkXNXk",})
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render()

  console.log("data",data)
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