/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 21.0, "series": [{"data": [[300.0, 1.0], [200.0, 18.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[300.0, 1.0], [200.0, 16.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[300.0, 1.0], [400.0, 3.0], [200.0, 16.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[300.0, 1.0], [200.0, 17.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[200.0, 16.0], [400.0, 2.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1200.0, 1.0], [400.0, 11.0], [200.0, 4.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[700.0, 1.0], [400.0, 10.0], [200.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[700.0, 1.0], [400.0, 10.0], [200.0, 3.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [400.0, 6.0], [500.0, 12.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [400.0, 12.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[37700.0, 1.0], [39300.0, 1.0], [10600.0, 1.0], [11000.0, 1.0], [12700.0, 1.0], [13200.0, 1.0], [53900.0, 1.0], [14300.0, 1.0], [14000.0, 1.0], [14400.0, 1.0], [16100.0, 1.0], [18600.0, 1.0], [19100.0, 1.0], [19400.0, 1.0], [22100.0, 1.0], [5700.0, 1.0], [24400.0, 1.0], [24200.0, 1.0], [102200.0, 1.0], [32000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[8200.0, 1.0], [35000.0, 1.0], [8900.0, 1.0], [9700.0, 1.0], [10100.0, 2.0], [10700.0, 1.0], [44300.0, 1.0], [3000.0, 1.0], [13100.0, 1.0], [3800.0, 1.0], [15800.0, 1.0], [17900.0, 1.0], [4800.0, 1.0], [4900.0, 1.0], [1400.0, 1.0], [24300.0, 1.0], [6400.0, 1.0], [7400.0, 1.0], [7600.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[8400.0, 1.0], [36800.0, 1.0], [37800.0, 1.0], [9500.0, 1.0], [2500.0, 1.0], [10700.0, 1.0], [2600.0, 3.0], [42200.0, 1.0], [3100.0, 1.0], [14200.0, 1.0], [14000.0, 1.0], [14500.0, 1.0], [16400.0, 1.0], [4700.0, 1.0], [19700.0, 1.0], [5500.0, 1.0], [23300.0, 1.0], [24000.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[8700.0, 1.0], [8400.0, 1.0], [35700.0, 1.0], [2700.0, 1.0], [11100.0, 1.0], [49700.0, 1.0], [14500.0, 1.0], [14600.0, 1.0], [59700.0, 1.0], [4100.0, 1.0], [4200.0, 1.0], [19000.0, 1.0], [5000.0, 1.0], [20400.0, 1.0], [20700.0, 1.0], [22200.0, 1.0], [6300.0, 1.0], [1600.0, 1.0], [26200.0, 1.0], [7600.0, 1.0], [30700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8500.0, 1.0], [2200.0, 1.0], [9900.0, 2.0], [10800.0, 1.0], [11700.0, 1.0], [11400.0, 1.0], [11900.0, 1.0], [12300.0, 1.0], [12700.0, 1.0], [12500.0, 1.0], [12600.0, 1.0], [14100.0, 1.0], [4800.0, 1.0], [19200.0, 1.0], [19400.0, 1.0], [18900.0, 1.0], [21400.0, 1.0], [22500.0, 1.0], [23400.0, 1.0], [25600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[8700.0, 1.0], [2100.0, 1.0], [2300.0, 2.0], [10300.0, 2.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [3300.0, 1.0], [3700.0, 1.0], [4200.0, 1.0], [17900.0, 1.0], [19300.0, 1.0], [1300.0, 1.0], [5800.0, 1.0], [6200.0, 1.0], [1600.0, 1.0], [7200.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[9100.0, 1.0], [2200.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [13400.0, 2.0], [3700.0, 1.0], [3800.0, 1.0], [1000.0, 1.0], [4200.0, 1.0], [16800.0, 1.0], [5000.0, 1.0], [1300.0, 1.0], [5600.0, 1.0], [5900.0, 1.0], [25500.0, 1.0], [1700.0, 1.0], [7100.0, 1.0], [7300.0, 1.0], [7900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[2300.0, 2.0], [2200.0, 1.0], [2600.0, 2.0], [10900.0, 1.0], [3000.0, 1.0], [12900.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [15700.0, 1.0], [16200.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [5200.0, 1.0], [5700.0, 1.0], [5900.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [7100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[33900.0, 1.0], [33100.0, 1.0], [9100.0, 1.0], [41300.0, 1.0], [45200.0, 1.0], [50700.0, 1.0], [62500.0, 1.0], [16000.0, 1.0], [19700.0, 1.0], [21400.0, 1.0], [25400.0, 1.0], [24600.0, 1.0], [25300.0, 1.0], [25900.0, 1.0], [26100.0, 1.0], [26600.0, 1.0], [27000.0, 1.0], [28000.0, 1.0], [29100.0, 1.0], [29400.0, 1.0], [31100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[8600.0, 1.0], [33500.0, 1.0], [9600.0, 1.0], [9800.0, 2.0], [10900.0, 1.0], [2700.0, 1.0], [11200.0, 1.0], [11300.0, 1.0], [48800.0, 1.0], [12900.0, 1.0], [15600.0, 1.0], [16100.0, 1.0], [16700.0, 1.0], [18100.0, 1.0], [18800.0, 1.0], [19000.0, 1.0], [21800.0, 1.0], [5400.0, 1.0], [27000.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [2600.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [1600.0, 3.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 3.0], [2000.0, 2.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[2100.0, 3.0], [8500.0, 1.0], [2200.0, 6.0], [4400.0, 1.0], [10000.0, 2.0], [2900.0, 1.0], [7700.0, 1.0], [4000.0, 1.0], [2000.0, 5.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [2500.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [1500.0, 2.0], [3100.0, 1.0], [3200.0, 1.0], [1600.0, 1.0], [1700.0, 4.0], [1800.0, 2.0], [1900.0, 4.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1300.0, 1.0], [700.0, 1.0], [400.0, 8.0], [200.0, 2.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 18.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[2300.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [400.0, 14.0], [200.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[300.0, 1.0], [200.0, 17.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0], [200.0, 18.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1200.0, 1.0], [400.0, 9.0], [200.0, 1.0], [500.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[300.0, 2.0], [1200.0, 1.0], [200.0, 15.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[400.0, 15.0], [200.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[300.0, 1.0], [200.0, 17.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 4.0], [100.0, 16.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [400.0, 11.0], [200.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 3.0], [400.0, 12.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[300.0, 2.0], [200.0, 13.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 17.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 15.0], [400.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[300.0, 2.0], [200.0, 17.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[300.0, 3.0], [200.0, 17.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 18.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[300.0, 2.0], [200.0, 19.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[63100.0, 1.0], [65400.0, 1.0], [68600.0, 2.0], [66000.0, 1.0], [70000.0, 1.0], [73000.0, 1.0], [72000.0, 1.0], [73100.0, 1.0], [72100.0, 1.0], [69900.0, 1.0], [71400.0, 1.0], [72800.0, 1.0], [72500.0, 1.0], [75100.0, 1.0], [77100.0, 1.0], [78600.0, 1.0], [80800.0, 1.0], [89500.0, 1.0], [106500.0, 1.0], [107500.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 8.0], [600.0, 1.0], [200.0, 9.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 12.0], [400.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[200.0, 16.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 18.0], [400.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[300.0, 2.0], [200.0, 18.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [200.0, 17.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 8.0], [400.0, 6.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1300.0, 1.0], [200.0, 5.0], [400.0, 11.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[200.0, 3.0], [400.0, 11.0], [500.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[400.0, 9.0], [200.0, 6.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[400.0, 10.0], [200.0, 4.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [2500.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [1500.0, 2.0], [3100.0, 1.0], [3200.0, 1.0], [1600.0, 1.0], [1700.0, 4.0], [1800.0, 2.0], [1900.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[200.0, 20.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[0.0, 1.0], [1400.0, 1.0], [200.0, 16.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [200.0, 18.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[200.0, 16.0], [400.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[400.0, 2.0], [200.0, 17.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [2600.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [1600.0, 3.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 3.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[200.0, 18.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[200.0, 16.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[0.0, 1.0], [200.0, 17.0], [400.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[63100.0, 1.0], [65400.0, 1.0], [68600.0, 2.0], [66000.0, 1.0], [70000.0, 1.0], [73000.0, 1.0], [72000.0, 1.0], [73100.0, 1.0], [72100.0, 1.0], [69900.0, 1.0], [71400.0, 1.0], [72800.0, 1.0], [72500.0, 1.0], [75100.0, 1.0], [77100.0, 1.0], [78600.0, 1.0], [80800.0, 1.0], [89500.0, 1.0], [106500.0, 1.0], [107500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[600.0, 2.0], [200.0, 2.0], [400.0, 9.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[600.0, 1.0], [400.0, 8.0], [200.0, 3.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [700.0, 1.0], [200.0, 8.0], [400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[600.0, 1.0], [200.0, 9.0], [400.0, 7.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[600.0, 1.0], [200.0, 18.0], [1600.0, 2.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[8500.0, 2.0], [300.0, 3.0], [5100.0, 1.0], [1500.0, 1.0], [200.0, 1.0], [7300.0, 1.0], [500.0, 16.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[9000.0, 2.0], [300.0, 1.0], [400.0, 9.0], [200.0, 1.0], [6700.0, 1.0], [7500.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[400.0, 1.0], [100.0, 20.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 20.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 1.0], [1300.0, 1.0], [100.0, 19.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [11800.0, 1.0], [3800.0, 1.0], [1100.0, 1.0], [300.0, 8.0], [1300.0, 1.0], [5600.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [7400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 4.0], [600.0, 3.0], [1200.0, 1.0], [2900.0, 2.0], [23600.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [1600.0, 3.0], [3500.0, 1.0], [1800.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[8400.0, 1.0], [8700.0, 1.0], [8900.0, 1.0], [9600.0, 1.0], [3000.0, 1.0], [12900.0, 1.0], [13600.0, 1.0], [15400.0, 1.0], [15700.0, 1.0], [4100.0, 1.0], [16400.0, 1.0], [19600.0, 1.0], [6100.0, 1.0], [6000.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [6900.0, 1.0], [7000.0, 1.0], [7100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[2100.0, 3.0], [8500.0, 1.0], [2200.0, 6.0], [4400.0, 1.0], [10000.0, 2.0], [2900.0, 1.0], [7700.0, 1.0], [4000.0, 1.0], [2000.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[200.0, 9.0], [400.0, 6.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[200.0, 15.0], [400.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[200.0, 12.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[400.0, 8.0], [200.0, 4.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 20.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 5.0], [700.0, 1.0], [11500.0, 1.0], [2900.0, 1.0], [12900.0, 1.0], [13800.0, 1.0], [5000.0, 1.0], [5200.0, 1.0], [400.0, 2.0], [1600.0, 1.0], [1900.0, 1.0], [2000.0, 3.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[8800.0, 1.0], [2300.0, 1.0], [9100.0, 1.0], [2400.0, 1.0], [10100.0, 2.0], [2600.0, 1.0], [11000.0, 1.0], [3000.0, 1.0], [12100.0, 1.0], [11800.0, 1.0], [3100.0, 1.0], [12900.0, 1.0], [15400.0, 1.0], [15500.0, 1.0], [20100.0, 1.0], [1300.0, 1.0], [6200.0, 1.0], [2000.0, 2.0], [32600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [41300.0, 1.0], [700.0, 2.0], [11700.0, 1.0], [900.0, 2.0], [79800.0, 1.0], [21500.0, 1.0], [1300.0, 1.0], [5700.0, 2.0], [100300.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [7900.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[8400.0, 1.0], [8800.0, 1.0], [2800.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [3100.0, 2.0], [3500.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [4200.0, 1.0], [4800.0, 1.0], [87800.0, 1.0], [23000.0, 1.0], [24200.0, 1.0], [1700.0, 1.0], [7000.0, 1.0], [7200.0, 1.0], [7500.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[55100.0, 1.0], [56700.0, 1.0], [56100.0, 1.0], [57200.0, 1.0], [58700.0, 1.0], [58800.0, 1.0], [58200.0, 1.0], [61300.0, 1.0], [62700.0, 1.0], [63300.0, 1.0], [62100.0, 1.0], [61500.0, 1.0], [68800.0, 1.0], [69300.0, 1.0], [71400.0, 1.0], [72000.0, 1.0], [71200.0, 1.0], [71600.0, 1.0], [70700.0, 1.0], [19100.0, 1.0], [87900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[8400.0, 1.0], [8900.0, 1.0], [600.0, 8.0], [9400.0, 1.0], [700.0, 3.0], [12200.0, 1.0], [12300.0, 1.0], [13900.0, 1.0], [900.0, 1.0], [18800.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [22100.0, 1.0], [1500.0, 1.0], [1700.0, 4.0], [30900.0, 1.0], [36200.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [52700.0, 1.0], [3300.0, 1.0], [55200.0, 1.0], [3500.0, 1.0], [55500.0, 1.0], [55900.0, 1.0], [58400.0, 1.0], [3700.0, 1.0], [57800.0, 1.0], [59700.0, 1.0], [61000.0, 1.0], [62100.0, 1.0], [62700.0, 1.0], [61500.0, 1.0], [68100.0, 1.0], [68800.0, 1.0], [70700.0, 2.0], [71400.0, 1.0], [4700.0, 1.0], [5800.0, 1.0], [6300.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[600.0, 5.0], [700.0, 2.0], [11200.0, 1.0], [12600.0, 1.0], [800.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 3.0], [1900.0, 2.0], [2100.0, 1.0], [2400.0, 1.0], [2700.0, 1.0], [200.0, 6.0], [3300.0, 1.0], [53800.0, 1.0], [3500.0, 1.0], [4300.0, 1.0], [4400.0, 1.0], [4500.0, 1.0], [300.0, 4.0], [5100.0, 1.0], [5300.0, 1.0], [5200.0, 2.0], [5500.0, 1.0], [6300.0, 1.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[600.0, 3.0], [11000.0, 1.0], [12300.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 2.0], [18600.0, 1.0], [1300.0, 4.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [27800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [2100.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [3100.0, 2.0], [200.0, 3.0], [3400.0, 1.0], [3600.0, 1.0], [4000.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [6000.0, 1.0], [6900.0, 1.0], [7000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[0.0, 1.0], [2400.0, 1.0], [9600.0, 1.0], [2600.0, 1.0], [10300.0, 1.0], [10700.0, 1.0], [12500.0, 1.0], [12300.0, 1.0], [13400.0, 1.0], [14100.0, 1.0], [900.0, 1.0], [14600.0, 1.0], [18200.0, 1.0], [71100.0, 1.0], [4900.0, 1.0], [23000.0, 1.0], [5800.0, 1.0], [23900.0, 1.0], [6700.0, 1.0], [6900.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[8200.0, 1.0], [39400.0, 1.0], [700.0, 2.0], [2900.0, 1.0], [13000.0, 1.0], [54200.0, 1.0], [69200.0, 1.0], [4600.0, 1.0], [5100.0, 1.0], [1300.0, 1.0], [5600.0, 1.0], [5400.0, 1.0], [21900.0, 1.0], [5700.0, 2.0], [6100.0, 1.0], [6800.0, 1.0], [1700.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[200.0, 10.0], [400.0, 8.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1500.0, 1.0], [200.0, 19.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[300.0, 1.0], [1500.0, 1.0], [400.0, 6.0], [200.0, 11.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 107500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 29.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1237.0, "series": [{"data": [[0.0, 1237.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 316.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 539.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 29.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66399746E12, "maxY": 24.672104404567705, "series": [{"data": [[1.66399746E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-29", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-127", "isController": false}, {"data": [[1.66399764E12, 6.653061224489795], [1.66399746E12, 24.628787878787886], [1.66399758E12, 18.60687732342005], [1.66399752E12, 24.672104404567705]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-147", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-125", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-2", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-146", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-120", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-140", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-70", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-30", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-71", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-78", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-75", "isController": false}, {"data": [[1.66399758E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-97", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-98", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-58", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-17", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-39", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-139", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-115", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-114", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-135", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-132", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-130", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-81", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-62", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-63", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-85", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-82", "isController": false}, {"data": [[1.66399758E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-60", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-22", "isController": false}, {"data": [[1.66399758E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-88", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-45", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-67", "isController": false}, {"data": [[1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-86", "isController": false}, {"data": [[1.66399746E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-64", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-43", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399764E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 11.0, "minX": 0.0, "maxY": 107559.0, "series": [{"data": [[18.0, 247.0], [19.0, 238.0], [21.0, 446.6666666666667], [22.0, 234.0], [25.0, 243.85714285714286], [13.0, 291.5], [7.0, 254.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[19.523809523809526, 277.95238095238096]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[18.0, 251.75], [19.0, 248.5], [21.0, 468.6666666666667], [22.0, 242.0], [25.0, 274.1428571428571], [13.0, 295.5], [7.0, 388.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[19.523809523809526, 306.6190476190476]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[18.0, 247.75], [19.0, 251.0], [21.0, 436.0], [22.0, 496.0], [25.0, 272.14285714285717], [13.0, 306.5], [7.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[19.523809523809526, 300.4285714285714]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[18.0, 248.5], [19.0, 238.0], [21.0, 207.66666666666666], [22.0, 236.0], [25.0, 281.42857142857144], [13.0, 298.5], [7.0, 395.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[19.523809523809526, 270.8095238095238]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[18.0, 314.5], [19.0, 244.5], [21.0, 328.3333333333333], [22.0, 259.0], [25.0, 250.14285714285714], [13.0, 762.0], [7.0, 387.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[19.523809523809526, 335.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[18.0, 489.0], [19.0, 375.5], [21.0, 498.3333333333333], [22.0, 509.0], [25.0, 441.14285714285717], [13.0, 733.0], [7.0, 378.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[19.523809523809526, 477.19047619047626]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[18.0, 436.75], [19.0, 248.5], [21.0, 500.6666666666667], [22.0, 452.0], [25.0, 415.85714285714283], [13.0, 610.0], [7.0, 345.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[19.523809523809526, 429.4761904761904]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[18.0, 424.0], [19.0, 486.5], [21.0, 495.3333333333333], [22.0, 457.0], [25.0, 450.71428571428567], [13.0, 617.5], [7.0, 372.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[19.523809523809526, 464.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[18.0, 506.25], [19.0, 495.0], [21.0, 342.6666666666667], [22.0, 466.0], [25.0, 458.00000000000006], [13.0, 516.0], [7.0, 379.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[19.523809523809526, 452.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[18.0, 508.75], [19.0, 488.0], [21.0, 313.3333333333333], [22.0, 480.0], [25.0, 449.7142857142857], [13.0, 509.0], [7.0, 374.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[19.523809523809526, 445.04761904761904]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[19.0, 11086.0], [21.0, 102250.0], [25.0, 22343.368421052637]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[24.523809523809526, 25612.380952380958]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[19.0, 10757.0], [21.0, 17998.0], [25.0, 13280.684210526319]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[24.523809523809526, 13385.14285714286]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[19.0, 7016.0], [21.0, 14019.0], [25.0, 14836.578947368424]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[24.523809523809526, 14425.238095238097]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[19.0, 20458.0], [21.0, 49769.0], [25.0, 15997.894736842103]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[24.523809523809526, 17818.42857142857]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[19.0, 14110.0], [21.0, 18971.0], [25.0, 13885.894736842105]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[24.523809523809526, 14138.714285714286]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[19.0, 5879.0], [21.0, 3099.0], [25.0, 6219.315789473683]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[24.523809523809526, 6054.523809523809]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[19.0, 1320.0], [21.0, 16851.0], [25.0, 6614.947368421053]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[24.523809523809526, 6850.238095238096]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[19.0, 2645.0], [21.0, 1589.0], [25.0, 5979.421052631578]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[24.523809523809526, 5611.571428571428]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[19.0, 21438.0], [21.0, 41366.0], [25.0, 29972.421052631576]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[24.523809523809526, 30108.571428571428]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[19.0, 5452.0], [21.0, 19027.0], [25.0, 16409.578947368424]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[24.523809523809526, 16012.428571428572]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1820.0], [9.0, 1651.0], [10.0, 2031.0], [11.0, 1725.0], [12.0, 1622.0], [13.0, 3122.0], [14.0, 1828.0], [15.0, 1961.0], [16.0, 1779.0], [17.0, 2209.0], [18.0, 1579.0], [19.0, 2055.0], [20.0, 2148.0], [5.0, 2241.0], [21.0, 2666.0], [22.0, 1814.0], [23.0, 1799.0], [24.0, 1904.0], [6.0, 1755.0], [25.0, 1692.0], [7.0, 1903.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[15.0, 1966.857142857143]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[8.0, 6096.0], [19.0, 2296.0], [20.0, 5373.0], [21.0, 2134.0], [23.0, 10053.0], [25.0, 2976.461538461538]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[22.142857142857146, 3726.1428571428573]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[18.0, 2288.5], [19.0, 1855.5], [21.0, 2229.6666666666665], [22.0, 2204.0], [25.0, 2168.5714285714284], [13.0, 2117.5], [7.0, 1688.5]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[19.523809523809522, 2121.428571428571]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[8.0, 918.0], [19.0, 246.0], [20.0, 618.5], [21.0, 490.5], [23.0, 471.0], [25.0, 484.6153846153845]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[22.142857142857146, 527.1904761904761]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[18.0, 317.0], [19.0, 278.0], [21.0, 261.0], [22.0, 260.0], [25.0, 270.85714285714283], [13.0, 230.0], [7.0, 247.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[19.523809523809526, 272.2857142857142]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[8.0, 1703.0], [19.0, 462.0], [20.0, 989.5], [21.0, 463.5], [23.0, 533.0], [25.0, 582.6153846153846]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[22.142857142857146, 708.6190476190477]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[18.0, 324.75], [19.0, 230.0], [21.0, 256.3333333333333], [22.0, 496.0], [25.0, 276.28571428571433], [13.0, 298.5], [7.0, 246.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[19.523809523809526, 288.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[18.0, 242.0], [19.0, 233.0], [21.0, 720.3333333333333], [22.0, 231.0], [25.0, 242.57142857142858], [13.0, 286.0], [7.0, 238.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[19.523809523809526, 312.95238095238096]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[8.0, 528.0], [19.0, 521.0], [20.0, 865.0], [21.0, 491.5], [23.0, 507.0], [25.0, 485.53846153846155]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[22.142857142857146, 529.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[8.0, 416.0], [19.0, 517.0], [20.0, 753.0], [21.0, 254.0], [23.0, 269.0], [25.0, 270.9230769230769]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[22.142857142857146, 340.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 495.0], [9.0, 504.0], [10.0, 462.0], [11.0, 447.0], [12.0, 444.0], [13.0, 478.0], [14.0, 511.0], [15.0, 496.0], [16.0, 477.0], [17.0, 481.0], [18.0, 252.0], [19.0, 495.0], [20.0, 466.0], [5.0, 493.0], [21.0, 492.0], [22.0, 483.0], [23.0, 240.0], [24.0, 485.0], [6.0, 240.0], [25.0, 474.0], [7.0, 506.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[15.0, 448.6190476190476]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[8.0, 406.0], [19.0, 261.0], [20.0, 398.5], [21.0, 256.0], [23.0, 235.0], [25.0, 273.84615384615387]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[22.142857142857146, 294.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 168.0], [9.0, 171.0], [10.0, 172.0], [11.0, 169.0], [12.0, 57.0], [13.0, 187.0], [14.0, 178.0], [15.0, 170.0], [16.0, 53.0], [17.0, 166.0], [18.0, 167.0], [19.0, 196.0], [20.0, 163.0], [5.0, 181.0], [21.0, 200.0], [22.0, 58.0], [23.0, 168.0], [24.0, 194.0], [6.0, 170.0], [25.0, 170.0], [7.0, 58.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[15.0, 153.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[8.0, 598.0], [19.0, 462.0], [20.0, 966.5], [21.0, 489.0], [23.0, 487.0], [25.0, 424.53846153846155]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[22.142857142857146, 503.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[8.0, 617.0], [19.0, 526.0], [20.0, 399.0], [21.0, 384.0], [23.0, 264.0], [25.0, 464.4615384615385]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[22.142857142857146, 458.47619047619054]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[8.0, 367.5], [19.0, 518.0], [20.0, 241.5], [21.0, 355.5], [23.0, 251.0], [25.0, 306.46153846153845]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[22.142857142857146, 318.1904761904762]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [9.0, 242.0], [10.0, 249.0], [11.0, 248.0], [12.0, 252.0], [13.0, 258.0], [14.0, 235.0], [15.0, 255.0], [16.0, 531.0], [17.0, 462.0], [18.0, 234.0], [19.0, 487.0], [20.0, 260.0], [5.0, 477.0], [21.0, 246.0], [22.0, 250.0], [23.0, 240.0], [24.0, 235.0], [6.0, 257.0], [25.0, 237.0], [7.0, 236.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[15.0, 292.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 253.0], [9.0, 243.0], [10.0, 463.0], [11.0, 237.0], [12.0, 471.0], [13.0, 237.0], [14.0, 235.0], [15.0, 243.0], [16.0, 239.0], [17.0, 462.0], [18.0, 250.0], [19.0, 499.0], [20.0, 484.0], [5.0, 240.0], [21.0, 246.0], [22.0, 250.0], [23.0, 271.0], [24.0, 510.0], [6.0, 221.0], [25.0, 242.0], [7.0, 238.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[15.0, 311.1428571428571]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[8.0, 276.5], [19.0, 261.0], [20.0, 339.0], [21.0, 239.5], [23.0, 252.0], [25.0, 271.2307692307692]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[22.142857142857146, 273.76190476190476]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 12.0], [9.0, 14.0], [10.0, 19.0], [11.0, 12.0], [12.0, 12.0], [13.0, 17.0], [14.0, 22.0], [15.0, 15.0], [16.0, 14.0], [17.0, 12.0], [18.0, 11.0], [19.0, 73.0], [20.0, 13.0], [5.0, 16.0], [21.0, 18.0], [22.0, 13.0], [23.0, 19.0], [24.0, 13.0], [6.0, 13.0], [25.0, 13.0], [7.0, 19.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[15.0, 17.61904761904762]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[8.0, 281.5], [19.0, 261.0], [20.0, 232.5], [21.0, 251.5], [23.0, 237.0], [25.0, 273.61538461538464]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[22.142857142857146, 265.99999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 59.0], [9.0, 70.0], [10.0, 61.0], [11.0, 58.0], [12.0, 54.0], [13.0, 55.0], [14.0, 58.0], [15.0, 185.0], [16.0, 186.0], [17.0, 60.0], [18.0, 59.0], [19.0, 90.0], [20.0, 55.0], [5.0, 203.0], [21.0, 59.0], [22.0, 58.0], [23.0, 60.0], [24.0, 56.0], [6.0, 68.0], [25.0, 61.0], [7.0, 64.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[15.0, 79.95238095238095]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 284.0], [9.0, 263.0], [10.0, 272.0], [11.0, 282.0], [12.0, 280.0], [13.0, 257.0], [14.0, 319.0], [15.0, 276.0], [16.0, 262.0], [17.0, 247.0], [18.0, 294.0], [19.0, 387.0], [20.0, 280.0], [5.0, 268.0], [21.0, 271.0], [22.0, 264.0], [23.0, 274.0], [24.0, 262.0], [6.0, 265.0], [25.0, 263.0], [7.0, 277.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[15.0, 278.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[19.0, 107559.0], [21.0, 106512.0], [25.0, 72650.7894736842]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[24.523809523809526, 75925.5238095238]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 310.0], [9.0, 281.0], [10.0, 537.0], [11.0, 305.0], [12.0, 308.0], [13.0, 296.0], [14.0, 307.0], [15.0, 293.0], [16.0, 277.0], [17.0, 494.0], [18.0, 289.0], [19.0, 386.0], [20.0, 657.0], [5.0, 525.0], [21.0, 287.0], [22.0, 311.0], [23.0, 294.0], [24.0, 275.0], [6.0, 261.0], [25.0, 300.0], [7.0, 384.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[15.0, 351.28571428571433]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 268.0], [9.0, 457.0], [10.0, 493.0], [11.0, 250.0], [12.0, 478.0], [13.0, 237.0], [14.0, 275.0], [15.0, 238.0], [16.0, 555.0], [17.0, 480.0], [18.0, 263.0], [19.0, 494.0], [20.0, 494.0], [5.0, 536.0], [21.0, 246.0], [22.0, 251.0], [23.0, 483.0], [24.0, 260.0], [6.0, 245.0], [25.0, 236.0], [7.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[15.0, 356.7619047619048]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [9.0, 235.0], [10.0, 489.0], [11.0, 258.0], [12.0, 261.0], [13.0, 237.0], [14.0, 254.0], [15.0, 255.0], [16.0, 478.0], [17.0, 226.0], [18.0, 260.0], [19.0, 254.0], [20.0, 466.0], [5.0, 467.0], [21.0, 246.0], [22.0, 250.0], [23.0, 254.0], [24.0, 256.0], [6.0, 257.0], [25.0, 504.0], [7.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[15.0, 304.8095238095238]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[8.0, 251.5], [19.0, 260.0], [20.0, 239.5], [21.0, 251.0], [23.0, 262.0], [25.0, 343.1538461538461]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[22.142857142857146, 307.95238095238096]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[8.0, 356.5], [19.0, 229.0], [20.0, 232.0], [21.0, 242.0], [23.0, 238.0], [25.0, 259.99999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[22.142857142857146, 262.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[8.0, 231.5], [19.0, 518.0], [20.0, 232.5], [21.0, 242.5], [23.0, 257.0], [25.0, 335.84615384615387]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[22.142857142857146, 312.09523809523813]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 465.0], [9.0, 249.0], [10.0, 511.0], [11.0, 491.0], [12.0, 244.0], [13.0, 1137.0], [14.0, 491.0], [15.0, 504.0], [16.0, 479.0], [17.0, 463.0], [18.0, 244.0], [19.0, 491.0], [20.0, 243.0], [5.0, 527.0], [21.0, 522.0], [22.0, 510.0], [23.0, 229.0], [24.0, 230.0], [6.0, 520.0], [25.0, 242.0], [7.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[15.0, 429.80952380952385]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 284.0], [9.0, 495.0], [10.0, 476.0], [11.0, 477.0], [12.0, 488.0], [13.0, 1353.0], [14.0, 477.0], [15.0, 478.0], [16.0, 248.0], [17.0, 512.0], [18.0, 513.0], [19.0, 470.0], [20.0, 467.0], [5.0, 441.0], [21.0, 528.0], [22.0, 486.0], [23.0, 466.0], [24.0, 516.0], [6.0, 262.0], [25.0, 243.0], [7.0, 236.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[15.0, 472.1904761904762]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 502.0], [9.0, 466.0], [10.0, 473.0], [11.0, 457.0], [12.0, 471.0], [13.0, 1082.0], [14.0, 497.0], [15.0, 489.0], [16.0, 223.0], [17.0, 512.0], [18.0, 494.0], [19.0, 510.0], [20.0, 495.0], [5.0, 493.0], [21.0, 538.0], [22.0, 467.0], [23.0, 490.0], [24.0, 231.0], [6.0, 238.0], [25.0, 530.0], [7.0, 547.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[15.0, 485.9523809523809]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 235.0], [9.0, 495.0], [10.0, 484.0], [11.0, 481.0], [12.0, 246.0], [13.0, 240.0], [14.0, 462.0], [15.0, 481.0], [16.0, 243.0], [17.0, 513.0], [18.0, 479.0], [19.0, 436.0], [20.0, 490.0], [5.0, 468.0], [21.0, 528.0], [22.0, 511.0], [23.0, 504.0], [24.0, 502.0], [6.0, 261.0], [25.0, 525.0], [7.0, 240.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[15.0, 420.1904761904762]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 507.0], [9.0, 460.0], [10.0, 452.0], [11.0, 477.0], [12.0, 479.0], [13.0, 557.0], [14.0, 496.0], [15.0, 468.0], [16.0, 545.0], [17.0, 522.0], [18.0, 232.0], [19.0, 496.0], [20.0, 509.0], [5.0, 509.0], [21.0, 474.0], [22.0, 238.0], [23.0, 232.0], [24.0, 473.0], [6.0, 502.0], [25.0, 485.0], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[15.0, 445.4761904761904]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[18.0, 2288.5], [19.0, 1855.5], [21.0, 2229.6666666666665], [22.0, 2204.0], [25.0, 2168.5714285714284], [13.0, 2117.5], [7.0, 1688.5]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[19.523809523809526, 2121.428571428571]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 233.0], [9.0, 252.0], [10.0, 227.0], [11.0, 240.0], [12.0, 239.0], [13.0, 232.0], [14.0, 236.0], [15.0, 484.0], [16.0, 254.0], [17.0, 263.0], [18.0, 233.0], [19.0, 220.0], [20.0, 234.0], [5.0, 247.0], [21.0, 245.0], [22.0, 254.0], [23.0, 237.0], [24.0, 253.0], [6.0, 239.0], [25.0, 261.0], [7.0, 259.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[15.0, 254.38095238095238]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 256.0], [9.0, 233.0], [10.0, 447.0], [11.0, 236.0], [12.0, 222.0], [13.0, 1465.0], [14.0, 467.0], [15.0, 510.0], [16.0, 264.0], [17.0, 232.0], [18.0, 252.0], [19.0, 249.0], [20.0, 259.0], [5.0, 249.0], [21.0, 255.0], [22.0, 27.0], [23.0, 253.0], [24.0, 229.0], [6.0, 258.0], [25.0, 241.0], [7.0, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[15.0, 326.4285714285714]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 250.0], [9.0, 248.0], [10.0, 244.0], [11.0, 226.0], [12.0, 243.0], [13.0, 341.0], [14.0, 232.0], [15.0, 243.0], [16.0, 226.0], [17.0, 254.0], [18.0, 243.0], [19.0, 247.0], [20.0, 240.0], [5.0, 247.0], [21.0, 1335.0], [22.0, 244.0], [23.0, 509.0], [24.0, 237.0], [6.0, 259.0], [25.0, 228.0], [7.0, 254.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[15.0, 311.90476190476187]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 267.0], [9.0, 229.0], [10.0, 228.0], [11.0, 242.0], [12.0, 245.0], [13.0, 984.0], [14.0, 485.0], [15.0, 251.0], [16.0, 452.0], [17.0, 262.0], [18.0, 248.0], [19.0, 220.0], [20.0, 259.0], [5.0, 235.0], [21.0, 247.0], [22.0, 232.0], [23.0, 496.0], [24.0, 245.0], [6.0, 501.0], [25.0, 237.0], [7.0, 261.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[15.0, 325.04761904761904]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 252.0], [9.0, 253.0], [10.0, 234.0], [11.0, 227.0], [12.0, 224.0], [13.0, 854.0], [14.0, 251.0], [15.0, 240.0], [16.0, 238.0], [17.0, 480.0], [18.0, 245.0], [19.0, 253.0], [20.0, 237.0], [5.0, 225.0], [21.0, 244.0], [22.0, 231.0], [23.0, 237.0], [24.0, 515.0], [6.0, 241.0], [25.0, 467.0], [7.0, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[15.0, 304.7142857142858]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1820.0], [9.0, 1651.0], [10.0, 2031.0], [11.0, 1725.0], [12.0, 1622.0], [13.0, 3122.0], [14.0, 1828.0], [15.0, 1961.0], [16.0, 1779.0], [17.0, 2209.0], [18.0, 1579.0], [19.0, 2055.0], [20.0, 2148.0], [5.0, 2241.0], [21.0, 2666.0], [22.0, 1814.0], [23.0, 1799.0], [24.0, 1904.0], [6.0, 1755.0], [25.0, 1692.0], [7.0, 1903.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[15.0, 1966.857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 257.0], [9.0, 228.0], [10.0, 243.0], [11.0, 232.0], [12.0, 239.0], [13.0, 258.0], [14.0, 230.0], [15.0, 245.0], [16.0, 253.0], [17.0, 255.0], [18.0, 243.0], [19.0, 280.0], [20.0, 247.0], [5.0, 486.0], [21.0, 992.0], [22.0, 268.0], [23.0, 238.0], [24.0, 521.0], [6.0, 254.0], [25.0, 229.0], [7.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[15.0, 306.28571428571433]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 253.0], [9.0, 252.0], [10.0, 239.0], [11.0, 276.0], [12.0, 245.0], [13.0, 244.0], [14.0, 251.0], [15.0, 494.0], [16.0, 245.0], [17.0, 491.0], [18.0, 241.0], [19.0, 245.0], [20.0, 234.0], [5.0, 246.0], [21.0, 251.0], [22.0, 476.0], [23.0, 247.0], [24.0, 244.0], [6.0, 485.0], [25.0, 237.0], [7.0, 502.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[15.0, 304.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 491.0], [9.0, 248.0], [10.0, 237.0], [11.0, 235.0], [12.0, 235.0], [13.0, 240.0], [14.0, 230.0], [15.0, 253.0], [16.0, 239.0], [17.0, 254.0], [18.0, 227.0], [19.0, 232.0], [20.0, 257.0], [5.0, 235.0], [21.0, 267.0], [22.0, 491.0], [23.0, 485.0], [24.0, 65.0], [6.0, 252.0], [25.0, 264.0], [7.0, 259.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[15.0, 271.2380952380952]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[19.0, 107559.0], [21.0, 106512.0], [25.0, 72650.7894736842]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[24.523809523809526, 75925.5238095238]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[8.0, 482.5], [19.0, 516.0], [20.0, 559.0], [21.0, 481.0], [23.0, 503.0], [25.0, 472.9230769230769]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[22.142857142857146, 486.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[8.0, 368.5], [19.0, 516.0], [20.0, 556.5], [21.0, 480.0], [23.0, 498.0], [25.0, 466.69230769230774]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[22.142857142857146, 471.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[8.0, 395.0], [19.0, 530.0], [20.0, 848.0], [21.0, 492.5], [23.0, 493.0], [25.0, 361.1538461538462]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[22.142857142857146, 437.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[8.0, 477.0], [19.0, 270.0], [20.0, 241.0], [21.0, 240.5], [23.0, 234.0], [25.0, 447.69230769230774]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[22.142857142857146, 392.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[0.0, 707.25], [8.0, 274.5], [19.0, 271.0], [20.0, 261.5], [21.0, 262.5], [23.0, 267.0], [25.0, 447.15384615384613]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[18.6, 431.08000000000004]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[0.0, 7423.25], [8.0, 537.0], [19.0, 527.0], [20.0, 516.0], [21.0, 533.5], [23.0, 512.0], [25.0, 543.9230769230769]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[18.6, 1639.04]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[8.0, 4754.0], [19.0, 525.0], [20.0, 3687.0], [21.0, 489.0], [23.0, 9096.0], [25.0, 1003.3846153846152]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[22.142857142857146, 1929.7619047619046]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[8.0, 173.5], [19.0, 173.0], [20.0, 176.0], [21.0, 178.5], [23.0, 167.0], [25.0, 193.15384615384616]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[22.142857142857146, 186.04761904761904]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[8.0, 24.0], [19.0, 22.0], [20.0, 19.5], [21.0, 19.0], [23.0, 21.0], [25.0, 31.46153846153847]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[22.142857142857146, 27.47619047619048]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[8.0, 183.0], [19.0, 165.0], [20.0, 187.5], [21.0, 172.0], [23.0, 175.0], [25.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[22.142857142857146, 228.80952380952382]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[19.0, 313.0], [21.0, 335.0], [25.0, 2427.368421052631]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[24.523809523809526, 2227.047619047619]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[19.0, 649.0], [21.0, 1266.0], [25.0, 2750.8421052631575]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[24.523809523809526, 2580.0476190476184]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[19.0, 6376.0], [21.0, 6957.0], [25.0, 9590.578947368422]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[24.523809523809526, 9312.09523809524]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[8.0, 6096.0], [19.0, 2296.0], [20.0, 5373.0], [21.0, 2134.0], [23.0, 10053.0], [25.0, 2976.461538461538]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[22.142857142857146, 3726.1428571428573]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[18.0, 57.5], [19.0, 61.5], [21.0, 56.666666666666664], [22.0, 69.0], [25.0, 59.42857142857143], [13.0, 59.0], [7.0, 56.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[19.523809523809526, 59.00000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[18.0, 502.75], [19.0, 371.0], [21.0, 404.6666666666667], [22.0, 503.0], [25.0, 316.0], [13.0, 363.5], [7.0, 373.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[19.523809523809526, 388.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[18.0, 360.75], [19.0, 250.5], [21.0, 245.0], [22.0, 503.0], [25.0, 350.14285714285717], [13.0, 244.0], [7.0, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[19.523809523809526, 315.952380952381]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[18.0, 362.0], [19.0, 360.0], [21.0, 389.6666666666667], [22.0, 244.0], [25.0, 272.85714285714283], [13.0, 484.0], [7.0, 371.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[19.523809523809526, 342.90476190476187]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[18.0, 435.25], [19.0, 520.0], [21.0, 500.0], [22.0, 509.0], [25.0, 463.28571428571433], [13.0, 391.0], [7.0, 343.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[19.523809523809526, 452.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[18.0, 141.25], [19.0, 177.5], [21.0, 155.66666666666666], [22.0, 180.0], [25.0, 175.28571428571428], [13.0, 168.5], [7.0, 183.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[19.523809523809526, 166.5238095238095]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[18.0, 16.5], [19.0, 14.5], [21.0, 14.0], [22.0, 15.0], [25.0, 18.285714285714285], [13.0, 12.0], [7.0, 25.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[19.523809523809526, 16.904761904761905]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[19.0, 2096.0], [21.0, 670.0], [25.0, 3893.5263157894738]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[24.523809523809526, 3654.4285714285716]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[19.0, 15518.0], [21.0, 1307.0], [25.0, 9399.894736842105]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[24.523809523809526, 9305.857142857143]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[19.0, 100309.0], [21.0, 1848.0], [25.0, 9679.315789473683]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[24.523809523809526, 13622.095238095239]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[19.0, 7234.0], [21.0, 7580.0], [25.0, 10422.684210526317]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[24.523809523809526, 10135.47619047619]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[19.0, 58288.0], [21.0, 70774.0], [25.0, 62404.47368421053]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[24.523809523809526, 62607.0]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 31484.894736842096], [19.0, 1731.0], [21.0, 656.0], [25.0, 1381.1578947368419]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[8.728813559322035, 20763.6440677966]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 2160.2894736842104], [19.0, 5514.0], [21.0, 1749.0], [25.0, 4661.894736842105]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[8.728813559322035, 3015.762711864406]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 4389.238095238095], [19.0, 1017.0], [21.0, 1728.0], [25.0, 4030.578947368421]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[12.26190476190476, 4083.333333333332]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[19.0, 14197.0], [21.0, 12331.0], [25.0, 12977.631578947368]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[24.523809523809526, 13004.904761904761]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[19.0, 5720.0], [21.0, 1703.0], [25.0, 13431.263157894737]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[24.523809523809526, 12505.57142857143]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[18.0, 425.75], [19.0, 372.0], [21.0, 422.3333333333333], [22.0, 488.0], [25.0, 326.57142857142856], [13.0, 382.5], [7.0, 366.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[19.523809523809526, 380.2380952380953]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[18.0, 265.0], [19.0, 283.5], [21.0, 264.3333333333333], [22.0, 255.0], [25.0, 659.0], [13.0, 272.5], [7.0, 280.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[19.523809523809526, 399.71428571428567]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[18.0, 720.75], [19.0, 414.5], [21.0, 346.3333333333333], [22.0, 497.0], [25.0, 331.4285714285714], [13.0, 404.5], [7.0, 284.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[19.523809523809526, 426.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 25.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2592.2, "minX": 1.66399746E12, "maxY": 885669.3, "series": [{"data": [[1.66399764E12, 2592.2], [1.66399746E12, 165329.58333333334], [1.66399758E12, 165073.51666666666], [1.66399752E12, 885669.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66399764E12, 4307.066666666667], [1.66399746E12, 4160.65], [1.66399758E12, 32693.116666666665], [1.66399752E12, 19583.15]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399764E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 14.5, "minX": 1.66399746E12, "maxY": 107035.5, "series": [{"data": [[1.66399764E12, 254.5], [1.66399758E12, 285.52941176470586], [1.66399752E12, 237.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399764E12, 388.5], [1.66399758E12, 302.52941176470586], [1.66399752E12, 259.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399764E12, 247.0], [1.66399758E12, 300.29411764705884], [1.66399752E12, 355.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399764E12, 395.5], [1.66399758E12, 242.4705882352941], [1.66399752E12, 387.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399764E12, 387.5], [1.66399758E12, 337.5882352941176], [1.66399752E12, 263.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399764E12, 378.0], [1.66399758E12, 489.7058823529411], [1.66399752E12, 470.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399764E12, 345.0], [1.66399758E12, 431.47058823529414], [1.66399752E12, 497.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399764E12, 372.5], [1.66399758E12, 468.58823529411757], [1.66399752E12, 518.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399764E12, 379.5], [1.66399758E12, 469.0], [1.66399752E12, 387.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399764E12, 374.5], [1.66399758E12, 460.4705882352941], [1.66399752E12, 384.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399746E12, 15777.888888888889], [1.66399758E12, 102250.0], [1.66399752E12, 26691.727272727272]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399746E12, 9746.0], [1.66399752E12, 22483.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399746E12, 10797.529411764708], [1.66399752E12, 29843.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399746E12, 10056.999999999998], [1.66399752E12, 30430.75]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399746E12, 24591.0], [1.66399752E12, 13038.473684210523]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399746E12, 5805.75], [1.66399752E12, 6113.058823529412]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399746E12, 4986.2], [1.66399752E12, 8544.818181818182]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399746E12, 6603.857142857143], [1.66399752E12, 5115.428571428571]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399746E12, 25659.666666666668], [1.66399752E12, 30850.055555555555]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399746E12, 12136.777777777777], [1.66399752E12, 18919.166666666664]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399764E12, 1966.3333333333333], [1.66399758E12, 1983.1176470588234], [1.66399752E12, 1692.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399758E12, 6096.0], [1.66399752E12, 3476.684210526316]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399758E12, 2060.153846153846], [1.66399752E12, 2221.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399758E12, 588.0], [1.66399752E12, 481.58333333333326]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399764E12, 247.5], [1.66399758E12, 263.764705882353], [1.66399752E12, 369.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399758E12, 854.7777777777778], [1.66399752E12, 599.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399764E12, 246.5], [1.66399758E12, 284.00000000000006], [1.66399752E12, 363.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399764E12, 238.0], [1.66399758E12, 330.35294117647067], [1.66399752E12, 240.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399758E12, 584.5555555555555], [1.66399752E12, 487.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399758E12, 427.55555555555554], [1.66399752E12, 275.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399764E12, 433.5], [1.66399758E12, 452.1764705882353]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399758E12, 318.77777777777777], [1.66399752E12, 275.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399764E12, 144.25], [1.66399758E12, 155.23529411764707]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399758E12, 590.5555555555555], [1.66399752E12, 438.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399758E12, 477.6666666666667], [1.66399752E12, 444.08333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399758E12, 349.55555555555554], [1.66399752E12, 294.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399764E12, 304.25], [1.66399758E12, 289.47058823529414]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399764E12, 238.0], [1.66399758E12, 328.35294117647055]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399758E12, 274.44444444444446], [1.66399752E12, 273.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399764E12, 15.0], [1.66399758E12, 18.235294117647058]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399758E12, 280.1111111111111], [1.66399752E12, 255.41666666666669]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399764E12, 98.5], [1.66399758E12, 75.58823529411765]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399764E12, 273.5], [1.66399758E12, 279.5882352941177]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399758E12, 107035.5], [1.66399752E12, 72650.7894736842]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399764E12, 370.0], [1.66399758E12, 346.88235294117646]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399764E12, 325.5], [1.66399758E12, 364.1176470588236]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399764E12, 304.5], [1.66399758E12, 304.88235294117646]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399758E12, 273.1], [1.66399752E12, 339.6363636363636]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399758E12, 263.55555555555554], [1.66399752E12, 261.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399758E12, 267.6666666666667], [1.66399752E12, 345.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399764E12, 436.5], [1.66399758E12, 428.23529411764713]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399764E12, 305.75], [1.66399758E12, 511.3529411764706]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399764E12, 445.0], [1.66399758E12, 495.5882352941176]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399764E12, 301.0], [1.66399758E12, 448.2352941176471]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399764E12, 440.0], [1.66399758E12, 446.7647058823529]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399764E12, 1688.5], [1.66399758E12, 2120.823529411765], [1.66399752E12, 2559.5]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399764E12, 244.5], [1.66399758E12, 256.70588235294116]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399764E12, 253.5], [1.66399758E12, 343.5882352941176]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399764E12, 252.5], [1.66399758E12, 325.88235294117646]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399764E12, 316.0], [1.66399758E12, 327.17647058823536]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399764E12, 242.25], [1.66399758E12, 319.4117647058824]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399764E12, 1929.75], [1.66399758E12, 1975.5882352941176]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399764E12, 307.75], [1.66399758E12, 305.9411764705883]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399764E12, 371.5], [1.66399758E12, 288.9411764705882]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399764E12, 309.25], [1.66399758E12, 262.29411764705884]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399758E12, 107035.5], [1.66399752E12, 72650.7894736842]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399758E12, 505.66666666666674], [1.66399752E12, 471.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399758E12, 422.55555555555554], [1.66399752E12, 507.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399758E12, 577.1111111111112], [1.66399752E12, 332.9166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399758E12, 324.1111111111111], [1.66399752E12, 443.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399758E12, 420.38461538461536], [1.66399752E12, 442.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399758E12, 2632.846153846154], [1.66399752E12, 562.4166666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399758E12, 3254.3636363636365], [1.66399752E12, 472.7]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399758E12, 174.55555555555554], [1.66399752E12, 194.66666666666669]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399758E12, 19.555555555555557], [1.66399752E12, 33.41666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399758E12, 163.11111111111111], [1.66399752E12, 278.0833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399746E12, 6555.5], [1.66399752E12, 1771.4210526315792]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399746E12, 2929.0], [1.66399752E12, 2562.6]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399746E12, 15479.0], [1.66399752E12, 9003.75]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399758E12, 4538.833333333333], [1.66399752E12, 2642.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399764E12, 56.5], [1.66399758E12, 59.764705882352935], [1.66399752E12, 55.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399764E12, 373.0], [1.66399758E12, 406.0], [1.66399752E12, 253.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399764E12, 257.0], [1.66399758E12, 316.9411764705882], [1.66399752E12, 366.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399764E12, 371.0], [1.66399758E12, 351.2352941176471], [1.66399752E12, 244.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399764E12, 343.0], [1.66399758E12, 476.1764705882353], [1.66399752E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399764E12, 183.0], [1.66399758E12, 164.35294117647058], [1.66399752E12, 168.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399764E12, 25.5], [1.66399758E12, 16.17647058823529], [1.66399752E12, 14.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399746E12, 3802.7000000000007], [1.66399752E12, 689.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399746E12, 8086.9473684210525], [1.66399752E12, 20885.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399746E12, 3755.058823529411], [1.66399758E12, 100309.0], [1.66399752E12, 40639.66666666667]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399746E12, 5490.444444444444], [1.66399752E12, 38005.66666666667]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399752E12, 62607.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399746E12, 3707.8717948717945], [1.66399752E12, 54022.40000000001]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399746E12, 2562.2105263157905], [1.66399752E12, 3836.476190476191]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399746E12, 3720.540540540541], [1.66399752E12, 6768.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399746E12, 10631.05263157895], [1.66399752E12, 35556.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399746E12, 5463.000000000001], [1.66399752E12, 42436.5]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399764E12, 366.0], [1.66399758E12, 396.82352941176464], [1.66399752E12, 253.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399764E12, 280.5], [1.66399758E12, 351.29411764705884], [1.66399752E12, 930.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399764E12, 284.5], [1.66399758E12, 450.88235294117646], [1.66399752E12, 356.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399764E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66399746E12, "maxY": 11911.0, "series": [{"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399746E12, 958.2222222222222], [1.66399758E12, 664.0], [1.66399752E12, 1848.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399746E12, 1322.9333333333332], [1.66399752E12, 2971.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399746E12, 1438.0000000000002], [1.66399752E12, 4261.75]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399746E12, 1367.076923076923], [1.66399752E12, 3451.125]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399746E12, 5165.0], [1.66399752E12, 2295.9999999999995]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399746E12, 2727.25], [1.66399752E12, 1557.7647058823532]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399746E12, 1995.5000000000002], [1.66399752E12, 3947.8181818181815]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399746E12, 3484.4285714285716], [1.66399752E12, 1724.214285714286]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399746E12, 1906.0], [1.66399752E12, 3358.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399746E12, 1242.6666666666667], [1.66399752E12, 2568.25]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399764E12, 390.0], [1.66399758E12, 347.4117647058824], [1.66399752E12, 300.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399758E12, 537.0], [1.66399752E12, 537.3157894736843]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399758E12, 450.4615384615385], [1.66399752E12, 386.25]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399758E12, 166.33333333333334], [1.66399752E12, 48.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399764E12, 273.0], [1.66399758E12, 279.2941176470589]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399758E12, 1193.5], [1.66399752E12, 1380.8421052631581]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399764E12, 370.0], [1.66399758E12, 346.8235294117647]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399764E12, 284.5], [1.66399758E12, 450.88235294117646], [1.66399752E12, 356.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399764E12, 370.0], [1.66399758E12, 346.8235294117647]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399758E12, 1193.5], [1.66399752E12, 1380.8421052631581]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399758E12, 27.44444444444445], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399758E12, 402.0], [1.66399752E12, 322.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399758E12, 610.4615384615385], [1.66399752E12, 562.4166666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399758E12, 309.27272727272725], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399746E12, 6332.0], [1.66399752E12, 1352.736842105263]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399746E12, 2105.0], [1.66399752E12, 2074.8999999999996]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399746E12, 8769.0], [1.66399752E12, 2158.4]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399758E12, 508.6666666666667], [1.66399752E12, 575.4444444444445]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399746E12, 2587.7999999999997], [1.66399752E12, 689.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399746E12, 1464.8947368421052], [1.66399752E12, 11911.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399746E12, 918.9411764705882], [1.66399758E12, 6423.0], [1.66399752E12, 603.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399746E12, 3125.222222222222], [1.66399752E12, 7870.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399752E12, 1855.380952380952]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399746E12, 1468.666666666667], [1.66399752E12, 2183.2499999999995]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399746E12, 1277.605263157895], [1.66399752E12, 817.8095238095237]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399746E12, 1618.8918918918916], [1.66399752E12, 1554.4]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399746E12, 2202.3157894736846], [1.66399752E12, 791.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399746E12, 2138.4705882352946], [1.66399752E12, 6777.999999999999]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399764E12, 278.0], [1.66399758E12, 275.00000000000006], [1.66399752E12, 930.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399764E12, 284.5], [1.66399758E12, 450.88235294117646], [1.66399752E12, 356.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399764E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66399746E12, "maxY": 11522.0, "series": [{"data": [[1.66399764E12, 0.0], [1.66399758E12, 28.999999999999993], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399764E12, 135.5], [1.66399758E12, 43.76470588235294], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 42.58823529411765], [1.66399752E12, 115.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399764E12, 139.0], [1.66399758E12, 8.823529411764708], [1.66399752E12, 132.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399764E12, 132.5], [1.66399758E12, 42.05882352941176], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399764E12, 131.0], [1.66399758E12, 206.76470588235293], [1.66399752E12, 233.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399764E12, 116.5], [1.66399758E12, 179.1764705882353], [1.66399752E12, 246.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399764E12, 126.5], [1.66399758E12, 219.76470588235293], [1.66399752E12, 251.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399764E12, 128.0], [1.66399758E12, 231.17647058823533], [1.66399752E12, 128.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399764E12, 119.5], [1.66399758E12, 230.52941176470586], [1.66399752E12, 128.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 58.63636363636364]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399746E12, 177.86666666666667], [1.66399752E12, 1773.1666666666667]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399746E12, 259.58823529411757], [1.66399752E12, 2687.5]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399746E12, 93.76923076923077], [1.66399752E12, 1896.75]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399752E12, 878.3157894736843]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399746E12, 1712.0000000000002], [1.66399752E12, 73.29411764705881]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399752E12, 1305.1818181818182]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399746E12, 2700.4285714285716], [1.66399752E12, 95.42857142857142]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399746E12, 446.33333333333337], [1.66399752E12, 1771.1666666666667]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399746E12, 32.55555555555556], [1.66399752E12, 1673.25]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399764E12, 79.33333333333333], [1.66399758E12, 48.94117647058823], [1.66399752E12, 0.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399758E12, 252.5], [1.66399752E12, 247.57894736842104]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399758E12, 99.38461538461539], [1.66399752E12, 90.5]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399758E12, 227.0], [1.66399752E12, 231.41666666666669]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 14.117647058823529], [1.66399752E12, 119.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399758E12, 459.44444444444446], [1.66399752E12, 203.83333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 28.35294117647058], [1.66399752E12, 120.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 29.647058823529406], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399758E12, 254.66666666666666], [1.66399752E12, 234.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399758E12, 54.77777777777778], [1.66399752E12, 21.083333333333336]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399764E12, 190.25], [1.66399758E12, 211.58823529411765]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399758E12, 65.44444444444444], [1.66399752E12, 19.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399764E12, 88.0], [1.66399758E12, 99.23529411764706]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399758E12, 336.3333333333333], [1.66399752E12, 184.91666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399758E12, 207.11111111111111], [1.66399752E12, 198.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399758E12, 107.33333333333333], [1.66399752E12, 40.25000000000001]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399764E12, 59.75], [1.66399758E12, 44.1764705882353]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 84.76470588235293]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399758E12, 24.88888888888889], [1.66399752E12, 20.750000000000004]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399764E12, 1.5], [1.66399758E12, 0.7647058823529413]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399758E12, 26.33333333333333], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399764E12, 36.5], [1.66399758E12, 14.411764705882351]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399758E12, 840.5], [1.66399752E12, 575.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399764E12, 59.5], [1.66399758E12, 48.94117647058823]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399764E12, 65.0], [1.66399758E12, 115.6470588235294]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399764E12, 55.5], [1.66399758E12, 56.88235294117647]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399758E12, 23.9], [1.66399752E12, 22.090909090909093]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399758E12, 26.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399758E12, 28.88888888888889], [1.66399752E12, 46.91666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399764E12, 189.0], [1.66399758E12, 146.23529411764707]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399764E12, 55.0], [1.66399758E12, 214.41176470588235]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399764E12, 189.75], [1.66399758E12, 215.8235294117647]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399764E12, 58.0], [1.66399758E12, 201.9411764705882]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399764E12, 188.75], [1.66399758E12, 200.41176470588238]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 118.58823529411765], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 14.235294117647062]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 114.29411764705884]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 28.823529411764703]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399764E12, 62.0], [1.66399758E12, 42.294117647058826]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 42.58823529411765]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399764E12, 59.5], [1.66399758E12, 48.94117647058823]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399764E12, 60.5], [1.66399758E12, 15.058823529411768]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399764E12, 119.0], [1.66399758E12, 42.3529411764706]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399764E12, 61.75000000000001], [1.66399758E12, 28.529411764705884]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399758E12, 840.5], [1.66399752E12, 575.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399758E12, 248.22222222222223], [1.66399752E12, 215.08333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399758E12, 166.0], [1.66399752E12, 250.50000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399758E12, 168.44444444444446], [1.66399752E12, 80.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399758E12, 80.0], [1.66399752E12, 190.58333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399758E12, 64.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399758E12, 227.3076923076923], [1.66399752E12, 270.83333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399758E12, 225.63636363636363], [1.66399752E12, 223.9]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399758E12, 116.0], [1.66399752E12, 130.08333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399758E12, 6.111111111111111], [1.66399752E12, 13.166666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399758E12, 106.44444444444444], [1.66399752E12, 210.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399752E12, 145.05263157894737]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399746E12, 0.0], [1.66399752E12, 1165.95]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399746E12, 8416.0], [1.66399752E12, 760.9000000000002]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399758E12, 225.75], [1.66399752E12, 277.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399764E12, 126.0], [1.66399758E12, 158.58823529411765], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 71.3529411764706], [1.66399752E12, 118.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399764E12, 125.0], [1.66399758E12, 110.17647058823529], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399764E12, 109.5], [1.66399758E12, 223.76470588235293], [1.66399752E12, 118.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399764E12, 124.5], [1.66399758E12, 109.82352941176471], [1.66399752E12, 112.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399746E12, 1426.95], [1.66399752E12, 340.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399746E12, 1018.421052631579], [1.66399752E12, 11522.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399746E12, 320.3529411764706], [1.66399758E12, 2156.0], [1.66399752E12, 92.33333333333333]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399746E12, 2790.7777777777774], [1.66399752E12, 7616.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399752E12, 479.80952380952374]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399746E12, 436.38461538461553], [1.66399752E12, 1041.3]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399746E12, 867.6315789473684], [1.66399752E12, 820.2857142857141]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399746E12, 919.891891891892], [1.66399752E12, 759.6]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399746E12, 985.7368421052631], [1.66399752E12, 175.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399746E12, 900.5294117647061], [1.66399752E12, 822.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399764E12, 120.5], [1.66399758E12, 144.4705882352941], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 0.0], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399764E12, 0.0], [1.66399758E12, 118.58823529411765], [1.66399752E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399764E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 11.0, "minX": 1.66399746E12, "maxY": 107559.0, "series": [{"data": [[1.66399764E12, 2241.0], [1.66399746E12, 33900.0], [1.66399758E12, 107559.0], [1.66399752E12, 87858.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66399764E12, 519.5], [1.66399746E12, 15457.800000000001], [1.66399758E12, 537.0], [1.66399752E12, 41326.100000000006]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66399764E12, 2088.9000000000037], [1.66399746E12, 25515.640000000018], [1.66399758E12, 7694.799999999985], [1.66399752E12, 73026.69]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66399764E12, 550.0], [1.66399746E12, 20328.200000000008], [1.66399758E12, 1651.0], [1.66399752E12, 62742.85]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66399764E12, 12.0], [1.66399746E12, 26.0], [1.66399758E12, 11.0], [1.66399752E12, 11.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66399764E12, 255.0], [1.66399746E12, 4225.0], [1.66399758E12, 263.0], [1.66399752E12, 518.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399764E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 84.5, "minX": 1.0, "maxY": 104381.0, "series": [{"data": [[2.0, 14043.5], [35.0, 264.0], [34.0, 355.0], [36.0, 250.5], [42.0, 267.5], [45.0, 444.0], [46.0, 267.5], [3.0, 1507.5], [48.0, 255.0], [51.0, 259.5], [52.0, 250.0], [56.0, 482.5], [4.0, 4408.0], [78.0, 257.5], [5.0, 7223.5], [6.0, 7018.5], [7.0, 3881.0], [8.0, 7705.0], [9.0, 507.0], [10.0, 453.5], [11.0, 1686.0], [12.0, 485.5], [13.0, 3506.5], [14.0, 492.0], [15.0, 308.0], [1.0, 683.0], [17.0, 462.0], [18.0, 470.0], [19.0, 271.5], [20.0, 256.0], [21.0, 258.0], [23.0, 462.0], [24.0, 284.0], [25.0, 248.0], [26.0, 479.5], [27.0, 256.0], [28.0, 282.5], [29.0, 245.0], [30.0, 255.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 70006.0], [36.0, 104381.0], [11.0, 13330.0], [3.0, 80815.0], [13.0, 23347.0], [14.0, 71671.0], [56.0, 84.5], [4.0, 53904.0], [5.0, 26712.5], [21.0, 66051.0], [23.0, 88727.5], [6.0, 35387.5], [24.0, 1965.0], [30.0, 984.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 78.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 5912.5, "series": [{"data": [[2.0, 795.0], [35.0, 0.0], [34.0, 0.0], [36.0, 0.0], [42.0, 0.0], [45.0, 0.0], [46.0, 0.0], [3.0, 462.5], [48.0, 0.0], [51.0, 0.0], [52.0, 0.0], [56.0, 0.0], [4.0, 870.0], [78.0, 0.0], [5.0, 972.0], [6.0, 1001.0], [7.0, 858.0], [8.0, 1017.0], [9.0, 282.0], [10.0, 267.5], [11.0, 709.0], [12.0, 0.0], [13.0, 849.0], [14.0, 0.0], [15.0, 0.0], [1.0, 682.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1435.0], [36.0, 660.0], [11.0, 178.5], [3.0, 621.0], [13.0, 1487.0], [14.0, 1140.0], [56.0, 0.0], [4.0, 857.0], [5.0, 5912.5], [21.0, 1728.0], [23.0, 703.5], [6.0, 1238.5], [24.0, 486.0], [30.0, 137.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 78.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.4, "minX": 1.66399746E12, "maxY": 17.266666666666666, "series": [{"data": [[1.66399764E12, 2.4], [1.66399746E12, 7.85], [1.66399758E12, 17.266666666666666], [1.66399752E12, 7.833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399764E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399746E12, "maxY": 14.9, "series": [{"data": [[1.66399764E12, 0.2], [1.66399746E12, 4.9], [1.66399758E12, 1.7666666666666666], [1.66399752E12, 4.983333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66399764E12, 0.1], [1.66399746E12, 0.35], [1.66399758E12, 0.7166666666666667], [1.66399752E12, 0.23333333333333334]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66399764E12, 2.1], [1.66399758E12, 14.9], [1.66399752E12, 4.833333333333333]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.66399758E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: java.lang.IllegalStateException", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.08333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666], [1.66399758E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399764E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399746E12, "maxY": 0.65, "series": [{"data": [[1.66399758E12, 0.18333333333333332], [1.66399752E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66399746E12, 0.65], [1.66399752E12, 0.3333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66399746E12, 0.2833333333333333], [1.66399752E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66399746E12, 0.03333333333333333], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-failure", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.1]], "isOverall": false, "label": "Dashboard-failure", "isController": true}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66399758E12, 0.03333333333333333]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66399746E12, 0.3], [1.66399752E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66399746E12, 0.05], [1.66399752E12, 0.3]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66399746E12, 0.11666666666666667], [1.66399752E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.26666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-failure", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-failure", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.26666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.21666666666666667]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66399746E12, 0.25], [1.66399752E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66399758E12, 0.2], [1.66399752E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-failure", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.26666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66399746E12, 0.6166666666666667], [1.66399752E12, 0.3333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666], [1.66399752E12, 0.3333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-1-failure", "isController": false}, {"data": [[1.66399746E12, 0.3333333333333333], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/-failure", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-failure", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-failure", "isController": true}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-failure", "isController": false}, {"data": [[1.66399752E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66399752E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-9-failure", "isController": false}, {"data": [[1.66399758E12, 0.21666666666666667], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66399764E12, 0.05], [1.66399758E12, 0.25], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66399746E12, 0.21666666666666667], [1.66399752E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66399746E12, 0.03333333333333333], [1.66399752E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.26666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66399746E12, 0.03333333333333333], [1.66399752E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66399758E12, 0.03333333333333333], [1.66399752E12, 0.31666666666666665]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66399758E12, 0.16666666666666666], [1.66399752E12, 0.18333333333333332]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66399746E12, 0.6], [1.66399752E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-12-failure", "isController": false}, {"data": [[1.66399746E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-2-failure", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66399758E12, 0.21666666666666667], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.26666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66399746E12, 0.31666666666666665], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66399758E12, 0.2], [1.66399752E12, 0.13333333333333333]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66399746E12, 0.15], [1.66399752E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66399746E12, 0.06666666666666667], [1.66399752E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66399746E12, 0.016666666666666666], [1.66399752E12, 0.3333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.26666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-failure", "isController": false}, {"data": [[1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-3-failure", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66399758E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-failure", "isController": false}, {"data": [[1.66399746E12, 0.31666666666666665], [1.66399752E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66399746E12, 0.25], [1.66399752E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66399746E12, 0.16666666666666666], [1.66399752E12, 0.18333333333333332]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66399746E12, 0.2833333333333333], [1.66399758E12, 0.016666666666666666], [1.66399752E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.26666666666666666], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66399758E12, 0.15], [1.66399752E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66399764E12, 0.06666666666666667], [1.66399758E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66399758E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66399764E12, 0.03333333333333333], [1.66399758E12, 0.2833333333333333], [1.66399752E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399764E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.66399746E12, "maxY": 17.816666666666666, "series": [{"data": [[1.66399764E12, 2.45], [1.66399746E12, 5.216666666666667], [1.66399758E12, 17.816666666666666], [1.66399752E12, 10.616666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66399746E12, 0.06666666666666667], [1.66399758E12, 0.25], [1.66399752E12, 0.3333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399764E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
