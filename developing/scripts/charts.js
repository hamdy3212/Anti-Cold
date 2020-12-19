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
let val = 20;
let totalReports = 0,
  done = 0,
  other = 0,
  unworthy = 0,
  processing = 0,
  notExist = 0;
var ref = firebase.database().ref();
ref
  .child("reports")
  .once("value", function (snapshot) {
    var data = snapshot.val();
    for (const report in data) {
      switch (data[report].feed_back_type.trim()) {
        case "تم التعامل":
          done++;
          break;
        case "غير مستحق":
          unworthy++;
          break;
        case "":
          processing++;
          break;
        case "مش موجود":
          notExist++;
          break;
        default:
          other++;
      }
      totalReports++;
    }
  })
  .then(() => {
    var c = Math.PI * (90 * 2);
    // done circle chart
    let donePct = (done / totalReports) * 100;
    document.querySelector("#done-circle").style.strokeDashoffset =
      ((100 - donePct) / 100) * c;
    document
      .querySelector("#done-pct")
      .setAttribute("data-pct", donePct.toFixed());

    // other cricle chart
    let otherPct = (other / totalReports) * 100;
    document.querySelector("#other-circle").style.strokeDashoffset =
      ((100 - otherPct) / 100) * c;
    document
      .querySelector("#other-pct")
      .setAttribute("data-pct", otherPct.toFixed());

    // unworthy cirlce chart
    let unworthyPct = (unworthy / totalReports) * 100;
    document.querySelector("#unworthy-circle").style.strokeDashoffset =
      ((100 - unworthyPct) / 100) * c;
    document
      .querySelector("#unworthy-pct")
      .setAttribute("data-pct", unworthyPct.toFixed());

    // processing cirlce chart
    let processingPct = (processing / totalReports) * 100;
    document.querySelector("#processing-circle").style.strokeDashoffset =
      ((100 - processingPct) / 100) * c;
    document
      .querySelector("#processing-pct")
      .setAttribute("data-pct", processingPct.toFixed());

    // notExist cirlce chart
    let notExistPct = (notExist / totalReports) * 100;
    document.querySelector("#notExist-circle").style.strokeDashoffset =
      ((100 - notExistPct) / 100) * c;
    document
      .querySelector("#notExist-pct")
      .setAttribute("data-pct", notExistPct.toFixed());
  });
