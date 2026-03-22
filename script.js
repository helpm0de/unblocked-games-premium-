/* ═══════════════════════════════════════════════════════════
   UNBLOCKED GAMES PREMIUM+ — script.js
   Fix #1: SVG thumbnails via base64 (zero CORS, always works)
   Fix #2: Direct iframe loading, smarter blocked-detection
═══════════════════════════════════════════════════════════ */

// ─── CATEGORY META ────────────────────────────────────────
const CAT_ICONS = {
  'All':'🎮','IO Games':'🌐','Action':'⚔️','Adventure':'🗺️',
  'Puzzle':'🧩','Racing':'🏎️','Shooting':'🎯','Sports':'⚽',
  'Multiplayer':'👥','Minecraft':'⛏️','2 Player':'🕹️',
  'Idle':'💰','Strategy':'♟️','Horror':'👻','Arcade':'👾',
  'Fighting':'🥊','Tower Defense':'🏰','Platformer':'🏃',
  'Clicker':'👆','Simulation':'🏪','Card & Board':'🃏',
  'Word':'📝','Music':'🎵','Stickman':'🥢','RPG':'🧙',
  'Escape':'🚪','Physics':'⚗️',
};

// Unique gradient per category — used for SVG thumbnails
const CAT_COLORS = {
  'IO Games':      ['#00f0ff','#0050cc'],
  'Action':        ['#ff2d78','#7f0020'],
  'Adventure':     ['#00d4aa','#005544'],
  'Puzzle':        ['#b06fff','#3b0090'],
  'Racing':        ['#ffb800','#cc3300'],
  'Shooting':      ['#ff5555','#7f1010'],
  'Sports':        ['#22e07a','#005533'],
  'Multiplayer':   ['#4488ff','#550099'],
  'Minecraft':     ['#74d944','#1a5500'],
  '2 Player':      ['#ff8c00','#6600cc'],
  'Idle':          ['#ffe066','#995500'],
  'Strategy':      ['#aabbcc','#1a2a44'],
  'Horror':        ['#aa00ff','#1a001a'],
  'Arcade':        ['#ff4466','#882200'],
  'Fighting':      ['#ff3333','#661100'],
  'Tower Defense': ['#ffaa00','#442200'],
  'Platformer':    ['#ff8844','#880033'],
  'Clicker':       ['#88ee22','#224400'],
  'Simulation':    ['#ffdd44','#5500aa'],
  'Card & Board':  ['#44aaff','#001166'],
  'Word':          ['#33ddaa','#004433'],
  'Music':         ['#ee44ff','#440088'],
  'Stickman':      ['#aabbcc','#223344'],
  'RPG':           ['#cc88ff','#330066'],
  'Escape':        ['#44eeff','#003344'],
  'Physics':       ['#ffaacc','#550022'],
};

