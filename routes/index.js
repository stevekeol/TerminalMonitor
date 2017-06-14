var express = require('express');
var router = express.Router();

//WELCOME PAGE
router.get('/', function (req, res) {
    res.render('index');
});

//GET LOGIN PAGE
router.get('/login', function (req, res) {
    res.render('login');
});

//GET LOGINUP PAGE
router.get('/loginup', function (req, res) {
    res.render('loginup');
});

//获取dataShow页面
router.get('/dataShow', function (req, res) {
    res.render('dataShow');
});

//GET ADDBED PAGE
router.get('/addBed', function(req,res){
    res.render('addBed');
});


// //POST LOGIN backup
// router.post('/login', function (req, res) {
//     var userLogin = {
//         account: req.body.account,
//         password: req.body.password
//     };
//     console.log('account: '+userLogin.account);
//     console.log('password: '+userLogin.password);
    
//     var User = global.dbHandler.getModel('user');
//     User.findOne({'account': userLogin.account},'account', function(err, row) {
//         if(err) {
//             res.send({"code": "00"});  //数据库操作失败
//         }
//         console.log('createUser...findOne()...return: ' + row);
//         if(row) {
//             res.send({"code": "01"}); //创建账号时已存成
//         } else {
//             console.log('CreateUser...userLogin : ');
//             console.log(userLogin);

//             User.create(userLogin, function(err, ret) {
//                 if(err) {
//                     res.send( {"code": "00"} ); //数据库操作失败
//                 }
//                 res.send({"code": "02", "body": ret._id});   //创建账号成功
//             });
//         }
//     });
// });

//POST LOGIN 
router.post('/login', function (req, res) {
    var userLogin = {
        account: req.body.account,
        password: req.body.password
    };
    console.log('account received: '+userLogin.account);
    console.log('password received: '+userLogin.password);
    
    var User = global.dbHandler.getModel('user');
    User.findOne({'account': userLogin.account},'account', function(err, row) {
        console.log('createUser...findOne(account)...return: ' + row);
        if(err) {
            res.send({"code": "00"});  //数据库操作失败
            console.log(err); //将err打印在控制台
        }
        if(row) {
            User.findOne({'account':userLogin.account,'password': userLogin.password}, {'account':1, 'password':1}, function(err, row){
                console.log('createUser...findOne(account & pw)...return: ' + row);                
                if(err){
                    res.send({"code": "01"}); //密码错误
                }
                if(row){
                    res.send({"code": "02"}); //登录成功
                }
            });
        }else{
            res.send({"code": "03"});
        }
    });
});


//POST LOGINUP 
router.post('/loginup', function (req, res) {
	var userLoginup = {
		account: req.body.account,
		password: req.body.password,
		phone: req.body.phone
	};

    console.log('account: ' + userLoginup.account);
    console.log('password: ' + userLoginup.password);
    console.log('phone: ' + userLoginup.phone);

	var User = global.dbHandler.getModel('user');
    User.findOne({'account': userLoginup.account}, function(err, row) {
        if(err) {
            res.send({"code": "00"});  //数据库操作失败
        }
        console.log('createUser...findOne()...return: ' + row);
        if(row) {
            res.send({"code": "01"}); //创建账号时已存成
        } else {
            // var curDate = new Date().getTime();
            // userLoginup['createTime'] = curDate;
            // userLoginup['lastModifiedTime'] = curDate;

            // console.log('CreateUser & userLoginup : ');
            // console.log(userLoginup);

            User.create(userLoginup, function(err, ret) {
                if(err) {
                    res.send( {"code": "00"} ); //数据库操作失败
                } else{
                res.send({"code": "02", "body": ret._id});   //创建账号成功
            }
            });
        }
    });
});


module.exports = router;

