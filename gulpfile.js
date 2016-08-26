//引入gulp
var gulp=require("gulp");
//引入js压缩文件
var uglify=require("gulp-uglify");
//引入css压缩文件
var minifyCss=require("gulp-minify-css");
//引入模块开发
var webpack=require("gulp-webpack");
//引入vinyl-named
var namde=require("vinyl-named");
//引入版本控制
var rev=require("gulp-rev");
var revCollector=require("gulp-rev-collector");
//引入webserver
var webserver=require("gulp-webserver");

//所有的css文件
var mincss=["./src/css/style.css"]
//所有的js文件
var jsFiles=["./src/js/*.js"];
//json数据
var jsonData=["./mock/*.json"]
//启动服务
gulp.task('webserver', function() {
  gulp.src("./")
  	  .pipe(webserver({
        host:"localhost",//配主机
  	  	port:80,//配置端口
        livereload:true,//实时监控更新(无需刷新)
  	  	directoryListing:{
  	  		enable:true,//显示目录
  	  		path:"./"//路径为当前文件夹
  	  	}/*,
        middleware:function(req,res,next){
          var urlObj=url.parse(req.url,true);
          switch(urlObj.pathname){
            case "./api/getLivelist.php":
            res.setHeader("Content-type","application/json");
            fs.readFile("./mock/livelist.json","utf-8",function(error,data){
              res.end(data)
            })
            return;
          }
          next()
        }*/
  	  	
  	  }))
 
});
//压缩css
gulp.task("minifyCss",function(){
  gulp.src(mincss)
  .pipe(minifyCss())
  .pipe(gulp.dest("./app/prd/styles"))
})
//复制html文件
gulp.task('copyhtml', function() {
  // 将你要执行的任务代码放在这(压缩文件)
  gulp.src("index.html")
  .pipe(gulp.dest("./app"))
});
//复制json文件
gulp.task('copyjson', function() {
  // 将你要执行的任务代码放在这(压缩文件)
  gulp.src(jsonData)
  .pipe(gulp.dest("./app/mock"))
});
//复制JS文件
gulp.task('copyjs', function() {
  // 将你要执行的任务代码放在这(压缩文件)
  gulp.src(jsFiles)
  .pipe(gulp.dest("./app/prd/script"))
});
//模块化js
/*gulp.task("jsPack",function(){
  gulp.src(jsFiles)
      .pipe(named())
      .pipe(webpack({
        output:{//输出配置
          filename:"[name].js"
        },
        module:{
          loaders:[{
            test:/\.js$/,//正则匹配所有以js结尾的文件
            loader:"imports?define=>false"
          }]
        }
      }))
      .pipe(uglify().on("error",function(e){//压缩过程出现错误输出错误信息和行数
        console.log("\x07",e.lineNumber,e.message);
        return this.end()
      }))
      .pipe(gulp.dest("./app/prd/script"))
})*/
//监听文件
gulp.task('watch', function() {
  gulp.watch("./src/js/*.js",["copyjs"])
  gulp.watch("./src/css/**/*.css",["minifyCss"])
  gulp.watch("./mock/*.json",["copyjson"])
  gulp.watch("index.html",["copyhtml"])
});
gulp.task("default",["webserver","watch"])