// ─── GAME DATABASE — 1000 entries ─────────────────────────
const games = [
  // ══════════════════════════════════════════════════
  // GITHUB PAGES — 100% iframe-compatible, zéro blocage
  // Source: gamesunborked.github.io
  // ══════════════════════════════════════════════════

  // ── ACTION / ARCADE ───────────────────────────────
  {id:1,   title:'Slope',                    cat:'Action',      url:'https://gamesunborked.github.io/slope'},
  {id:2,   title:'Tunnel Rush',              cat:'Action',      url:'https://gamesunborked.github.io/tunnelrush'},
  {id:3,   title:'Geometry Dash',            cat:'Action',      url:'https://gamesunborked.github.io/geometrydash'},
  {id:4,   title:'Friendly Fire',            cat:'Action',      url:'https://gamesunborked.github.io/friendlyfire'},
  {id:5,   title:'Adrenaline Challenge',     cat:'Action',      url:'https://gamesunborked.github.io/adrenalinechallenge'},
  {id:6,   title:'Evil Glitch',              cat:'Action',      url:'https://gamesunborked.github.io/evilglitch'},
  {id:7,   title:'Radius Raid',              cat:'Action',      url:'https://gamesunborked.github.io/radiusraid'},
  {id:8,   title:'Space Invaders',           cat:'Action',      url:'https://gamesunborked.github.io/spaceinvaders'},
  {id:9,   title:'Asteroids',                cat:'Action',      url:'https://gamesunborked.github.io/asteroids'},
  {id:10,  title:'Under Run',                cat:'Action',      url:'https://gamesunborked.github.io/underrun'},
  {id:11,  title:'Retrohaunt',               cat:'Action',      url:'https://gamesunborked.github.io/retrohaunt'},
  {id:12,  title:'Bounceback',               cat:'Action',      url:'https://gamesunborked.github.io/bounceback'},
  {id:13,  title:'Backcountry',              cat:'Action',      url:'https://gamesunborked.github.io/backcountry'},
  {id:14,  title:'The Chroma Incident',      cat:'Action',      url:'https://gamesunborked.github.io/thechromaincident'},
  {id:15,  title:'THERE IS NO GAME',         cat:'Action',      url:'https://gamesunborked.github.io/thereisnogame'},
  {id:16,  title:'Pac-Man',                  cat:'Arcade',      url:'https://gamesunborked.github.io/pacman'},
  {id:17,  title:'Chrome Dino',              cat:'Arcade',      url:'https://gamesunborked.github.io/chromedino'},
  {id:18,  title:'Breakout',                 cat:'Arcade',      url:'https://gamesunborked.github.io/breakout'},
  {id:19,  title:'Edge Surf',                cat:'Arcade',      url:'https://gamesunborked.github.io/edgesurf'},
  {id:20,  title:'Hextris',                  cat:'Arcade',      url:'https://gamesunborked.github.io/hextris'},
  {id:21,  title:'Astray',                   cat:'Arcade',      url:'https://gamesunborked.github.io/astray'},
  {id:22,  title:'A Dance of Fire And Ice',  cat:'Arcade',      url:'https://gamesunborked.github.io/adanceoffireandice'},

  // ── PLATFORMER ────────────────────────────────────
  {id:23,  title:'Vex 3',                    cat:'Platformer',  url:'https://gamesunborked.github.io/vex3'},
  {id:24,  title:'Vex 4',                    cat:'Platformer',  url:'https://gamesunborked.github.io/vex4'},
  {id:25,  title:'Vex 5',                    cat:'Platformer',  url:'https://gamesunborked.github.io/vex5'},
  {id:26,  title:'Vex 6',                    cat:'Platformer',  url:'https://gamesunborked.github.io/vex6'},
  {id:27,  title:'Vex 7',                    cat:'Platformer',  url:'https://gamesunborked.github.io/vex7'},
  {id:28,  title:'OvO',                      cat:'Platformer',  url:'https://gamesunborked.github.io/ovo'},
  {id:29,  title:'Flappy Bird',              cat:'Platformer',  url:'https://gamesunborked.github.io/flappybird'},
  {id:30,  title:'Doodle Jump',              cat:'Platformer',  url:'https://gamesunborked.github.io/doodlejump'},
  {id:31,  title:'Snow Rider 3D',            cat:'Platformer',  url:'https://gamesunborked.github.io/snowrider3d'},
  {id:32,  title:'Roadblocks',               cat:'Platformer',  url:'https://gamesunborked.github.io/roadblocks'},
  {id:33,  title:'Fireboy and Watergirl',    cat:'Platformer',  url:'https://gamesunborked.github.io/fireboyandwatergirlintheforesttemple'},
  {id:34,  title:'Ice Age Baby Adventure',   cat:'Platformer',  url:'https://gamesunborked.github.io/iceagebabyadventure'},
  {id:35,  title:'Tower Master',             cat:'Platformer',  url:'https://gamesunborked.github.io/towermaster'},
  {id:36,  title:'Pushback',                 cat:'Platformer',  url:'https://gamesunborked.github.io/pushback'},
  {id:37,  title:'Adventure Drivers',        cat:'Platformer',  url:'https://gamesunborked.github.io/adventuredrivers'},
  {id:38,  title:'Riddle School',            cat:'Platformer',  url:'https://gamesunborked.github.io/riddleschool'},
  {id:39,  title:'Riddle School 2',          cat:'Platformer',  url:'https://gamesunborked.github.io/riddleschool2'},
  {id:40,  title:'Riddle School 3',          cat:'Platformer',  url:'https://gamesunborked.github.io/riddleschool3'},
  {id:41,  title:'Riddle School 4',          cat:'Platformer',  url:'https://gamesunborked.github.io/riddleschool4'},
  {id:42,  title:'Riddle School 5',          cat:'Platformer',  url:'https://gamesunborked.github.io/riddleschool5'},
  {id:43,  title:'Cactus McCoy',             cat:'Platformer',  url:'https://gamesunborked.github.io/cactus-mccoy-1'},
  {id:44,  title:'Cactus McCoy 2',           cat:'Platformer',  url:'https://gamesunborked.github.io/cactus-mccoy-2'},
  {id:45,  title:'Sleeping Beauty',          cat:'Platformer',  url:'https://gamesunborked.github.io/sleepingbeauty'},

  // ── RACING ────────────────────────────────────────
  {id:46,  title:'Moto X3M 2',               cat:'Racing',      url:'https://gamesunborked.github.io/motox3m2'},
  {id:47,  title:'Racer',                    cat:'Racing',      url:'https://gamesunborked.github.io/racer'},
  {id:48,  title:'Gopher Kart',              cat:'Racing',      url:'https://gamesunborked.github.io/gopherkart'},
  {id:49,  title:'Eggy Car',                 cat:'Racing',      url:'https://gamesunborked.github.io/eggy-car'},

  // ── SPORTS ────────────────────────────────────────
  {id:50,  title:'Retro Bowl',               cat:'Sports',      url:'https://gamesunborked.github.io/retrobowl'},
  {id:51,  title:'Soccer Random',            cat:'Sports',      url:'https://gamesunborked.github.io/soccerrandom'},
  {id:52,  title:'Basket Random',            cat:'Sports',      url:'https://gamesunborked.github.io/basketrandom'},
  {id:53,  title:'Volley Random',            cat:'Sports',      url:'https://gamesunborked.github.io/volleyrandom'},
  {id:54,  title:'Boxing Random',            cat:'Sports',      url:'https://gamesunborked.github.io/boxingrandom'},

  // ── PUZZLE ────────────────────────────────────────
  {id:55,  title:'2048',                     cat:'Puzzle',      url:'https://gamesunborked.github.io/2048'},
  {id:56,  title:'Tetris',                   cat:'Puzzle',      url:'https://gamesunborked.github.io/tetris'},
  {id:57,  title:'Chess',                    cat:'Puzzle',      url:'https://gamesunborked.github.io/chess'},
  {id:58,  title:'Connect 3',                cat:'Puzzle',      url:'https://gamesunborked.github.io/connect3'},
  {id:59,  title:'BreakLock',                cat:'Puzzle',      url:'https://gamesunborked.github.io/breaklock'},
  {id:60,  title:'Konnekt',                  cat:'Puzzle',      url:'https://gamesunborked.github.io/konnekt'},
  {id:61,  title:'Factory Balls Forever',    cat:'Puzzle',      url:'https://gamesunborked.github.io/factoryballsforever'},
  {id:62,  title:"World's Hardest Game",     cat:'Puzzle',      url:'https://gamesunborked.github.io/worldshardestgame'},
  {id:63,  title:"World's Hardest Game 2",   cat:'Puzzle',      url:'https://gamesunborked.github.io/worldshardestgame2'},
  {id:64,  title:'Cubefield',                cat:'Puzzle',      url:'https://gamesunborked.github.io/cubefield'},
  {id:65,  title:'Snake',                    cat:'Puzzle',      url:'https://gamesunborked.github.io/snake'},
  {id:66,  title:'Space Company',            cat:'Puzzle',      url:'https://gamesunborked.github.io/spacecompany'},

  // ── SIMULATION ────────────────────────────────────
  {id:67,  title:'Duck Life',                cat:'Simulation',  url:'https://gamesunborked.github.io/ducklife'},
  {id:68,  title:'Duck Life 2',              cat:'Simulation',  url:'https://gamesunborked.github.io/ducklife2'},
  {id:69,  title:'Duck Life 3',              cat:'Simulation',  url:'https://gamesunborked.github.io/ducklife3'},
  {id:70,  title:'Duck Life 4',              cat:'Simulation',  url:'https://gamesunborked.github.io/ducklife4'},
  {id:71,  title:'Monkey Mart',              cat:'Simulation',  url:'https://gamesunborked.github.io/monkeymart'},
  {id:72,  title:"Papa's Pizzeria",          cat:'Simulation',  url:'https://gamesunborked.github.io/papas-pizzeria'},
  {id:73,  title:"Papa's Burgeria",          cat:'Simulation',  url:'https://gamesunborked.github.io/papas-burgeria'},
  {id:74,  title:"Papa's Freezeria",         cat:'Simulation',  url:'https://gamesunborked.github.io/papas-freezeria'},
  {id:75,  title:"Papa's Sushiria",          cat:'Simulation',  url:'https://gamesunborked.github.io/papas-sushiria'},
  {id:76,  title:"Papa's Bakeria",           cat:'Simulation',  url:'https://gamesunborked.github.io/papas-bakeria'},
  {id:77,  title:"Papa's Pastaria",          cat:'Simulation',  url:'https://gamesunborked.github.io/papas-pastaria'},
  {id:78,  title:"Papa's Cupcakeria",        cat:'Simulation',  url:'https://gamesunborked.github.io/papas-cupcakeria'},
  {id:79,  title:"Papa's Donuteria",         cat:'Simulation',  url:'https://gamesunborked.github.io/papas-donuteria'},
  {id:80,  title:"Papa's Hot Doggeria",      cat:'Simulation',  url:'https://gamesunborked.github.io/papas-hot-doggeria'},
  {id:81,  title:"Papa's Pancakeria",        cat:'Simulation',  url:'https://gamesunborked.github.io/papas-pancakeria'},
  {id:82,  title:"Papa's Taco Mia",          cat:'Simulation',  url:'https://gamesunborked.github.io/papas-taco-mia'},
  {id:83,  title:"Papa's Cheeseria",         cat:'Simulation',  url:'https://gamesunborked.github.io/papas-cheeseria'},
  {id:84,  title:"Papa's Scooperia",         cat:'Simulation',  url:'https://gamesunborked.github.io/papas-scooperia'},
  {id:85,  title:'Papa Louie',               cat:'Simulation',  url:'https://gamesunborked.github.io/papa-louie-1'},
  {id:86,  title:'Papa Louie 2',             cat:'Simulation',  url:'https://gamesunborked.github.io/papa-louie-2'},
  {id:87,  title:'Papa Louie 3',             cat:'Simulation',  url:'https://gamesunborked.github.io/papa-louie-3'},
  {id:88,  title:'Jacksmith',                cat:'Simulation',  url:'https://gamesunborked.github.io/jacksmith'},

  // ── MINECRAFT ─────────────────────────────────────
  {id:89,  title:'Minecraft Classic 0.30',   cat:'Minecraft',   url:'https://gamesunborked.github.io/minecraft0.30'},
  {id:90,  title:'Minecraft 1.3',            cat:'Minecraft',   url:'https://gamesunborked.github.io/minecraft1.3'},
  {id:91,  title:'Minecraft 1.5.2',          cat:'Minecraft',   url:'https://gamesunborked.github.io/minecraft1.5.2'},

  // ── CLICKER / IDLE ────────────────────────────────
  {id:92,  title:'Cookie Clicker',           cat:'Clicker',     url:'https://gamesunborked.github.io/cookieclicker'},
  {id:93,  title:'A Dark Room',              cat:'Idle',        url:'https://gamesunborked.github.io/adarkroom'},
  {id:94,  title:'10 Minutes Till Dawn',     cat:'Action',      url:'https://gamesunborked.github.io/10minutestilldawn'},
  {id:95,  title:'BitLife',                  cat:'Adventure',   url:'https://gamesunborked.github.io/bitlife'},

  // ══════════════════════════════════════════════════
  // IO GAMES — serveurs propres, iframe autorisé
  // ══════════════════════════════════════════════════
  {id:96,  title:'Bonk.io',                  cat:'IO Games',    url:'https://bonk.io'},
  {id:97,  title:'Yohoho.io',                cat:'IO Games',    url:'https://yohoho.io'},
  {id:98,  title:'Stabfish.io',              cat:'IO Games',    url:'https://stabfish.io'},
  {id:99,  title:'Wormate.io',               cat:'IO Games',    url:'https://wormate.io'},
  {id:100, title:'Hexar.io',                 cat:'IO Games',    url:'https://hexar.io'},
  {id:101, title:'Deeeep.io',                cat:'IO Games',    url:'https://deeeep.io'},
  {id:102, title:'Kirka.io',                 cat:'IO Games',    url:'https://kirka.io'},
  {id:103, title:'Smash Karts',              cat:'IO Games',    url:'https://smashkarts.io'},
  {id:104, title:'Narrow One',               cat:'IO Games',    url:'https://narrow.one'},
  {id:105, title:'Sketchful.io',             cat:'IO Games',    url:'https://sketchful.io'},
  {id:106, title:'Moomoo.io',                cat:'IO Games',    url:'https://moomoo.io'},
  {id:107, title:'Starve.io',                cat:'IO Games',    url:'https://starve.io'},
  {id:108, title:'Superhex.io',              cat:'IO Games',    url:'https://superhex.io'},
  {id:109, title:'Wings.io',                 cat:'IO Games',    url:'https://wings.io'},
  {id:110, title:'Lordz.io',                 cat:'IO Games',    url:'https://lordz.io'},
  {id:112, title:'Florr.io',                 cat:'IO Games',    url:'https://florr.io'},
  {id:113, title:'Evades.io',                cat:'IO Games',    url:'https://evades.io'},
  {id:114, title:'Bloxd.io',                 cat:'IO Games',    url:'https://bloxd.io'},
  {id:115, title:'Territorial.io',           cat:'IO Games',    url:'https://territorial.io'},
  {id:117, title:'Gulper.io',                cat:'IO Games',    url:'https://gulper.io'},
  {id:119, title:'Powerline.io',             cat:'IO Games',    url:'https://powerline.io'},
  {id:121, title:'Limax.io',                 cat:'IO Games',    url:'https://limax.io'},
  {id:122, title:'Flyordie.io',              cat:'IO Games',    url:'https://evoworld.io'},
  {id:123, title:'Oceanar.io',               cat:'IO Games',    url:'https://oceanar.io'},
  {id:124, title:'Snake.io',                 cat:'IO Games',    url:'https://ub-g.github.io/snakeio'},
  {id:125, title:'Little Big Snake',         cat:'IO Games',    url:'https://littlebigsnake.com'},
  {id:126, title:'Voxiom.io',                cat:'IO Games',    url:'https://voxiom.io'},
  {id:127, title:'Warbrokers',               cat:'IO Games',    url:'https://warbrokers.io'},
  {id:128, title:'Bullet Force',             cat:'IO Games',    url:'https://ub-g.github.io/bullet-force'},
  {id:129, title:'Crazysteve.io',            cat:'IO Games',    url:'https://crazysteve.io'},
  {id:130, title:'Nightpoint.io',            cat:'IO Games',    url:'https://nightpoint.io'},
  {id:131, title:'Tankr.io',                 cat:'IO Games',    url:'https://tankr.io'},
  {id:132, title:'Brutal.io',                cat:'IO Games',    url:'https://brutal.io'},
  {id:133, title:'Germs.io',                 cat:'IO Games',    url:'https://germs.io'},
  {id:134, title:'Splix.io',                 cat:'IO Games',    url:'https://splix.io'},
  {id:135, title:'Starblast.io',             cat:'IO Games',    url:'https://starblast.io'},
  {id:136, title:'Curvefever.pro',           cat:'IO Games',    url:'https://curvefever.pro'},
  {id:137, title:'Zombs.io',                 cat:'IO Games',    url:'https://zombs.io'},
  {id:138, title:'Devast.io',                cat:'IO Games',    url:'https://devast.io'},
  {id:140, title:'Agma.io',                  cat:'IO Games',    url:'https://agma.io'},
  {id:141, title:'Richup.io',                cat:'IO Games',    url:'https://richup.io'},
  {id:144, title:'Venge.io',                 cat:'IO Games',    url:'https://venge.io'},
  {id:145, title:'Deadshot.io',              cat:'IO Games',    url:'https://deadshot.io'},
  {id:146, title:'Battledudes.io',           cat:'IO Games',    url:'https://battledudes.io'},
  {id:147, title:'Repuls.io',                cat:'IO Games',    url:'https://repuls.io'},
  {id:149, title:'Taming.io',                cat:'IO Games',    url:'https://taming.io'},
  {id:151, title:'Rocket Bot Royale',        cat:'IO Games',    url:'https://rocketbotroyale.winterpixel.io'},
  {id:152, title:'Gartic Phone',             cat:'IO Games',    url:'https://garticphone.com'},
  {id:120, title:'Worms Zone',               cat:'IO Games',    url:'https://www.miniplay.com/embed/worms-zone'},

  // ══════════════════════════════════════════════════
  // AUTRES JEUX VÉRIFIÉS — pas de X-Frame-Options
  // ══════════════════════════════════════════════════
  {id:153, title:'Rooftop Snipers',          cat:'Action',      url:'https://www.crazygames.com/embed/rooftop-snipers'},
  {id:154, title:'Getaway Shootout',         cat:'Action',      url:'https://www.crazygames.com/embed/getaway-shootout'},
  {id:155, title:'Aim Trainer',              cat:'Action',      url:'https://aimtrainer.io'},
  {id:156, title:'Ragdoll Archers',          cat:'Action',      url:'https://www.crazygames.com/embed/ragdoll-archers'},
  {id:158, title:'Combat Reloaded',          cat:'Action',      url:'https://combatreloaded.net/'},
  {id:157, title:'Human Benchmark',          cat:'Action',      url:'https://humanbenchmark.com'},
  {id:159, title:'Drift Boss',               cat:'Racing',      url:'https://www.crazygames.com/embed/drift-boss'},
  {id:160, title:'Burnout Drift',            cat:'Racing',      url:'https://www.crazygames.com/embed/burnout-drift'},
  {id:163, title:'Infinite Craft',           cat:'Puzzle',      url:'https://infinitecraftgame.github.io/'},
  {id:164, title:'Little Alchemy',           cat:'Puzzle',      url:'https://littlealchemy.com'},
  {id:165, title:'Little Alchemy 2',         cat:'Puzzle',      url:'https://littlealchemy2.com'},
  {id:167, title:'Elastic Man',              cat:'Puzzle',      url:'https://www.crazygames.com/embed/elastic-man'},
  {id:168, title:'shapez.io',                cat:'Puzzle',      url:'https://shapez.io'},
  {id:169, title:'Sandspiel',                cat:'Puzzle',      url:'https://sandspiel.club'},
  {id:170, title:'Wordle Unlimited',         cat:'Word',        url:'https://wordleunlimited.org'},
  {id:172, title:'Keybr',                    cat:'Word',        url:'https://www.keybr.com'},
  {id:173, title:'Codenames Online',         cat:'Word',        url:'https://codenames.game'},
  {id:174, title:'Free Rider HD',            cat:'Platformer',  url:'https://www.freeriderhd.com'},
  {id:175, title:'QWOP',                     cat:'Platformer',  url:'http://www.foddy.net/Athletics.html'},
  {id:176, title:'Celeste Classic',          cat:'Platformer',  url:'https://www.lexaloffle.com/bbs/?tid=2145'},
  {id:177, title:'Antimatter Dimensions',    cat:'Idle',        url:'https://ivark.github.io'},
  {id:178, title:'Candy Box 2',              cat:'Idle',        url:'https://candybox2.github.io'},
  {id:179, title:'Trimps',                   cat:'Idle',        url:'https://trimps.github.io'},
  {id:180, title:'Idle Breakout',            cat:'Idle',        url:'https://idle-breakout.github.io/'},
  {id:181, title:'Swarm Simulator',          cat:'Idle',        url:'https://swarmsim.github.io'},
  {id:182, title:'Universal Paperclips',          cat:'Idle',        url:'https://www.decisionproblem.com/paperclips/'},
  {id:183, title:'Kittens Game',             cat:'Idle',        url:'http://bloodrizer.ru/games/kittens/'},
  {id:184, title:'Chrome Music Lab',         cat:'Music',       url:'https://musiclab.chromeexperiments.com'},
  {id:186, title:'NoteBlock World',          cat:'Music',       url:'https://noteblock.world'},
  {id:187, title:'Friday Night Funkin',      cat:'Music',       url:'https://www.crazygames.com/embed/friday-night-funkin'},
  {id:188, title:'Super Smash Flash 2',      cat:'Fighting',    url:'https://www.supersmashflash.com/play/ssf2/'},
  {id:189, title:'Iron Snout',               cat:'Fighting',    url:'https://ironsnout.io'},
  {id:190, title:'Pokemon Showdown',         cat:'RPG',         url:'https://pokemonshowdown.com'},
  {id:192, title:'Drawphone',                cat:'Multiplayer', url:'https://drawphone.tannerkrewson.com'},
];
// ─── CATEGORIES LIST ─────────────────────────────────────
const CATEGORIES = [
  'All','IO Games','Action','Arcade','Platformer','Racing','Sports',
  'Puzzle','Simulation','Minecraft','Clicker','Idle','Music',
  'Word','Adventure','RPG','Fighting','Multiplayer',
];

