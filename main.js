
let news = []
const getLatestNews = async() => {
  let url = new URL (
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );
  let header = new Headers({'x-api-key':'YyyhWHPrmOjfy1L6CSxpnoxdXI9Pr1LRkq9eeUR5eVA'})

  let response = await fetch(url,{headers:header})
  let data = await response.json();
  news = data.articles;
  console.log(news);

  render()
  
};

const render = () => {
  let newsHTML = ''

  newsHTML = news.map((item) => {
    return `
    <div class="row news">
    <div class="col-lg-4">
      <img class="img-size" src="${item.media}">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.rights} * ${item.published_date}</div>
    </div>
  </div>
    ` 
  }).join('');

  console.log(newsHTML)

  document.getElementById("news-board").innerHTML = newsHTML

}

getLatestNews();