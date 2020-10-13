// iweb项目的后台动态web服务器功能；
// 接受客户端提交的HTTP请求；读取请求中客户端提交来的数据,
// 向数据库服务器提交SQL命令已操作底层数据
// 最火向客户端发从HTTP响应（responxe),说明执行成功还是失败

// 引入第三方提供的express模块
const express = require('express')

//创建一个Web服务器
let app = express();
// 让动态Web服务器监听在指定的端口上,及启动服务器
let port = 5050  //此处在为新浪云服务器做铺垫
app.listen(port,()=>{
	console.log('Server Listening on Port:',port)
})
/*
创建数据库连接池，其中包含10个链接，用于连接到数据库
*/
const mysql = require('mysql')
//使用第三方模块mysql创建数据库连接池
let pool = mysql.createPool({
	hosr:'127.0.0.1',     //数据库服务器地址
	port:'3306',         //数据库服务器端口号
	user:'root',         //管理员用户
	password:'',         //密码
	database:'iweb',     //数据库名称
	connectionLimit:10,  //池中连接最大数量
})

/*让Web服务器可以接收一个特定请求，并回复该请求
// app.get('/index',(req,res)=>{
// 	res.send('Welcome to my Site Index!')
// })*/

//API1.1 向客户端输出“排名前12名的最新课程”
//请求方法：GET
// 请求地址：/course/newest
// 请求参数：无
/* 响应数据
  [
	  {
		  cid:3,
		  cname:'微信小程序开发',
		  pic:'img/course/03.jpg',
		  tname:'程涛',
		  price:599
	  },
	  {
		 ....
	  },
  ]
  */
 app.get('/course/newest',(rep,res)=>{
	 // 向数据库服务器发送查询请求，获得必需的课程数据:前12条(即第0行开始)
	 //且最新课程(即按课程)
	 	let sql = 'SELECT cid,cname,iw_course.pic,price,tname,tid FROM iw_course, iw_teacher WHERE iw_course.teacher_id=iw_teacher.tid ORDER BY cid DESC LIMIT 0, 12'

	 pool.query(sql,(err,result)=>{
		 if(err){
			 console.log('数据库查询失败')
			 throw err
		 }
		 //数据库操作完成，查询结果成功
		 console.log('数据库查询成功')
		 // console.log(result)
		 // 将数据库返回的课程输出发送给客户端
		 res.send(result)
	 })
 })
 //热门课程
 app.get('/course/hottest',(rep,res)=>{
 	 // 向数据库服务器发送查询请求，获得必需的课程数据:前12条(即第0行开始)
 	 //且最新课程(即按课程)
 	 	let sql = 'SELECT cid,cname,iw_course.pic,price,tname,tid FROM iw_course, iw_teacher WHERE iw_course.teacher_id=iw_teacher.tid ORDER BY cid DESC LIMIT 0, 12'
 
 	 pool.query(sql,(err,result)=>{
 		 if(err){
 			 console.log('数据库查询失败')
 			 throw err
 		 }
 		 //数据库操作完成，查询结果成功
 		 console.log('数据库查询成功')
 		 // console.log(result)
 		 // 将数据库返回的课程输出发送给客户端
 		 res.send(result)
 	 })
 	
 })
 // 讲师列表前五个
 app.get('/teacher/list',(rep,res)=>{
 	 // 向数据库服务器发送查询请求，获得必需的课程数据:前12条(即第0行开始)
 	 //且最新课程(即按课程)
 	 	let sql = 'SELECT tid,tname,pic,skills,experience,style FROM iw_teacher  ORDER BY tid DESC LIMIT 0, 5'
 
 	 pool.query(sql,(err,result)=>{
 		 if(err){
 			 console.log('数据库查询失败')
 			 throw err
 		 }
 		 //数据库操作完成，查询结果成功
 		 console.log('数据库查询成功')
 		 // console.log(result)
 		 // 将数据库返回的课程输出发送给客户端
 		 res.send(result)
 	 })
 	
 })
 // 校区列表前五个
 app.get('/school/list',(rep,res)=>{
 	 // 向数据库服务器发送查询请求，获得必需的课程数据:前12条(即第0行开始)
 	 //且最新课程(即按课程)
 	 	let sql = 'SELECT sid,sname,address,phone,postcode,longitude,latitode FROM iw_school  ORDER BY sid DESC LIMIT 0, 5'
 
 	 pool.query(sql,(err,result)=>{
 		 if(err){
 			 console.log('数据库查询失败')
 			 throw err
 		 }
 		 //数据库操作完成，查询结果成功
 		 console.log('数据库查询成功')
 		 // console.log(result)
 		 // 将数据库返回的课程输出发送给客户端
 		 res.send(result)
 	 })
 	
 })