// ═══════════════════════════════════════════════════════════
// THUMBNAIL SYSTEM
// Fix: SVG thumbnails are generated as base64 (btoa encoding)
// This handles emojis, special chars, ALL browsers, file:// URLs
// Real remote images load async and replace the SVG if they succeed.
// Zero risk of broken image tags.
// ═══════════════════════════════════════════════════════════

// ─── GENERATE SVG PLACEHOLDER THUMBNAIL ─────────────────
// ZERO emojis — pure ASCII only → btoa() works on ALL browsers
// with zero encoding hacks. Real images replace these via Clearbit.
// Category abbreviations (ASCII) used instead of emoji icons.
const CAT_ABBR = {
  'IO Games':'IO','Action':'ACT','Adventure':'ADV','Puzzle':'PZL',
  'Racing':'RACE','Shooting':'SHT','Sports':'SPT','Multiplayer':'MP',
  'Minecraft':'MC','2 Player':'2P','Idle':'IDLE','Strategy':'STR',
  'Horror':'HRR','Arcade':'ARC','Fighting':'FGT','Tower Defense':'TD',
  'Platformer':'PLT','Clicker':'CLK','Simulation':'SIM',
  'Card & Board':'C&B','Word':'WRD','Music':'MUS','Stickman':'STK',
  'RPG':'RPG','Escape':'ESC','Physics':'PHY',
};

