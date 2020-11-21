var columnDefs = [{
        headerName: "ID",
        field: "id",
        width: 90,
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
    },
    {
        headerName: "المنطقة",
        field: "area",
        width: 110,
        filter: true,
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
    },{
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
// specify the data
var rowData = [];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    enableRtl: true,
    rowSelection: 'multiple',
    onCellValueChanged: onCellValueChanged,

};

var gridDiv = document.querySelector('#myGrid');
new agGrid.Grid(gridDiv, gridOptions);
var ref = firebase.database().ref();
var id = 1;
     var read = ref.child('reports').on('child_added', function (snapshot) {
        var data = snapshot.val();
        data.id = id++;
        rowData.push(data);
        gridOptions.api.setRowData(rowData);
    })
    
   
function getData(){
    let selectedNodes = gridOptions.api.getSelectedNodes();
	let selectedData = selectedNodes.map(node => node.data);
    var wb = XLSX.utils.book_new();
    wb.probs = {
        Title: "test",
        Subject: "test",
    }
    wb.SheetNames.push("Test Sheet");
    console.log(selectedData);
    let data = selectedData.map(obj => Object.values(obj));
    dataDefs = ['العنوان','التطبيق','المنطقة','البطاطين','الفرع','عدد الحالات','عدد القطع','تاريخ التسجيل','الفيدباك','نوع الفيدباك','الجنس','تاريخ المساعدة','id','الوجبات','الاسم','الملاحظات','الهاتف','pushid','عدد مرات الرؤية','السكن'];
    data.unshift(dataDefs);
    var ws = XLSX.utils.aoa_to_sheet(data);
    console.log(data);
    wb.Sheets["Test Sheet"] = ws;
    
    var wbout = XLSX.write(wb, {bookType:"xlsx", type: "binary"});
    function s2ab(s){
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for(var i=0; i<s.length;i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'بلاغات.xlsx');
}

function onCellValueChanged(event) {
    console.log('Data after change is', event.data);
    ref.child('reports').child(event.data.pushid).update(event.data);
  }
  
  
