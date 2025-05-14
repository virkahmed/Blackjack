let myHand = [];
let dealer = [];
let bust = false;
let standing = false;
let dealerBust = false;
let win = false;

function draw() {
    let newVal = Math.floor(Math.random() * 13 + 1); 
    if (newVal>=10) { 
        myHand.push(10);
    }
    else {
        myHand.push(newVal);
    }
    const hand = document.getElementById("your-hand");

    let append;

    if(newVal==1){ 
        append="ace";
    }
    else {
        if(newVal==11){ 
            append="jack";
        } 
        else { 
            if(newVal==12) { 
                append="queen";
            }
            else { 
                if(newVal==13) { 
                    append="king";
                }
                else {
                    append=newVal;
                }
            }
        }
    }
    const newCard = document.createElement("img");
        newCard.src ="deck/" + append+"_of_clubs.png";
        hand.appendChild(newCard);
}

function dealerDraw() { 

    let newVal = Math.floor(Math.random() * 13 + 1); 
    if (newVal>=10) { 
        dealer.push(10);
    }
    else {
        dealer.push(newVal);
    }
    const hand = document.getElementById("dealer-hand");

    let append;

    if(newVal==1){ 
        append="ace";
    }
    else {
        if(newVal==11){ 
            append="jack";
        } 
        else { 
            if(newVal==12) { 
                append="queen";
            }
            else { 
                if(newVal==13) { 
                    append="king";
                }
                else {
                    append=newVal;
                }
            }
        }
    }
    const newCard = document.createElement("img");
        newCard.src ="deck/" + append+"_of_clubs.png";
        hand.appendChild(newCard);
}
function dealerDrawFaceDown() { 
    let newVal = Math.floor(Math.random() * 13 + 1); 
    if (newVal>=10) { 
        dealer.push(10);
    }
    else {
        dealer.push(newVal);
    }
    const newCard = document.createElement("img");
    newCard.src = "deck/deck.jpg";
    newCard.id = "faceDown";
    const dealerHand = document.getElementById("dealer-hand");
    dealerHand.appendChild(newCard);
}
function hit() { 
    if(!(bust||standing)){ 
    draw();
    calculateYourVal();
    }
}
async function calculateYourVal() { 
    let total = 0;
    let ace=0;
    myHand.forEach((val) => {
        if(val==1) {
            total+=11;
            ace++;
        }
        else { 
            total+=val;
        }
    });
    if (total>21&&ace>0) { 
        for(let i =0; i<ace;i++) { 
            total-=10;
            if(total<=21) break;
            
        } 
    }
    if(total>21) { 
        bust=true;
        await sleep(2000);
        calculateWin();
    }
    return total;
}

function calculateDealerVal() { 
    let total = 0;
    let ace = 0;
    dealer.forEach((val) => { 
        if(val==1) { 
            total +=11;
            ace++;
        }
        else { 
            total += val;

        }
    });
    if (total>21&&ace>0) { 
        for(let i =0; i<ace;i++) { 
            total-=10;
            if(total<=21) break;
            
        }
    }
    if(total>21) { 
        dealerBust=true;
    }
    return total;
}


function flip() { 
    const hand = document.getElementById("dealer-hand");
    const card = document.getElementById("faceDown");
    const newCard = document.createElement("img");
    newCard.src = "deck/" + dealer[1] + "_of_clubs.png";
    // hand.replaceChild(newCard,card);
    // console.log(dealer[1]);
    hand.removeChild(card);
    hand.appendChild(newCard);
}


async function dealerDrawSequence() { 
    flip();
    await sleep(500);
    let dealerPoint = calculateDealerVal();
    while (dealerPoint<17) { 
        dealerDraw();
        dealerPoint = calculateDealerVal();
        await sleep(500);
    }


}

function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateWin(){ 
    if((dealerBust&&!bust) || 
        ((!dealerBust&&!bust) && (calculateYourVal()>calculateDealerVal()) )) { 
            window.location.href ="./win.html";
            win = true;
    }
    else{ 
        window.location.href ="./lose.html";
    }
    
}

async function stand() { 
    standing = true;
    dealerDrawSequence();
    await sleep(2000);
    calculateWin();
}

function restart() { 
    location.reload();
    console.log("helooo");
    window.location.href ="./index.html";
}

hit();
hit();
dealerDraw();
dealerDrawFaceDown();


console.log(myHand);