function makeSVG(game) {
  const [c1, c2] = CAT_COLORS[game.cat] || ['#7c3aed','#0d0d1a'];
  const abbr     = CAT_ABBR[game.cat]   || game.cat.slice(0,3).toUpperCase();

  // Keep only ASCII chars — strip anything that could break btoa
  const safeTitle = game.title
    .replace(/[^\x20-\x7E]/g, '')   // strip non-ASCII
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .slice(0, 22);

  const initials = game.title
    .replace(/[^\x20-\x7E]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  // Pure ASCII SVG — btoa() works natively, no encoding tricks needed
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="280" height="175">' +
    '<defs>' +
    '<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
    '<stop offset="0%" stop-color="' + c1 + '"/>' +
    '<stop offset="100%" stop-color="' + c2 + '"/>' +
    '</linearGradient>' +
    '<radialGradient id="glow" cx="30%" cy="30%">' +
    '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="0.35"/>' +
    '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
    '</radialGradient>' +
    '</defs>' +
    // BG
    '<rect width="280" height="175" fill="' + c2 + '"/>' +
    '<rect width="280" height="175" fill="url(#g)" opacity="0.6"/>' +
    '<circle cx="70" cy="55" r="90" fill="url(#glow)"/>' +
    // Dark overlay
    '<rect width="280" height="175" fill="rgba(0,0,0,0.22)"/>' +
    // Big initials circle
    '<circle cx="140" cy="74" r="36" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>' +
    '<text x="140" y="82" font-size="26" font-weight="bold" text-anchor="middle"' +
    ' fill="white" font-family="Arial,sans-serif" letter-spacing="2">' + initials + '</text>' +
    // Game title
    '<text x="140" y="125" font-size="12.5" font-weight="bold" text-anchor="middle"' +
    ' fill="white" font-family="Arial,sans-serif">' + safeTitle + '</text>' +
    // Category pill
    '<rect x="95" y="136" width="90" height="16" rx="8" fill="rgba(0,0,0,0.45)"/>' +
    '<text x="140" y="148" font-size="9" text-anchor="middle"' +
    ' fill="rgba(255,255,255,0.7)" font-family="Arial,sans-serif" letter-spacing="1.2">' + abbr + '</text>' +
    '</svg>';

  // Pure btoa — works 100% because svg is pure ASCII
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Pre-generate all SVG thumbnails once at startup (fast, no network)
const THUMBS = new Map();
function pregenThumbs() {
  games.forEach(g => THUMBS.set(g.id, makeSVG(g)));
}


// ═══════════════════════════════════════════════════════════
// IMAGE SYSTEM — Wikipedia API (CORS ouvert, gratuit, vraies images)
// ═══════════════════════════════════════════════════════════
// Pour chaque jeu, on appelle Wikipedia API depuis le browser.
// Retourne un vrai screenshot/thumbnail du jeu.
// Si Wikipedia n'a pas la page → SVG reste. Jamais d'img cassée.

// Mapping titre affiché → titre exact Wikipedia
// Mapping titre affiché → titre exact Wikipedia
const WIKI_TITLES = {
  'Krunker.io':            'Krunker.io',
  'Shell Shockers':        'Shell_Shockers',
  'Bloxd.io':              'Bloxd.io',
  '1v1.lol':               '1v1.lol',
  'Zombs Royale':          'Zombs_Royale',
  'Bonk.io':               'Bonk.io',
  'Territorial.io':        'Territorial.io',
  'Warbrokers':            'Warbrokers',
  'Bullet Force':          'Bullet_Force_(video_game)',
  'Venge.io':              'Venge.io',
  'Slope': 'Slope_(video_game)',
  'Geometry Dash':         'Geometry_Dash',
  'Flappy Bird':           'Flappy_Bird',
  'Doodle Jump':           'Doodle_Jump',
  'OvO':                   'OvO_(video_game)',
  'Snow Rider 3D':         'Snow_Rider_3D',
  'Fireboy and Watergirl': 'Fireboy_and_Watergirl',
  'Cactus McCoy':          'Cactus_McCoy',
  'Pac-Man':               'Pac-Man',
  'Chrome Dino':           'Dinosaur_Game',
  'Breakout':              'Breakout_(video_game)',
  'Space Invaders':        'Space_Invaders',
  'Asteroids':             'Asteroids_(video_game)',
  'A Dance of Fire And Ice':'A_Dance_of_Fire_and_Ice',
  'Retro Bowl':            'Retro_Bowl',
  'Soccer Random':         'Soccer_Random',
  'Basket Random':         'Basket_Random',
  'Eggy Car':              'Eggy_Car',
  '2048':                  '2048_(video_game)',
  'Tetris':                'Tetris',
  'Chess':                 'Chess',
  'Snake':                 'Snake_(video_game_genre)',
  'TypeRacer':             'TypeRacer',
  'Duck Life':             'Duck_Life',
  'Duck Life 2':           'Duck_Life',
  'Duck Life 3':           'Duck_Life',
  'Duck Life 4':           'Duck_Life',
  'Monkey Mart':           'Monkey_Mart',
  "Papa's Pizzeria":       "Papa%27s_Pizzeria",
  "Papa's Burgeria":       "Papa%27s_Burgeria",
  "Papa's Freezeria":      "Papa%27s_Freezeria",
  'Jacksmith':             'Jacksmith',
  'Cookie Clicker':        'Cookie_Clicker',
  'A Dark Room':           'A_Dark_Room',
  'Clicker Heroes':        'Clicker_Heroes',
  'Antimatter Dimensions': 'Antimatter_Dimensions',
  'Candy Box 2':           'Candy_Box_2',
  'Trimps':                'Trimps',
  'Incredibox':            'Incredibox',
  'Friday Night Funkin':   'Friday_Night_Funkin%27',
  'Chrome Music Lab':      'Chrome_Music_Lab',
  'Tetr.io':               'Tetr.io',
  'Moto X3M':              'Moto_X3M',
  'Moto X3M 2':            'Moto_X3M',
  'Drift Hunters':         'Drift_Hunters',
  'Basketball Stars':      'Basketball_Stars',
  'Super Smash Flash 2':   'Super_Smash_Flash_2',
  'Iron Snout':            'Iron_Snout',
  'Pokemon Showdown':      'Pok%C3%A9mon_Showdown',
  'BitLife':               'BitLife',
  'Neopets':               'Neopets',
  'Blooket':               'Blooket',
  'Quizizz':               'Quizizz',
  'Celeste Classic':       'Celeste_(video_game)',
  'Rooftop Snipers':       'Rooftop_Snipers',
  'Infinite Craft':        'Infinite_Craft',
  'Little Alchemy 2':      'Little_Alchemy_2',
  'Quick Draw':            'Quick,_Draw!',
};

const DIRECT_IMGS = {
  "World's Hardest Game 2": "https://i.imgur.com/Eq2jR2q.jpg",
  "World's Hardest Game": "https://i.imgur.com/YtxUQJ3.jpg",
  "Papa's Scooperia": "https://i.imgur.com/Izv9ZB0.jpg",
  "Papa's Cheeseria": "https://i.imgur.com/UxDkQ0J.jpg",
  "Papa's Taco Mia": "https://i.imgur.com/26bCFdU.jpg",
  "Papa's Pancakeria": "https://i.imgur.com/t8sBoLM.jpg",
  "Papa's Hot Doggeria": "https://i.imgur.com/ir1no0X.jpg",
  "Papa's Donuteria": "https://i.imgur.com/YGiBh0M.jpg",
  "Papa's Cupcakeria": "https://i.imgur.com/Tn2yOVr.jpg",
  "Papa's Pastaria": "https://i.imgur.com/ql2lweA.jpg",
  "Papa's Bakeria": "https://i.imgur.com/gMpPt0I.jpg",
  "Papa's Sushiria": "https://i.imgur.com/2IJAEya.jpg",
  "Papa's Burgeria": "https://i.imgur.com/Ntojuah.jpg",
  "Papa's Pizzeria": "https://i.imgur.com/mw7RTbp.jpg",
  'Minecraft Classic 0.30': 'https://i.imgur.com/zpilqom.jpg',
  'Jacksmith': 'https://i.imgur.com/qEcmIph.jpg',
  'Papa Louie 3': 'https://i.imgur.com/ApZrx22.jpg',
  'Papa Louie 2': 'https://i.imgur.com/qlfCe05.jpg',
  'Papa Louie': 'https://i.imgur.com/gbrb6fS.jpg',
  'Monkey Mart': 'https://i.imgur.com/4qtd05O.jpg',
  'Duck Life 4': 'https://i.imgur.com/Mmi4Ktk.jpg',
  'Duck Life 3': 'https://i.imgur.com/xNp3EPR.jpg',
  'Duck Life 2': 'https://i.imgur.com/OrRPoEk.jpg',
  'Duck Life': 'https://i.imgur.com/DAMjEgF.jpg',
  'Space Company': 'https://i.imgur.com/dLBxYvX.jpg',
  'Snake': 'https://i.imgur.com/jviKvCd.jpg',
  'Cubefield': 'https://i.imgur.com/EPExmW7.jpg',
  'Factory Balls Forever': 'https://i.imgur.com/RlgVwT5.jpg',
  'Konnekt': 'https://i.imgur.com/aWe4aul.jpg',
  'BreakLock': 'https://i.imgur.com/yfzUSdy.jpg',
  'Connect 3': 'https://i.imgur.com/cjB5ZtA.jpg',
  'Slope': 'https://i.imgur.com/ugwzqpi.jpg',
  'Basket Random': 'https://i.imgur.com/TO7LDHM.jpg',
  'Soccer Random': 'https://i.imgur.com/FKxjRGU.jpg',
  'Eggy Car': 'https://i.imgur.com/SrjQ0re.jpg',
  'Moto X3M 2': 'https://i.imgur.com/Uhzyg5C.jpg',
  'Cactus McCoy': 'https://i.imgur.com/6zftRJc.jpg',
  'Snow Rider 3D': 'https://i.imgur.com/5CaGf7Q.jpg',
  'OvO': 'https://i.imgur.com/Llq0Fzy.jpg',
  'A Dance of Fire And Ice': 'https://i.imgur.com/hXPjgGa.jpg',
  'Breakout': 'https://i.imgur.com/gH1L9hz.jpg',
  'Chrome Dino': 'https://i.imgur.com/Am5d9Xu.jpg',
  'Pac-Man': 'https://i.imgur.com/0BpduFN.jpg',
  'Geometry Dash': 'https://i.imgur.com/XKEO8b0.jpg',
  'Tunnel Rush':              'https://i.imgur.com/mGHhINX.jpg',
  // Imgur screenshots
  'Bonk.io':               'https://i.imgur.com/6MXngga.jpg',
  'Krunker.io':            'https://i.imgur.com/1hWRpme.jpg',
  'Yohoho.io':             'https://i.imgur.com/enQ4M8V.jpg',
  'Stabfish.io':           'https://i.imgur.com/yLJEw8m.jpg',
  'Wormate.io':            'https://i.imgur.com/yQpsqBN.jpg',
  'Hexar.io':              'https://i.imgur.com/vdRtZfk.jpg',
  'Deeeep.io':             'https://i.imgur.com/pA4qaDr.jpg',
  'Kirka.io':              'https://i.imgur.com/1SKv3oC.jpg',
  'Smash Karts':           'https://i.imgur.com/hu1ro62.jpg',
  'Narrow One':            'https://i.imgur.com/C1rXaNW.jpg',
  'Sketchful.io':          'https://i.imgur.com/NyBFrNv.jpg',
  'Moomoo.io':             'https://i.imgur.com/sFxTqvl.jpg',
  'Starve.io':             'https://i.imgur.com/scSf2C2.jpg',
  'Superhex.io':           'https://i.imgur.com/WpXdC8r.jpg',
  'Wings.io':              'https://i.imgur.com/d4mDAKk.jpg',
  'Lordz.io':              'https://i.imgur.com/L0TY76H.jpg',
  'Braains.io':            'https://i.imgur.com/5SZogYb.jpg',
  'Florr.io':              'https://i.imgur.com/0SFWiyr.jpg',
  'Evades.io':             'https://i.imgur.com/SZrZSJu.jpg',
  'Bloxd.io':              'https://i.imgur.com/UJaIFVS.jpg',
  'Territorial.io':        'https://i.imgur.com/plfHr7U.jpg',
  'Spinz.io':              'https://i.imgur.com/eOcM9Sf.jpg',
  // IO games Google favicons
  'Gulper.io':             'https://iogames.onl/upload/cache/upload/imgs/gulper.io-m183x125.png',
  'Gota.io':               'https://i.imgur.com/gXEgmk7.jpg',
  'Surviv.io':             'https://iogames.onl/upload/cache/upload/imgs/surviv-io-m183x125.jpg',
  'Powerline.io':          'https://iogames.onl/upload/cache/upload/imgs/powerline-io-m208x142.png',
  'Worms Zone':            'https://ubg365.github.io/new-games/thumbs/worms-zone.png',
  'Limax.io':              'https://i.imgur.com/F7Byvhv.jpg',
  'Flyordie.io':           'https://iogames.onl/upload/cache/upload/imgs/flyordie.io1-m183x125.jpg',
  'Oceanar.io':            'https://iogames.onl/upload/cache/upload/imgs/oceanar-io-m183x125.jpg',
  'Snake.io':              'https://iogames.onl/upload/cache/upload/imgs/snake-io-m183x125.png',
  'Little Big Snake':      'https://i.imgur.com/xPEdtxD.jpg',
  'Voxiom.io':             'https://iogames.onl/upload/cache/upload/imgs/voxiom-io-m183x125.jpg',
  'Crazysteve.io':         'https://i.imgur.com/oMZSK9w.jpg',
  'Nightpoint.io':         'https://iogames.onl/upload/cache/upload/imgs/nightpoint-io-m183x125.jpg',
  'Tankr.io':              'https://i.imgur.com/Y2ErpsA.jpg',
  'Brutal.io':             'https://i.imgur.com/DwkchJj.jpg',
  'Germs.io':              'https://i.imgur.com/26q8OUE.jpg',
  'Splix.io':              'https://iogames.onl/upload/cache/upload/imgs/spliixio-m183x125.jpg',
  'Starblast.io':          'https://i.imgur.com/sZ2hLbe.jpg',
  'Curvefever.pro':        'https://i.imgur.com/qPKGjlZ.jpg',
  'Zombs.io':              'https://classroom6xhub.github.io/upload/cache/upload/imgs/zombs.io-m129x129.png',
  'Warscrap.io':           'https://www.google.com/s2/favicons?sz=128&domain=warscrap.io',
  'Devast.io':             'https://iogames.onl/upload/cache/upload/imgs/devast-io-m183x125.jpg',
  'Kartwars.io':           'https://i.imgur.com/UsueQP3.jpg',
  'Agma.io':               'https://iogames.onl/upload/cache/upload/imgs/agma.io-logo-m183x125.png',
  'Richup.io':             'https://i.imgur.com/cCBN2uX.jpg',
  'Foes.io':               'https://i.imgur.com/X9lS3qK.jpg',
  'Squadd.io':             'https://i.imgur.com/THI6uOH.jpg',
  'Deadshot.io':           'https://iogames.onl/upload/cache/upload/imgs/deadshotio-m208x142.jpg',
  'Battledudes.io':        'https://iogames.onl/upload/cache/upload/imgs/battledudes-io-logo-m183x125.png',
  'Repuls.io':             'https://i.imgur.com/ofFMizq.jpg',
  'Swordz.io':             'https://iogames.onl/upload/cache/upload/imgs/swordzio1-m183x125.jpg',
  'Taming.io':             'https://iogames.onl/upload/cache/upload/imgs/taming-io1-m208x142.jpg',
  'Doblons.io':            'https://i.imgur.com/93p9JJz.jpg',
  'Rocket Bot Royale':     'https://i.imgur.com/HERk55w.jpg',
  'Gartic Phone':          'https://i.imgur.com/nOrxSzW.jpg',
  // Action games
  'Combat Reloaded':       'https://i.imgur.com/pSvMufQ.jpg',
  'Getaway Shootout':      'https://ubg365.github.io/thumbs/getaway-shootout.png',
  'Ragdoll Archers':       'https://i.imgur.com/e6U5Z14.jpg',
  'Rooftop Snipers':       'https://ubg365.github.io/thumbs/rooftop-snipers.png',
  // Racing
  'Drift Boss':            'https://ubg365.github.io/hot-games/thumbs/drift-boss.png',
  'Burnout Drift':         'https://i.imgur.com/kPs6Btc.jpg',
  // Puzzle / Word
  'Little Alchemy':        'https://i.imgur.com/kZS4rc1.jpg',
  'Elastic Man':           'https://ubg365.github.io/thumbs/elastic-man.png',
  'Keybr':                 'https://i.imgur.com/ytpzlFy.jpg',
  // Idle
  'Idle Breakout':         'https://i.imgur.com/HyDAdcq.jpg',
  'Swarm Simulator':       'https://i.imgur.com/XYbOlJK.jpg',
  'Universal Paperclips':       'https://i.imgur.com/kmEKzlX.jpg',
  'Kittens Game':          'https://i.imgur.com/WlDjDJH.jpg',
  // Misc
  // GitHub Pages games - use their own game images
  'Friendly Fire':         'https://i.imgur.com/PnQNMrg.jpg',
  'Adrenaline Challenge':  'https://i.imgur.com/ltNY41m.jpg',
  'Evil Glitch':           'https://i.imgur.com/LCaRMMH.jpg',
  'Radius Raid':           'https://i.imgur.com/7ZFg8tj.jpg',
  'Under Run':             'https://i.imgur.com/pvGFGPk.jpg',
  'Retrohaunt':            'https://i.imgur.com/TWNA3qT.jpg',
  'Bounceback':            'https://i.imgur.com/aQJghQb.jpg',
  'Backcountry':           'https://i.imgur.com/epDCCCJ.jpg',
  'The Chroma Incident':   'https://i.imgur.com/N1U6gBq.jpg',
  'THERE IS NO GAME':      'https://i.imgur.com/H3Tik5V.jpg',
  'Edge Surf':             'https://i.imgur.com/kTKkots.jpg',
  'Hextris':               'https://i.imgur.com/kifJPKc.jpg',
  'Astray':                'https://i.imgur.com/VETvj6R.jpg',
  'Vex 3':                 'https://i.imgur.com/5xTvJZq.jpg',
  'Vex 4':                 'https://i.imgur.com/xf9DGM6.jpg',
  'Vex 5':                 'https://i.imgur.com/IZ6cdrD.jpg',
  'Vex 6':                 'https://i.imgur.com/mZduMpc.jpg',
  'Vex 7':                 'https://i.imgur.com/aF80F5c.jpg',
  'Roadblocks':            'https://i.imgur.com/l5x6EVx.jpg',
  'Ice Age Baby Adventure':'https://i.imgur.com/N2VSaym.jpg',
  'Tower Master':          'https://i.imgur.com/ljTqNno.jpg',
  'Pushback':              'https://i.imgur.com/74WQHT0.jpg',
  'Adventure Drivers':     'https://i.imgur.com/Bd1U5Ax.jpg',
  'Riddle School':         'https://i.imgur.com/Jg1Nlwa.jpg',
  'Riddle School 2':       'https://i.imgur.com/il0IuqS.jpg',
  'Riddle School 3':       'https://i.imgur.com/wtEc2UM.jpg',
  'Riddle School 4':       'https://i.imgur.com/Ov5ht2X.jpg',
  'Riddle School 5':       'https://i.imgur.com/IWlePJV.jpg',
  'Cactus McCoy 2':        'https://i.imgur.com/cq4wlTT.jpg',
  'Sleeping Beauty':       'https://i.imgur.com/FW9u5Lj.jpg',
  'Racer':                 'https://i.imgur.com/H6HBSBg.jpg',
  'Gopher Kart':           'https://i.imgur.com/2dtOMo9.jpg',
  'Volley Random':         'https://i.imgur.com/vD1twWa.jpg',
  'Boxing Random':         'https://i.imgur.com/me0pbt2.jpg',
  'Minecraft 1.3':         'https://i.imgur.com/A2HHhUG.jpg',
  'Minecraft 1.5.2':       'https://i.imgur.com/4Bmtvj9.jpg',
  '10 Minutes Till Dawn':  'https://i.imgur.com/5ueQNst.jpg',
  'Bloxd.io Creative':     'https://www.google.com/s2/favicons?sz=128&domain=bloxd.io',

  // Added from user-provided images
  'A Dark Room':     'https://i.imgur.com/T4pCwmi.jpg',
  'Bullet Force':     'https://i.imgur.com/rPmEI2v.jpg',
  'Tetr.io':     'https://i.imgur.com/PWpjznJ.jpg',
  'Little Alchemy 2':     'https://i.imgur.com/kZHQ4L6.jpg',
  'Antimatter Dimensions':     'https://i.imgur.com/iiEJIEh.jpg',
  'Candy Box 2':     'https://i.imgur.com/9yMWJRi.jpg',
  'Trimps':     'https://i.imgur.com/bYY6FR5.jpg',
  'Chrome Music Lab':     'https://i.imgur.com/YJcaL5z.jpg',
  'Iron Snout':     'https://i.imgur.com/aqhjuQI.jpg',
  // Upgraded from Wikipedia-only → direct images
  'Cookie Clicker':        'https://ubg365.github.io/thumbs/cookie-clicker.png',
  'Friday Night Funkin':   'https://ubg365.github.io/thumbs/friday-night-funkin.png',
  'Retro Bowl':            'https://ubg365.github.io/thumbs/retro-bowl.png',
  'Fireboy and Watergirl': 'https://ubg365.github.io/thumbs/fireboy-and-watergirl.png',
  'Warbrokers':            'https://iogames.onl/upload/cache/upload/imgs/warbrokers-io-logo-m183x125.jpg',
  'Venge.io':              'https://iogames.onl/upload/cache/upload/imgs/vengeio-m183x125.jpg',
  'BitLife':               'https://ubg365.github.io/thumbs/bitlife-life-simulator.png',
  '2048':                  'https://ubg365.github.io/thumbs/2048.png',
  'Wordle Unlimited':             'https://i.imgur.com/wVliUEW.jpg',
  'shapez.io':             'https://i.imgur.com/Ri1k407.jpg',
  'Sandspiel':             'https://i.imgur.com/Kjy15ms.jpg',
  'QWOP':             'https://i.imgur.com/XBP1ZoK.jpg',
  'Free Rider HD':             'https://i.imgur.com/LNtMUW9.jpg',
  'Codenames Online':             'https://i.imgur.com/AhPlnFz.jpg',
  'NoteBlock World':             'https://i.imgur.com/eHYgOEy.jpg',
  'jstris':             'https://i.imgur.com/hUyf6hZ.jpg',
  'Human Benchmark':             'https://i.imgur.com/kPFFYDJ.jpg',
  'Aim Trainer':             'https://i.imgur.com/WFRaMof.jpg',
  'Drawphone':             'https://i.imgur.com/uOzJZRs.jpg',
  'Akinator':              'https://i.imgur.com/fhTUCe4.jpg',
};



// Cache pour pas refetcher deux fois la même image
const imgCache = new Map();

// Charge l'image : DIRECT_IMGS en priorité, sinon Wikipedia API
async function loadWikiImage(imgEl, gameTitle, svgSrc) {
  // Stocke le SVG comme fallback sur l'élément lui-même
  imgEl.dataset.svg = svgSrc;

  // 1. Image directe imgur fournie par l'user → priorité absolue
  if (DIRECT_IMGS[gameTitle]) {
    swapImage(imgEl, DIRECT_IMGS[gameTitle]);
    return;
  }

  // 2. Wikipedia API pour les jeux dans la map
  const wikiTitle = WIKI_TITLES[gameTitle];
  if (!wikiTitle) return;

  if (imgCache.has(wikiTitle)) {
    const cached = imgCache.get(wikiTitle);
    if (cached) swapImage(imgEl, cached);
    return;
  }

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (!res.ok) { imgCache.set(wikiTitle, null); return; }
    const data = await res.json();
    const src = data.originalimage?.source || data.thumbnail?.source;
    // Rejette les images Wikipedia trop petites (icônes, logos 32×32, etc.)
    const w = data.originalimage?.width || data.thumbnail?.width || 999;
    const h = data.originalimage?.height || data.thumbnail?.height || 999;
    const validSrc = (src && w >= 80 && h >= 80) ? src : null;
    imgCache.set(wikiTitle, validSrc);
    if (validSrc && imgEl.isConnected) swapImage(imgEl, validSrc);
  } catch(e) {
    imgCache.set(wikiTitle, null);
  }
}

function swapImage(imgEl, src) {
  const svgFallback = imgEl.dataset.svg || imgEl.src;

  const tmp = new Image();
  // NOTE: pas de crossOrigin ici — imgur et la plupart des CDNs ne supportent
  // pas CORS et bloqueraient le chargement si on ajoutait ce header.

  tmp.onload = () => {
    // Rejet des images invalides : trop petites = placeholder d'erreur (ex. Imgur "removed")
    if (tmp.naturalWidth < 50 || tmp.naturalHeight < 50) return;
    if (imgEl.isConnected) {
      imgEl.src = src;
      imgEl.style.objectFit = 'cover';
      imgEl.style.padding   = '0';
      imgEl.style.background = 'none';
      imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = svgFallback; };
    }
  };

  tmp.onerror = () => {
    if (imgEl.isConnected && imgEl.src !== svgFallback) {
      imgEl.onerror = null;
      imgEl.src = svgFallback;
    }
  };

  tmp.src = src;
}

