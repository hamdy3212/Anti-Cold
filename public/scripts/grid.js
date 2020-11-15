var columnDefs = [{
        headerName: "ID",
        field: "id",
        width: 70,
        filter: true,
        checkboxSelection: true
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
        resizable: true

    },
    {
        headerName: "الرقم",
        field: "phoneNo",
        width: 120,
        filter: true,
        resizable: true


    },
    {
        headerName: "العنوان",
        field: "adress",
        width: 200,
        filter: true,
        resizable: true
    },
    {
        headerName: "الفرع",
        field: "branch",
        width: 110,
        filter: true
    },
    {
        headerName: "المنطقة",
        field: "area",
        width: 110,
        filter: true
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
        filter: true
    },
    {
        headerName: "النوع",
        field: "gender",
        width: 100,
        filter: true
    },
    {
        headerName: "السكن",
        field: "state",
        width: 100,
        filter: true
    },
    {
        headerName: "مشاهدة",
        field: "seen",
        width: 110,
        filter: true
    },
];


// specify the data
var rowData = [];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    enableRtl: true,
    rowSelection: 'multiple'

};

// // setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', function () {
    
// });

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);
var ref = firebase.database().ref();
     var read = ref.child('reports').on('child_added', function (snapshot) {
        var data = snapshot.val();
        console.log(data);
        console.log(data.app);
        rowData.push(data);
        gridOptions.api.setRowData(rowData)
    })
    
   

