var express = require('express');
var router = express.Router();
var dashboardService = require("../services/dashboardService");
/* GET home page. */
router.get('/', function (req, res, next) {
  let json = {
    "video" : 'https://www.youtube.com/embed/tTNZn-facLM',
    "imageVideoUrl":"https://img.etimg.com/thumb/height-480,width-640,imgsize-83822,msid-32778748/.jpg"
  };
  res.render('index', {json});
});

router.get("/dashboard", function (req, res) {
  dashboardService.getDashboardData()
    .then(function (response) {
      console.log("Sending response success");
     // res.send(response);
     //let dashboard = {"_id":"5c9f7641a36a7539919d47f7","noOfIndex":4,"breakingNews":{"title":"Supriya tai","imaageVideoUrl":"https://www.youtube.com/embed/tTNZn-facLM","shortDescription":"सुप्रिया सुळे यांनी लोकसभेत मांडले खासगी विधेयक, कर्मचाऱ्यांना मिळणार विशेष अधिकार","longDescription":"राष्ट्रवादी काँग्रेसच्या खासदा सुप्रिया सुळे (NCP MP Supriya Sule) यांनी एक खासगी विधेयक( Private Member's Bill) लोकसभेत दाखल केले आहे. राईट टू डिस्कनेक्ट (Right to Disconnect Bill) असे या विधेयकाचे नाव आहे. हे विधेयक लोकसभा सभागृहात संमत झाल्यास कार्यालयीन वेळ संपल्यानंतर कंपन्या, संस्था, अथवा कार्यालयांना कर्मचाऱ्यांकडून अधिकच्या कामाची तसेच वेळेची अपेक्षा ठेवता येणार नाही. कर्मचाऱ्यांना हा अधिकार मिळाल्यास कर्मचाऱ्यांवरअसलेला ताण कमी होईल तसेच, त्यांच्या कौटुंबिक, मानसिक व्यक्तिगत आयुष्यात मोठा बदल होईल, असे खा. सुळे यांचे ठाम विश्वास आहे. कार्यालयाची वेळ संपल्यानंतर कर्मचाऱ्याला कार्यालयीन जबाबदारीतुन मुक्त करण्यात यावे त्यासाठी कॉल डिस्कनेक्ट हा अधिकार कर्मचाऱ्याला मिळावा यासाठी त्यांनी हे विधेयक दाखल केले आहे.","dateAndTime":""},"indexes":[{"title":"Supriya tai Sule","imageVideoUrl":"https://img.etimg.com/thumb/height-480,width-640,imgsize-83822,msid-32778748/.jpg","newsReferenceNo":"1","totalNoOfNews":"3","indexRefernceNo":"1"},{"title":"Ajit dada Pawar","imageVideoUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhJkDKNqFRECdCTFceplUzPge_k57_zPQgO5uj4-zwhdP9NMW","newsReferenceNo":"1","totalNoOfNews":"10","indexRefernceNo":"2"},{"title":"Parth bhiya Pawar","imageVideoUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC4Yv49QNYKlbFRYZxWaFdqrQ0QMA7SwWN0mum7pNq7GhINUxa","newsReferenceNo":"1","totalNoOfNews":"1","indexRefernceNo":"3"},{"title":"Udyan Maharaj Bhosle","imageVideoUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZydyvIbgea5nBcnUSYA13lzHa-KX35ZF3RVbIIubVbSzStNh","newsReferenceNo":"1","totalNoOfNews":"3","indexRefernceNo":"4"}]};
     let dashboard = response.response_data.result[0];
     res.render('index', {dashboard});
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});
router.get("/newsReports", function (req, res) {
  let indexNo = req.param("indexNo");
  console.log("index ",indexNo)
  dashboardService.newsReports(parseInt(indexNo))
    .then(function (response) {
      console.log("Sending response success");
       //res.send(response);
       //let dummyData = {"status":200,"msg":"Data found","response_data":{"result":[{"_id":"5c988c4f948cc0b2b704970f","newsRefernceNo":"1","indexRefernceNo":1,"breakingNews":{"title":"","imaageVideoUrl":"https://www.loksatta.com/","shortDescription":"सुप्रिया सुळे यांनी लोकसभेत मांडले खासगी विधेयक, कर्मचाऱ्यांना मिळणार विशेष अधिकार","longDescription":"","dateAndTime":"1553501254"}},{"_id":"5c98b325948cc0b2b704f71e","newsRefernceNo":"2","indexRefernceNo":1,"breakingNews":{"title":"","imaageVideoUrl":"https://www.bbc.com/marathi/india-48166368","shortDescription":"सुप्रिया सुळे यांनी लोकसभेत मांडले खासगी विधेयक, कर्मचाऱ्यांना मिळणार विशेष अधिकार","longDescription":"","dateAndTime":"1553501254"}}],"count":2}};
      res.render('newsDetails', {"dummyData" : response});
    })
    .catch(function (error) {
      console.log("Error occuered ");
      res.send(error);
    });
});
router.get("/registerUser", function (req, res) {
  console.log("function get called ");
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