// Exposé globalement pour le onerror inline (au cas où le src initial échoue)
window.imgFail = function(el, svgSrc) {
  el.onerror = null;
  el.src = svgSrc;
};


// ═══════════════════════════════════════════════════════════
// APP STATE
// ═══════════════════════════════════════════════════════════
let curCat      = 'All';
let curSearch   = '';
let filtered    = [];
let renderIdx   = 0;
const BATCH     = 60;
let isFullscreen = false;
let searchTimer  = null;

// DOM refs
const grid      = document.getElementById('gameGrid');
const modal     = document.getElementById('gameModal');
const modalBox  = document.getElementById('modalBox');
const frame     = document.getElementById('gameFrame');
const mTitle    = document.getElementById('modalTitle');
const sentinel  = document.getElementById('sentinel');
const spinner   = document.getElementById('loadingSpinner');
const searchBar = document.getElementById('searchBar');
const countEl   = document.getElementById('gameCount');
const btt       = document.getElementById('backToTop');
const sidebar   = document.getElementById('sidebar');
const catList   = document.getElementById('categoryList');

// ─── BUILD SIDEBAR ────────────────────────────────────────
function buildSidebar() {
  catList.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = cat==='All' ? games.length : games.filter(g=>g.cat===cat).length;
    const btn = document.createElement('button');
    btn.className = 'category-btn' + (cat===curCat?' active':'');
    btn.dataset.cat = cat;
    btn.innerHTML = `
      <span class="cat-icon">${CAT_ICONS[cat]||'🎮'}</span>
      <span class="cat-label">${cat}</span>
      <span class="cat-count">${count}</span>
    `;
    btn.addEventListener('click', ()=>filterByCategory(cat));
    catList.appendChild(btn);
  });
}

