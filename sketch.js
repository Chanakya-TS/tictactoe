let HEIGHT = 400;
let WIDTH = HEIGHT;

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let winHorz = [0, 0, 0];
let winVert = [0, 0, 0];
let winAsc = false;
let winDsc = false;

let player1 = 'o';
let player2 = 'x';

let circleTurn = false;

let space = 30

let gameOver = false;

function setup() {
  createCanvas(HEIGHT, WIDTH);
  resetSketch();
  // createCanvas(400, 400);
}

function resetSketch(){
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winHorz = [0, 0, 0];
  winVert = [0, 0, 0];
  winAsc = false;
  winDsc = false;
  circleTurn = false;
  gameOver = false;
  newGame = false;
}

function draw() {
  background(255);
  
  let w = WIDTH / 3;
  let h = HEIGHT / 3;
  
  for(let i=1; i<3; i++){
    line(w*i, 0 + space/2, w*i, HEIGHT - space/2);
  }
  
  for(let i=1; i<3; i++){
    line(0 + space / 2, h*i, WIDTH - space/2, h*i);
  }
  
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      let x = w * i;
      let y = h * j;
      let spot = board[i][j];
      strokeWeight(4);
      if (spot == player1){
        noFill()
        ellipse(x+w/2,y+h/2,w - space * 1.5)
      } else if (spot == player2){
        line(x + space,y+space, x+w-space, y+h-space);
        line(x+space, y+h-space, x+w-space, y+space)
      }
    }
  }
  
  for(let i=0; i<3; i++){
    if(winHorz[i]){
      line(space/2, i * h + h/2, WIDTH-space/2, i * h + h/2);
    }
  }
  
  for(let i=0; i<3; i++){
    if(winVert[i]){
      line(i * h + h/2, space/2, i * h + h/2, WIDTH-space/2);
    }
  }
  
  if(winDsc){
    line(space/2, space/2, WIDTH-space/2, WIDTH-space/2)
  }
  
  if(winAsc){
    line(space/2, WIDTH-space/2, WIDTH-space/2, space/2)
  }
  
  if(newGame) resetSketch();
  
}

function checkWin(circleTurn){
  let val = 'o';
  if(!circleTurn) val = 'x';
  for(let i=0; i<3; i++){
    let win=true;
    for(let j=1; j<3; j++){
      win &= (board[i][j] == board[i][j-1] && board[i][j] == val);
    }
    if(win){
      winVert[i] = 1;
      return true;
    }
  }
  for(let i=0; i<3; i++){
    let win=true;
    for(let j=1; j<3; j++){
      win &= (board[j][i] == board[j-1][i] && board[j][i] == val);
    }
    if(win){
      winHorz[i] = 1;
      return true;
    }
  }
  
  let dscWin = true;
  for(let i=1; i<3; i++){
    dscWin &= (board[i][i] == board[i-1][i-1] && board[i][i] == val);
  }
  
  winDsc |= dscWin;
  
  if(dscWin) return true;
  
  let ascWin = true;
  for(let i=1; i<3; i++){
    ascWin &= (board[i][3-i-1] == board[i-1][3-i] && board[i][3-i-1] == val);
  }
  
  winAsc |= ascWin;
  
  if(ascWin) return true;
}

function mouseClicked(){
  if (!gameOver){
    let row = int(mouseX/(HEIGHT/3));
    let col = int(mouseY/(HEIGHT/3));
    if(board[row][col] == ''){
      if(circleTurn){
        board[row][col] = 'o';
      } else {
        board[row][col] = 'x';
      }
      if(checkWin(circleTurn)){
        gameOver = true;
      }
      if(checkWin(!circleTurn)){
        gameOver = true;
      }
      circleTurn = !circleTurn;
    }
  }
}

function keyPressed(){
  if(key === 'r'){
    newGame = true;
  }
}