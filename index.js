const path = require("path");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, User } = require("./load-record/db");

const logger = morgan("tiny");

const {userLogin,userPhoneNumber} = require('./login/index')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 添加用户
app.post("/api/user", async (req, res) => {
  const result =  await User.create(req.body);
  res.send({
    code: 0,
    data: result,
  });
});

// 获取计数
// app.get("/api/count", async (req, res) => {
//   const result = await Counter.count();
//   res.send({
//     code: 0,
//     data: result,
//   });
// });

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// 获取计数
app.get("/api/users", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// 登录获取token
app.post("/api/users/login", async (req, res) => {
  const { code } = req.body;
  const data = await userLogin(code)
  await res.send({
    code: 200,
    data: data,
  });
});

// 查询是否存在当前用户
app.get("/api/users", async (req,res) => {
  const { openid } = req.params;
  const { data } = await  User.findAll({
    where:{
      openid:openid
    }
  })
  await res.send({
    body:{
      code:200,
      data
    }
  })

})

// 获取用户手机号
app.post("/api/users/userPhoneNumber", async (req, res) => {
  const { code } = req.body;
  const data = await userPhoneNumber(code)
  await res.send({
    code: 200,
    data: data,
  });
});


const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
