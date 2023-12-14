const app = getApp()

Page({
  data: {
    email: '',
    password: ''
  },
  onLoad() {
    let token = my.getStorageSync({
      key: 'access_token'
    })
    // console.log(token, '<<<TOKEN LOGIN')
    if(token.data) {
      my.switchTab({
        url: '/pages/tabBar/component/index'
      })
    }
  },
  handleUsernameInput(event) {
    this.setData({
      email: event.detail.value
    });
  },

  handlePasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },
  handleLogin() {
    const { email, password } = this.data;

    my.request({
      url: 'http://localhost:3001/login',
      method: 'POST',
      data: {
        email: email,
        password: password
      },
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: (res) => {
        // console.log(res, '<<<<<<RES')
        app.globalData.user = res.data.user
        console.log(app.globalData.user, 'masuk globalll')
        if(res.status === 200) {
          my.alert({
            title: 'Login Successful',
            content: 'Welcome!'
          });
          my.switchTab({
            url: '/pages/tabBar/home/index'
          })
          my.setStorage({
            key: 'access_token',
            data: res.data.access_token
          });
        } else {
          my.alert({
            title: 'Login Failed',
            content: 'Invalid username or password.'
          });
        }
      }
    })
  }
});
