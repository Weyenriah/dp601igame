/*
 * MAIN FILE
 */

let canvas = {
  height: 700,
  width: 1200
};

// Level specific information
let levels = [
  { // Start level -- Dialog and choice -- 0
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [
      { type: 'other', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
      { type: 'normal', image: 'platform', x: 0, y: 500, width: 1500, height: 150 }, // Start platform
      { type: 'other', x: 1500, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall END
    ],
    jumpForce: -30,
    nextLevel() {
      if(mouseIsPressed) {
        let mX = mouseX - player.x;

        let pressedCharacter = levels[level].characters.find((c) => {
          return mX >= c.x &&
            mX <= c.x + c.width &&
            mouseY >= c.y &&
            mouseY <= c.y + c.height;
        });

        if (pressedCharacter != null) {
          level = pressedCharacter.level;
          levels[level].reset();
        }
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3, level: 1 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3, level: 2 }, // Denier
    ],
    talking: [
      { x: 600, y: 100, width: 300, height: 113, color: 255, stroke: 200, show: 0.5, disappear: 5, msg: 'Hey! Du där! Vart är du påväg? Du skulle ju hämta det viktiga dokumentet åt oss. Ta bilen, skynda dig!'},
      { x: -100, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 5, disappear: 9, msg: 'Det är inte så långt dit, det är bäst att gå. Snällare för miljön.' },
      { x: 600, y: 100, width: 300, height: 90, color: 255, stroke: 200, show: 9, disappear: 15, msg: 'Nehe! Det är rätt långt dit, bäst att ta bilen. Går fortare, och man har energi kvar när man kommer fram.' },
      { x: -100, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 15, disappear: 45, msg: 'VAL: Gå!' },
      { x: 600, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 15, disappear: 45, msg: 'VAL: Ta bilen!' },
    ]
  },
  { // Level 1 -- Choice: Walk -- 1
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [],
    jumpForce: -20, // Jumpforce lower (because of player choice)
    nextLevel() {
      if(player.x > 4200) {
        return 3;
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: 0, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 400, y: 400, width: 250, height: 30 }, // 1
        { type: 'normal', image: 'platform', x: 1100, y: 400, width: 250, height: 30 }, // 2
        { type: 'normal', image: 'platform', x: 1400, y: 370, width: 250, height: 30 }, // 3 ...
        { type: 'normal', image: 'platform', x: 1550, y: 300, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 1900, y: 300, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 2200, y: 500, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 2500, y: 600, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 2850, y: 490, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 3200, y: 490, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3400, y: 490, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3600, y: 490, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3800, y: 550, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 4100, y: 500, width: 1800, height: 150 }, // End platform
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: -100, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 0.5, disappear: 4, msg: 'Toppen! Miljön tackar dig för ditt val!' },
      { x: 600, y: 100, width: 300, height: 100, color: 255, stroke: 200, show: 4, disappear: 9, msg: 'Se upp bara, nu behöver du spara på din energi - inga höga hopp för dig!'},
      { x: -100, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 9, disappear: 13, msg: 'Äsch, det spelar väl ingen roll…' },
    ]
  },
  { // Level 1 -- Choice: Car -- 2
    waterLevel: 100.0,
    waterIsRising: 0.00055, // Water rising (because of player choice)
    objects: [],
    jumpForce: -30,
    nextLevel() {
      if(player.x > 4200) {
        return 4;
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -1200, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: -1200, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 400, y: 400, width: 250, height: 30 }, // 1
        { type: 'normal', image: 'platform', x: 800, y: 200, width: 250, height: 30 }, // 2
        { type: 'normal', image: 'platform', x: 1200, y: 300, width: 50, height: 30 }, // 3 ...
        { type: 'normal', image: 'platform', x: 1400, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1600, y: 500, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1800, y: 450, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 2230, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2430, y: 350, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2700, y: 450, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 3100, y: 400, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 3500, y: 200, width: 250, height: 30 },
        { type: 'normal', image: 'platform', x: 3850, y: 300, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 4100, y: 400, width: 1800, height: 200 }, // End platform
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: -100, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 0.5, disappear: 4, msg: 'Hur kunde du? Tänk på miljön! Se på vattnet...' },
      { x: 600, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 4, disappear: 9, msg: 'Äsch, strunta i vattnet, det är ingen fara!'},
    ]
  },
  { // Start for level 2 (after Choice: Walk) -- 3
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [],
    jumpForce: -20, // Jumpforce lower (because of player choice)
    nextLevel() {
      if(mouseIsPressed) {
        let mX = mouseX - player.x;

        let pressedCharacter = levels[level].characters.find((c) => {
          return mX >= c.x &&
            mX <= c.x + c.width &&
            mouseY >= c.y &&
            mouseY <= c.y + c.height;
        });

        if (pressedCharacter != null) {
          level = pressedCharacter.level;
          levels[level].reset();
        }
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: 0, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'other', x: 1500, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END

      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3, level: 5 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3, level: 6 }, // Denier
    ],
    talking: [
      { x: 600, y: 80, width: 300, height: 130, color: 255, stroke: 200, show: 0.5, disappear: 7, msg: 'Här har vi det viktiga dokumentet! Men… Vad står det här? “Grön utveckling”? Det kräver ju åratal av ny forskning. Det hinner vi inte med!'},
      { x: -100, y: 100, width: 300, height: 100, color: 255, stroke: 200, show: 7, disappear: 11, msg: 'Klart vi hinner med! Vi hinner inte med att miljön fallerar dock, skriv på så vi kan börja!' },
      { x: 600, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 11, disappear: 16, msg: 'Nej, skriv inte på! Saker kommer börja falla med kontraktet också.' },
      { x: -100, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 16, disappear: 45, msg: 'VAL: Skriv på!' },
      { x: 600, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 16, disappear: 45, msg: 'VAL: Skriv inte på!' },
    ]
  },
  { // Start for level 2 (after Choice: Car) -- 4
    waterLevel: 100.0,
    waterIsRising: 0.00055, // Water rising (because of player choice)
    objects: [],
    jumpForce: -30,
    nextLevel() {
      if(mouseIsPressed) {
        let mX = mouseX - player.x;

        let pressedCharacter = levels[level].characters.find((c) => {
          return mX >= c.x &&
            mX <= c.x + c.width &&
            mouseY >= c.y &&
            mouseY <= c.y + c.height;
        });

        if (pressedCharacter != null) {
          level = pressedCharacter.level;
          levels[level].reset();
        }
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -1200, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: -1200, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'other', x: 1500, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3, level: 7 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3, level: 8 }, // Denier
    ],
    talking: [
      { x: 600, y: 80, width: 300, height: 130, color: 255, stroke: 200, show: 0.5, disappear: 7, msg: 'Här har vi det viktiga dokumentet! Men… Vad står det här? “Grön utveckling”? Det kräver ju åratal av ny forskning. Det hinner vi inte med!'},
      { x: -100, y: 100, width: 300, height: 100, color: 255, stroke: 200, show: 7, disappear: 11, msg: 'Klart vi hinner med! Vi hinner inte med att miljön fallerar dock, skriv på så vi kan börja!' },
      { x: 600, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 11, disappear: 16, msg: 'Nej, skriv inte på! Saker kommer börja falla med kontraktet också.' },
      { x: -100, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 16, disappear: 45, msg: 'VAL: Skriv på!' },
      { x: 600, y: 100, width: 300, height: 45, color: 255, stroke: 200, show: 16, disappear: 45, msg: 'VAL: Skriv inte på!' },
    ]
  },
  { // Level 2 -- Choice: Sign (after Choice: Walk) -- 5
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [],
    jumpForce: -20, // Jumpforce lower (because of player choice)
    nextLevel() {
      if(player.x > 4200) {
        document.getElementById('you-succeeded').classList.add('display');
        document.getElementById('n1b').classList.add('display'); // Walk
        document.getElementById('n2b').classList.add('display'); // Sign
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: 0, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 400, y: 400, width: 250, height: 30 }, // 1
        { type: 'normal', image: 'platform', x: 650, y: 290, width: 250, height: 30 }, // 2
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 950, y: 200, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms || 3 ...
        { type: 'normal', image: 'platform', x: 1100, y: 390, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1300, y: 390, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 1500, y: 390, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 1600, y: 310, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1780, y: 280, width: 250, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 2100, y: 280, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 2400, y: 340, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 2700, y: 400, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 3000, y: 450, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3100, y: 430, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3300, y: 430, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 3400, y: 430, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 3700, y: 430, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 4000, y: 420, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 4100, y: 500, width: 1800, height: 150 }, // End platform ("Floor")
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: 600, y: 80, width: 300, height: 130, color: 255, stroke: 200, show: 0.5, disappear: 5, msg: 'Jag fattar inte hur du kunde skriva på detta… Hoppas du ser upp, för nu kommer saker börja gå sönder. Lycka till att hoppa på dem OCH spara din energi.'},
      { x: -100, y: 100, width: 300, height: 70, color: 255, stroke: 200, show: 5, disappear: 10, msg: 'Äsch, inte så farligt! Miljön kommer överleva tack vare dig!' },
    ]
  },
  { // Level 2 -- Choice: Not sign (after Choice: Walk) -- 6
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [],
    jumpForce: -20, // Jumpforce lower (because of player choice)
    nextLevel() {
      if(player.x > 4200) {
        document.getElementById('you-succeeded').classList.add('display');
        document.getElementById('n1b').classList.add('display'); // Walk
        document.getElementById('n2a').classList.add('display'); // Not Sign
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: 0, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 400, y: 400, width: 250, height: 30 }, // 1
        { type: 'normal', image: 'platform', x: 650, y: 290, width: 250, height: 30 }, // 2
        { type: 'moving', image: 'moving', x: 950, y: 200, width: 250, height: 30, speedX: 10, leftMostX: 950, rightMostX: (950 + 2 * 250), movementSpeed: 10 }, // Moving platforms || 3 ...
        { type: 'normal', image: 'platform', x: 1800, y: 220, width: 50, height: 30 },
        { type: 'moving', image: 'moving', x: 1950, y: 200, width: 250, height: 30, speedX: 10, leftMostX: 1950, rightMostX: (1950 + 2 * 250), movementSpeed: 10 }, // Moving platforms
        { type: 'normal', image: 'platform', x: 2300, y: 150, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2800, y: 220, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3000, y: 240, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3200, y: 260, width: 50, height: 30 },
        { type: 'moving', image: 'moving', x: 3350, y: 240, width: 250, height: 30, speedX: 10, leftMostX: 3350, rightMostX: (3350 + 2 * 250), movementSpeed: 10 }, // Moving platforms
        { type: 'normal', image: 'platform', x: 4100, y: 500, width: 1800, height: 150 }, // End platform ("Floor")
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: -100, y: 100, width: 300, height: 110, color: 255, stroke: 200, show: 0.5, disappear: 6, msg: 'Va? Hur kunde du inte skriva på det? Saker blir bara mer och mer mekaniskt… Så mycket avgaser i atmosfären...' },
      { x: 600, y: 100, width: 300, height: 110, color: 255, stroke: 200, show: 6, disappear: 13, msg: 'Riktigt bra! Utvecklingen kommer gå snabbt framåt! Se upp dock, du behöver fortfarande spara på energi.'},
    ]
  },
  { // Level 2 -- Choice: Sign (after Choice: Car) -- 7
    waterLevel: 100.0,
    waterIsRising: 0.00055, // Water rising (because of player choice)
    objects: [],
    jumpForce: -30,
    nextLevel() {
      if(player.x > 4200) {
        document.getElementById('you-succeeded').classList.add('display');
        document.getElementById('n1a').classList.add('display'); // Car
        document.getElementById('n2b').classList.add('display'); // Sign
        this.waterIsRising = 0.0;
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -1200, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: -1200, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 450, y: 400, width: 250, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 800, y: 200, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 1000, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1250, y: 400, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 1400, y: 200, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 1750, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1950, y: 400, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 2150, y: 440, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 2530, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2780, y: 400, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2940, y: 360, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 3100, y: 400, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 3500, y: 360, width: 50, height: 30 },
        { type: 'breaking', image1: 'breaking1', image2: 'breaking2', image3: 'breaking3', image4: 'breaking4', x: 3700, y: 380, width: 250, height: 30, touches: false, health: 5.0 }, // Breaking platforms
        { type: 'normal', image: 'platform', x: 4100, y: 500, width: 1800, height: 150, }, // End platform ("Floor")
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: 600, y: 80, width: 300, height: 120, color: 255, stroke: 200, show: 0.5, disappear: 5, msg: 'Jag fattar inte hur du kunde skriva på detta… Hoppas du ser upp, för nu kommer saker börja gå sönder. Lycka till att hoppa på dom!'},
      { x: -100, y: 100, width: 300, height: 120, color: 255, stroke: 200, show: 5, disappear: 10, msg: 'Äsch, inte så farligt! Miljön kommer överleva tack vare dig! Men se upp, vattnet ökar fortfarande.' },
    ]
  },
  { // Level 2 -- Choice: Not sign (after Choice: Car) -- 8
    waterLevel: 100.0,
    waterIsRising: 0.00055, // Water rising (because of player choice)
    objects: [],
    jumpForce: -30,
    nextLevel() {
      if(player.x > 4200) {
        document.getElementById('you-succeeded').classList.add('display');
        document.getElementById('n1a').classList.add('display'); // Car
        document.getElementById('n2a').classList.add('display'); // Not Sign
        this.waterIsRising = 0.0;
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'other', x: -1200, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall START
        { type: 'normal', image: 'platform', x: -1200, y: 500, width: 1800, height: 150 }, // Start platform ("Floor")
        { type: 'normal', image: 'platform', x: 400, y: 400, width: 250, height: 30 },
        { type: 'moving', image: 'moving', x: 700, y: 200, width: 250, height: 30, speedX: 10, leftMostX: 700, rightMostX: (700 + 2 * 250), movementSpeed: 10 }, // Moving platforms
        { type: 'normal', image: 'platform', x: 1600, y: 200, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 1800, y: 300, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 2000, y: 400, width: 50, height: 30 },
        { type: 'moving', image: 'moving', x: 2200, y: 400, width: 250, height: 30, speedX: 10, leftMostX: 2200, rightMostX: (2200 + 2 * 250), movementSpeed: 10 }, // Moving platforms
        { type: 'moving', image: 'moving', x: 2700, y: 350, width: 250, height: 30, speedX: 10, leftMostX: 2700, rightMostX: (2700 + 2 * 250), movementSpeed: 10 }, // Moving platforms
        { type: 'normal', image: 'platform', x: 3600, y: 300, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 3850, y: 300, width: 50, height: 30 },
        { type: 'normal', image: 'platform', x: 4100, y: 500, width: 1800, height: 150 }, // End platform ("Floor")
        { type: 'other', x: 4900, y: 0, width: 700, height: document.body.clientHeight, color: 25, stroke: 25 }, // Wall END
      ]
      this.waterLevel = 100.0;
      time = 0.0;
    },
    characters: [
      { image: 'activist', x: -100, y: 180, width: 726/3, height: 1655/3 }, // Activist
      { image: 'denier', x: 550, y: 170, width: 1003/3, height: 1669/3 }, // Denier
    ],
    talking: [
      { x: -100, y: 100, width: 300, height: 120, color: 255, stroke: 200, show: 0.5, disappear: 6, msg: 'Va? Hur kunde du inte skriva på det? Saker blir bara mer och mer mekaniskt… Så mycket avgaser i atmosfären...' },
      { x: 600, y: 80, width: 300, height: 70, color: 255, stroke: 200, show: 6, disappear: 9, msg: 'Riktigt bra! Utvecklingen kommer gå snabbt framåt!'},
      { x: -100, y: 100, width: 300, height: 100, color: 255, stroke: 200, show: 9, disappear: 12, msg: 'Se till att vara snabb bara, för nu rör sig marken OCH vattnet ökar. Världen går under…' },
    ]
  },
]

