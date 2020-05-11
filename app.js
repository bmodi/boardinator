const express = require('express')
const app = express();
const useragent = require('express-useragent');
const favicon = require('serve-favicon');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const NodeCache = require( "node-cache" );
const boardCache = new NodeCache();

const TTL_2_HOURS = 60*60*2;

// First just check that PORT is set, otherwise exit
if (!process.env.PORT) {
  console.log("Error:  PORT env variable not set.");
  process.exit(1);
}

app.on("error", error => console.log("The server encountered an error!"));

app.use(express.static('public'))
app.use(favicon(__dirname + '/public/images/favicon-96x96.png'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use(useragent.express());

app.set('views', './views');
app.set('view engine', 'ejs');

//----------------------------------------------------------
// GET /boards/:boardId
// Returns an exsist board with the given ID or creates a
// new board if none existed.  New board will have 5 rows.
//----------------------------------------------------------
app.get("/boards/:boardId", (req, res, next) => {
  var board = getBoard(req.params.boardId, 5);
  if ( req.useragent.isDesktop ) {
    res.render('board', board);
  } else {
    res.send(board);
  }
 });

//----------------------------------------------------------
// POST /boards?rows
// Creates a new game board with the requested number
// of rows.  Only 4 and 5 are accepted for the number of rows.
//----------------------------------------------------------
app.post('/boards', function(req, res) {
  var defaultRows = req.query.rows;
  if ( defaultRows==4 || defaultRows==5 ) {
    var board = getBoard(uuidv4(), defaultRows);
    res.send(board);
  } else {
    res.send("Number of rows must be 4 or 5.");
  }
});

http.createServer(app).listen( process.env.PORT, function(){
  console.log("Server started listening on port " + process.env.PORT);
})
.on( 'error', function (e) { 
  if (e.code == 'EADDRINUSE') { 
    console.log('Cannot start server.  Port '+process.env.PORT+' already in use.');
  }
});

function getBoard(boardId, defaultRows) {
  var board = boardCache.get(boardId);
  if (board == null) {
    var moreX = Math.floor(Math.random() * 2)==1 ? true : false;
    board = { "boardId": boardId, "rows": getRandomRows(defaultRows, moreX), "moreX": moreX, "name": getRandomName(),
      "_links": {"self": {"href": "boards/"+boardId } } };
    boardCache.set(boardId, board, TTL_2_HOURS);
  }
  return board;
}

function getRandomRows(defaultRows, moreX) {
  if ( defaultRows==4 ) {
    var spyGameElements =  moreX ?
      ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'u', 'u', 'u', 'u', 's'] :
      ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'u', 'u', 'u', 'u', 's'] ;
  } else {
    var spyGameElements = moreX ?
      ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 's'] :
      ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 's'] ;
  }

  const rows = [];
  for(var i=0; i<defaultRows; i++) {
    var row="";
    for (var j=0; j<5; j++) {
      charPos = Math.floor(Math.random() * spyGameElements.length);
      row += spyGameElements[charPos];
      spyGameElements.splice(charPos, 1);
    }
    rows.push(row);
  }
  return rows;
}

function getRandomName() {
  const nameChars1 = ['A', 'E', 'G', 'H', 'J', 'L', 'Q', 'R', 'T', 'W', 'X', 'Y']
  const nameChars2 = ['2', '3', '4', '6', '7'];
  var name='';
  for(var i=0; i<2; i++) {
    name += nameChars1[Math.floor(Math.random() * nameChars1.length)];
    name += nameChars2[Math.floor(Math.random() * nameChars2.length)];
  }
  return name;
}
