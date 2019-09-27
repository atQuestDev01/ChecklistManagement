
var Substation = function (settings) {

    function Compare() {
        $.ajax({
            url: settings.ssComparisonUrl,
            data: {
                FirstMonth: settings.FirstMonth, FirstYear: settings.FirstYear,
                SecondMonth: settings.SecondMonth, SecondYear: settings.SecondYear,
                CompareType: 'SUBSTATION'
            },
            success: function (table) {
                $('#comparisonResult').empty().append(table);
            },
            error: function (err) {
                $('#comparisonResult').empty().append(err);
            }
        });
    }

    function DisplayMonthData() {
        $.ajax({
            url: settings.ssMonthDataUrl,
            data: { month: settings.FirstMonth, year: settings.FirstYear, comparisonType: "SUBSTATION" },
            success: function (table) {
                $('#firstTable').empty().append(table);
            },
            error: function (err) {
                $('#firstTable').empty().append(err);
            }
        });

        $.ajax({
            url: settings.ssMonthDataUrl,
            data: { month: settings.SecondMonth, year: settings.SecondYear, comparisonType: "SUBSTATION" },
            success: function (table) {
                $('#secondTable').empty().append(table);
            },
            error: function (err) {
                $('#secondTable').empty().append(err);
            }
        });
    }

    function bindDetailsClick() {

    }

    return {
        Compare: Compare,
        DisplayMonthData: DisplayMonthData,
        BindDetailsClick: bindDetailsClick
    }
}