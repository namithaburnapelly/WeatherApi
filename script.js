var date = [];
function getDetails() {
    let xttp = new XMLHttpRequest();
    let city = document.getElementById("city").value;
    var dataList = []

    let key = "07e5ee3702f491598157b15ceb669cb6"
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`

    xttp.open("get", url, false);
    xttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let data = JSON.parse(xttp.responseText);
            // console.log(data);

            let { list } = data
            // console.log(list)

            for (let i = 0; i < list.length; i = i + 8) {
                let { dt_txt, main: { temp } } = list[i]
                dataList.push(temp);
                date.push((dt_txt.split(' '))[0])
            }

            let { main: { temp_max, temp_min } } = list[0]
            getData(city, temp_min, temp_max);
            getGraph(date, ...dataList)
        }
    }
    xttp.send();

}

function getGraph(date, a, b, c, d, e) {

    const ctx = document.getElementById('myChart');

    ch = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: date,
            datasets: [{
                label: `Temperature`,
                data: [a, b, c, d, e],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function getData(city, temp_min, temp_max) {
    document.getElementById('place').innerHTML = `<i class="material-icons">place</i>  ${city}`
    document.getElementById('min').innerHTML = `Minimum Temp. is ${temp_min}`
    document.getElementById('max').innerHTML = `Maximum Temp. is ${temp_max}`
}