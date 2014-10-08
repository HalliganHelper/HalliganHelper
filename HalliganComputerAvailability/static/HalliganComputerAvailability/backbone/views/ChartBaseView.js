app = typeof app !== "undefined" ? app : {};

app.ChartBaseView = Backbone.View.extend({

  // Default options
  defaults: {
    margin: {top: 20, right: 20, bottom: 30, left: 40}
  },

  render: function() {
    this.options = _.extend({}, this.defaults, this.options);
    var margin = this.options.margin;
    this.width = this.$el.width() - margin.left - margin.right;
    this.height = this.$el.height() - margin.top - margin.bottom;

    this.svg = d3.select(this.el).append("svg")
        .attr("width", this.width + margin.left + margin.right)
        .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return this;
  }

});