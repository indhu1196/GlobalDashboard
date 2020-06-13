
$(function () {
    var dates = [], totCases = [], canAdd, countries = [], alldata, i, countrycode = {}, deaths =[], popltn = [];
    var totArr = [], noofbeds = [];
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

            totArr[1].forEach(function(key, value) {
                dates.push(key["date"]);
                totCases.push(parseInt(key["total_cases"]));
                deaths.push(parseInt(key["total_deaths"]));
                noofbeds.push(parseInt(key["hospital_beds_per_100k"]));
                popltn.push(parseInt(key["population"]));
            });
           
            console.log(data);

            if(screen.width <= 767) {
                stepValue = { step: 10};
            } else {
                stepValue = { step: 0};  
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
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            // alert('Category: ' + this.category + ', value: ' + this.y);
                            console.log(popltn[dates.indexOf(this.category)])
                            $("p#deaths").text(deaths[dates.indexOf(this.category)]);
                            $("p#nobeds").text(noofbeds[dates.indexOf(this.category)]);
                            $("p#popltn").text(popltn[dates.indexOf(this.category)]);
                        }
                    }
                }
            }
        },
        series: [{
            data: totCases,
            name: 'Confirmed Cases'
        }]
    });
    // i = countries.indexOf(selVal)
    $("#selectData").on('change', function(){
        var selVal = $("#selectData option:selected").text();
        console.log(selVal);
        console.log( 'Index : ' + countries.indexOf(selVal) );
        i = countries.indexOf(selVal)
        dates = [];
        totCases = [];
        deaths = [];
        noofbeds = [];
        popltn = [];
        totArr[i].forEach(function(key, value) {
            dates.push(key["date"]);
            totCases.push(parseInt(key["total_cases"]));
            deaths.push(parseInt(key["total_deaths"]));
            noofbeds.push(parseInt(key["hospital_beds_per_100k"]));
            popltn.push(parseInt(key["population"]));

        });
        // console.log(deaths[dates.indexOf(this.category)]);
        // console.log(totArr[i]);
        console.log(noofbeds);
        chart2.series[0].setData(totCases);
    });

});
