var postcss = require("postcss")
var assert = require("power-assert")
var sortSpecificity = require("sort-specificity")
var deepDiff = require("deep-diff")
var diff = require("diff")

module.exports = function(css){
  var raw = parseSelectors(css)
  var sorted = sortSpecificity(raw)
  var nameSource = idToClassMap(sorted)
  var rawSortedClassify = sorted.map(function(selector){
    return idToClass(selector)
  })
  var classify = raw.map(function(selector){
    return idToClass(selector)
  })
  var classifySorted = sortSpecificity(classify)
/*  var rawStr = rawSortedClassify.join("\n")
  var classifyStr = classifySorted.join("\n")
  console.log(diff.diffLines(rawStr,classifyStr))
  */
  var diff = deepDiff(classifySorted, rawSortedClassify)
  diff.forEach(function(d){
    var source = nameSource[d.rhs]
    console.log(d.lhs, "\t=>\t", source)
  })
}

var idToClass = function(selector){
  return selector.replace("#", ".")
}
var idToClassMap = function(selectors){
  var nameSource = {}
  var rawSortedClassify = selectors.map(function(selector){
    var classify = idToClass(selector)
    nameSource[classify] = selector
    return classify
  })
  return nameSource
}

var parseSelectors = function(css){
  var parsed = postcss(function(css){}).process(css)
  var nodes = parsed.root.nodes || []
  return nodes.map(function(node){
    return node.selector
  }) 
}
