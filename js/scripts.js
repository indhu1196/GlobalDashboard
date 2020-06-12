$(function () {
    var dates = [], totCases = [], canAdd, countries = [], alldata;
    var IND = [];
    var tt= [], statesDate = [], allIndiaData = [], arr = ["Confirmed","Recovered"];
    var casedesc;
    var hasBeenClicked = false;
    $.ajax ({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'ALLCountriescovid-data.json',
        'success': function(data) {
            alldata = data;
            canAdd = data.ABW;            
            var res = canAdd;
            countries.push(res[0].location)
            res.forEach(function(key, value) {
                dates.push(key["date"]);
                totCases.push(parseInt(key["total_cases"]));
            });
                console.log(data);
            // console.log(an);
            if(screen.width <= 767) {
                stepValue = { step: 10};
            } else {
                stepValue = { step: 20};  
            }
        }
    
    });

    var selectSpecCountry = _.filter(alldata, function(obj){
        // console.log("obj", obj);
        return obj[0]["location"] === "Aruba"
    })
    // console.log("alldata", alldata);
    console.log("selectSpecCountry", selectSpecCountry[0]);
    


    var chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
        },
        title: {
            text: 'Global chart'
        },
        credits: {enabled: false},
        xAxis: {
        type: 'datetime',
        tickPixelInterval: 400,
        categories : dates,
        labels:  stepValue
        },
        series: [{
            data: totCases,
            name: 'Confirmed Cases'
        }]
    });
    // The select action
    $("#selectData").on('change', function(){
        var selVal = $("#selectData").val();
        if(selVal == "ABW" || selVal == '') {
            
            chart2.series[0].setData();
        }
        else if (selVal == "IND") {
            canAdd = data.IND
        }
    });    

});
