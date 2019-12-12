 //控制层 
app.controller('payController' ,function($scope,$controller   ,payService){
	
	$controller('baseController',{$scope:$scope});//继承
	
	$scope.creatNative =function () {
		payService.creatNative().success(
			function (response) {
                new QRious({
                    element:document.getElementById("qrious"),
                    size:250,
                    level:'H',
                    value:response.qrcode
                })

                queryPayStatus(response.out_trade_no);//查询支付状态

            }
		)
    }

    //获取金额
    $scope.getMoney=function(){
        return $location.search()['money'];
    }

    //查询支付状态
    queryPayStatus=function(out_trade_no){
        payService.queryPayStatus(out_trade_no).success(
            function(response){
                if(response.success){
                    location.href="paysuccess.html#?money="+$scope.money;
                }else{
                    if(response.message=='二维码超时'){
                        $scope.createNative();//重新生成二维码
                    }else{
                        location.href="payfail.html";
                    }
                }
            }
        );
    }




});	