const canvas=document.querySelector('canvas');
const res=document.querySelector('#score');
const ctx=canvas.getContext('2d');

canvas.width= 640 ;
canvas.height=540;

class Boundry{
    static width=40;
    static height=40;
    constructor({position,image}){
        this.position=position;
        this.width=40;
        this.height=40;
        this.image=image;
    }

    draw(){
       // ctx.fillStyle='blue'
       // ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
       ctx.drawImage(this.image,this.position.x,this.position.y)
    }
}
class pellet{
  constructor({position}){
      this.position=position;
      this.radius=3;
  }
  draw(){
      ctx.beginPath();
      ctx.arc(this.position.x,this.position.y,this.radius, 0, 2 * Math.PI,false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
  }
}
class powerup{
  constructor({position}){
      this.position=position;
      this.radius=7;
  }
  draw(){
      ctx.beginPath();
      ctx.arc(this.position.x,this.position.y,this.radius, 0, 2 * Math.PI,false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
  }
}

class ghost{
  constructor({position,velocity,radius,color='red'}){
      this.position=position;
      this.velocity=velocity;
      this.radius=radius;
      this.color=color;
      this.prevcollisions=[];
      this.scared=false;
  }
  draw(){
      ctx.beginPath();
      ctx.arc(this.position.x,this.position.y,this.radius, 0, 2 * Math.PI,false);
      ctx.fillStyle = this.scared ? 'blue' : this.color;
      ctx.fill();
      ctx.closePath();
  }
  update(){
      this.draw();
      this.position.x=this.position.x+this.velocity.x;
      this.position.y=this.position.y+this.velocity.y;
  }
}

const pellets=[];
const boundaries=[];
const powerups=[];
const ghosts=[
  new ghost({
    position:{
    x:Boundry.width * 6 + Boundry.width/2,
    y:Boundry.height * 7+ Boundry.height/2
  },
  velocity:{
    x:3,
    y:0
  },
  radius:18,
  color:'red'
  }),
  new ghost({
    position:{
    x:Boundry.width * 6 + Boundry.width/2,
    y:Boundry.height * 5+ Boundry.height/2
  },
  velocity:{
    x:3,
    y:0
  },
  radius:18,
  color:'pink'
  })
]

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]
  
function createImage(src){
    const image=new Image();
    image.src=src;
    return image;
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '.':
          pellets.push(
            new pellet({
              position: {
                x: Boundry.width * j + Boundry.width / 2,
                y: Boundry.height * i + Boundry.height / 2
              },
            })
          )
          break
        case '-':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeHorizontal.png')
            })
          )
          break
        case '|':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeVertical.png')
            })
          )
          break
        case '1':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeCorner1.png')
            })
          )
          break
        case '2':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeCorner2.png')
            })
          )
          break
        case '3':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeCorner3.png')
            })
          )
          break
        case '4':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/pipeCorner4.png')
            })
          )
          break
        case 'b':
          boundaries.push(
            new Boundry({
              position: {
                x: Boundry.width * j,
                y: Boundry.height * i
              },
              image: createImage('./img/block.png')
            })
          )
          break
        case '[':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/capLeft.png')
            })
          )
          break
        case ']':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/capRight.png')
            })
          )
          break
        case '_':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/capBottom.png')
            })
          )
          break
        case '^':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/capTop.png')
            })
          )
          break
        case '+':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/pipeCross.png')
            })
          )
          break
        case '5':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              color: 'blue',
              image: createImage('./img/pipeConnectorTop.png')
            })
          )
          break
        case '6':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              color: 'blue',
              image: createImage('./img/pipeConnectorRight.png')
            })
          )
          break
        case '7':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              color: 'blue',
              image: createImage('./img/pipeConnectorBottom.png')
            })
          )
          break
        case '8':
          boundaries.push(
            new Boundry({
              position: {
                x: j * Boundry.width,
                y: i * Boundry.height
              },
              image: createImage('./img/pipeConnectorLeft.png')
            })
          )
          break
          case 'p':
          powerups.push(
            new powerup({
              position: {
                x: Boundry.width * j + Boundry.width / 2,
                y: Boundry.height * i + Boundry.height / 2
              },
            })
          )
          break
      }
    })
  })



