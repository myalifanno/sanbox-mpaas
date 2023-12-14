Page({
  data: {
    album: null
  },
  onLoad(query) {
    // console.log(query.id)
    this.getAlbums(query.id)
  },
  getAlbums(id) {
    my.request({
      url: `https://api.pexels.com/v1/photos/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'dH3xlCPqSOhUDJUaCy60FViSiyNFNvlMKkCdGdwusFfLqtLKPDTqXOVj'
      },
      success: (res) => {
        setTimeout(() => {
          this.setData({
            album: res.data
          })
        }, 2000)
      },
      fail: (res) => {
        my.alert({
          content: 'Oops.. Something went horribly wrong!'
        })
      }
    })
  },
  photographerPage() {
    
  }
})