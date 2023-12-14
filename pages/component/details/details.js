Page({
  data: {
    item: null
  },
  onLoad(query) {
    this.getDetail(query.id)
  },
  getDetail(id) {
    my.request({
      url: `https://dummyjson.com/products/${id}`,
      method: 'GET',
      success: (res) => {
        setTimeout(
          this.setData({
            item: res.data
          }), 7000
        )
      },
      fail: () => {
        my.alert({
          content: 'Oops.. Something went wrong!'
        })
      }
    })
  }
})