var ctx = document.getElementById("myChart").getContext("2d");
var days = [];
var data = [];
for (let index = 0; index < 31; index++) {
  days.push(index);
  data.push(Math.floor(Math.random() * 11));
}
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: days,
    datasets: [
      {
        label: "عدد البلاغات",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "transparent",
        data: data,
      },
    ],
  },

  // Configuration options go here
  options: {},
});
