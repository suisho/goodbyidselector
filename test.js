var gbid = require("./index.js")
var fs = require("fs")
describe("", function(){
  it("", function(){
    var css = fs.readFileSync("fixture/failed.css", "utf8")
    gbid(css)
  })
})