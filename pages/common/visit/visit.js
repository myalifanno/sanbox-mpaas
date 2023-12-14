Page({
  data: {
    url: null
  },
  onLoad(query) {
    this.setData({
      url: query.url
    })
    console.log(this.data.url, '<<<<<<<<<')
  },
});
