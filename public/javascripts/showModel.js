var rootURL = "http://111.207.243.72:5555"
var urlpic = ""

$(document).ready(function () {

    // input the example questions
    $(".example-pic").click(function () {
        urlpic = '/home/xinlu/app/public/' + $(this).attr("src")
        $(".choose-image-active").removeClass("choose-image-active")
        $(this).addClass("choose-image-active")
    });

    $("#upload-pic").click(function () {
        $("#btn-file").click();
    });

    // upload files and send the first request
    var formUrl = rootURL+"/neural_style/urlpic";
    var wrapForm = "<form id='myupload'"+" action='"+ formUrl +"' method='post' enctype='multipart/form-data'></form>"
    $("#btn-file").wrap(wrapForm);
    $("#btn-file").on("change",function(){
        $("#myupload").ajaxSubmit({
            dataType:  'json',
            success: function(data) {
                urlpic = data.urlPic;
                var url_route = urlpic.split("/")
                pic_route = "/sendFile/"+url_route[url_route.length-1];
                $("#before-img").attr("src",pic_route)
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
                $(".back-container").css("display","none")
                urlpic = data.urlPic_out;
                console.log("absolute url:"+urlpic)

                var url_route = urlpic.split("/")
                pic_route = "/revFile/"+url_route[url_route.length-1]
                console.log("relative url:"+pic_route)
                $("#after-img").attr("src",pic_route)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });

    })
})