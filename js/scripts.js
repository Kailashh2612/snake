var icon="zeroth"
var trackArr=[]
var tempArr=[]
var playerName=''
var originalTable=document.getElementById("tictactable")
var snakeBody=[[2,2],[3,2],[4,2],[5,2]]
var keyInput;
var initFlag=0;
var interval=800;

for(let i=0;i<12;i++)
{
    for(let j=0;j<12;j++)
    {
        if((i==2 && j==2))
        {
            tempArr.push('1')
        }
        else
        {
            tempArr.push('-')
        }
        
        
    }
    trackArr.push(tempArr)
    tempArr=[]
}
randomFruitGenerator()

/*function currentRedPosition()
{
    var currPos;
    for(let i=0;i<6;i++)
    {
        for(let j=0;j<6;j++)
        {
            if(trackArr[i][j]=='1')
            {
                currPos=i+','+j
            }

        }
    }
    return currPos
}*/

function currentRedHeadPosition()
{
    return snakeBody[0]
}
function currentBluePosition()
{
    var currPos;
    for(let i=0;i<12;i++)
    {
        for(let j=0;j<12;j++)
        {
            if(trackArr[i][j]=='0')
            {
                currPos=i+','+j
            }

        }
    }
    //console.log("currbluepos",currPos)
    return currPos
}
function removeColor(posX,posY)
{
    var flag=false;
    for(let i=0;i<12;i++)
    {
        for(let j=0;j<12;j++)
        {
            if(i==posX && j==posY)
            {
                trackArr[i][j]='-'
                flag=true
                break
            }
        }
        if(flag==true)
        {
            break
        }
    }
    posStrX=(posX).toString()
    posStrY=(posY).toString()
    var row=document.getElementById(posStrX)
    var elementToRemove=row.getElementsByClassName(posStrY)[0]
    elementToRemove.setAttribute('style','background-color')


}

function gameOver(currPosX,currPosY)
{
    var res=false
    console.log("Inside gameOver",currPosX," , ",currPosY)
    if(currPosX<0 || currPosX>11 || currPosY<0 || currPosY>11)
    {
        res=true
    }
    else if(trackArr[currPosX][currPosY]=='1')
    {
        res=true;
    }
    return res
}

function randomFruitGenerator()
{

    /*var currPos=currentRedPosition()
    var currPosStr=currentRedPosition().split(',')
    var currPosX=Number(currPosStr[0])
    var currPosY=Number(currPosStr[1])*/
    var flag=false
    var posX;
    var posY;
    while(!flag)
    {
        flag=true;
        posX=Math.floor(Math.random()*12)
        posY=Math.floor(Math.random()*12)
        for(var i=0;i<snakeBody.length;i++)
        {
            if(posX==snakeBody[i][0] && posY==snakeBody[i][1])
            {
                flag=false;
                break
            }
        }


    }
    updateBlueColor(posX,posY)
}
/*function updatePositionColor(currPosX,currPosY,color,snakeBody,key="")
{
    removeColor(currPosX,currPosY)
    switch(key)
    {
        case "ArrowUp":
            currPosX-=1
            break
        case "ArrowDown":
            currPosX+=1
            break
        case "ArrowLeft":
            currPosY-=1
            break
        case "ArrowRight":
            currPosY+=1
            break
    }
    if(!gameOver(currPosX,currPosY))
    {
        var flag=false
        var hasRedMetBlue=false
        if(color=="red")
        {
            for(let i=0;i<6;i++)
            {
                for(let j=0;j<6;j++)
                {
                    if(i==currPosX && j==currPosY)
                    {
                        if(trackArr[i][j]!='0')
                        {
                            trackArr[i][j]='1'
                        }
                        else
                        {
                            hasRedMetBlue=true
                        }
                        flag=true
                        break
                    }
                }
                if(flag==true)
                {
                    break
                }
            }
        }

        if(color=="blue")
        {
            for(let i=0;i<6;i++)
            {
                for(let j=0;j<6;j++)
                {
                    if(i==currPosX && j==currPosY)
                    {
                        trackArr[i][j]='0'
                        flag=true
                        break
                    }
                }
                if(flag==true)
                {
                    break
                }
            }
        }

        var currPosStrX=currPosX.toString()
        var currPosStrY=currPosY.toString()
        var row=document.getElementById(currPosStrX)
        var elementToAdd=row.getElementsByClassName(currPosStrY)[0]

        // below code where Red eats blue
        /*if(hasRedMetBlue)
        {
            //alert("Red has eaten blue !")
            elementToAdd.setAttribute('style','background-color:'+color)
            trackArr[currPosX][currPosY]='1'
            randomFruitGenerator()
        }*/
       /* elementToAdd.setAttribute('style','background-color:'+color)

    }
    else
    {
        alert("Game Over")
    }



}*/

