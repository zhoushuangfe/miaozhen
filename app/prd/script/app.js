//定义模块
var myApp=angular.module("myApp",[]);
myApp.controller("myController",function($scope,$interval,$http){

	//封装小方块渲染个数
	$scope.num=function(index){
		var len=$scope.data[index].products.length;
			var arrs=[]
			for(var i=0;i<len;i++){
				arrs.push(i)
			}
			console.log(arrs);
			$scope.arrs=arrs
	};
	//变化封装
	$scope.change=function(){
			$("#content").animate({"width":0});
			$("#product-page").animate({"opacity":1});
			$scope.btnclass="jiantou-two";
			$("#btn").animate({"left":"170px"});
			$("#pageNo span").eq(0).addClass("curp").siblings().removeClass("curp");
	}
	//点击箭头
	$scope.btnclass="jiantou";
	$scope.jian=function(){
		if($("#btn").hasClass("jiantou")){
			$scope.num(0);
			$scope.change();
		}else{
			$("#content").animate({"width":"1000px"});
			$("#product-page").animate({"opacity":0});
			$scope.btnclass="jiantou";
			$("#btn").animate({"left":"970px"})
		}
	};
	//图片轮播
	$scope.znum=0;
	var timer=$interval(function(){
			if($scope.znum==0){
				$scope.znum=1;	
			}else{
				$scope.znum=0;	
			}
		},3000)
	//渲染
	$http.get("mock/data.json")
		.then(function(response){
			$scope.data=response.data;	
		 	for(var i=0;i<$scope.data.length;i++){
		 		$scope.arr=[];
		 		var len=$scope.data[i].products.length,
		 			temp=$scope.data[i].template_type,
		 			count=Math.ceil(len/temp);
		 			for(var  j=0;j<count;j++){ 
		 				$scope.arr[j]=[];

		 				for(var k=j*temp;k<=(j+1)*temp-1;k++){
		 					$scope.arr[j].push($scope.data[i].products[k]);
		 				}
		 			}
		 			//判断是否有undefined
		 			for(var m=0;m<$scope.arr.length;m++){
		 				for(var n=0;n<$scope.arr[m].length;n++){
		 					console.log($scope.arr[m].length)
		 					if($scope.arr[m][n]==undefined){
		 						$scope.arr[m][n]={
		 							summary:"敬请期待"
		 						}
		 					}
		 				}
		 			}

		 			$scope.data[i].products=$scope.arr;
		 			//console.log($scope.arr);
		 	}
		 	//点击小方块
		 	$scope.aspan=function(a){
		 		console.log(a);
		 		var w=-$(".product-pic-box").height()-12;
		 		$("#scroll").animate({"marginTop":w*a})
		 		$("#pageNo span").eq(a).addClass("curp").siblings().removeClass("curp");

		 	}

		})
	
	//产品页优化和检测加事件
	$scope.aName=function(index){
		$scope.num(index);
		$(".product-type").eq(index).addClass("cur-type").siblings().removeClass("cur-type");
		$("#scroll").css({"marginTop":0});
		$("#pageNo span").eq(0).addClass("curp").siblings().removeClass("curp");
		
			
	}
	//外页优化和检测加事件
	$scope.bName=function(index){
		$scope.num(index);
		$scope.change();
		$(".product-type").eq(index).addClass("cur-type").siblings().removeClass("cur-type");
		$("#scroll").animate({"marginTop":0});
	}	
})