let time = 0;

let level = 0;

let gravity = 9.82;

let images = {};

// PRELOAD --- For images
function preload() {
  // Character Images
  images.activist = loadImage('content/graphic/activist-shadow.png');
  images.denier = loadImage('content/graphic/denier-shadow.png');

  // Platform Images
  images.platform = loadImage('content/graphic/platform.png');
  images.moving = loadImage('content/graphic/moving-platform.png');
  images.breaking1 = loadImage('content/graphic/breaking-platform-1.png');
  images.breaking2 = loadImage('content/graphic/breaking-platform-2.png');
  images.breaking3 = loadImage('content/graphic/breaking-platform-3.png');
  images.breaking4 = loadImage('content/graphic/breaking-platform-4.png');
}

// SETUP --- Canvas
function setup() {
  createCanvas(canvas.width, canvas.height);

  levels[level].reset();
}

// DRAW --- Draw the game on canvas
function draw() {
  background(120, 186, 220);

  // Move "viewport" with the player movement
  translate(-player.x+canvas.width/3, 0);

  // Timer -- For timing talking
  time += deltaTime / 1000;

  // Create platforms
  for (i = 0; i < levels[level].objects.length; i++) {
    if (levels[level].objects[i].type === 'other') {
      fill(levels[level].objects[i].color);
      stroke(levels[level].objects[i].stroke);
      rect(levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
    }
    if (levels[level].objects[i].type === 'normal') {
      image(images[levels[level].objects[i].image], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
    }
    if (levels[level].objects[i].type === 'moving') {
      image(images[levels[level].objects[i].image], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
    }
    if (levels[level].objects[i].type === 'breaking') {
      if(levels[level].objects[i].health >= 3.5 && levels[level].objects[i].health <= 6.0) {
        image(images[levels[level].objects[i].image1], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
      }
      if(levels[level].objects[i].health >= 1.5 && levels[level].objects[i].health <= 3.5) {
        image(images[levels[level].objects[i].image2], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
      }
      if(levels[level].objects[i].health >= 0.0 && levels[level].objects[i].health <= 1.5) {
        image(images[levels[level].objects[i].image3], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
      }
      if(levels[level].objects[i].health < 0.0) {
        image(images[levels[level].objects[i].image4], levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
      }
    }
  }

  // Draw player
  player.draw();

  // Move "player"
  if (keyIsDown(LEFT_ARROW)) { // Left
    moveObject(player, -player.movementSpeed * deltaTime / 100, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) { // Right
    moveObject(player, player.movementSpeed * deltaTime / 100, 0);
  }
  if (keyIsDown(UP_ARROW)) { // Up
    if (player.isOnObjects(levels[level].objects.filter(aliveObject))) {
      player.speedY += levels[level].jumpForce;
    }
  }

  updateObject(player);

  // Create moving platforms
  let movingObjects = levels[level].objects.filter((o) => o.type === 'moving');

  for (i = 0; i < movingObjects.length; i++) {
    moveObject(movingObjects[i], movingObjects[i].speedX * deltaTime / 100, 0);

    if(movingObjects[i].x < movingObjects[i].leftMostX) {
      movingObjects[i].speedX = movingObjects[i].movementSpeed;
    }

    if(movingObjects[i].x > movingObjects[i].rightMostX) {
      movingObjects[i].speedX = -movingObjects[i].movementSpeed;
    }
  }

  // Breaking platforms
  let breakingObjects = levels[level].objects.filter((o) => o.type === 'breaking');

  for (let i = 0; i < breakingObjects.length; i++) {
    if(player.isOnObject(breakingObjects[i])) {
      breakingObjects[i].touches = true;
    }
    if(breakingObjects[i].touches) {
      breakingObjects[i].health -= deltaTime / 100;
    }
    if(breakingObjects[i].health <= 0) {
      breakingObjects[i].color = 100;
    }
  }

  /*
   * Perlin Noise Wave (Water)
   */
  stroke(59, 144, 143);
  fill(59, 144, 143);
  // Draw a polygon out of the wave points
  beginShape();

  let xoff = 300; // 2D Noise

  // Iterate over horizontal pixels
  for (let x = player.x - canvas.width; x <= player.x + canvas.width; x += 10) {
    // Controls water level
    levels[level].waterLevel += levels[level].waterIsRising;

    // 2D Noise
    let y = map(noise(xoff, yoff), 0, 2, canvas.height-levels[level].waterLevel /* Height of waterflow */, canvas.height);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // Increment y dimension for noise
  yoff += 0.01;
  vertex(player.x+canvas.width, height);
  vertex(player.x-canvas.width, height);

  endShape(CLOSE);

  // Draw characters
  for (i = 0; i < levels[level].characters.length; i++) {
    image(images[levels[level].characters[i].image], levels[level].characters[i].x, levels[level].characters[i].y, levels[level].characters[i].width, levels[level].characters[i].height);
  }

  // Draw talking bubbles for characters
  let talking = levels[level].talking.filter((t) => time > t.show && time < t.disappear);

  for (i = 0; i < talking.length; i++) {
    stroke(talking[i].stroke);
    fill(talking[i].color);
    rect(talking[i].x, talking[i].y, talking[i].width, talking[i].height, 5);
    fill(0);
    textSize(18);
    text(talking[i].msg, talking[i].x + 10, talking[i].y + 15, talking[i].width - 10, talking[i].height)
  }

  // Game over-screen --- At waterlevel
  if(player.y >= canvas.height - levels[level].waterLevel) {
    document.getElementById('game-over').classList.add('display');
  }

  let nextLevel = levels[level].nextLevel();

  if(nextLevel !== null) {
    level = nextLevel;
    levels[level].reset();
  }
}

// Has to do with Perlin Noise Wave (Water)
let yoff = 0.0;

// Get coordinates when clicking on screen --- Development only
function mousePressed() {
  console.log('x: ' + mouseX + ', y: ' + mouseY);
  console.log(JSON.stringify(levels[level]));
}

// Onclick for Game over-screen
function gameOver() {
  levels[level].reset();
  document.getElementById('game-over').classList.remove('display');
}

// Onclick for Game ended-screen
function youDidIt() {
  level = 0;
  levels[level].reset();
  let views = [
    'you-succeeded',
    'n1a',
    'n1b',
    'n2a',
    'n2b',
  ];

  for(i = 0; i < views.length; i++) {
    document.getElementById(views[i]).classList.remove('display');
  }
}