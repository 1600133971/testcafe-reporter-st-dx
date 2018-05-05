'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return {
    noColors: true,
    startTime: null,
    afterErrList: false,
    uaList: null,
    report: '',
    table: '',
    tableReports: '',
    testCount: 0,
    skipped: 0,
    fixtureCount: 0,

    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.uaList = userAgents.join(', ');
      this.testCount = testCount;
      this.report = '';
      this.fixtureCount = 0;
    },

    reportFixtureStart: function reportFixtureStart(name) {
      this.currentFixtureName = name;
      this.fixtureCount++;
    },

    reportTestDone: function reportTestDone(name, testRunInfo) {
      var hasErr = !!testRunInfo.errs.length;
      var result = hasErr ? 'failed' : 'passed';

      if (testRunInfo.skipped) this.skipped++;

      this.compileTestTable(name, testRunInfo, hasErr, result);
      if (hasErr) this.compileErrors(name, testRunInfo);
    },

    compileErrors: function compileErrors(name, testRunInfo) {
      var _this = this;
      var heading = this.currentFixtureName + ' - ' + name;

      this.report += this.indentString('<h4>' + heading + '</h4>\n');
      testRunInfo.errs.forEach(function (error) {
        _this.report += _this.indentString('<pre>');
        _this.report += _this.indentString(' \n');
        _this.report += _this.formatError(error, '');
        _this.report += _this.indentString('\n');
        _this.report += _this.indentString('</pre>');
        _this.report += _this.indentString('\n');
      });
    },

    compileTestTable: function compileTestTable(name, testRunInfo, hasErr, result) {
      this.tableReports += this.indentString('{\n');

      //Result
      this.tableReports += this.indentString('\"Result\":', 2);
      if (testRunInfo.skipped) this.tableReports += '\"skipped\",';
      else this.tableReports += '\"' + result + '\",';
      this.tableReports += '\n';

      //Test
      this.tableReports += this.indentString('\"Test\":', 2);
      this.tableReports += '\"' + name + '\",';
      this.tableReports += '\n';

      //Fixture
      this.tableReports += this.indentString('\"Fixture\":', 2);
      this.tableReports += '\"' + this.currentFixtureName + '\",';
      this.tableReports += '\n';

      //Browsers
      this.tableReports += this.indentString('\"Browsers\":', 2);
      this.tableReports += '\"' + this.uaList + '\",';
      this.tableReports += '\n';

      //Duration
      this.tableReports += this.indentString('\"Duration\":', 2);
      this.tableReports += '\"' + this.moment.duration(testRunInfo.durationMs).format('d[d] h[h] mm[m] ss[s] SSS[ms]' + '\",');
      this.tableReports += '\n';

      this.tableReports += this.indentString('},\n');
    },

    reportTaskDone: function reportTaskDone(endTime, passed , warnings) {
      var durationMs = endTime - this.startTime;
      var durationStr = this.moment.duration(durationMs).format('d[d] h[h] mm[m] ss[s] SSS[ms]');
      var failed = this.testCount - passed;

      this
        .write('var customers = ').newline()
        .write('[').newline();

      this.write(this.tableReports).newline();

      this.write('];');
    },

    compileWarnings: function compileWarnings(warnings) {
      var _this = this;
      var heading = 'Warnings (' +  warnings.length + '):';
      var reportWarning = '';
      reportWarning += this.indentString('<h4>' + heading + '</h4>\n');
      warnings.forEach(function (msg) {
        reportWarning += _this.indentString('<pre>');
        reportWarning += _this.indentString(' \n');
        reportWarning += _this.indentString(msg);
        reportWarning += _this.indentString('\n');
        reportWarning += _this.indentString('</pre>');
        reportWarning += _this.indentString('\n');
      });
      return reportWarning;
    }
  };
};

module.exports = exports['default'];