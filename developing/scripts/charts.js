let reportsNum = 0,
  done = 0,
  other = 0,
  unworthy = 0,
  processing = 0,
  notExist = 0,
  caseNum = 0,
  blankets = 0,
  clothNum = 0,
  meals = 0,
  districts = [],
  branches = {
    nasrCity: { name: "مدينة نصر", reports: 0, twasol: 0, t3amol: 0 },
    mohandseen: { name: "المهندسين", reports: 0, twasol: 0, t3amol: 0 },
    maadi: { name: "المعادي", reports: 0, twasol: 0, t3amol: 0 },
    october: { name: "اكتوبر", reports: 0, twasol: 0, t3amol: 0 },
    masrElgdeda: { name: "مصر الجديدة", reports: 0, twasol: 0, t3amol: 0 },
    alex: { name: "اسكندرية", reports: 0, twasol: 0, t3amol: 0 },
    faisal: { name: "فيصل", reports: 0, twasol: 0, t3amol: 0 },
    helwan: { name: "حلوان", reports: 0, twasol: 0, t3amol: 0 },
    mokatem: { name: "المقطم", reports: 0, twasol: 0, t3amol: 0 },
    mohafazat: { name: "محافظات", reports: 0, twasol: 0, t3amol: 0 },
  },
  totalTwasol = 0,
  totalT3amol = 0,
  volunteersNum = 0,
  reportsPerDay = [],
  days = [],
  reportsInEachDay = [];
const table = document.getElementById("table");
const fro3 = document.getElementById("fro3");

var ref = firebase.database().ref();
ref.child("hamalat").once("value", function (snapshot) {
  var hamalat = snapshot.val();
  for (const hamla in hamalat) {
    volunteersNum += hamalat[hamla].boys_count;
    volunteersNum += hamalat[hamla].girls_count;

    const cases = hamalat[hamla].cases;
    for (const Case in cases) {
      blankets += cases[Case].blankets;
      meals += cases[Case].meals;
      clothNum += cases[Case].clothes;
      caseNum++;
    }
  }
});

