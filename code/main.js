import kaboom from "kaboom"
kaboom()

//imagem do bean
loadSprite("bean", "sprites/bean.png")

scene("game", () => {
  //pontos
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    onUpdate(() => {
      score++;
      scoreLabel.text = score;
    })
  
  //adiciona bean a tela
const bean = add([
  
    sprite("bean"),
    pos(80, 80),
    area(),
    body(),
  
])
  
//botao de pular
onKeyPress("space", () => {
  
  if (bean.isGrounded()){
      bean.jump()
    
  }
  
})

//chao
add([
  
  rect(width(),48),
  pos(0, height()-48),
  area(),
  solid(),
  color(0,200,0)
  
]) 
  
//parede
function spawnParede() {
  
  add([
    
    rect(48, rand(24, 80)),
    area(),
    outline(4),
    pos(width(), height() - 48),
    origin("botleft"),
    color(0,0,200),
    move(LEFT, 240),
    
    "parede", bean.onCollide("parede", () => {
      
        addKaboom(bean.pos);
        shake();
        burp()
        go("game over");
      
    })
    
  ])
  
  wait(rand(1, 3), () => {
    
    spawnParede()
    
  })
  
}
  
spawnParede()
  
})

      
scene("game over", (score) => {
  
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ]);

  add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        origin("center"),
    ]);

  
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});

go("game");