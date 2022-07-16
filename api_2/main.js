
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

  render()
}

getLatestNews();

const render = () => {
  let newsHTML = ''
  newsHTML = news.map((news) => {
    return `<div class="row news">
    <div class="col-lg-4">
        <img class="new_img_size" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDJfMjMx%2FMDAxNjU2NzY3MTUwMTgw.8a_kJ25Zw-GCeIqH-GpEdiALZai2JOZoC1CqdE7QQ6wg.tvC6DVDMQAfltaMPAjZBAbHUTFuX0HTd-wEeHXQZCvcg.JPEG.cony0905%2F%25C0%25CC%25BB%25F3%25C7%25D1%25BA%25AF%25C8%25A3%25BB%25E7_%25BF%25EC%25BF%25B5%25BF%25EC_1%25C8%25AD_%252823%2529.jpg&type=sc960_832" alt="">
    </div>
    <div class="col-lg-8">
        <h2>이상한 변호사 우영우’ 박은빈, 포스터 비하인드컷 공개
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste obcaecati necessitatibus nisi dolorum praesentium modi sapiente quam minus similique odio.</p>
        <div>
        KBS 2022.07.10
        </div>
    </div>
</div>`
  }).join('')

  document.getElementById("news_board").innerHTML = newsHTML;
}