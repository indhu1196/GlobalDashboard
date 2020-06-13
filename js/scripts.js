
$(function () {
    var dates = [], totCases = [], canAdd, countries = [], alldata, i, countrycode = {};
    var totArr = [];
    $.ajax ({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'ALLCountriescovid-data.json',
        'success': function(data) {           
            $.each(data, function(index, value){
                res = data[index][0].location
                countries.push(res);
            });
            $.each(data, function(index, value){
                res = data[index]
                totArr.push(res);
            });
            
            alldata = data;

            totArr[0].forEach(function(key, value) {
                dates.push(key["date"]);
                totCases.push(parseInt(key["total_cases"]));
            });
           
                console.log(data);
            if(screen.width <= 767) {
                stepValue = { step: 10};
            } else {
                stepValue = { step: 10};  
            }
        }
    
    });


    for (var item in alldata) {
        countrycode[alldata[item][0]["location"]] = item        
      }

    var selectSpecCountry = _.filter(alldata, function(obj){
        return obj[0]["location"] === "Aruba"
    })

    //create the dropdown from data
    var select = d3.select("#selectData")

    select.selectAll('option')
            .data(countries).enter()
            .append('option')
            .attr("value", function (d) { 
                    return countrycode[d]; 
                })
            .attr("selected", function (d) { 
                    if(d === "India"){
                        return "selected"
                    }
                    
            })
            .text(function(d){
                // console.log(d);
                return d
            })

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
    
    $("#selectData").on('change', function(){
        var selVal = $("#selectData option:selected").text();
        console.log(selVal);
        console.log( 'Index : ' + countries.indexOf(selVal) );
        i = countries.indexOf(selVal)
        dates = [];
        totCases = [];
        totArr[i].forEach(function(key, value) {
            dates.push(key["date"]);
            totCases.push(parseInt(key["total_cases"]));
        });
        // console.log(totArr[i]);
        chart2.series[0].setData(totCases);
        // console.log(dates)
    });
});
