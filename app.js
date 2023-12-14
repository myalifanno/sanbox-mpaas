App({
  globalData:{
    user: null 
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    // const access = my.getStorageSync({
    //   key: 'accessToken'
    // })
    // if (access) {
    //   my.redirectTo({
    //     url: "/pages/tabBar/home/index"
    //   })
    // } else {
    //   my.redirectTo({
    //     url: "/pages/login/login"
    //   })
    // }
  },
});
