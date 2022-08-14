
//*** if you want more blocks you can increase blocks random Math.random() * 9) like Math.random() * 15) */
//*** if you want to increase hidden ships icrease ships */

const CreateSurface = (n)=>{
    var area = document.getElementById("Container");
    area.innerHTML="";
   area.style="display: grid; grid-template-columns: repeat("+n/3+", 1fr); ";
    for(var i=0; i<n; i++){

        var box = document.createElement("div");
        box.setAttribute("class", "box"+i);
        box.setAttribute("id", "box");
        area.appendChild(box);


    }
}


const getNumber=(n)=>{
    var r = Math.floor(Math.random() * n) ;
    return r;
}
const shippositionsCalc=(ships,n)=>{
    var position = 0;
    var shipposition = [];
  

    while(shipposition.length < ships){
        var r = getNumber(n);
        if(shipposition.indexOf("box"+r) === -1) shipposition.push("box"+r);
    }

    return shipposition;

}

const Start = ()=>{

    let person = prompt("Please enter your name", "Harry");
    let cells = prompt("how many cells do you want", "27");
    let n=isNaN(cells)?cells:27;
    var Turn = 1;
    let user = {
        name: person,
        TotalShipDestroyed:0,
        id:1,
    }
    let computer = {
        name: "Computer",
        TotalShipDestroyed:0,
        id:2,
    }

    let Ship = {
        color: "red",
    }
    let Empty={
        color:"black",
    }
    let Default={
        color:"gray",
    }
 
    let Board =[];
   
 //***Inciease this number to get more ships it is better to make odd number to get exact victory */
    let ships = getNumber(n);
    CreateSurface(n);
    const shippositions = shippositionsCalc(ships,n);
    //**initialize Game */
    main(Turn,user,computer,Ship,Empty,Default,Board,ships,shippositions,cells);
}


function main(Turn,user,computer,Ship,Empty,Default,Board,ships,shippositions,cells) {

  
  
    const CurrentTurn = ()=>{
        
       return Turn?user:computer;
    }
    

 ///*** Run game */   
    const Game = (e)=>{

   var Clicked = e.getAttribute("class");
   var CurrentPlayer = CurrentTurn();
   var CurrentPlayerName = CurrentPlayer.name;
    Move(Clicked);
    
    }

///*** Calculate pressed button */
    const Move=(e=0)=>{
        if(shippositions.indexOf(e)===-1){
            Board.push([e,Empty.color]);
            
        }else{
         
          Board.push([e,Ship.color]);
          CurrentTurn().TotalShipDestroyed++;
       
          ships=ships-1;
          
        }


        Turn = !Turn;

         RefreshTable()
        var res=ships==0?FinishGame():null;
    
        NextTurn();
        
        }
    //** Re render blocks */
    const ClearObject=()=>{
        var bullet = document.querySelectorAll("#box");
        bullet.forEach((e)=>{
        
            e.style.backgroundColor = Board.find((element=>element[0]===e.getAttribute("class")))?Board.find((element=>element[0]===e.getAttribute("class")))[1]:Default.color;
        });

     
       return true;
        
    }

    /***Score update on the page */
    const updateScore = () => {

        var UserScore = document.getElementById("User");
        UserScore.innerHTML = "User Score: "+user.TotalShipDestroyed;
        var Computerscore = document.getElementById("Computer");
        Computerscore.innerHTML = "Computer Score: "+computer.TotalShipDestroyed;
      
    }
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const NextTurn = async()=>{
       
        /*Computer Turn*/
        if(CurrentTurn().name === "Computer"){
            await sleep(1000);
            var r = getNumber(cells);
            while(Board.find((s)=>s[0]==="box"+r) !== undefined){
                r = getNumber(cells) ;
                }
            Move("box"+r);
        }
      
   
    }
    const Winner=()=>{
        
        var UserCount = user.TotalShipDestroyed;
        var Computer = computer.TotalShipDestroyed;

        return UserCount>Computer?user:computer;
        
    }
  
    const FinishGame = async()=>{
        RefreshTable();
        await sleep(100);
        alert("Game Finished with "+Winner().name+" "+Winner().TotalShipDestroyed+" as winner");

        Turn=1;
        confirm("Press a button!");
        Start();
    
    }

    const RefreshTable = ()=>{
        updateScore();
        ClearObject();
    var bullet = document.querySelectorAll("#box");

    for (var x in bullet) { 
        const box = bullet[x];
        var r = 1;
        if (typeof box === 'object') {
            r= box.getAttribute("class");
        }
       
       if( (Board.find(element => element[0] === r) === undefined)&&(Turn==true)) {
        box.onclick = function() {
              Game(this);
         };  
         }else{
        box.onclick = function() {
        };
            
        }
      };
     return true;
    }
    RefreshTable();

      


return true;
}