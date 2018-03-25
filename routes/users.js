/**
 * Created by jarodyv on 11/8/16.
 * Update by arronliang on 22/1/18
 */
var express = require('express');
var router = express.Router();
var https = require("https");
// var jsSHA = require('jssha');
var request = require('request');

var appId = 'wxb5b01e4c54d2a2e4';
var secret = '9fcf1d053da22850e0fe5f184b345afa';

router.get('/', function (req, res) {
    var _url = req.query.url;

    if (!_url) {
        return errorRender(res, '缺少url参数');
    }

    request({
        url: 'http://gw.trussan.com/index.php?s=/addon/Api/External/get_access_token_more',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            password: "f2d63bad4dce1ed9cad4bcbae3c770fd"
        }
    }, function(error, response, body) {
        
        // console.log(body.data.jsapi_ticket.jsapi_ticket)
        if (body.code === '200') {
            setSign(res, _url, body.data.jsapi_ticket.jsapi_ticket);
        }else{
            errorRender(res, '请求出错', body.msg);
        }
    });
});

var setSign = function(res, url, ticket){
    var ts = createTimeStamp();
    var nonceStr = createNonceStr();
    var ticket = ticket;
    var signature = calcSignature(ticket, nonceStr, ts, url);
    responseWithJson(res, {
        nonceStr: nonceStr,
        timestamp: ts,
        appId: appId,
        signature: signature,
        url: url,
        ticket: ticket
    });
    
}

var errorRender = function (res, info, data) {
    if (data) {
        console.log(data);
        console.log('---------');
    }
    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST,GET"
        , "Access-Control-Allow-Credentials": "true"
    });
    responseWithJson(res, {errmsg: 'error', message: info, data: data});
};

// 输出数字签名对象
var responseWithJson = function (res, data) {
    // 允许跨域异步获取
    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST,GET"
        , "Access-Control-Allow-Credentials": "true"
    });
    res.json(data);
};

// 随机字符串产生函数
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

// 时间戳产生函数
var createTimeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

// 计算签名
var calcSignature = function (ticket, noncestr, ts, url) {
    var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + ts + '&url=' + url;
    shaObj = new jsSHA(str, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
};

module.exports = router;