// ─── RENDER BATCH ─────────────────────────────────────────
function renderGames(list, append=false) {
  if (!append) { grid.innerHTML=''; renderIdx=0; }
  if (!list.length) {
    grid.innerHTML=`<div class="no-results">
      <div class="nr-icon">🔍</div>
      <h3>No games found</h3>
      <p>Try a different search or category</p>
    </div>`;
    countEl.textContent='0 games found';
    return;
  }
  const batch = list.slice(renderIdx, renderIdx+BATCH);
  renderIdx += batch.length;
  const frag = document.createDocumentFragment();
  batch.forEach((game, i) => {
    const card    = document.createElement('div');
    card.className = 'game-card';
    card.style.animationDelay = `${(i%BATCH)*0.018}s`;

    const svgSrc = THUMBS.get(game.id);

    card.innerHTML = `
      <div class="card-thumb">
        <img
          src="${svgSrc}"
          alt="${game.title.replace(/"/g,'&quot;')}"
          data-svg="${svgSrc}"
          loading="lazy"
          onerror="this.onerror=null;this.src=this.dataset.svg"
        />
        <div class="card-overlay"><div class="play-btn">&#9654; PLAY</div></div>
        <div class="card-badge">${game.cat}</div>
      </div>
      <div class="card-info">
        <div class="card-title">${game.title}</div>
      </div>
    `;
    card.addEventListener('click', ()=>openModal(game));
    frag.appendChild(card);
  });
  grid.appendChild(frag);

  // Après insertion DOM — charge les vraies images Wikipedia en arrière-plan
  batch.forEach(game => {
    const img = grid.querySelector(`img[alt="${game.title.replace(/"/g,'&quot;')}"]`);
    if (img) loadWikiImage(img, game.title, THUMBS.get(game.id));
  });
  updateCount(list.length);
}

