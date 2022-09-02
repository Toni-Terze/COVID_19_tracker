const api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=365';

fetch(api)
 .then(response => response.json())
 .then(data => {
    plotData(data);
});



function plotData(data) {

    // number of deaths every 7 days
    let finalArr =  Object.keys(data.deaths).map((k) => {return data.deaths[k]});
    let finalArr7th = [];
    for (let i = 0; i < finalArr.length; i += 7) {
        finalArr7th.push(finalArr[i]);
    }


    // every 7th day
    let getDates = Object.keys(data.deaths)
    let dates =  Object.keys(getDates).map((k) => {return getDates[k]});
    let dates7th = [];
    for (let i = 0; i < dates.length; i += 7) {
        let date = new Date(dates[i]);
        dates7th.push(date.toLocaleString("nl-NL", { year: "2-digit", month: "numeric", day: "numeric" }));
    }

    // every 7th case
    let status = data.cases
    let final = Object.keys(status).map((k) => {return status[k]});
    let final7th = [];
    for (let i = 0; i < final.length; i += 7) {
        final7th.push(final[i]); 
      }

    // billboard.js
    bb.generate({
        bindto: "#covid-all-world-cases",
        data: {
            x: "x",
            columns: [[ "Cases", ...final7th ],[ "Deaths", ...finalArr7th],["x", ...dates7th]],
            types: {
                Cases: "line",
                Deaths: "bar"
            },
            colors: {
                Cases: "red",
                Deaths: "blue"
            },
            axes: {
                Deaths: "y2",
                Cases: "y",
            },

        },
        axis: {
                y: {
                    padding: {
                        top: 20,
                        bottom: 90
                      },
                    tick: {
                        format: function(x) { return new Intl.NumberFormat().format(x / 1000000) + "M"; }
                      },
                    min: 200000000,
                    label: {
                        text: "Cases",
                        position: "outer-middle"
                      }
                },
                y2: {
                    min: 4400000,
                    padding: {
                        top: 100,
                        bottom: 0
                      },
                    tick: {
                        format: function(x) { return new Intl.NumberFormat().format(x / 1000000) + "M"; }
                      },
                    label: {
                        text: "Deaths",
                        position: "outer-middle"
                      },
                      show: true
                },
                x: {
                    padding: {
                        right: 0.3
                    },
                    type: "category",
                    tick: {
                        count: 12
                    }
                }
        }
        
    });

    bb.generate({
        data: {
          columns: [["Cases", final7th[52]],["Deaths", finalArr7th[52]]],
          type: "pie", // for ESM specify as: pie()
          colors: {
            Cases: "red",
            Deaths: "blue"
            }
        },
        bindto: "#covid-pie"
    });
}