function updateRedTrackArr()
{
    for(var i=0;i<6;i++)
    {
        for(var j=0;j<6;j++)
        {
            if(trackArr[i][j]=='1')
            {
                trackArr[i][j]='-'
            }

        }
    }
    for(var i=0;i<snakeBody.length;i++)
    {
        trackArr[snakeBody[i][0]][snakeBody[i][1]]='1'

    }

}

function resetColor()
{

}

function updatePositionColor()
{
    for(var i=0;i<snakeBody.length;i++)
    {
        var currPosX=snakeBody[i][0]
        var currPosY=snakeBody[i][1]

        var row=document.getElementById(currPosX.toString())
        var elementToAdd=row.getElementsByClassName(currPosY.toString())[0]
        elementToAdd.setAttribute('style','background-color:red')
    }
    updateRedTrackArr()
    resetColor()
}

function updateBlueColor(posX,posY)
{
    var row=document.getElementById(posX.toString())
    var elementToAdd=row.getElementsByClassName(posY.toString())[0]
    elementToAdd.setAttribute('style','background-color:blue')
    trackArr[posX][posY]='0'

}
function snakeStart(key)
{
    switch(key)
    {
        case "ArrowUp":
            var currRedHeadPosition=currentRedHeadPosition()
            var currRedHeadPositionX=currRedHeadPosition[0]
            var currRedHeadPositionY=currRedHeadPosition[1]
            snakeMove(currRedHeadPositionX,currRedHeadPositionY,"ArrowUp")
            break
        case "ArrowDown":
            var currRedHeadPosition=currentRedHeadPosition()
            var currRedHeadPositionX=currRedHeadPosition[0]
            var currRedHeadPositionY=currRedHeadPosition[1]
            snakeMove(currRedHeadPositionX,currRedHeadPositionY,"ArrowDown")
            break
        case "ArrowLeft":
            var currRedHeadPosition=currentRedHeadPosition()
            var currRedHeadPositionX=currRedHeadPosition[0]
            var currRedHeadPositionY=currRedHeadPosition[1]
            snakeMove(currRedHeadPositionX,currRedHeadPositionY,"ArrowLeft")
            break
        case "ArrowRight":
            var currRedHeadPosition=currentRedHeadPosition()
            var currRedHeadPositionX=currRedHeadPosition[0]
            var currRedHeadPositionY=currRedHeadPosition[1]
            snakeMove(currRedHeadPositionX,currRedHeadPositionY,"ArrowRight")
            break
    }

}

function hasRedMetBlue(redPosX,redPosY)
{
    var bluePos=currentBluePosition()
    var bluePosChar=bluePos.split(',')
    var bluePosX=Number(bluePosChar[0])
    var bluePosY=Number(bluePosChar[1])
    console.log("blue pos",bluePosX,bluePosY)
    console.log("red pos",redPosX,redPosY)
    var res=false
    if((redPosX==bluePosX) && (redPosY==bluePosY))
    {
        res=true
        interval-=100
    }
    return res

}