class Pacman{
    constructor({position,velocity,radius}){
        this.position=position;
        this.velocity=velocity;
        this.radius=radius;
        this.radians=0.55;
        this.openrate=0.10;
        this.dir=0;
    }
    draw(){
      ctx.save();
        ctx.translate(this.position.x,this.position.y)
        ctx.rotate(this.dir);
        ctx.translate(-this.position.x,-this.position.y)

        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius, this.radians, 2 * Math.PI - this.radians,false);
        ctx.lineTo(this.position.x,this.position.y);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
      ctx.restore();
    }
    update(){
        this.draw();

        this.position.x=this.position.x+this.velocity.x;
        this.position.y=this.position.y+this.velocity.y;

        if(this.radians < 0 || this.radians > 0.75) this.openrate = -this.openrate;
        this.radians += this.openrate;
    }
}

const pac=new Pacman({
    position:{
        x:Boundry.width + Boundry.width/2,
        y:Boundry.height + Boundry.height/2
    },
    velocity:{
        x:0,
        y:0
    },
    radius:18
})

const key={
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    },
    ArrowDown:{
        pressed:false
    }
}

let lastkey='';
let score=0;

function collision({pac,Element}){
    return(pac.position.y - pac.radius + pac.velocity.y <= Element.position.y + Element.height &&
        pac.position.x + pac.radius + pac.velocity.x >= Element.position.x  &&
        pac.position.y + pac.radius + pac.velocity.y >= Element.position.y  &&
        pac.position.x - pac.radius + pac.velocity.x <= Element.position.x + Element.width )
    }
let animationId;

