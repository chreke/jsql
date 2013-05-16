// Dependencies: underscore.js
var JSQL = (function () {

  var accessorFactory = function (obj, attr) {
    return function () {
      if (arguments.length > 0) {
        obj[attr] = arguments[0];
        return obj;
      } else {
        return obj[attr];
      }
    }
  };

  return function (data) {
    this.from = data || [];
    var accessible = ['select', 'where', 'from', 'groupBy', 'orderBy'];
    _.each(function (x) {
      this[x] = accessorFactory(this, x);
    });
    this.query = function () {
      var rows = _.chain(this.from)
        .filter(this.where || _.identity)
        .map(function (x) {
          var selected = this.selected ? 
            _.union(this.select, (this.groupBy || [])) :
            _.keys.(x);
          return _.pick(x, selected);
        })
        .value();
      if (this.groupBy) {
        rows = _.groupBy(rows, this.groupBy)
      }
    };
)();
