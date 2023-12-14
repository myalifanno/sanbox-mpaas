Page({
  data: {
    photos: [],
    isLogin: false,
    isLoading: false,
    page: 2,
    position: '',
    basicVisible: false,
    animation: true,
    id: null,
    pic: null,
    sizes: ['large', 'medium', 'small', 'x-small'],
    img: [],
    scrollTop: 0
  },
  onLoad() {
    let token = my.getStorageSync({
      key: 'access_token'
    })
    if(!token.data) {
      my.navigateTo({
        url: '/pages/common/login/login'
      })
    }
    my.request({
      url: 'https://api.pexels.com/v1/curated/?page=1&per_page=12',
      headers:{
        Authorization: 'dH3xlCPqSOhUDJUaCy60FViSiyNFNvlMKkCdGdwusFfLqtLKPDTqXOVj'
      },
      success: (res) => {
        const gridData = this.randomSizes(res.data.photos.length)
        const photosWithSizes = res.data.photos.map((photo, index) => ({
          ...photo,
          width: gridData[index].width,
          height: gridData[index].height
        }))

        this.setData({
          photos: photosWithSizes
        })
      },
      fail: (res) => {
        my.alert({
          content: 'Oops.. Something went wrong!'
        })
      }
    })
  },
  fetchData() {
    const { photos, page } = this.data

    my.request({
      url: `https://api.pexels.com/v1/curated/?page=${page}&per_page=12`,
      headers:{
        Authorization: 'dH3xlCPqSOhUDJUaCy60FViSiyNFNvlMKkCdGdwusFfLqtLKPDTqXOVj'
      },
      success: (res) => {
        const newPhotos = res.data.photos
        this.setData({
          photos: [...photos, ...newPhotos]
        })
      }
    })
    this.setData({
      page: page + 1
    })
  },
  onReachBottom() {
    this.fetchData()
  },
  onPageScroll({scrollTop}) {
    console.log(scrollTop, 'KKKKKKK')
    // const scroll = e.scrollTop;
    const showScrollToTop = scrollTop > 500;

    this.setData({
      scrollTop: showScrollToTop
    });
  },
  scrollToTop() {
    my.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
      success: () => {
        console.log('Gotchaa')
      },
      fail: () => {
        console.log('meh')
      }
    });
  },
  randomSizes(num) {
    const sizes = [];
    for (let i = 0; i < num; i++) {
      const width = Math.floor(Math.random() * 50) + 20;
      const height = Math.floor(Math.random() * 50) + 20;
      sizes.push({ width, height });
    }
    return sizes;
  },
  toAlbums(e) {
    my.navigateTo({
      url: `/pages/component/albums/albums?id=${e.target.dataset.id}`
    });
  },
  handleClose() {
    this.setData({
      basicVisible: false
    })
  },
  handleShow(e) {
    const { position, id } = e.target.dataset
    try {
      this.setData({
        position,
        basicVisible: true,
        isLoading: true
      })
      my.request({
        url: `https://api.pexels.com/v1/photos/${id}`,
        method: 'GET',
        headers: {
          Authorization: 'dH3xlCPqSOhUDJUaCy60FViSiyNFNvlMKkCdGdwusFfLqtLKPDTqXOVj'
        },
        success: (res) => {
          this.setData({
            pic: res.data,
            isLoading: false,
            img: [res.data.src.original, res.data.src.large2x, res.data.src.large, res.data.src.medium, res.data.src.small]
          })
        },
        fail: () => {
          my.alert({
            content: 'OMG!!'
          }),
          this.setData({
            isLoading: false
          })
        }
      })
    } catch (error) {
      my.alert({
        content: 'asdasd'
      }),
      this.setData({
        isLoading: false
      })
    }
  },
  download() {
    console.log(this.data.pic.src.original, '<<<<<<<<<<URL')
    my.downloadFile({
      url: this.data.pic.src.original,
      success: (res) => {
        console.log(res)
        this.saveImageToPhotosAlbum(res.apFilePath)
        console.log(res.tempFilePath, '<<<<<<<')
      },
      fail: (err) => {
        my.alert({
          content: 'OMG'
        }),
        console.log(err, '<<<<errrorr')
      }
    })
  },
  saveImageToPhotosAlbum(path) {
    console.log(path)
    my.saveImageToPhotosAlbum({
      filePath: path,
      success: (res) => {
        console.log('image saved', res)
      }, 
      fail: () => {
        my.alert({
          content: 'LOL'
        })
      }
    });
  },
  // download() {
  //   my.saveImageToPhotosAlbum ({
  //     filePath: this.data.pic.src.original,
  //     success: (res) => {
  //       console.log('Image saved to album', res)
  //     },
  //     fail: (err) => {
  //       console.log('error saving to album', err)
  //       const platform = my.env.platform
  //       if(err.error === 15) {
  //         if(platform === 'iOS') {
  //           my.showAuthGuide({
  //             authType: 'PHOTO',
  //             complete(res) {
  //               if (res.shown) {
  //                 console.log('permission guide shown')
  //               } else {
  //                 my.alert({
  //                   title: 'Failed to save image',
  //                   content: 'Please set Alipay in the system settings and turn on the photo album permission'
  //                 })
  //               }
  //             }
  //           })
  //         } else if (platform === 'Android') {
  //           my.alert({
  //             title: 'Failed to save image',
  //             content: 'Please find the Alipay application in the system settings and enable file and multimedia write permissions'
  //           })
  //         }
  //       }
  //     },
  //   })
  // },
  // download() {
  //   let fs = my.getFileSystemManager()
  //   my.downloadFile({
  //     url: this.data.pic.src.original,
  //     success: (res) => {
  //       fs.saveFile({
  //         tempFilePath: res.apFilePath,
  //         filePath: `${my.env.USER_DATA_PATH}/alipay.jpg`,
  //         success: (res2) => {
  //           console.log(res2.savedFilePath),
  //           my.saveImageToPhotosAlbum ({
  //             filePath: this.data.pic.src.original,
  //             success (res3) {
  //               console.log('Image saved to album', res3)
  //             },
  //             fail (err) {
  //               console.log('error saving to album', err)
  //               const platform = my.env.platform
  //               if(err.error === 15) {
  //                 if(platform === 'iOS') {
  //                   my.showAuthGuide({
  //                     authType: 'PHOTO',
  //                     complete(res3) {
  //                       if (res3.shown) {
  //                         console.log('permission guide shown')
  //                       } else {
  //                         my.alert({
  //                           title: 'Failed to save image',
  //                           content: 'Please set Alipay in the system settings and turn on the photo album permission'
  //                         })
  //                       }
  //                     }
  //                   })
  //                 } else if (platform === 'Android') {
  //                   my.alert({
  //                     title: 'Failed to save image',
  //                     content: 'Please find the Alipay application in the system settings and enable file and multimedia write permissions'
  //                   })
  //                 }
  //               }
  //             },
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  webVisit(e) {
    my.navigateTo({
      url: `/pages/common/visit/visit?url=${e.target.dataset.url}`
    })
  },
  previewOG(e) {
    my.previewImage({
      current: 0,
      urls: this.data.img,
      enableSavePhoto: true,
      enableShowPhotoDownload: true,
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  // download() {
  //   my.downloadFile({
  //     url: this.data.pic.src.original,
  //     success: (res) => {
  //       my.saveFile({
  //         apFilePath: res.apFilePath,
  //         success: (res2) => {
  //           console.log(res2.apFilePath)
  //           my.getSavedFileList({
  //             success: res => {
  //               console.log(res);
  //             },
  //           });
  //         }
  //       })
  //     }
  //   })
  // }
});
