let deckID = '';
let p1Hand = [];
let p2Hand = [];
let p1Wins = [];
let p2Wins = [];
let pot = [];
let war = false;
const lenP1 = document.querySelector('#p1Hand');
const lenP2 = document.querySelector('#p2Hand');
const p1Progress = document.querySelector('#p1Progress');
const p2Progress = document.querySelector('#p2Progress');

fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckID = data.deck_id
        p1Hand.push(...data.cards.filter((card, i) => i % 2 === 0))
        p2Hand.push(...data.cards.filter((card, i) => i % 2 !== 0))
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

document.querySelector('button').addEventListener('click', playHand)

function playHand(){
  let n = pot.length === 0 ? 0 : 1;
  document.querySelector('#p1Wins').textContent = `${p1Wins.length}`
  document.querySelector('#p2Wins').textContent = `${p2Wins.length}`
  let p1 = getValue(p1Hand[n].value)
  let p2 = getValue(p2Hand[n].value)
  if (war) {
    document.querySelector('#img11').src = p1Hand[0].image
    document.querySelector('#img12').src = p1Hand[1].image
    document.querySelector('#img21').src = p2Hand[0].image
    document.querySelector('#img22').src = p2Hand[1].image
  } else {
    document.querySelector('#img10').src = p1Hand[n].image
    document.querySelector('#img11').src = ''
    document.querySelector('#img12').src = ''
    document.querySelector('#img20').src = p2Hand[n].image
    document.querySelector('#img21').src = ''
    document.querySelector('#img22').src = ''
  }
  for (let i = 0; i <= n; i++) {
    pot.push(p1Hand.shift(), p2Hand.shift())
  }
  lenP1.textContent = `${p1Hand.length}`
  lenP2.textContent = `${p2Hand.length}`
  p1Progress.value = p1Hand.length + p1Wins.length
  p2Progress.value = p2Hand.length + p2Wins.length
  
  let winner = compareCards(p1, p2);

  if (winner === 1) {
    document.querySelector('h3').textContent = 'Player 1 wins'
    p1Wins.push(...pot);
    pot = []
    war = false;
  }else if (winner === 2) {
    document.querySelector('h3').textContent = 'Player 2 wins'
    p2Wins.push(...pot);
    pot = [];
    war = false;
  } else {
    document.querySelector('h3').textContent = 'Time for War!'
    war = true;
  }
  checkHandSize();
}
function checkHandSize(){
  let needed = war? 2 : 0;
  if (p1Hand.length <= needed) {
    p1Hand.push(...p1Wins);
    p1Wins = [];
  } else if (p1Hand.length <= needed ) {
    alert('Player 2 Wins!')
  } 
  if (p2Hand.length <= needed){
    p2Hand.push(...p2Wins);
    p2Wins = [];
  } else if (p2Hand.length <= needed) alert('Player 1 Wins!');
}
function compareCards(p1, p2){
  if (p1 > p2) {
    return 1
  } else if (p1 < p2) {
    document.querySelector('h3').textContent = 'Player 2 wins'
    return 2
  } else {
    document.querySelector('h3').textContent = 'Time for War!'
    return 0;
  }
}
function getValue(n){
  switch (true) {
    case (n === 'ACE'):
      return 14
    case (n === 'KING'):
      return 13
    case (n === 'QUEEN'):
      return 12
    case (n === 'JACK'):
      return 11
    default:
      return Number(n);            
  }
}
