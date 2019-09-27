
var CircuitBreaker = function (settings) {

    function Compare() {
        $.ajax({
            url: settings.ssComparisonUrl,
            data: {
                FirstMonth: settings.FirstMonth, FirstYear: settings.FirstYear,
                SecondMonth: settings.SecondMonth, SecondYear: settings.SecondYear,
                CompareType: 'CIRCUIT_BREAKER'
            },
            success: function (table) {
                $('#comparisonResult').empty().append(table);
                bindCompareDetailsClick();
            },
            error: function (err) {
                $('#comparisonResult').empty().append(err);
            }
        });
    }

    function DisplayMonthData() {
        $.ajax({
            url: settings.ssMonthDataUrl,
            data: { month: settings.FirstMonth, year: settings.FirstYear, comparisonType: "CIRCUIT_BREAKER" },
            success: function (table) {
                $('#firstTable').empty().append(table);
            },
            error: function (err) {
                $('#firstTable').empty().append(err);
            }
        });

        $.ajax({
            url: settings.ssMonthDataUrl,
            data: { month: settings.SecondMonth, year: settings.SecondYear, comparisonType: "CIRCUIT_BREAKER" },
            success: function (table) {
                $('#secondTable').empty().append(table);
                //bindDetailsClick();
            },
            error: function (err) {
                $('#secondTable').empty().append(err);
            }
        });
    }

    function bindDetailsClick() {
        //bind month details value click
        if ($("#firstTable .ss-month-data").length < 1)
            console.log("table is not loaded yet");

        //$("#firstTable .ss-month-data").click(function () {
        $(document).on('click', '#firstTable .ss-month-data', function() {
            console.log("inside bind details click");
            var plannerGroup = $(this).data('pg');
            var voltage = $(this).data('voltage');
            DisplayMonthDetails(plannerGroup, voltage, settings.FirstMonth, settings.FirstYear);
        });

        $(document).on('click', '#secondTable .ss-month-data', function () {
            console.log("inside bind details click");
            var plannerGroup = $(this).data('pg');
            var voltage = $(this).data('voltage');
            DisplayMonthDetails(plannerGroup, voltage, settings.SecondMonth, settings.SecondYear);
        });
    }

    function bindCompareDetailsClick() {

        $(document).on('click', '#comparisonResult .ss-compare-data a', function () {
            //console.log("inside bind details click");
            var sign = $(this).attr('class');
            console.log('sign = ' + sign);
            var plannerGroup = $(this).parent().data('pg');
            var voltage = $(this).data('voltage');
            DisplayComparisonDetails(plannerGroup, voltage, sign);
        });
    }

    function DisplayMonthDetails(plannerGroup, voltage, month, year) {
        console.log("URL: " + settings.DetailsUrl);
        var detailsUrl = settings.DetailsUrl + '?month=' + month + "&year=" + year + "&plannerGroup=" + plannerGroup + "&substation=" +
            voltage + "&type=" + "CIRCUIT_BREAKER" + "&detailsType=" + "Month";
        location.href = detailsUrl;
    }

    function DisplayComparisonDetails(plannerGroup, voltage, sign) {
        var detailsUrl = settings.DetailsUrl + '?FirstMonth=' + settings.FirstMonth + "&SecondMonth=" + settings.SecondMonth +
            "&FirstYear=" + settings.FirstYear + "&SecondYear=" + settings.SecondYear +
            "&PlannerGroup=" + plannerGroup + "&type=" + "CIRCUIT_BREAKER" + "&detailsType=" + "Comparison" + "&Sign=" + sign;
        location.href = detailsUrl;
    }

    return {
        Compare: Compare,
        DisplayMonthData: DisplayMonthData,
        DisplayMonthDetails: DisplayMonthDetails,
        BindDetailsClick: bindDetailsClick
    }
}