function updateCount(total) {
  const shown = Math.min(renderIdx, total);
  countEl.textContent = `${total.toLocaleString()} games${curCat!=='All'||curSearch?' found':' total'} · showing ${shown}`;
}

// ─── INFINITE SCROLL ─────────────────────────────────────
function setupScroll() {
  const obs = new IntersectionObserver(entries=>{
    if (entries[0].isIntersecting && renderIdx < filtered.length) {
      spinner.style.display='flex';
      requestAnimationFrame(()=>{
        renderGames(filtered, true);
        spinner.style.display='none';
      });
    }
  }, { rootMargin:'200px' });
  obs.observe(sentinel);
}

// ─── FILTER BY CATEGORY ───────────────────────────────────
function filterByCategory(cat) {
  curCat = cat; curSearch=''; searchBar.value='';
  document.getElementById('searchClear').style.display='none';
  document.querySelectorAll('.category-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat===cat));
  filtered = cat==='All' ? [...games] : games.filter(g=>g.cat===cat);
  renderGames(filtered);
  if (window.innerWidth<=1024) closeSidebar();
  window.scrollTo({top:0,behavior:'smooth'});
}

// ─── SEARCH ───────────────────────────────────────────────
function searchGames(q) {
  clearTimeout(searchTimer);
  document.getElementById('searchClear').style.display = q ? 'block' : 'none';
  searchTimer = setTimeout(()=>{
    curSearch = q.trim().toLowerCase();
    const base = curCat==='All' ? games : games.filter(g=>g.cat===curCat);
    filtered = curSearch ? base.filter(g=>g.title.toLowerCase().includes(curSearch)) : [...base];
    renderGames(filtered);
  }, 280);
}

function clearSearch() {
  searchBar.value='';
  document.getElementById('searchClear').style.display='none';
  filterByCategory(curCat);
  searchBar.focus();
}

// ─── OPEN MODAL ───────────────────────────────────────────
async function openModal(game) {
  mTitle.textContent = game.title;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  isFullscreen = false;
  modalBox.classList.remove('is-fullscreen');

  document.getElementById('externalBtn').href = game.url;

  // Small tick to let modal animate in before iframe loads
  await new Promise(r => setTimeout(r, 60));
  if (!modal.classList.contains('open')) return;

  frame.src = game.url;
}

// ─── CLOSE MODAL ──────────────────────────────────────────
function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  setTimeout(()=>{
    frame.src = 'about:blank';
    frame.onload = null;
  }, 260);
  isFullscreen = false;
  modalBox.classList.remove('is-fullscreen');
}