function move(){
    animationId=window.requestAnimationFrame(move);
    ctx.clearRect(0,0,canvas.width,canvas.height);
 
    if(pellets.length === 0)
    {
      cancelAnimationFrame(animationId)
      console.log('You Win');
    }
    for(let i=pellets.length-1 ; i >= 0 ;i--)
    {
        let pellet=pellets[i];
        pellet.draw();

        if(Math.hypot(
          pellet.position.x - pac.position.x,
          pellet.position.y - pac.position.y
        ) < pellet.radius + pac.radius)
        {
          pellets.splice(i,1);
          score+=10;
          res.innerHTML=score;
        }
    }
    for(let i=ghosts.length-1 ; i >= 0 ;i--)
    {
        let ghost=ghosts[i];

        if(Math.hypot(
          ghost.position.x - pac.position.x,
          ghost.position.y - pac.position.y
        ) < ghost.radius + pac.radius)
        {
          if(ghost.scared){
            ghosts.splice(i,1)
          }
          else
          {
            cancelAnimationFrame(animationId);
            console.log("You Lose");
          }
        }
    }
    for(let i=powerups.length-1 ; i >= 0 ;i--)
    {
      let powerup=powerups[i];
      powerup.draw();

      if(Math.hypot(
        powerup.position.x - pac.position.x,
        powerup.position.y - pac.position.y
      ) < powerup.radius + pac.radius)
      {
        powerups.splice(i,1);
        
        ghosts.forEach(ghost => {
          ghost.scared=true;

          setTimeout(()=>{
            ghost.scared=false
          },3000)
        })
      }
    }
   

    if(key.ArrowRight.pressed==true && lastkey=='ArrowRight')
    {
        for(let i=0;i<boundaries.length;i++)
        {
            const Boundry=boundaries[i];
            if(collision({
                pac:{
                ...pac,
                velocity:{
                    x:5,
                    y:0
                }
        },
        Element:Boundry
    })
    ) {
            pac.velocity.x=0;
            break;
        }
        else{
            pac.velocity.x=5;
         }       
        }
    }
    if(key.ArrowLeft.pressed==true && lastkey=='ArrowLeft')
    {
        for(let i=0;i<boundaries.length;i++)
        {
            const Boundry=boundaries[i];
            if(collision({
                pac:{
                ...pac,
                velocity:{
                    x:-5,
                    y:0
                }
        },
        Element:Boundry
    })
    ) {
            pac.velocity.x=0;
            break;
        }
        else{
            pac.velocity.x=-5;
         }       
        }
    }
    if(key.ArrowUp.pressed==true && lastkey=='ArrowUp')
    {
        for(let i=0;i<boundaries.length;i++)
        {
            const Boundry=boundaries[i];
            if(collision({
                pac:{
                ...pac,
                velocity:{
                    x:0,
                    y:-5
                }
        },
        Element:Boundry
    })
    ) {
            pac.velocity.y=0;
            break;
        }
        else{
            pac.velocity.y=-5;
         }       
        }
    }
    if(key.ArrowDown.pressed==true && lastkey=='ArrowDown')
    {
        for(let i=0;i<boundaries.length;i++)
        {
            const Boundry=boundaries[i];
            if(collision({
                pac:{
                ...pac,
                velocity:{
                x:0,
                y:5
            }
        },
        Element:Boundry
        })
        ) {
            pac.velocity.y=0;
            break;
        }
        else{
            pac.velocity.y=5;
         }       
        }
    }
    
    boundaries.forEach(Element=>{
        Element.draw();
        
        if(collision({pac,Element}))
        {
            pac.velocity.x=0;
            pac.velocity.y=0;
        }
    })
    
    pac.update();

  ghosts.forEach(Element=>{
      Element.update();

      let collisions=[]
      boundaries.forEach(element=>{
        if(!collisions.includes('right') && collision({
          pac:{
          ...Element,
          velocity:{
              x:3,
              y:0
          }
        },
        Element:element})
      ){
        collisions.push('right');
      }
      if(!collisions.includes('left') && collision({
        pac:{
        ...Element,
        velocity:{
            x:-3,
            y:0
        }
      },
      Element:element})
    ){
      collisions.push('left');
    }
    if(!collisions.includes('up') && collision({
      pac:{
      ...Element,
      velocity:{
          x:0,
          y:-3
      }
    },
    Element:element})
  ){
    collisions.push('up');
  }
  if(!collisions.includes('bottom') && collision({
    pac:{
    ...Element,
    velocity:{
        x:0,
        y:3
      }
    },
    Element:element})
  ){
    collisions.push('bottom');
  }
  })

  if(collisions.length > Element.prevcollisions.length)
    Element.prevcollisions=collisions;

  if(JSON.stringify(collisions) !== JSON.stringify(Element.prevcollisions))
  {
    if(Element.velocity.x > 0) Element.prevcollisions.push('right');
    else if(Element.velocity.x < 0) Element.prevcollisions.push('left');
    else if(Element.velocity.y < 0) Element.prevcollisions.push('up');
    else if(Element.velocity.y > 0) Element.prevcollisions.push('bottom');

    const pathways=Element.prevcollisions.filter(colide => {
        return !collisions.includes(colide)
      })
    let dir=pathways[Math.floor(Math.random() * pathways.length)]
      console.log(dir)
    switch(dir){
      case 'bottom':
        Element.velocity.y=3;
        Element.velocity.x=0;
        break;
      case 'up':
          Element.velocity.y=-3;
          Element.velocity.x=0;
          break;
      case 'right':
            Element.velocity.y=0;
            Element.velocity.x=3;
            break;
      case 'left':
              Element.velocity.y=0;
              Element.velocity.x=-3;
              break;
    }
    Element.prevcollisions=[]
  }
})

if(pac.velocity.x > 0) pac.dir=0;
else if(pac.velocity.x < 0) pac.dir=Math.PI;
else if(pac.velocity.y > 0) pac.dir=Math.PI/2;
else if(pac.velocity.y < 0) pac.dir=Math.PI*1.5;
}

move();

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'ArrowRight':
            key.ArrowRight.pressed=true;
            lastkey='ArrowRight';
            break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed=true;
                lastkey='ArrowLeft';
            break;
        case 'ArrowUp':
                key.ArrowUp.pressed=true;
                lastkey='ArrowUp';
            break;
        case 'ArrowDown':
                key.ArrowDown.pressed=true;
                lastkey='ArrowDown';
            break;
        }
})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'ArrowRight':
                key.ArrowRight.pressed=false;
            break;
        case 'ArrowLeft':
                key.ArrowLeft.pressed=false;
            break;
        case 'ArrowUp':
                key.ArrowUp.pressed=false;
            break;
        case 'ArrowDown':
                key.ArrowDown.pressed=false;
            break;
        }
})