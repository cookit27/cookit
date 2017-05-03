var express = require('express');
var bodyParser = require('body-parser');
var Connectorlist = require('./shared/definition/definition');
var MarkSentence = require('./buildAlg/markSentence');
 
var app = express();
var port = process.env.PORT || 1337;

var con = new Connectorlist();

var markSen = new MarkSentence();
/*var split = markSen.splitSentence("hi my name is roni");

for (var i=0; i<split.length; i++){
  console.log(i + " " + split[i]);
}*/

markSen.markSentence("i want cake with mozzarella cheese and red bell pepper sugar and nuts without egg and Parmesan Cheese with mozzarella cheese");
console.log("include words:");

for (var i=0; i<markSen.ingredientIndexList.length; i++){
    console.log( markSen.ingredientIndexList[i].index + " and length : " + markSen.ingredientIndexList[i].length);
}
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.post('/', function (req, res) { res.status(200).send('Hello world!'); });
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/hello', function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});
