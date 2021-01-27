var columnDefs = [
  {
    headerName: "ID",
    field: "id",
    width: 90,
    filter: true,
    checkboxSelection: true,
  },
  {
    headerName: "App",
    field: "app",
    width: 100,
    filter: true,
  },
  {
    headerName: "الاسم",
    field: "name",
    width: 140,
    resizable: true,
  },
  {
    headerName: "الرقم",
    field: "phoneNo",
    width: 120,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "العنوان",
    field: "address",
    width: 200,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "الفرع",
    field: "branch",
    width: 110,
    filter: true,
    editable: true,
  },
  {
    headerName: "المنطقة",
    field: "area",
    width: 110,
    filter: true,
    editable: true,
  },
  {
    headerName: "التاريخ",
    field: "date",
    width: 140,
    filter: true,
  },
  {
    headerName: "ملاحظات",
    field: "notes",
    resizable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "النوع",
    field: "gender",
    width: 100,
    filter: true,
  },
  {
    headerName: "السكن",
    field: "state",
    width: 100,
    filter: true,
  },
  {
    headerName: "مشاهدة",
    field: "seen",
    width: 110,
    filter: true,
  },
  {
    headerName: "فيدباك تواصل اول",
    field: "first_feedback",
    width: 150,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "فيدباك تواصل ثاني",
    field: "second_feedback",
    width: 160,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "الفيدباك",
    field: "feed_back",
    width: 110,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "نوع الفيدباك",
    field: "feed_back_type",
    width: 160,
    filter: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: "تاريخ التعامل",
    field: "help_date",
    width: 160,
    filter: true,
    editable: true,
  },
  {
    headerName: "عدد الحالات",
    field: "case_num",
    width: 160,
    filter: true,
    editable: true,
  },
  {
    headerName: "اسم الحالة",
    field: "case_name",
    width: 160,
    filter: true,
    editable: true,
  },
  {
    headerName: "البطاطين",
    field: "blankets",
    width: 110,
    filter: true,
    editable: true,
  },
  {
    headerName: "الوجبات",
    field: "meals",
    width: 110,
    filter: true,
    editable: true,
  },
  {
    headerName: "عدد القطع",
    field: "clothes_num",
    width: 160,
    filter: true,
    editable: true,
  },
];
function swap(input, index_A, index_B) {
  let temp = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
}

// specify the data
var rowData = [];

// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  enableRtl: true,
  rowSelection: "multiple",
  onCellValueChanged: onCellValueChanged,
};
var gridDiv = document.querySelector("#myGrid");
new agGrid.Grid(gridDiv, gridOptions);
var ref = firebase.database().ref();
ref.child("reports").once("value", function (snapshot) {
  var id = 1;
  var data = snapshot.val();
  for (const report in data) {
    data[report].id = id++;
    rowData.push(data[report]);
  }
  gridOptions.api.setRowData(rowData);
});

function getData() {
  let selectedNodes = gridOptions.api.getSelectedNodes();
  let selectedData = selectedNodes.map((node) => node.data);
  var wb = XLSX.utils.book_new();
  wb.probs = {
    Title: "test",
    Subject: "test",
  };
  wb.SheetNames.push("Test Sheet");
  let data = selectedData.map((obj) => Object.values(obj));
  dataDefs = [
    "العنوان",
    "app",
    "المنطقة",
    "البطاطين",
    "الفرع",
    "اسم الحالة",
    "عدد الحالات",
    "عدد الفطع",
    "تاريخ البلاغ",
    "فيدباك",
    "تفاصيل البلاغ",
    "نوع الفيدباك",
    "فيدباك اول",
    "الجنس",
    "تاريخ المساعدة",
    "id",
    "الوجبات",
    "الاسم",
    "الملاحظات",
    "الهاتف",
    "push id",
    "فيدباك تاني",
    "عدد مرات المشاهدة",
    "الماوي",
  ];
  data.unshift(dataDefs);

  data.forEach((element) => {
    element.push(element[5]);
    element.splice(1, 1);
    element.splice(4, 1);
    element.splice(18, 1);
  });

  data.forEach((element) => {
    swap(element, 0, 13);
    swap(element, 1, 15);
    swap(element, 2, 17);
    swap(element, 3, 13);
    swap(element, 4, 13);
    swap(element, 5, 15);
    swap(element, 7, 16);
    swap(element, 8, 11);
    swap(element, 9, 20);
    swap(element, 10, 19);
    swap(element, 11, 19);
    swap(element, 12, 18);
    swap(element, 13, 16);
    swap(element, 14, 20);
    swap(element, 15, 18);
    swap(element, 18, 20);
    element.splice(19, 1);
  });

  var ws = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets["Test Sheet"] = ws;

  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    type: "binary",
  });

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  saveAs(
    new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    }),
    "بلاغات.xlsx"
  );
}

function onCellValueChanged(event) {
  if (event.column.colId != "phoneNo") {
    firebase
      .database()
      .ref()
      .child("reports")
      .child(event.data.pushid)
      .update(event.data);
  }
}
