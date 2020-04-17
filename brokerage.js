const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("Public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
      var qty = Number(req.body.qty)
      var buyPrice = Number(req.body.buyPrice);
      var sellPrice = Number(req.body.sellPrice);
      var buy = qty*buyPrice;
      var sell = qty*sellPrice;
      var net = buy + sell;
      var mtm = sell - buy;
      var brok = (0.05 / 100) * net;
      var igst = .18 * brok;
      var stt = (.025 / 100) * sell;
      var total = brok + igst + stt + 4;
      //total=total.toPrecision(5);
      var amt = mtm - total;
      res.write("<h1>Net traded value (Buy+Sell) : " + net);
      res.write("<h1>Net BUY value : " + buy);
      res.write("<h1>Net SELL value : " + sell);
      if (mtm < 0)
        res.write("<h1>Your Loss : " + (-mtm));
      else
        res.write("<h1>Your Profit : " + mtm);
      //amt=amt.toPrecision(5);

      res.write("<h1>Aprox Brokerage : " + total);
      if (amt < 0)
        res.write("<h1>Amount Debited : " + (-amt));
        else
          res.write("<h1>Amount Credited : " + amt);
        res.send();
      }); app.listen(process.env.PORT||3000, function() {
      console.log("Server Hosted at 3000");
    });
