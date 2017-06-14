var express = require('express');
var router = express.Router();

/* 用户创建*/
router.get('/user/create', function(req,res) {
    res.render('userCreate');
});
router.post('/user/create', function(req,res){
    console.log("req.body.account: " + req.body.account);
    console.log("req.body.password: " + req.body.password);
    console.log("req.body.gender: " + req.body.gender);
    console.log("req.body.birthday: " + req.body.birthday);

    var userInfo = {
        account: req.body.account,
        password: req.body.password,
        gender: req.body.gender,
        birthday: req.body.birthday
    };

    var User = global.dbHandler.getModel('user');
    User.findOne({'account': userInfo.account},'account', function(err, row) {
        if(err) {
            res.send({"code": "00"});  //数据库操作失败
        }
        console.log('createUser, findOne return: ' + row);
        if(row) {
            res.send({"code": "01"}); //创建账号时已存成
        } else {
            var curDate = new Date().getTime();
            userInfo['createTime'] = curDate;
            userInfo['lastModifiedTime'] = curDate;

            console.log('CreateUser, userInfo = ');
            console.log(userInfo);

            User.create(userInfo, function(err, ret) {
                if(err) {
                    res.send( {"code": "00"} ); //数据库操作失败
                }
                res.send({"code": "02", "body": ret._id});   //创建账号成功
            });
        }
    });
});


/* 用户登录*/
router.get('/user/login', function(req,res) {
    console.log('get /user/login');
    res.render('userLogin');
});
router.post('/user/login', function(req,res){
    console.log("req.body.account: " + req.body.account);
    console.log("req.body.password: " + req.body.password);

    var logInfo = {
        account: req.body.account,
        password: req.body.password,
    };
    console.log('Login: logInfo = ');
    console.log(logInfo);

    var User = global.dbHandler.getModel('user');
    User.findOne({'account': logInfo.account}, '_id account password', function(err, row){
        if(err) {
            res.send({"code": "00"});   //数据库操作失败
        }
        if(row) {
            if(row.password==logInfo.password){
                res.send({"code": "02", "body": row['_id']});   //登录成功
            } else {
                res.send({"code": "01"}); //登陆账号或密码不正确
            }
        } else {
            res.send({"code": "01"});   //登陆账号或密码不正确
        }
    });
});

module.exports = router;
