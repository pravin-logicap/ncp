var express = require('express');
var router = express.Router();
var dashboardService = require("../services/dashboardService");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/dashboard", function (req, res) {
  dashboardService.getDashboardData()
    .then(function (response) {
      console.log("Sending response success");
      res.send(response);
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});
router.get("/newsReports", function (req, res) {
  let indexNo = req.param("indexNo");
  console.log("index 0",indexNo)
  dashboardService.newsReports(parseInt(indexNo))
    .then(function (response) {
      console.log("Sending response success");
      res.send(response);
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});
router.get("/registerUser", function (req, res) {
  dashboardService.registerUser({"dist": "Pune",
  "tal": "Baramati",
  "village": "karkehl",
  "mobileNo": "9860420381",
  "additionalInfo": {},
  "booking": -1,
  "bookingDetail": {},
  "confirmation": -1,
  "confirmationDetail": {}})
    .then(function (response) {
      console.log("Sending response success");
      res.send(response);
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});

router.get("/getRegisterdUser", function (req, res) {
  let mobileNo = req.param("mobileNo");
  dashboardService.getRegisterdUser(mobileNo)
    .then(function (response) {
      console.log("Sending response success");
      res.send(response);
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});

module.exports = router;
