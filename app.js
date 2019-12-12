const Koa = require('koa');

const router = require('koa-router')(); // 路由

const bodyParser = require('koa-bodyparser'); // body传值

require('module-alias/register')// 路径别名

const app = new Koa();

const auth = require('@modules/utils/auth');

const { isHasToken } = require('@modules/utils');

//token验证中间件
app.use(isHasToken())

app.use(bodyParser());

//引入登录模块
const login = require('@routes/login');
//引入用户注册模块
const user = require('@routes/user');

//登录
router.use('/login', login.routes());

//验证token是否有效
app.use(auth.validation());

//用户注册
router.use('/user', user.routes());

//加载路由
app.use(router.routes()).use(router.allowedMethods);

//监听端口
app.listen(5000);