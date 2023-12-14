const app = getApp()

Page({
  data: {
    profilePic: "/images/userOG.png",
    user: app.globalData.user
  },
  onShow() {
    // this.data.user = app.globalData.user
    console.log(this.data.user, 'masuk ke user data')
  },
  handleTap(e) {
    my.alert({
      content: `${e.target.dataset.event} TAPPED!!!`
    })
  },
  handleLogout() {
    my.navigateTo({
      url: '/pages/common/login/login'
    }),
    my.removeStorage({
      key: 'access_token',
      success: (res) => {
        my.alert({
          content: 'Logout!'
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
});
