var rootURL = "http://111.207.243.71:5556"
var urlpic = ""

$(document).ready(function () {

    // input the example questions
    $(".example-pic").click(function () {

        $("#before-img").attr("src","")
        $("#after-img").attr("src","")

        img_src = $(this).attr("src")
        $("#before-img").attr("src",img_src)

        datatosend = {
            "urlPic": "http://111.207.243.72:3000/"+img_src
        }
        console.log(datatosend)

        datatosend = JSON.stringify(datatosend)

        $.ajax({
            type: "post",
            url: rootURL + "/neural_style/urlpic",
            async: true,
            data: datatosend,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                urlpic = data.urlPic;
                console.log("absolute url:"+urlpic)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    });

    // submit request questions
    $("#upload-pic").click(function(){
        $("#btn-file").click();
    });

    $("#btn-file").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        console.log("objUrl = "+objUrl) ;
        if (objUrl) {
            $("#before-img").attr("src","")
            $("#after-img").attr("src","")
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

    // upload files and send the first request
    var formUrl = rootURL+"/neural_style/urlpic";
    var wrapForm = "<form id='myupload'"+" action='"+ formUrl +"' method='post' enctype='multipart/form-data'></form>"
    $("#btn-file").wrap(wrapForm);
    $("#btn-file").on("change",function(){
        $(".back-container").css("display","block");
        $("#myupload").ajaxSubmit({
            dataType:  'json',
            success: function(data) {
                $(".back-container").css("display","none");
                urlpic = data.urlPic;
                console.log(urlpic)
            },
            error:function(xhr){ //fail to upload
                var a=JSON.stringify(xhr);
                alert(a)
                console.log(xhr.responseText); //return the error msg
            }
        });
    });

    // send the second request,contains url pic and style
    $("#sub-btn").click(function () {
        $(".back-container").css("display","block");
        var datatosend =
        {
          "urlPic":urlpic,
          "style":$('input[name="style"]:checked').val()
        }
        console.log(datatosend)

        datatosend = JSON.stringify(datatosend)
        $.ajax({
            type: "post",
            url: rootURL + "/neural_style/urlpic_out",
            async: true,
            data: datatosend,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                urlpic = data.urlPic_out;
                console.log("absolute url:"+urlpic)
                $("#after-img").attr("src",rootURL+"/neural_style/get_uploaded_image/"+urlpic);
                $(".back-container").css("display","none")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });

    })
})