Page({
  data: {
    getUrl: null,
    links: [
      {
        id: 0,
        url: "https://www.starbucks.co.id/"
      },
      {
        id: 4,
        url: "https://www.shutterstock.com/featured-collections/immerse-yourself-308180783"
      },
      {
        id: 5,
        url: "https://mail.google.com/"
      },
      {
        id: 6,
        url: "https://www.engadget.com/"
      },
      {
        id: 8,
        url: "https://www.tradingview.com/"
      },
      {
        id: 9,
        url: "https://www.youtube.com/"
      }
    ]
  },
  onLoad(query) {
    this.data.getUrl = this.data.links.find((el) => el.id == query.id)
  },
});
