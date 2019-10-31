// var formatTime = d3.timeFormat("Time Lef: %X"),
//     countdown = d3.select("#countdown");
//     today = d3.timeDay(new Date);
//     console.log(today)
// // 60s
// var deadline = d3.timeSecond.offset(60, 1);
// deadline.setSeconds(60);
//
// (function tick() {
//   var now = new Date;
//   countdown.text(formatTime(new Date(+deadline - d3.timeSecond(now))));
//   setTimeout(tick, 1000 - now % 1000);
// })();
function countdown() {
  var CD = d3.select("body")
    .append("div")
    .attr("id", "countdown")
    .style("opacity", 1);
  var countdown = d3.select("#countdown");
  var t = d3.timer(function (elapsed) {
    console.log((60 - parseInt(elapsed / 1000)).toString());
    var text = (60 - parseInt(elapsed / 1000)).toString();
    countdown.text("TIME LEFT: " + text);
  });

  d3.timeout(function () {
    t.stop();
    enable = 0;
    amount = 2;
    console.log("correct click when time is up:"+correct_click);
    console.log("history best:"+history_best);
    alert("Time is up!\nCongradulations!\nYour score is "+ correct_click.toString()
    + ".\nYour highest record is " + history_best.toString() + ".\nClick START to try again!");
    correct_click = 0;
    console.log("get start2");
    $.ajax({
          url: "/"+"?correct_click="+correct_click,
          type: "get",
          dataType: "text",
          success: function (response) {
            var n = response.indexOf("random_color1:")+15;
            var substring = response.substring(n,n+7);
            Color.random_color1 = substring;
            var n = response.indexOf("random_color2:")+15;
            var substring = response.substring(n,n+7);
            Color.random_color2 = substring;
          },
          error: Error
        });
    console.log("get stop2");
    d3.select("svg").remove();
    create_grid(amount, set_id);
    d3.select("#countdown").remove();
  }, 60000);
}