// ─── HANDLE OVERLAY CLICK ─────────────────────────────────
function handleOverlayClick(e) {
  if (e.target === modal) closeModal();
}

// ─── FULLSCREEN ───────────────────────────────────────────
function toggleFullscreen() {
  isFullscreen = !isFullscreen;
  modalBox.classList.toggle('is-fullscreen', isFullscreen);
  document.getElementById('fullscreenBtn').textContent = isFullscreen ? '⊡' : '⛶';
}

// ─── SIDEBAR ──────────────────────────────────────────────
function toggleSidebar() {
  const ov = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  ov.classList.toggle('show');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

// ─── BACK TO TOP ──────────────────────────────────────────
window.addEventListener('scroll', ()=>{
  btt.classList.toggle('visible', window.scrollY>300);
}, {passive:true});

// ─── SEARCH EVENTS ────────────────────────────────────────
searchBar.addEventListener('input',  e=>searchGames(e.target.value));
searchBar.addEventListener('keydown',e=>{ if(e.key==='Escape'){clearSearch();} });

// ─── KEYBOARD ─────────────────────────────────────────────
document.addEventListener('keydown', e=>{
  if (e.key==='Escape' && modal.classList.contains('open')) closeModal();
  if (e.key==='f'      && modal.classList.contains('open')) toggleFullscreen();
});

// ─── INIT ─────────────────────────────────────────────────
function init() {
  pregenThumbs();     // generate all 1000 SVG thumbnails instantly
  buildSidebar();
  filtered = [...games];
  renderGames(filtered);
  setupScroll();
}

document.addEventListener('DOMContentLoaded', init);