function snakeMove(currRedHeadPositionX,currReadHeadPositionY,key)
{
    var temp_primary;
    var temp_secondary;
    var lastPosX;
    var lastPosY;
    var over;
    for(var i=0;i<snakeBody.length;i++)
    {
        
        if(i==0)
        {
            temp_secondary=Array.prototype.concat(snakeBody[i])
            switch(key)
            {
                case "ArrowUp":
                    snakeBody[i][0]-=1
                    over=gameOver(snakeBody[i][0],snakeBody[i][1])
                    break;
                case "ArrowDown":
                    snakeBody[i][0]+=1
                    over=gameOver(snakeBody[i][0],snakeBody[i][1])
                    break;
                case "ArrowLeft":
                    snakeBody[i][1]-=1
                    over=gameOver(snakeBody[i][0],snakeBody[i][1])
                    break;
                case "ArrowRight":
                    snakeBody[i][1]+=1
                    over=gameOver(snakeBody[i][0],snakeBody[i][1])
                    break;
            }

            //console.log("temp_secondary",temp_secondary)
        }
        else
        {
            if(over)
            {   
                document.getElementsByTagName("h3")[0].innerHTML="<button onclick='newGame()'>Click here for a new game</button>"
                document.getElementById("snaketable").setAttribute("style","display:none")
                var img=document.createElement("img")
                img.setAttribute("src","images/gameover.png")
                document.getElementById("table_container").appendChild(img)
            }


            if(hasRedMetBlue(snakeBody[0][0],snakeBody[0][1]))
            {
                var snakeExt=[[snakeBody[0][0],snakeBody[0][1]]]
                snakeBody=[...snakeExt,...snakeBody]
                var bluePos=currentBluePosition()
                var bluePosChar=bluePos.split(',')
                var bluePosX=Number(bluePosChar[0])
                var bluePosY=Number(bluePosChar[1])
                trackArr[bluePosX][bluePosY]='1'
                randomFruitGenerator()
                //alert("Red has met blue !")
            }
            if(i==(snakeBody.length-1))
            {
                lastPosX=snakeBody[i][0]
                lastPosY=snakeBody[i][1]
                console.log("Dragon")
            }
            temp_primary=snakeBody[i]
            snakeBody[i]=temp_secondary
            temp_secondary=temp_primary
        }
      

    }
    //setTimeout(updatePositionColor(),500)
    updatePositionColor()
    removeColor(lastPosX,lastPosY)
}

function newGame()
{
    location.reload()
}


/*document.addEventListener("keydown",function(event)
{
    var keyInput=event.key
    switch(keyInput)
    {
        case "ArrowUp":
            snakeStart("ArrowUp")
            break
        case "ArrowDown":
            snakeStart("ArrowDown")
            break
        case "ArrowLeft":
            snakeStart("ArrowLeft")
            break
        case "ArrowRight":
            snakeStart("ArrowRight")
            break
    }
}
)*/

function snakeTrigger()
{
    switch(keyInput)
    {
        case "ArrowUp":
            snakeStart("ArrowUp")
            break
        case "ArrowDown":
            snakeStart("ArrowDown")
            break
        case "ArrowLeft":
            snakeStart("ArrowLeft")
            break
        case "ArrowRight":
            snakeStart("ArrowRight")
            break
    }
    
}


document.addEventListener("keydown",function(event){
    if(initFlag===0)
    {
        initFlag=1
    }
    else{
        clearInterval(initInterval)
    }
    if(event.key!=keyInput && !(event.key=="ArrowLeft" && keyInput=="ArrowRight") && !(event.key=="ArrowRight" && keyInput=="ArrowLeft") && !(event.key=="ArrowUp" && keyInput=="ArrowDown") && !(event.key=="ArrowDown" && keyInput=="ArrowUp")) 
    {
        keyInput=event.key
    }
   
    //keyInput=event.key
    initInterval=setInterval(function() {
        snakeTrigger()
      }, interval);
    
})





/*function snakeTrigger(keyInput)
{
    setInterval(function() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: keyInput }));
      }, 1000);

      snakeStart(keyInput)

}*/











