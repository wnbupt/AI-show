$(document).ready(function () {

    // input the example questions
    $(".question-list").click(function () {
        text = $(this).text()
        $('#input-box').val(text)
    });

    // submit request questions
    $(document).on('click','#sub-btn',function(){
        // ajax request
        var datatosend =
        {
            "userQuestion":$('#input-box').val(),
            "appId":0
        }
        $(".panel-body").empty()
        $.ajax({
            type: "get",
            url: "http://111.207.243.70:81/dl/predict",
            async: true,
            data: datatosend,
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                console.log(data)
                var qs_list = data.questionList
                var qs_html = ""
                for(qs of qs_list)
                {
                    qs_html += "<p>" + qs + "</p>"
                }
                $(".panel-body").append($(qs_html))
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    });

    // clear the input box
    $("#clear-btn").click(function () {
        $('#input-box').val("")
    });
})