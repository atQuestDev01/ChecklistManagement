
//script for populating and controlling the SGM Dashboard reports (workorder, notification, etc)

var DashboardReport = function () {

    var url = window.location.href;
    var stateParam = getParameterByName('State', url);
    var dataParam = getParameterByName('Data', url);
    var accumPara = getParameterByName('Accumulation', url);
    var monthFromParam = getParameterByName('MonthFrom', url);
    var yearParam = getParameterByName('Year', url);
    var startDateParam = getParameterByName('StartDate', url);
    var endDateParam = getParameterByName('EndDate', url);

    function Init() {

        //initilize date format for inputs
        $("#startDate, #endDate").datepicker({
            format: 'dd M yyyy',
            autoclose: true
        });

        //initialise Year dropdown
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        $('#ddlYear').empty();
        for (i = year ; i >= year - 7; i--) {
            $('#ddlYear').append($('<option />').val(i).html(i));
        }

        //bind the accumulation change to the dropdown list 
        $("#ddlAccumulation").on('change', function () {
            AccumulationChange();
        });


    }

    function InitializeDropDowns() {
        if (accumPara == "" || accumPara == null)
            accumPara = "YearToDate";

        if (accumPara == "YearToDate")
            $("#monthYearDiv").hide();

        if (stateParam == "All States" || stateParam == "" || stateParam == null) {
            setStateValue(dataParam);
            $("#ddlWorkCenter").val('ALL'); //for NotificationReport and WorkOrderReport
            $("#ddlPlant").val('ALL'); // for EmergencyReport and TrippingReport
        }
        else {
            setStateValue(stateParam);
            $("#ddlWorkCenter").val(dataParam);
            $("#ddlPlant").val(dataParam);
        }

        $("#ddlAccumulation").val(accumPara);
        $("#ddlMonthFrom").val(monthFromParam);
        $("#ddlYear").val(yearParam);
        $("#startDate").val(startDateParam);
        $("#endDate").val(endDateParam);
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));

    }

    function AccumulationChange() {
        var accumulation = $("#ddlAccumulation").val();
        if (accumulation == "Month") {
            $("#monthYearDiv").show();
        }
        else {
            $("#monthYearDiv").hide();
        }

        if (accumulation == "DateRange") {
            $("#dateRange").show();
        }
        else {
            $("#dateRange").hide();
        }
    }

    function setStateValue(stateParam) {
        $("#ddlState option").each(function () {
            if ($(this).text() == stateParam) {
                $(this).attr('selected', 'selected');
            }
        });
    }

    function ExportToExcel(url, source) {
        var accum = $("#ddlAccumulation").val();
        var state = $("#ddlState").val();
        var equipment = "";
        if (source == "Notification" || source == "WorkOrder")
            equipment = $("#ddlWorkCenter").val();
        else if (source == "Emergency" || source == "Tripping")
            var equipment = $("#ddlPlant").val();

        var year = $("#ddlYear").val();
        var month = $("#ddlMonthFrom").val();
        var exportToExcel = "true";
        url += '?Accumulation=' + accum + "&State=" + state + "&Data=" + equipment + "&MonthFrom=" + month + "&Year=" + year + "&Export=" + exportToExcel+"&StartDate="+startDateParam +"&EndDate=" + endDateParam;

        window.location.href = url;
    }

    return {
        InitializeDropDowns: InitializeDropDowns,
        AccumulationChange: AccumulationChange,
        ExportToExcel: ExportToExcel,
        Init: Init  
    }
}