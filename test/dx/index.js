$(function(){
  DevExpress.localization.locale("zh");
  var dataGrid = $("#gridContainer").dxDataGrid({
    dataSource: customers,
    allowColumnReordering: true,
    showColumnLines: true,
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
      fileName: "testcafe_result",
      allowExportSelectedData: true
    },
    paging: {
      enabled: false
    },  
    groupPanel: {
      visible: true
    },
    columns: [{
        dataField: "Result",
        width: 100,
        cellTemplate: function (container, options) {
          if (options.value == "passed") {
            $("<div style=\"color:#02C874\">")
              .append($("<i>", { "class": "fa fa-check fa-fw" }))
              .append(options.value)
              .appendTo(container);
          } else if (options.value == "skipped") {
            $("<div style=\"color:#BEBEBE\">")
              .append($("<i>", { "class": "fa fa-minus fa-fw" }))
              .append(options.value)
              .appendTo(container);
          } else if (options.value == "failed") {
            $("<div style=\"color:#EA0000\">")
              .append($("<i>", { "class": "fa fa-close fa-fw" }))
              .append(options.value)
              .appendTo(container);
          } else {
            $("<div style=\"color:#000000\">")
              .append($("<i>", { "class": "fa fa-info fa-fw" }))
              .append(options.value)
              .appendTo(container);
          }
        }
      },{
        dataField: "Test",
      },{
        dataField: "Fixture",
      },{
        dataField: "Browsers",
        width: 300,
      },{
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
    value: true,
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