const JasmineConsoleReporter = require("jasmine-console-reporter");
const reporter = new JasmineConsoleReporter({});

jasmine.getEnv().addReporter(reporter);