ref
  .child("reports")
  .once("value", function (snapshot) {
    var data = snapshot.val();
    for (const report in data) {
      const day = new Date(Date.parse(data[report].date));
      reportsPerDay.push(day);
      if (data[report].first_feedback === "") {
        switch (data[report].branch.trim()) {
          case "مدينة_نصر":
            branches.nasrCity.twasol++;
            break;
          case "مصر_الجديدة":
            branches.masrElgdeda.twasol++;
            break;
          case "المهندسين":
            branches.mohandseen.twasol++;
            break;
          case "اسكندرية":
            branches.alex.twasol++;
            break;
          case "اكتوبر":
            branches.october.twasol++;
            break;
          case "حلوان":
            branches.helwan.twasol++;
            break;
          case "فيصل":
            branches.faisal.twasol++;
            break;
          case "المقطم":
            branches.mokatem.twasol++;
            break;
          case "المعادي":
            branches.maadi.twasol++;
            break;
          default:
            branches.mohafazat.twasol++;
            break;
        }
      }
      switch (data[report].feed_back_type.trim()) {
        case "تم التعامل":
          done++;
          break;
        case "غير مستحق":
          unworthy++;
          break;
        case "":
          processing++;
          switch (data[report].branch.trim()) {
            case "مدينة_نصر":
              branches.nasrCity.t3amol++;
              break;
            case "مصر_الجديدة":
              branches.masrElgdeda.t3amol++;
              break;
            case "المهندسين":
              branches.mohandseen.t3amol++;
              break;
            case "اسكندرية":
              branches.alex.t3amol++;
              break;
            case "اكتوبر":
              branches.october.t3amol++;
              break;
            case "حلوان":
              branches.helwan.t3amol++;
              break;
            case "فيصل":
              branches.faisal.t3amol++;
              break;
            case "المقطم":
              branches.mokatem.t3amol++;
              break;
            case "المعادي":
              branches.maadi.t3amol++;
              break;
            default:
              branches.mohafazat.t3amol++;
              break;
          }
          break;
        case "مش موجود":
          notExist++;
          break;
        default:
          other++;
      }
      switch (data[report].branch.trim()) {
        case "مدينة_نصر":
          branches.nasrCity.reports++;
          break;
        case "مصر_الجديدة":
          branches.masrElgdeda.reports++;
          break;
        case "المهندسين":
          branches.mohandseen.reports++;
          break;
        case "اسكندرية":
          branches.alex.reports++;
          break;
        case "اكتوبر":
          branches.october.reports++;
          break;
        case "حلوان":
          branches.helwan.reports++;
          break;
        case "فيصل":
          branches.faisal.reports++;
          break;
        case "المقطم":
          branches.mokatem.reports++;
          break;
        case "المعادي":
          branches.maadi.reports++;
          break;
        default:
          branches.mohafazat.reports++;
          break;
      }
      if (data[report].blankets) {
        blankets += parseInt(data[report].blankets, 10);
      }
      if (data[report].meals) {
        meals += parseInt(data[report].meals, 10);
      }
      if (data[report].case_num) {
        caseNum += parseInt(data[report].case_num, 10);
      }
      if (data[report].clothes_num) {
        clothNum += parseInt(data[report].clothes_num, 10);
      }
      if (data[report].branch !== "محافظات") {
        districts.push(data[report].area);
        console.log(data[report]);
      }
      reportsNum++;
    }
    // get reports per day
    reportsPerDay = getFrequency(reportsPerDay);
    for (const reportPerDay in reportsPerDay) {
      let date = new Date(reportPerDay);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      days.push(day + `-` + month);
      reportsInEachDay.push(reportsPerDay[reportPerDay]);
    }

    // get top 10 districts
    districts = getFrequency(districts);

    var sortedDistricts = [];
    for (var item in districts) {
      sortedDistricts.push([item, districts[item]]);
    }

    sortedDistricts.sort(function (a, b) {
      return a[1] - b[1];
    });

    top10Districts = sortedDistricts.slice(
      Math.max(sortedDistricts.length - 10, 0)
    );
  })
  .then(() => {
    // reports per day
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
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
            data: reportsInEachDay,
          },
        ],
      },
      // Configuration options go here
      options: {},
    });

    // احصائيات
    document.getElementById("caseNum").innerHTML = `${caseNum}`;
    document.getElementById("reportsNum").innerHTML = `${reportsNum}`;
    document.getElementById("volunteersNum").innerHTML = `${volunteersNum}`;
    document.getElementById("meals").innerHTML = `${meals}`;
    document.getElementById("blankets").innerHTML = `${blankets}`;
    document.getElementById("clothes").innerHTML = `${clothNum}`;

    // الانتهاء من الاحصائيات

    for (const branch in branches) {
      // unfinished reports
      table.innerHTML += `
      <tr>
        <th scope="row">${branches[branch].name}</th>
        <td>${branches[branch].twasol}</td>
        <td>${branches[branch].t3amol}</td>
      </tr>
      `;
      totalT3amol += branches[branch].t3amol;
      totalTwasol += branches[branch].twasol;
      // تقرير الفروع
      //get percentage of each branch
      branches[branch].reports = Math.round(
        (branches[branch].reports / reportsNum) * 100
      );
      // create progress bar element for each branch
      fro3.innerHTML += `
        <div class="row">
        <div class="col-4">
          <p>${branches[branch].name}</p>
        </div>
        <div class="col-5 p-0 mt-1">
          <div class="progress">
            <div class="progress-bar" style="width:${branches[branch].reports}%"></div>
          </div>
        </div>
        <div class="col-3 p-0">${branches[branch].reports}%</div>
      </div>
      `;
    }
    // add total unfinished reports to the table
    table.innerHTML += `
    <tr id="total">
      <th scope="row">الاجمالي</th>
      <td>${totalTwasol}</td>
      <td>${totalT3amol}</td>
    </tr>
    `;

    // انتهاء من تقرير الفروع

    // مناطق البلاغات
    const bla8at = document.getElementById("bla8at");

    for (let i = 0; i < 9; i++) {
      bla8at.innerHTML += `
        <div class="row">
          <div class="col-5">
            <p>${top10Districts[9 - i][0]}</p>
          </div>
          <div class="col-4 p-0 mt-1">
            <div class="progress">
              <div class="progress-bar" style="width:${
                top10Districts[9 - i][1]
              }%";></div>
            </div>
          </div>
          <div class="col-3 p-0">${top10Districts[9 - i][1]}</div>
        </div>
        `;
    }
    //

    // عدد البلاغات
    var c = Math.PI * (90 * 2);
    // done circle chart
    let donePct = (done / reportsNum) * 100;
    document.querySelector("#done-circle").style.strokeDashoffset =
      ((100 - donePct) / 100) * c;
    document
      .querySelector("#done-pct")
      .setAttribute("data-pct", donePct.toFixed());

    // other cricle chart
    let otherPct = (other / reportsNum) * 100;
    document.querySelector("#other-circle").style.strokeDashoffset =
      ((100 - otherPct) / 100) * c;
    document
      .querySelector("#other-pct")
      .setAttribute("data-pct", otherPct.toFixed());

    // unworthy cirlce chart
    let unworthyPct = (unworthy / reportsNum) * 100;
    document.querySelector("#unworthy-circle").style.strokeDashoffset =
      ((100 - unworthyPct) / 100) * c;
    document
      .querySelector("#unworthy-pct")
      .setAttribute("data-pct", unworthyPct.toFixed());

    // processing cirlce chart
    let processingPct = (processing / reportsNum) * 100;
    document.querySelector("#processing-circle").style.strokeDashoffset =
      ((100 - processingPct) / 100) * c;
    document
      .querySelector("#processing-pct")
      .setAttribute("data-pct", processingPct.toFixed());

    // notExist cirlce chart
    let notExistPct = (notExist / reportsNum) * 100;
    document.querySelector("#notExist-circle").style.strokeDashoffset =
      ((100 - notExistPct) / 100) * c;
    document
      .querySelector("#notExist-pct")
      .setAttribute("data-pct", notExistPct.toFixed());
    // انتهاء من تقرير الفروع
  });

const getFrequency = (array) => {
  const map = {};
  array.forEach((item) => {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  });
  return map;
};
