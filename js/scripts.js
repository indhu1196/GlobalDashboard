
$(function () {
    var dates = [], totCases = [], canAdd, countries = [], alldata, countrycode = {};
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
            $.each(data, function(index, value){
                res = data[index][0].location
                countries.push(res);
            });
            console.log(countries);
            
            alldata = data;
            canAdd = data.IND;            
            var res = canAdd;
            
            res.forEach(function(key, value) {
                dates.push(key["date"]);
                totCases.push(parseInt(key["total_cases"]));
            });
                console.log(data);
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


    for (var item in alldata) {

        // console.log("item", item);

        // console.log("itemdata", alldata[item][0]["location"])

        countrycode[alldata[item][0]["location"]] = item
        
      }

    // // console.log("alldata", alldata);
    // console.log("selectSpecCountry", selectSpecCountry[0]);
    // console.log("countrycode", countrycode["Aruba"]);
    // console.log("countries", countries);

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