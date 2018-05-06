$(function(){
  DevExpress.localization.locale("zh");
  var dataGrid = $("#gridContainer").dxDataGrid({
    dataSource: customers,
    allowColumnReordering: true,
    showColumnLines: false,
    showRowLines: true,
    rowAlternationEnabled: true,
    showBorders: true,
    grouping: {
      autoExpandAll: true,
    },
    searchPanel: {
      visible: true,
      width: 250
    },
    selection: {
      mode: "multiple"
    },
    "export": {
      enabled: true,
      fileName: "Employees",
      allowExportSelectedData: true
    },
    paging: {
      enabled: false
    },  
    groupPanel: {
      visible: true
    },
    columns: [
      {
        dataField: "Result",
        width: 100,
      },
      {
        dataField: "Test",
      },
      {
        dataField: "Fixture",
      },
      {
        dataField: "Browsers",
        width: 300,
      },
      {
        dataField: "Duration",
        width: 100,
        alignment: "right",
      }
    ],
    masterDetail: {
      enabled: true,
      template: function(container, options) { 
        var currentEmployeeData = options.data;
        if (currentEmployeeData.Result == 'failed') {
          container.append($('<div class="employeeInfo"><img class="employeePhoto" src="' + currentEmployeeData.Browsers + '" /><p class="employeeNotes">' + currentEmployeeData.Duration + '</p></div>'));
        }
      }
    }
  }).dxDataGrid("instance");

  $("#autoExpand").dxCheckBox({
    value: true,
    text: "Expand All Groups",
    onValueChanged: function(data) {
      dataGrid.option("grouping.autoExpandAll", data.value);
    }
  });

  $("#column-lines").dxCheckBox({
    text: "Show Column Lines",
    value: false,
    onValueChanged: function(data) {
      dataGrid.option("showColumnLines", data.value);
    }
  });

  $("#row-lines").dxCheckBox({
    text: "Show Row Lines",
    value: true,
    onValueChanged: function(data) {
      dataGrid.option("showRowLines", data.value);
    }
  });

  $("#show-borders").dxCheckBox({
    text: "Show Borders",
    value: true,
    onValueChanged: function(data) {
      dataGrid.option("showBorders", data.value);
    }
  });

  $("#row-alternation").dxCheckBox({
    text: "Alternating Row Color",
    value: true,
    onValueChanged: function(data) {
      dataGrid.option("rowAlternationEnabled", data.value);
    }
  });
});