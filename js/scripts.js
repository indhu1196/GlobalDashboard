
$(function () {
    var dates = [], totCases = [], canAdd, countries = [], alldata, countrycode = {};
    var IND = [];
    var shortCodes = ["ABW","AFG","AGO","AIA","ALB","AND","ARE","ARG","ARM","ATG","AUS","AUT","AZE","BDI","BEL","BEN","BES","BFA","BGD","BGR","BHR","BHS","BIH","BLR","BLZ","BMU","BOL","BRA","BRB","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","COM","CPV","CRI","CUB","CUW","CYM","CYP","CZE","DEU","DJI","DMA","DNK","DOM","DZA","ECU","EGY","ERI","ESH","ESP","EST","ETH","FIN","FJI","FLK","FRA","FRO","GAB","GBR","GEO","GGY","GHA","GIB","GIN","GMB","GNB","GNQ","GRC","GRD","GRL","GTM","GUM","GUY","HKG","HND","HRV","HTI","HUN","IDN","IMN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JEY","JOR","JPN","KAZ","KEN","KGZ","KHM","KNA","KOR","KWT","LAO","LBN","LBR","LBY","LCA","LIE","LKA","LSO","LTU","LUX","LVA","MAR","MCO","MDA","MDG","MDV","MEX","MKD","MLI","MLT","MMR","MNE","MNG","MNP","MOZ","MRT","MSR","MUS","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","OWI", "PAN","PER","PHL","PNG","POL","PRI","PRT","PRY","PSE","PYF","QAT","ROU","RUS","RWA","SAU","SDN","SEN","SGP","SLE","SLV","SMR","SOM","SRB","SSD","STP","SUR","SVK","SVN","SWE","SWZ","SXM","SYC","SYR","TCA","TCD","TGO","THA","TJK","TLS","TTO","TUN","TUR","TWN","TZA","UGA","UKR","URY","USA","UZB","VAT","VCT","VEN","VGB","VIR","VNM","XKX","YEM","ZAF","ZMB", "ZWE"];
    var ABW = [], AFG = [], AGO = [], AIA = [], ALB = [], AND = [], ARE = [], ARG = [], ARM = [], ATG = [], AUS = [], AUT = [], AZE = [], BDI = [], BEL = [], BEN = [], BES = [], BFA = [], BGD = [], BGR = [], BHR = [], BHS = [], BIH = [], BLR = [], BLZ = [], BMU = [], BOL = [], BRA = [], BRB = [], BRN = [], BTN = [], BWA = [], CAF = [], CAN = [], CHE = [], CHL = [], CHN = [], CIV = [], CMR = [], COD = [], COG = [], COL = [], COM = [], CPV = [], CRI = [], CUB = [], CUW = [], CYM = [], CYP = [], CZE = [], DEU = [], DJI = [], DMA = [], DNK = [], DOM = [], DZA = [], ECU = [], EGY = [], ERI = [], ESH = [], ESP = [], EST = [], ETH = [], FIN = [], FJI = [], FLK = [], FRA = [], FRO = [], GAB = [], GBR = [], GEO = [], GGY = [], GHA = [], GIB = [], GIN = [], GMB = [], GNB = [], GNQ = [], GRC = [], GRD = [], GRL = [], GTM = [], GUM = [], GUY = [], HKG = [], HND = [], HRV = [], HTI = [], HUN = [], IDN = [], IMN = [], IND = [], IRL = [], IRN = [], IRQ = [], ISL = [], ISR = [], ITA = [], JAM = [], JEY = [], JOR = [], JPN = [], KAZ = [], KEN = [], KGZ = [], KHM = [], KNA = [], KOR = [], KWT = [], LAO = [], LBN = [], LBR = [], LBY = [], LCA = [], LIE = [], LKA = [], LSO = [], LTU = [], LUX = [], LVA = [], MAR = [], MCO = [], MDA = [], MDG = [], MDV = [], MEX = [], MKD = [], MLI = [], MLT = [], MMR = [], MNE = [], MNG = [], MNP = [], MOZ = [], MRT = [], MSR = [], MUS = [], MWI = [], MYS = [], NAM = [], NCL = [], NER = [], NGA = [], NIC = [], NLD = [], NOR = [], NPL = [], NZL = [], OMN = [], OWID_WRL = [], PAN = [], PER = [], PHL = [], PNG = [], POL = [], PRI = [], PRT = [], PRY = [], PSE = [], PYF = [], QAT = [], ROU = [], RUS = [], RWA = [], SAU = [], SDN = [], SEN = [], SGP = [], SLE = [], SLV = [], SMR = [], SOM = [], SRB = [], SSD = [], STP = [], SUR = [], SVK = [], SVN = [], SWE = [], SWZ = [], SXM = [], SYC = [], SYR = [], TCA = [], TCD = [], TGO = [], THA = [], TJK = [], TLS = [], TTO = [], TUN = [], TUR = [], TWN = [], TZA = [], UGA = [], UKR = [], URY = [], USA = [], UZB = [], VAT = [], VCT = [], VEN = [], VGB = [], VIR = [], VNM = [], XKX = [], YEM = [], ZAF = [], ZMB = [], ZWE = [];
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
            // for(i = 0; i < countryCode.length; i++ ) {
            //     canAdd = data.countryCode[i];
            // }
            
             // var res = canAdd;
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
