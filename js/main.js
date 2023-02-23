let deckID = '';
let p1Stack = [];
let p2Stack = [];
let pot = [];
const lenP1 = document.querySelector('#p1Stack');
const lenP2 = document.querySelector('#p2Stack');
fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckID = data.deck_id
        p1Stack.push(...data.cards.filter((card, i) => i % 2 === 0))
        p2Stack.push(...data.cards.filter((card, i) => i % 2 !== 0))
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

document.querySelector('button').addEventListener('click', playHand)

function playHand(){
  let n = pot.length === 0 ? 0 : 1;
  console.log(n)
  let p1 = getValue(p1Stack[n].value)
  let p2 = getValue(p2Stack[n].value)
  document.querySelector('#player1').src = p1Stack[n].image
  document.querySelector('#player2').src = p2Stack[n].image
  for (let i = 0; i <= n; i++) {
    pot.push(p1Stack.shift(), p2Stack.shift())
  }
  console.log({p1Stack, p2Stack, pot})
  let winner = compareCards(p1, p2);
  if (winner === 1) {
    document.querySelector('h3').textContent = 'Player 1 wins'
    p1Stack.push(...pot);
    pot = []
    console.log({p1Stack,p2Stack})
  }else if (winner === 2) {
    document.querySelector('h3').textContent = 'Player 2 wins'
    p2Stack.push(...pot);
    pot = [];
    console.log({p1Stack,p2Stack})
  } else {
    document.querySelector('h3').textContent = 'Time for War!'
  }
  lenP1.textContent = `${p1Stack.length}`
  lenP2.textContent = `${p2Stack.length}`
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
  console.log({pile1, pile2})
  console.log({c1, c2})
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
function war(data){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=6`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        compareCards(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

