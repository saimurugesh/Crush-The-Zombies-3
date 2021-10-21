class Stone{
   constructor(x,y,w,h)
   {
       var options = {
           restitution: 0.08
       };

       this.r = 30;
       this.body = Bodies.circle(x, y, this.r, options);
       this.w = w;
       this.h = h;
       World.add(world,this.body);

       this.image = loadImage("./assets/stone.png");
   }

   show(){
       let pos = this.body.position;
       push();
       imageMode(CENTER)
       translate(pos.x,pos.y)
       noStroke();
       fill("White")
       image(this.image,0,0,50,50)
       pop()

   }


   


}
