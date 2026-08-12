const songDecades = {

  "1950s": [
    ["Johnny B. Goode", "Chuck Berry"],
    ["Jailhouse Rock", "Elvis Presley"],
    ["Rock Around the Clock", "Bill Haley & His Comets"],
    ["Tutti Frutti", "Little Richard"],
    ["Whole Lotta Shakin' Going On", "Jerry Lee Lewis"],
    ["What'd I Say", "Ray Charles"],
    ["Summertime Blues", "Eddie Cochran"],
    ["Hound Dog", "Elvis Presley"],
    ["Long Tall Sally", "Little Richard"],
    ["That'll Be the Day", "Buddy Holly & the Crickets"]
  ],

  "1960s": [
    ["Like a Rolling Stone", "Bob Dylan"],
    ["A Day in the Life", "The Beatles"],
    ["(I Can't Get No) Satisfaction", "The Rolling Stones"],
    ["Gimme Shelter", "The Rolling Stones"],
    ["My Generation", "The Who"],
    ["Light My Fire", "The Doors"],
    ["Hey Jude", "The Beatles"],
    ["Whole Lotta Love", "Led Zeppelin"],
    ["All Along the Watchtower", "Jimi Hendrix"],
    ["God Only Knows", "The Beach Boys"]
  ],

  "1970s": [
    ["Bohemian Rhapsody", "Queen"],
    ["Stairway to Heaven", "Led Zeppelin"],
    ["Imagine", "John Lennon"],
    ["Hotel California", "Eagles"],
    ["Stayin' Alive", "Bee Gees"],
    ["Dancing Queen", "ABBA"],
    ["Let It Be", "The Beatles"],
    ["Born to Run", "Bruce Springsteen"],
    ["I Will Survive", "Gloria Gaynor"],
    ["Superstition", "Stevie Wonder"]
  ],

  "1980s": [
    ["Billie Jean", "Michael Jackson"],
    ["Thriller", "Michael Jackson"],
    ["Sweet Child O' Mine", "Guns N' Roses"],
    ["Every Breath You Take", "The Police"],
    ["Like a Virgin", "Madonna"],
    ["Sweet Dreams", "Eurythmics"],
    ["Take On Me", "a-ha"],
    ["Livin' on a Prayer", "Bon Jovi"],
    ["Purple Rain", "Prince"],
    ["Don't Stop Believin'", "Journey"]
  ],

  "1990s": [
    ["Smells Like Teen Spirit", "Nirvana"],
    ["Wonderwall", "Oasis"],
    ["Losing My Religion", "R.E.M."],
    ["Nothing Compares 2 U", "Sinéad O'Connor"],
    ["...Baby One More Time", "Britney Spears"],
    ["No Scrubs", "TLC"],
    ["Waterfalls", "TLC"],
    ["I Want It That Way", "Backstreet Boys"],
    ["Return of the Mack", "Mark Morrison"],
    ["Enter Sandman", "Metallica"]
  ],

  "2000s": [
    ["Crazy in Love", "Beyoncé ft. Jay-Z"],
    ["Hey Ya!", "OutKast"],
    ["In the End", "Linkin Park"],
    ["Since U Been Gone", "Kelly Clarkson"],
    ["Mr. Brightside", "The Killers"],
    ["Umbrella", "Rihanna ft. Jay-Z"],
    ["Poker Face", "Lady Gaga"],
    ["Yeah!", "Usher ft. Lil Jon & Ludacris"],
    ["Seven Nation Army", "The White Stripes"],
    ["Toxic", "Britney Spears"]
  ],

  "2010s": [
    ["Rolling in the Deep", "Adele"],
    ["Somebody That I Used to Know", "Gotye ft. Kimbra"],
    ["Get Lucky", "Daft Punk ft. Pharrell Williams"],
    ["Uptown Funk", "Mark Ronson ft. Bruno Mars"],
    ["Thinking Out Loud", "Ed Sheeran"],
    ["Shape of You", "Ed Sheeran"],
    ["Despacito", "Luis Fonsi ft. Daddy Yankee"],
    ["Old Town Road", "Lil Nas X"],
    ["Bad Guy", "Billie Eilish"],
    ["Blinding Lights", "The Weeknd"]
  ],

  "2020s": [
    ["Blinding Lights", "The Weeknd"],
    ["Drivers License", "Olivia Rodrigo"],
    ["Levitating", "Dua Lipa"],
    ["Good 4 U", "Olivia Rodrigo"],
    ["As It Was", "Harry Styles"],
    ["Anti-Hero", "Taylor Swift"],
    ["Flowers", "Miley Cyrus"],
    ["Cruel Summer", "Taylor Swift"],
    ["Espresso", "Sabrina Carpenter"],
    ["Die With A Smile", "Lady Gaga & Bruno Mars"]
  ]

};


const decadeTabs =
  document.getElementById(
    "decadeTabs"
  );

const songList =
  document.getElementById(
    "songList"
  );


const decades =
  Object.keys(songDecades);


let activeDecade =
  decades[0];


/* ================= TABS ================= */

function renderDecadeTabs() {

  decadeTabs.innerHTML = "";


  decades.forEach(decade => {

    const button =
      document.createElement("button");


    button.className =
      "chip" +
      (
        decade === activeDecade
          ? " active"
          : ""
      );


    button.textContent =
      decade;


    button.addEventListener(
      "click",
      () => {

        activeDecade =
          decade;

        renderDecadeTabs();

        renderSongs();

      }
    );


    decadeTabs.appendChild(
      button
    );

  });

}


/* ================= SONGS ================= */

function renderSongs() {

  const songs =
    songDecades[
      activeDecade
    ];


  songList.innerHTML =
    songs.map(
      (song, index) => `

        <div class="song-row">

          <div class="song-rank">
            ${index + 1}
          </div>

          <div class="song-info">

            <p class="song-title">
              ${song[0]}
            </p>

            <p class="song-artist">
              ${song[1]}
            </p>

          </div>

        </div>

      `
    ).join("");

}


renderDecadeTabs();
renderSongs();