//var redHeadPos=currentRedHeadPosition()

/*while(gameOver(redHeadPos[0],redHeadPos[1]))
{
    setTimeout(() => {
        const et = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          keyCode: 38,
        });
      
        // Dispatch the event to the document
        document.dispatchEvent(et);
      }, );
    
    
}


setTimeout(() => {
    const et = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      keyCode: 38,
    });
  
    // Dispatch the event to the document
    document.dispatchEvent(et);
}) */


/*function snakeTrigger(keyInput)
{
    /*document.addEventListener("keydown",function(event)
    {
        var key=event.key
        switch(key)
        {
            case "ArrowUp":
                snakeStart("ArrowUp")
                break
            case "ArrowDown":
                snakeStart("ArrowDown")
                break
            case "ArrowLeft":
                snakeStart("ArrowLeft")
                break
            case "ArrowRight":
                snakeStart("ArrowRight")
                break
        }
    }
    )*/
    /*const et = new KeyboardEvent('keydown', {
        key: keyInput,
      });       
    setInterval(() => {

                  document.dispatchEvent(et);
                  //snakeStart(keyInput)
                  //myStopFunction()
            },1000)



}*/




/*const myInterval=setInterval(() => {
    const et = new KeyboardEvent('keydown', {
        key: "ArrowUp",
        keyCode: 38,
      });
      document.dispatchEvent(et);
      //myStopFunction()
},1000)*/



/*document.addEventListener("keydown",function(event)
{
    var key=event.key
    switch(key)
    {
        case "ArrowUp":
            snakeTrigger("ArrowUp")
            break
        case "ArrowDown":
            snakeTrigger("ArrowDown")
            break
        case "ArrowLeft":
            snakeTrigger("ArrowLeft")
            break
        case "ArrowRight":
            snakeTrigger("ArrowRight")
            break
    }
}
)*/





            /*const myInterval=setInterval(() => {
                const et = new KeyboardEvent('keydown', {
                    key: 'ArrowUp',
                    keyCode: 38,
                  });
                
                  // Dispatch the event to the document
                  document.dispatchEvent(et);
                  myStopFunction()
            },1000)

            function myStopFunction()
            {
                redHeadPos-=1
                if(gameOver(redHeadPos[0],redHeadPos[1]))
                {
                    clearInterval(myInterval)
                }
            }/
            
        
        









/*document.addEventListener("keydown",function(event){
    var key=event.key
    switch(key)
    {
        case "ArrowUp":
            var currPos=currentRedPosition()
            var currPosStr=currentRedPosition().split(',')
            var currPosX=Number(currPosStr[0])
            var currPosY=Number(currPosStr[1])
            console.log(currPosX+","+currPosY)
            updatePositionColor(currPosX,currPosY,"red",snakeBody,"ArrowUp")
            break
        case "ArrowDown":
            var currPos=currentRedPosition()
            var currPosStr=currentRedPosition().split(',')
            var currPosX=Number(currPosStr[0])
            var currPosY=Number(currPosStr[1])
            console.log(currPosX+","+currPosY)
            updatePositionColor(currPosX,currPosY,"red",snakeBody,"ArrowDown") 
            break
        case "ArrowLeft":
            var currPos=currentRedPosition()
            var currPosStr=currentRedPosition().split(',')
            var currPosX=Number(currPosStr[0])
            var currPosY=Number(currPosStr[1])
            console.log(currPosX+","+currPosY)
            updatePositionColor(currPosX,currPosY,"red",snakeBody,"ArrowLeft")
            break
        case "ArrowRight":
            var currPos=currentRedPosition()
            var currPosStr=currentRedPosition().split(',')
            var currPosX=Number(currPosStr[0])
            var currPosY=Number(currPosStr[1])
            console.log(currPosX+","+currPosY)
            updatePositionColor(currPosX,currPosY,"red",snakeBody,"ArrowRight")
            break 
    }

}
)*/

