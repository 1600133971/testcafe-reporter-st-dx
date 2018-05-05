# testcafe-reporter-st-dx

This is the **st-dx** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

st-dx outputs a semi-styled html report to help track documentation and for use in wiki tools like confluence.

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter st-dx
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-dx') // <-
    .run();
```

Although we recommend setting up a custom stream to output to within the  `reporter()` method:

```js
const fs = require('fs');
const stream = fs.createWriteStream(__dirname+'/reports_' + new Date().getTime() + '.html')

testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-dx', stream) // <-
    .run();
```

