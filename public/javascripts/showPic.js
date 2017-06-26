var rootURL = "http://111.207.243.71:5555"

$(document).ready(function () {

    // input the example questions
    $(".example-pic").click(function () {

        $("#before-img").attr("src","")
        $("#after-img").attr("src","")

        img_src = $(this).attr("src")
        $("#before-img").attr("src",img_src)

        $(".back-container").css("display","block");
        console.log("http://111.207.243.72:3000/"+img_src)

        datatosend = {
            "urlPic": "http://111.207.243.72:3000/"+img_src
        }

        $.ajax({
            type: "post",
            url: rootURL + "/goods_counter/goods_pic",
            async: true,
            data: datatosend,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                $(".back-container").css("display","none")
                urlpic = data.urlPic;
                console.log("absolute url:"+urlpic)
                $("#after-img").attr("src","http://111.207.243.71:5555/goods_counter/get_uploaded_image/"+urlpic);
                // var url_route = urlpic.split("/")
                // pic_route = "/revFile/"+url_route[url_route.length-1]
                // console.log("relative url:"+pic_route)
                // $("#after-img").attr("src",pic_route)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });

    })

    // submit request questions
    $("#upload-pic").click(function(){
        $("#btn-file").click();
    });

    $("#btn-file").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        console.log("objUrl = "+objUrl) ;
        if (objUrl) {
            $("#before-img").attr("src", objUrl) ;
        }
    });

    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }

    var wrapForm = "<form id='myupload'"+" action='"+rootURL+"/goods_counter/goods_pic'"+" method='post' enctype='multipart/form-data'></form>"
    $("#btn-file").wrap(wrapForm);
    $("#btn-file").on("change",function(){
        $("#myupload").ajaxSubmit({
            dataType:  'json',
            success: function(data) {
                urlpic = data.urlPic;
                console.log("absolute url:"+urlpic)
                $("#after-img").attr("src","http://111.207.243.71:5555/goods_counter/get_uploaded_image/"+urlpic);
            },
            error:function(xhr){ //fail to upload
                var a=JSON.stringify(xhr);
                alert(a)
                console.log(xhr.responseText); //return the error msg
            }
        });
    });
})