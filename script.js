window.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var width = document.getElementById('canvas').offsetWidth;
  var height = document.getElementById('canvas').offsetHeight;

  var surfaceImageLoaded = false,
    pokeballImageLoaded = false,
    spriteImageLoaded = false;

  var step = 1;
  var score = 0;

  var surfaceImage = new Image();
  surfaceImage.onload = function () {
    surfaceImageLoaded = true;
    areAssetsLoaded();
  };
  surfaceImage.src = './assets/surface.png';

  var spriteImage = new Image();
  spriteImage.onload = function () {
    pokeballImageLoaded = true;
    areAssetsLoaded();
  };
  spriteImage.src = './assets/sprite.png';

  var pokeballImage = new Image();
  pokeballImage.onload = function () {
    spriteImageLoaded = true;
    areAssetsLoaded();
  };
  pokeballImage.src = './assets/pokeball.png';

  var pokeball1 = {
    x: 0,
    y: 0
  };
  var pokeball2 = {
    x: 0,
    y: 0
  };
  var pokeball3 = {
    x: 0,
    y: 0
  };

  pokeball1.generatePosition = function () {
    do {
      pokeball1.x = Math.floor(Math.random() * 12) + 1;
      pokeball1.y = Math.floor(Math.random() * 12) + 1;
    } while (check_collision(pokeball1.x, pokeball1.y, 'pokeball1'));
  };

  pokeball2.generatePosition = function () {
    do {
      pokeball2.x = Math.floor(Math.random() * 12) + 1;
      pokeball2.y = Math.floor(Math.random() * 12) + 1;
    } while (check_collision(pokeball2.x, pokeball2.y, 'pokeball2'));
  };

  pokeball3.generatePosition = function () {
    do {
      pokeball3.x = Math.floor(Math.random() * 12) + 1;
      pokeball3.y = Math.floor(Math.random() * 12) + 1;
    } while (check_collision(pokeball3.x, pokeball3.y, 'pokeball3'));
  };

  var itemSize = 40;

  var sprite = {
    x: Math.round(width / 2 / itemSize),
    y: Math.round(height / 2 / itemSize)
  };

  sprite.move = function (direction) {
    var hold_sprite = {
      x: sprite.x,
      y: sprite.y
    };

    switch (direction) {
      case 'left':
        sprite.x -= step;
        break;
      case 'right':
        sprite.x += step;
        break;
      case 'up':
        sprite.y -= step;
        break;
      case 'down':
        sprite.y += step;
        break;
    }

    if (check_collision(sprite.x, sprite.y)) {
      sprite.x = hold_sprite.x;
      sprite.y = hold_sprite.y;
    }

    if (sprite.x == pokeball1.x && sprite.y == pokeball1.y) {
      // console.log('You caught a pokeball!');
      score += 1;
      pokeball1.generatePosition();
    }

    if (sprite.x == pokeball2.x && sprite.y == pokeball2.y) {
      // console.log('You caught a pokeball!');
      score += 1;
      pokeball2.generatePosition();
    }

    if (sprite.x == pokeball3.x && sprite.y == pokeball3.y) {
      // console.log('You caught a pokeball!');
      score += 1;
      pokeball3.generatePosition();
    }

    update();
  };

  function update() {
    ctx.drawImage(surfaceImage, 0, 0);

    scoreBoard();

    ctx.drawImage(
      pokeballImage,
      pokeball1.x * itemSize,
      pokeball1.y * itemSize,
      itemSize,
      itemSize
    );

    ctx.drawImage(
      pokeballImage,
      pokeball2.x * itemSize,
      pokeball2.y * itemSize,
      itemSize,
      itemSize
    );

    ctx.drawImage(
      pokeballImage,
      pokeball3.x * itemSize,
      pokeball3.y * itemSize,
      itemSize,
      itemSize
    );

    ctx.drawImage(
      spriteImage,
      sprite.x * itemSize,
      sprite.y * itemSize,
      itemSize,
      itemSize
    );

    // console.log('x:', sprite.x);
    // console.log('y:', sprite.y);
  }

  function check_collision(x, y, item = 'sprite') {
    var collision = false;

    if (x < 1 || x > 16 || y < 1 || y > 16) {
      // console.log('Out of boundary');
      collision = true;
    }

    if (x > 14 && (y == 1 || y == 2)) {
      // console.log('Score board space');
      collision = true;
    }

    if (item === 'pokeball1') {
      if (
        x === pokeball2.x ||
        y === pokeball2.y ||
        x === pokeball3.x ||
        y === pokeball3.y
      ) {
        // console.log('Pokeball collision');
        collision = true;
      }
    } else if (item === 'pokeball2') {
      if (
        x === pokeball1.x ||
        y === pokeball1.y ||
        x === pokeball3.x ||
        y === pokeball3.y
      ) {
        // console.log('Pokeball collision');
        collision = true;
      }
    } else if (item === 'pokeball3') {
      if (
        x === pokeball1.x ||
        y === pokeball1.y ||
        x === pokeball2.x ||
        y === pokeball2.y
      ) {
        // console.log('Pokeball collision');
        collision = true;
      }
    }

    return collision;
  }

  function scoreBoard() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(width - 118, 32, 90, 80);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillText('Score:', width - 102, 60);

    ctx.font = '25px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillText(score, width - 82, 95);
  }

  function areAssetsLoaded() {
    if (
      surfaceImageLoaded == true &&
      pokeballImageLoaded == true &&
      spriteImageLoaded == true
    ) {
      pokeball1.generatePosition();
      pokeball2.generatePosition();
      pokeball3.generatePosition();
      update();
    }
  }

  document.onkeydown = function (e) {
    e = e || window.event;

    if (e.keyCode == '37') sprite.move('left');
    else if (e.keyCode == '38') sprite.move('up');
    else if (e.keyCode == '39') sprite.move('right');
    else if (e.keyCode == '40') sprite.move('down');
  };
};
