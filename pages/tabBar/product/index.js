Page({
  data: {
    products: [],
    thumbnail: [],
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 1000,
    circular: true,
    thumb: 'https://gw.alipayobjects.com/mdn/rms_ce4c6f/afts/img/A*XMCgSYx3f50AAAAAAAAAAABkARQnAQ',
    expandedID: null,
    list55: [
      {
        icon: '/images/neon-cafe.png',
        text: 'Cafe',
      },
      {
        icon: '/images/neon-cart.png',
        text: 'Cart',
      },
      {
        icon: '/images/neon-contact.png',
        text: 'Contact',
      },
      {
        icon: '/images/neon-diamond.png',
        text: 'Diamond',
      },
      {
        icon: '/images/neon-gallery.png',
        text: 'Gallery',
      },
      {
        icon: '/images/neon-mail.png',
        text: 'Mail',
      },
      {
        icon: '/images/neon-notes.png',
        text: 'News',
      },
      {
        icon: '/images/neon-planet.png',
        text: 'Planet',
      },
      {
        icon: '/images/neon-stocks.png',
        text: 'Stocks',
      },
      {
        icon: '/images/neon-video.png',
        text: 'Video',
      },
    ],
  },
  onLoad() {
    my.request({
      url: 'https://dummyjson.com/products?limit=5',
      success: (res) => {
        this.setData({
          thumbnail: res.data.products
        })
      },
      fail: (res) => {
        my.alert({
          content: 'Oops.. Something went wrong!'
        })
      }
    }),
    my.request({
      url: 'https://dummyjson.com/products?limit=5&skip=5',
      success: (res) => {
        this.setData({
          products: res.data.products
        })
      },
      fail: (res) => {
        my.alert({
          content: 'Oops.. Something went horribly wrong!!'
        })
      }
    }),
    this.fetchData()
  },
  onCardClick(ev) {
    const dataId = ev.info
    const { expandedID } = this.data
    if (expandedID === dataId){
      this.setData({
        expandedID: null
      })
    } else {
      this.setData({
        expandedID: dataId
      })
    }
  },
  onActionClick() {
    my.alert({
      content: 'action clicked',
    });
  },
  onExtraActionClick() {
    my.alert({
      content: 'extra action clicked',
    });
  },
  navigateDetails(e) {
    my.navigateTo({
        url: `/pages/component/details/details?id=${e.target.dataset.id}`
      } 
    )
  },
  onItemClick(ev) {
    if (ev.detail.index === 0 || ev.detail.index === 4 || ev.detail.index === 5 || ev.detail.index === 6 || ev.detail.index === 8 || ev.detail.index === 9) {
      my.navigateTo({
        url: `/pages/common/webview/webview?id=${ev.detail.index}`
      })
    } else if (ev.detail.index === 1) {
      my.navigateTo({
        url: "/pages/common/graph/graph"
      })
    } else {
      my.alert({
        content: "Sorry! No Webview Yet :("
      })
    }
    
  },
  fetchData() {
    const { products } = this.data
    const limit = 5
    const skip  = products.length

    my.request({
      url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      success: (res) => {
        const newProducts = res.data.products
        this.setData({
          products: [...products, ...newProducts]
        })
      },
      fail: (res) => {
        my.alert({
          content: 'Oops.. Something went horribly wrong!!'
        })
      }
    })
  },
  onReachBottom() {
    console.log('kenaaaa')
    this.fetchData()
  },
  scrollToTop() {
    my.pageScrollTo({
      scrollTop: 0,
      duration: 5000
    })
  }
});

