$(function(){
    DevExpress.localization.locale("zh");
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: customers,
        allowColumnReordering: true,
        grouping: {
            autoExpandAll: true,
        },
        searchPanel: {
            visible: true
        },
        paging: {
            enabled: false
        },  
        groupPanel: {
            visible: true
        },
        columns: [
            "Result",
            "Test",
            "Fixture",
            "Browsers",
            "Duration"
        ]
    }).dxDataGrid("instance");
    
    $("#autoExpand").dxCheckBox({
        value: true,
        text: "Expand All Groups",
        onValueChanged: function(data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
        }
    });
});