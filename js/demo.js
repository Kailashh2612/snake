var snakeBody=[[3,2],[4,2],[5,2]]
for(var i=0;i<snakeBody.length;i++)
    {
        
        if(i==0)
        {
            temp_secondary=Array.prototype.concat(snakeBody[i])
            snakeBody[i][0]-=1
            console.log("temp_secondary",temp_secondary)
        }
        else
        {
            temp_primary=snakeBody[i]
            snakeBody[i]=temp_secondary
            temp_secondary=temp_primary
        }
    }

console.log(snakeBody)