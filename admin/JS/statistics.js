// import * as config from "./config.js";
function statistics() {
    let select_type_statistics = document.getElementById("select-type-statistic")
    function openList(list) {
        list.style.visibility = 'visible'
        list.style.opacity = '1'
        list.style.transitionDelay = "0s, 0s, 0.3s;" 
    }
    function closeList(list) {
        list.style.visibility = ""; 
        list.style.opacity = "0";
        list.style.transition = "all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 1s linear 0.01s;"
    }
    function openOrCloseList(list) {
        if (list.style.visibility == 'hidden' || list.style.visibility == '') {
            openList(list)
        }
        else {
            closeList(list)
        }
    } 
    select_type_statistics.onclick = function() {
        let list_type_statistics =  document.getElementById("list-drop-down-choose-statistics")
        openOrCloseList(list_type_statistics)
    }
    window.addEventListener('click', function(e) {
        let list_type_statistics =  document.getElementById("list-drop-down-choose-statistics")
        function closeClickOutSide(btn, list) {
            if (!btn.contains(e.target) &&  list.style.visibility != 'hidden' && list.style.visibility != '') {
                closeList(list)
            }
        }
        closeClickOutSide(select_type_statistics, list_type_statistics)
    })

    // //statistics
    // //data
    // // const data = [];
    // // const data2 = [];
    // // let prev = 100;
    // // let prev2 = 80;
    // // for (let i = 0; i < 100; i++) {
    // //     prev += 5 - Math.random() * 10;
    // //     data.push({x: i, y: prev});
    // //     prev2 += 5 - Math.random() * 10;
    // //     data2.push({x: i, y: prev2});
    // // }
    // function createData() {
    //     let data1 = []
    //     let data2 = []
    //     let labels = []
    //     let count = 0
    //     while(count < 100) {
    //         count ++
    //         data1.push({x: count, y: Math.floor(Math.random() * 100)})
    //         data2.push({x: count, y: Math.floor(Math.random() * 100)})
    //         labels.push(count)
    //     }
    //     return {data1, data2, labels}
    // }
    // const ctx = document.getElementById("myChart").getContext("2d")
    // function createDataset(data, label, color, backgroundColor) {
    //     return {
    //         label: label,
    //         borderColor: color,
    //         borderWidth: 2,
    //         radius: 0,
    //         data: data,
    //         backgroundColor: backgroundColor
    //     }
    // }
    // function createDatasetNdata(data, label, color, backgroundColor) {
    //     let dataReturn = []
    //     for (let index = 0; index < data.length; index++) {
    //         dataReturn.push(createDataset(data[index], label[index], color[index], backgroundColor[index]))
    //     }
    //     return dataReturn
    // }
    
    // function createLineChart(dataset, labels) {
    //     const totalDuration = 1000;
    //     const delayBetweenPoints = totalDuration / dataset[0].data.length;
    //     const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    //     const animation = {
    //         x: {
    //             type: 'number',
    //             easing: 'linear',
    //             duration: delayBetweenPoints,
    //             from: NaN, // the point is initially skipped
    //             delay(ctx) {
    //             if (ctx.type !== 'data' || ctx.xStarted) {
    //                 return 0;
    //             }
    //             ctx.xStarted = true;
    //             return ctx.index * delayBetweenPoints;
    //             }
    //         },
    //         y: {
    //             type: 'number',
    //             easing: 'linear',
    //             duration: delayBetweenPoints,
    //             from: previousY,
    //             delay(ctx) {
    //             if (ctx.type !== 'data' || ctx.yStarted) {
    //                 return 0;
    //             }
    //             ctx.yStarted = true;
    //             return ctx.index * delayBetweenPoints;
    //             }
    //         }
    //     };
    //     return new Chart(ctx,{
    //         type: 'line',
    //         data: {
    //             labels: labels,
    //             datasets: dataset
    //         },
    //         options: {
    //             animation,
    //             interaction: {
    //                 intersect: false
    //             },
    //             plugins: {
    //                 legend: true
    //             },
    //             tooltips: {
    //                 mode: 'index',
    //                 intersect: false,
    //             },
    //             hover: {
    //                 mode: 'nearest',
    //                 intersect: true
    //             }
    //         }
    //     });
    // }
    // function createBarChart(dataset, labels) {
    //     return new Chart(ctx,{
    //         type: 'bar',
    //         data: {
    //             labels: labels,
    //             datasets: dataset
    //         },
    //         options: {
    //             responsive: true,
    //             indexAxis: 'y',
    //             scales: {
    //                 y: {
    //                 },
                    
    //             },
    //             maintainAspectRatio: false
    //         }
    //     });
    // }
    // let data = createData()
    // ctx.chart = createLineChart(createDatasetNdata([data.data1, data.data2], ['# Thu', '# Chi'], ['blue','red'],["rgb(255,255,0,0)", "rgb(255,255,0,0)"]), data.labels)

    
    // let li_type_statistics = document.getElementById("list-drop-down-choose-statistics").getElementsByClassName("li-drop-down")
    // for (let index = 0; index < li_type_statistics.length; index++) {
    //     li_type_statistics[index].onclick = function() {
    //         // const data = [];
    //         // const data2 = [];
    //         // let prev = 100;
    //         // let prev2 = 80;
    //         // for (let i = 0; i < 10; i++) {
    //         //     prev += 5 - Math.random() * 10;
    //         //     data.push({x: i, y: prev});
    //         //     prev2 += 5 - Math.random() * 10;
    //         //     data2.push({x: i, y: prev2});
    //         // }
    //         let data = createData()

    //         if (index == 0) {
    //             ctx.chart.destroy()
    //             ctx.chart = createBarChart(createDatasetNdata([data.data1, data.data2],['Thu', 'Chi'], ['rgb(0,0,0,0)','rgb(0,0,0,0)'], [getGradientBlue(ctx,ctx.chart.chartArea),getGradientRed(ctx,ctx.chart.chartArea)]), data.labels)
    //         }
    //         else {
    //             ctx.chart.destroy()
    //             ctx.chart = createLineChart(createDatasetNdata([data.data1, data.data2],['Thu', 'Chi'], ['blue', 'red'],['rgb(0,0,0,0)','rgb(0,0,0,0)'], ), data.labels)
    //         }
    //     }
    // }
    // function getGradientBlue(ctx, chart) {
    //     var gradient = ctx.createLinearGradient(chart.left, 0, chart.right, 0);
    //     gradient.addColorStop(0, 'rgba(46, 255, 248,0.5)');   
    //     // gradient.addColorStop(0.4, 'rgba(46, 255, 248,0.5)');  
    //     gradient.addColorStop(0.6, 'rgba(46, 200, 248,0.7)');
    //     gradient.addColorStop(1, 'rgba(46, 200, 248,1)');
    //     return gradient
    // }
    // function getGradientRed(ctx, chart) {
    //     var gradient = ctx.createLinearGradient(chart.left, 0, chart.right, 0);
    //     gradient.addColorStop(0, 'rgba(255, 4, 0, 0.5)')  
    //     // gradient.addColorStop(0.4, 'rgba(255, 4, 0, 0.5)')  
    //     gradient.addColorStop(0.6, 'rgba(255, 4, 0, 0.7)')  
    //     gradient.addColorStop(0.9, 'rgba(255, 4, 0, 1)')  
    //     return gradient
    // }
    //
     //statistics prod
    let data = JSON.parse(localStorage.getItem("data"))
    let date1 = document.getElementById("inp-date-begin")
    let date2 = document.getElementById("inp-date-end")
    let sum1 = 0
    let sum2 = 0
    let prevDate1 = date1
    let prevDate2 = date2
    let from = new Date("1/1/1971")
    let to = new Date()
    let type1 = ""
    let prodsStat = []
    function setUpType() {
        let ul = document.getElementById("list-drop-down-choose-statistics")
        ul.innerHTML = ""
        let li1 = createLi("", "t???t c???")
        ul.appendChild(li1)
        data.largeClassify.forEach(element => {
            element.miniClassify.forEach(element1 => {
                let li = createLi(element1.id, element1.name)
                ul.appendChild(li)
            })
        })
    }
    function createLi(value, output) {
        let li = document.createElement("li")
        li.value = value
        li.innerHTML = output
        li.className = "li-drop-down"
        li.onclick = function() {
            document.getElementById("title-type").innerHTML = output
            document.getElementById("title-type").name = value
            type1 = value
            sum1 = 0
            sum2 = 0    
            statisticProdUI(from, to, type1)
        }
        return li
    }
    function setUpSum() {
        let total = sum1 - sum2
            // document.getElementById("sum-revenue").innerHTML = "T???ng thu: "+sum1
            // document.getElementById("sum-expend").innerHTML = "T???ng chi: "+sum2
            // document.getElementById("total1").innerHTML = "T???ng c???ng: "+total
        document.getElementById("body-stat").innerHTML += `<tr class="first-row"><th>T???ng c???ng</th><th id="for-remove"></th><th>`+calculated(sum1) + " VND"+`</th><th>`+calculated(sum2)+" VND"+`</th><th>`+calculated(total) + " VND"+`</th></tr>`
    }
    setUpType()
    function createStartProds(type2) {
        prodsStat = []
        data.product.forEach(element => {
            if ((element.id.toLowerCase().indexOf(type2.toLowerCase()) != -1) || type2 === "") { 
                prodsStat[element.id] = {id: element.id,name: element.name, revenue: 0, expenditure: 0, profit: 0}
            }
        });

    }
    function statisticProd(from, to, type23) {
        createStartProds(type23)
        data.input_product.forEach(element => {
            const date = new Date(element.date_input)
            if (date >= from && date <= to) {
                element.detail.forEach(proInDetail => {
                    if (prodsStat[proInDetail.id] != null) {
                        prodsStat[proInDetail.id].expenditure += parseInt(proInDetail.total_price )
                        prodsStat[proInDetail.id].profit -= parseInt(proInDetail.total_price) 
                        sum2 += parseInt(proInDetail.total_price)
                    }
                }) 
            }
        })
        data.receipt.forEach(element => {
            const date = new Date(element.date_init)
            if ((date >= from && date <= to) && element.status.toLowerCase() == "ch??? x??c nh???n") {
                element.list_prod.forEach(prod => {
                    if (prodsStat[prod.idProd] != null) {
                        prodsStat[prod.idProd].revenue += prod.price * prod.amount
                        prodsStat[prod.idProd].profit += prod.price * prod.amount
                        sum1 += prod.price * prod.amount
                    }
                })
            }
        })
    }
    function statisticProdUI(from, to, type24) {
        statisticProd(from, to, type24)
        document.getElementById("head-stat").innerHTML = `<tr class="first-row"><th>M?? s???n ph???m</th>
        <th>T??n s???n ph???m</th>
        <th>Thu</th>
        <th>Chi</th>
        <th>L???i nhu???n</th></tr>`
        let body = ``
        data.product.forEach(elementt => {
            if (prodsStat[elementt.id] != null) {
                let element = prodsStat[elementt.id]
                body += `<tr><th>`+element.id+`</th><th>` + element.name+`</th><th>`+calculated(element.revenue) + " VND"+`</th><th>`+calculated(element.expenditure) + " VND"+`</th><th>`+calculated(element.profit) + " VND"+`</th></tr>`
            }
        })
        document.getElementById("body-stat").innerHTML = body
        setUpSum()
    }
    function LocaleDateFix(dateStr) {
        let splitStr = dateStr.toLocaleDateString().split("/")
        return splitStr[2].padStart(4,"0") + "-" + splitStr[1].padStart(2,"0") + "-" + splitStr[0].padStart(2,"0")
    }
    function firstSetup() {
        date1.value = LocaleDateFix(from)
        date2.value = LocaleDateFix(to)
        
    }
    firstSetup()
    statisticProdUI(from, to, type1)

    date1.onchange = dateChange1
    date2.onchange = dateChange2
    function dateChange1() {
        sum1 = 0
        sum2 = 0
        from = new Date(this.value)
        if (from > to) {
            alert("Ng??y kh??ng h???p l???")
            from = prevDate1
            return
        }
        prevDate1 = from
        statisticProdUI(from, to, document.getElementById("title-type").name)
    }
    function dateChange2() {
        sum1 = 0
        sum2 = 0
        to = new Date(this.value)
        if (from > to) {
            alert("Ng??y kh??ng h???p l???")
            to = prevDate2
            firstSetup()
            return
        }
        prevDate2 = to
        statisticProdUI(from, to, document.getElementById("title-type").name)
    }
    // document.getElementById("back-chart-page").onclick = function() {
    //     if (from > to) {
    //         alert("Ng??y kh??ng h???p l???")
    //         from = prevDate1
    //         to = prevDate2
    //         firstSetup
    //         return
    //     }
    //     prevDate1 = from
    //     prevDate2 = to
    //     statisticProdUI(from, to, type)
    // }
}
statistics()