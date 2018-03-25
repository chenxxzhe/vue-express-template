var express = require('express');
var https = require('https');
var http = require('http');
var request = require('request');
var formidable = require('formidable');
var fs = require('fs');  //读取文件
var router = express.Router();
var examper = require('./examples.js');   //报名须知

var _hostname = 'http://14.152.78.100:8081';
// var _hostname = 'http://192.168.40.250:8082';
var _port = '8081';

/* GET home page. */
router.get('/', function(req, res, next) {
  var id = req.query.id;  
  var callbackURL = 'https://hx.planplus.cn/index?id='+id;
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe8d341db762d802&redirect_uri=' + encodeURI(callbackURL) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
  res.redirect(url);
  // request({
  //   url: _hostname+"/activeUser/saveOrUpdate",
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: ""
  // }, function(error, response, body) {
  //     console.log(error)
  // });

});
router.get('/index', function (req, res, next) {
  console.log(222)
  
  var code = req.query.code;
  var state = req.query.state;
  // //   var events_id = req.query.events_id;  
  if (code && '123' == state) {
    var paths='/sns/oauth2/access_token?appid=wxfe8d341db762d802&secret=b2b63f37c5b18330e4fa6ad158903047&grant_type=authorization_code&code='+code;
        request("https://api.weixin.qq.com"+paths, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);            
            var openids=obj.openid;  //openid
            var accessToken = obj.access_token;
            var unionids = obj.unionid;
            if(req.query.id == "undefined"){     //channel  ==1   为飞慕课进来
              request(_hostname+"/activeUser/sign_up?unionId="+unionids+"&channel=1", function (error, response, body) {
                if (!error && response.statusCode == 200) { 
                    var _body = JSON.parse(body);       
                    res.render('index', { openid: openids, unionid: unionids, examper: examper, eventsid: req.query.id, type: _body.data.type  });
                }
              })
            } else {
              request(_hostname+"/activeUser/sign_up?unionId="+unionids+"&channel=2", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(openids);    
                    // console.log(unionids) 
                    var _body = JSON.parse(body);       
                    res.render('index', { openid: openids, unionid: unionids, examper: examper, eventsid: req.query.id, type: _body.data.type  });
                }
              })
            }
           

            // var path = '/sns/userinfo?access_token='+accessToken+'&openid='+openids+'&lang=zh_CN';   
            //      // 获取用户信息
                // request("https://api.weixin.qq.com"+path, function (error, response, body) {
                //   if (!error && response.statusCode == 200) {
                //     console.log("=====") 
                //     console.log(body) 
                //     res.render('index', { openids: '' });                     
                //   }
                // });
            // 获取token
            // var infoData = {
            //   "password": "f2d63bad4dce1ed9cad4bcbae3c770fd"
            // };
            // request({
            //   url: "http://gw.trussan.com/index.php?s=/addon/Api/External/get_access_token_haixing",
            //   method: "POST",
            //   headers: {
            //     "content-type": "application/json",
            //   },
            //   body: JSON.stringify(infoData)
            // }, function(error, response, body) {
            //   var obj = JSON.parse(body);
              
            //   if(obj.code == "200"){
            //     console.log(accessToken)
            //       var path = '/sns/userinfo?access_token='+accessToken+'&openid='+openids+'&lang=zh_CN';   
            //      // 获取用户信息
            //       request("https://api.weixin.qq.com"+path, function (error, response, body) {
            //         if (!error && response.statusCode == 200) {
            //           console.log("=====") 
            //           console.log(body) 
            //           res.render('index', { title: '' });                     
            //         }
            //       });
            //   }else{
            //     res.render({obj:msg})
            //   }
             
            // });          
          } else {
            res.render('index', { msg: error });
          }
        });
}else{
     res.render('index', { openid: "", unionid: "", examper: examper, events_id: ""});
}
})

router.post('/isUnionId', function(req, res, next) {
  console.log(req.body.unionId)
  request(_hostname+"/activeUser/sign_up?unionId="+req.body.unionId, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var _body = JSON.parse(body);
        res.send({ data: _body.data });       
    }
  })
  
});

// 判断关注飞慕课
router.get('/ischannel',function (req, res, next){
  console.log(req.query.events_id)
  if(req.query.events_id == "undefined"){ 
    request(_hostname+"/activeUser/confirm?unionId="+req.query.unionId+"&channel=1", function (error, response, body) {
      if (!error && response.statusCode == 200) { 
          var _body = JSON.parse(body);              
      }
    })
  } else {
    request(_hostname+"/activeUser/confirm?unionId="+req.query.unionId+"&channel=2", function (error, response, body) {
      if (!error && response.statusCode == 200) { 
          var _body = JSON.parse(body);              
      }
    })
  }
  
})

router.post('/formSubmit', function (req, res, next) { 
  var PostData = req.body;
  request({
    url: _hostname+"/activeUser/saveOrUpdate",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(PostData)
  }, function(error, response, body) {
    var obj = JSON.parse(body);
    if(obj.code == 0){
      console.log(obj)
      res.send({data:obj.data})
    }else{
      res.send({msg:error})
    }
  }); 
});
// 报名成功
router.get('/sign-success', function(req, res, next) {
  request(_hostname+"/activeUser/sign_up?unionId="+req.query.unionId, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var _body = JSON.parse(body);
        res.render('sign-success', { data: _body.data, unionId: req.query.unionId });       
    }
  })
  
});

// 赛事流程
router.get('/tournament', function(req, res, next) {

  res.render('tournament', { title: '' });
});
// 分享链接
router.get('/share', function(req, res, next) {
  request(_hostname+"/activeUser/sign_up?unionId="+req.query.unionId, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("====")
        var _body = JSON.parse(body);
        res.render('share', { data: _body.data});        
    }
  })
});

// 上传图片
router.post('/loader-img', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var formData = {
      type: 0,
      img: fs.createReadStream(files.file.path)
    }
    request.post({url: _hostname+"/upload/upload_img",formData: formData},
    function(error, response, body){
       var obj = JSON.parse(body);
       if(obj.code == 0){
          console.log(obj);
          res.send({imgpath:obj.data});
       }       
    })
  });
});
// 图片base64位转bolb

module.exports = router;
