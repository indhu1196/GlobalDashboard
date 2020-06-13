function formatDate(datestring){

    const date = new Date(datestring)
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date ) 
    // console.log(day+ ", " + month + " "+ year)
    return day+ ", " + month + " "+ year



}
formatDate("2020-06-01")
$(function () {
    Highcharts.setOptions({
        lang: {
        thousandsSep: ','
        }
    });
    var datesDisp = [], dates = [], totCases = [],  countries = [], alldata, i, countrycode = {}, deaths =[], popltn = [];
    var totArr = [], noofbeds = [], handwash = [], sixtyold = [], seventyold = [], maleSmoker = [], femaleSmoker = [], capita = [], 
    stringInd = [], diabetesPre = [], totTest = [];
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
                dates.push(formatDate(key["date"]));
                // datesDisp.push(formatDate(key["date"]));
                totCases.push(parseInt(key["total_cases"]));
                deaths.push(parseInt(key["total_deaths"]));
                noofbeds.push(parseInt(key["hospital_beds_per_100k"]));
                popltn.push(parseInt(key["population"]));
                sixtyold.push(parseInt(key["aged_65_older"]));
                seventyold.push(parseInt(key["aged_70_older"]));
                handwash.push(parseInt(key["handwashing_facilities"]));
                maleSmoker.push(parseInt(key["male_smokers"]));
                femaleSmoker.push(parseInt(key["female_smokers"]));
                capita.push(parseInt(key["gdp_per_capita"]));
                stringInd.push(parseInt(key["stringency_index"]));
                diabetesPre.push(parseInt(key["diabetes_prevalence"]));
                totTest.push(parseInt(key["total_tests"]));
            });
           
            // console.log(data);
            $("#deaths").text((deaths[deaths.length - 1]).toLocaleString());
            $("#nobeds").text((noofbeds[noofbeds.length - 1]).toLocaleString());
            $("#popltn").text((popltn[popltn.length - 1]).toLocaleString());
            $("#sixtyold").text((sixtyold[sixtyold.length - 1]).toLocaleString());
            $("#seventyold").text((seventyold[seventyold.length - 1]).toLocaleString())
            $("#handwash").text((handwash[handwash.length - 1]).toLocaleString());
            $("#maleSmoker").text((maleSmoker[maleSmoker.length - 1]).toLocaleString());
            $("#femaleSmoker").text((femaleSmoker[femaleSmoker.length - 1]).toLocaleString());
            $("#total-cases").text((totCases[totCases.length - 1]).toLocaleString());
            $("#capita").text((capita[capita.length - 1]).toLocaleString());
            $("#string").text((stringInd[stringInd.length - 1]).toLocaleString());
            $("#diabetes").text((diabetesPre[diabetesPre.length - 1]).toLocaleString());
            $("#total-tests").text((totTest[totTest.length - 1]).toLocaleString());
            $("#seldate").text(formatDate(dates[dates.length - 1]))
            
            if(screen.width <= 767) {
                stepValue = { step: 52};
            } else {
                stepValue = { step: 22};  
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
            text: ''
        },
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            // tickPixelInterval: 400,
            categories : dates,
            // min: minDate,
            // max: maxDate,
            labels:  stepValue,        
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            // alert('Category: ' + this.category + ', value: ' + this.y);
                            $("#deaths").text(deaths[dates.indexOf(this.category)]);
                            $("#nobeds").text(noofbeds[dates.indexOf(this.category)]);
                            $("#popltn").text(popltn[dates.indexOf(this.category)]);
                            $("#sixtyold").text(sixtyold[dates.indexOf(this.category)]);
                            $("#seventyold").text(seventyold[dates.indexOf(this.category)]);
                            $("#handwash").text(handwash[dates.indexOf(this.category)]);
                            $("#maleSmoker").text(maleSmoker[dates.indexOf(this.category)]);
                            $("#femaleSmoker").text(femaleSmoker[dates.indexOf(this.category)]);
                            $("#total-cases").text(this.y);
                            $("#capita").text(capita[dates.indexOf(this.category)]);
                            $("#string").text(stringInd[dates.indexOf(this.category)]);
                            $("#diabetes").text(diabetesPre[dates.indexOf(this.category)]);
                            $("#total-tests").text(totTest[dates.indexOf(this.category)]);
                            $("#seldate").text(formatDate(datesDisp[dates.indexOf(this.category)]))
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
    $("#selectData").on('change', function(){
        var selVal = $("#selectData option:selected").text();
        // console.log(selVal);
        // console.log( 'Index : ' + countries.indexOf(selVal) );
        i = countries.indexOf(selVal)
        dates = [], totCases = [] , handwash = [], deaths = [], noofbeds = [], popltn = [], sixtyold = [], seventyold = [], maleSmoker =[], 
        femaleSmoker = [], capita = [], stringInd = [], diabetesPre = [], totTest = [];
        totArr[i].forEach(function(key, value) {
            dates.push(formatDate(key["date"]));
            // datesDisp.push(key["date"]);
            totCases.push(parseInt(key["total_cases"]));
            deaths.push(parseInt(key["total_deaths"]));
            noofbeds.push(parseInt(key["hospital_beds_per_100k"]));
            popltn.push(parseInt(key["population"]));
            sixtyold.push(parseInt(key["aged_65_older"]));
            seventyold.push(parseInt(key["aged_70_older"]));
            handwash.push(parseInt(key["handwashing_facilities"]));
            maleSmoker.push(parseInt(key["male_smokers"]));
            femaleSmoker.push(parseInt(key["female_smokers"]));
            capita.push(parseInt(key["gdp_per_capita"]));
            stringInd.push(parseInt(key["stringency_index"]));
            diabetesPre.push(parseInt(key["diabetes_prevalence"]));
            totTest.push(parseInt(key["total_tests"]));
        });
        // console.log(deaths[dates.indexOf(this.category)]);
        // console.log(totArr[i]);
        // console.log(noofbeds);
        chart2.series[0].setData(totCases);
        $("#deaths").text((deaths[deaths.length - 1]).toLocaleString());
        $("#nobeds").text((noofbeds[noofbeds.length - 1]).toLocaleString());
        $("#popltn").text((popltn[popltn.length - 1]).toLocaleString());
        $("#sixtyold").text((sixtyold[sixtyold.length - 1]).toLocaleString());
        $("#seventyold").text((seventyold[seventyold.length - 1]).toLocaleString())
        $("#handwash").text((handwash[handwash.length - 1]).toLocaleString());
        $("#maleSmoker").text((maleSmoker[maleSmoker.length - 1]).toLocaleString());
        $("#femaleSmoker").text((femaleSmoker[femaleSmoker.length - 1]).toLocaleString());
        $("#total-cases").text((totCases[totCases.length - 1]).toLocaleString());
        $("#capita").text((capita[capita.length - 1]).toLocaleString());
        $("#string").text((stringInd[stringInd.length - 1]).toLocaleString());
        $("#diabetes").text((diabetesPre[diabetesPre.length - 1]).toLocaleString());
        $("#total-tests").text((totTest[totTest.length - 1]).toLocaleString());
        $("#seldate").text(formatDate(dates[dates.length - 1]))
  });

});
