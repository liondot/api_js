
let news = []
const getLatestNews = async() => {
  let url = new URL (
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );
  let header = new Headers({'x-api-key':'YyyhWHPrmOjfy1L6CSxpnoxdXI9Pr1LRkq9eeUR5eVA'})

  let response = await fetch(url,{headers:header})
  let data = await response.json()
  news = data.articles
  console.log(news)
  console.log(data)
  console.log(response)
};

getLatestNews();