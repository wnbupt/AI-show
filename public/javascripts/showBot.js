$(document).ready(function () {

    // input the example questions
    $(".question-list").click(function () {
        text = $(this).text()
        $('#input-box').val(text)
    })

    // submit request questions
    $("#sub-btn").click(function () {
        // ajax request
    })

    // clear the input box
    $("#clear-btn").click(function () {
        $('#input-box').val("")
    })
})