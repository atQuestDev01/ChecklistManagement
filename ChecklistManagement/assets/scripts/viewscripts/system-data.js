
//javascript file to manipulate the system data Index.cshtml view

var Index = function () {
    var settings = {
        ssMonthDataUrl: '',
        ssComparisonUrl: '',
        cbMonthDataUrl: '',
        cbComparisonUrl: '',
        ssDetailsUrl: '',
        DetailsUrl: '',
        FirstMonth: '',
        SecondMonth: '',
        FirstYear: '',
        SecondYear: ''
    }

    var compareType = null;

    //Initialize the settings
    function Init() {
        InitDates();
        settings.FirstMonth = $("#firstMonth").val();
        settings.SecondMonth = $("#secondMonth").val();

        settings.FirstYear =  $("#firstYear").val();
        settings.SecondYear = $("#secondYear").val();

        var selectedCompareType = $("#ddlCompareType").val();
        if (selectedCompareType == "Substation")
            compareType = new Substation(settings);
        else
            compareType = new CircuitBreaker(settings);
      
        bindEvents();
    };

    function InitDates() {

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear() -1; //remove -1 in production 

        for (i = year ; i >= 2013; i--) {
            $('#firstYear, #secondYear').append($('<option />').val(i).html(i));
        }

        //var date = new Date();
        //$("#secondMonth").val(date.getMonth() + 1);
        //date.setMonth(date.getMonth() - 1);
        //$("#firstMonth").val(date.getMonth() + 1);
    }

    function bindEvents() {

        //compare button click event
        $("#btnCompare").click(function () {
            if (compareType != null) {
                compareType.DisplayMonthData();
                compareType.Compare();
                compareType.BindDetailsClick();
            }

            $('.fMonthTitle').text($("#firstMonth option:selected").text());
            $('.fYearTitle').text(settings.FirstYear);

            $('.sMonthTitle').text($("#secondMonth option:selected").text());
            $('.sYearTitle').text(settings.SecondYear);
        });

        //compare type dropdown list change
        $("#ddlCompareType").change(function () {
            var compare = $(this).val();
            if (compare == "Substation")
                compareType = new Substation(settings);
            else if (compare == "CircuitBreaker")
                compareType = new CircuitBreaker(settings);
            //$("#btnCompare").trigger('click');
        });

        //bind month and year changes
        $("#firstMonth").change(function () {
            settings.FirstMonth = $(this).val();
        });
        $("#secondMonth").change(function () {
            settings.SecondMonth = $(this).val();
        });

        $("#firstYear").change(function () {
            settings.FirstYear = $(this).val();
        });
        $("#secondYear").change(function () {
            settings.SecondYear = $(this).val();
        });
    }

    return {
        Init: Init,
        settings: settings
    }
};
