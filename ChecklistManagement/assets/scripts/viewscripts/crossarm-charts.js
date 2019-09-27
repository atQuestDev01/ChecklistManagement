


function fetchData(url, data, drawChart) {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json;chartset=utf8",
        url: url,
        data: data,
        success: function (response) {
            drawChart(response);
        },
        error: function (err) {
             
        }
    });
}