module.exports = {
  execute: function(token) {
    function _transformAuth(params) {
      if (!params.id || !params.logo || !params.name || !params.scopes) {
        console.error("[mock] fail")
        params.fail({
          "message": "Missing parameters, required [id (int), logo (string, url), name (string), scopes (string in array)]"
        })
      }

      if (token) {
        params.success({
          accessToken: token
        });
        return ;
      }
      console.info("[mock] yippiAuth success")
      const mockToken = "thisIsSupposeToBeATokenString.andThisIsJustAMockFunction.parameter (mock) is true";
      params.success({
        accessToken: mockToken
      });
    }
    
    function _transformUser(params) {
      const successRes = {
        "id": 1,
        "name": "Justin Stanley",
        "username": "justin_stanleyhomies",
        "phone": "60123456789",
        "country": "MY",
        "avatar": {
            "url": "https://yippiweb.com/wp-content/uploads/2020/05/88ba7c0585d46f62a444288c5efd1e0c978c075715f431dc0edc881a3338d054-9.png",
            "vendor": "aliyun-oss",
            "mime": "image/jpeg",
            "size": 30000,
            "dimension": {
                "width": 150,
                "height": 150
            }
        },
        "sex": 1,
        "verified": {
            "type": "level_three",
            "icon": "https://yippi-social.oss-cn-hongkong.aliyuncs.com/certifications/new_icon/icLevel3%402x.png",
            "description": ""
        },
        "extra": {
            "likes_count": 6,
            "comments_count": 27,
            "followers_count": 17,
            "followings_count": 25,
            "feeds_count": 6,
            "questions_count": 0,
            "answers_count": 0,
            "can_accept_reward": 1,
            "is_live_enable": 1,
            "is_subscribable": 0
        },
        "dailySpendLimit": "99999.00"
      }

      if (token) {
        wx.request({
          url: `https://preprod.getyippi.com/api/vendor/me`,
          header: {
            "Authorization": `Bearer ${token}`,
            "Accept": `application/json`,
            "Accept-Encoding": `application/json`,
          },
          success: function(res) {
            params.success(res.data);
          }
        });
        return ;
      }

      if (params.failResp == true) {
        params.fail({
          "message": "Unauthenticated. This function don't need any parameters. Will throw error when parameter (failResp) is true"
        });
        return ;
      }
      params.success(successRes);
    }
    
    const yippiAuth = wx.yippiAuth
    const yippiUser = wx.yippiUser

    Object.defineProperties(wx, {
      'yippiAuth': {
        get() {
          return _transformAuth.bind(yippiAuth)
        }
      },
      'yippiUser': {
        get() {
          return _transformUser.bind(yippiUser)
        }
      }
    });
  }
};

