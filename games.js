const games = [

  {
    title: "Subway Surfers",
    letter: "S",
    colors: ["#ff2e9a", "#8c5bff"],
    category: "runner",
    source: "Y8",
    url: "https://www.y8.com/games/subway_surfers"
  },

  {
    title: "Moto X3M",
    letter: "M",
    colors: ["#00e5ff", "#1b1440"],
    category: "action",
    source: "Y8",
    url: "https://www.y8.com/games/moto_x3m"
  },

  {
    title: "2048",
    letter: "2",
    colors: ["#ffc857", "#ff2e9a"],
    category: "puzzle",
    source: "Y8",
    url: "https://www.y8.com/games/2048"
  },

  {
    title: "Basketball Stars",
    letter: "B",
    colors: ["#8c5bff", "#00e5ff"],
    category: "sports",
    source: "Y8",
    url: "https://www.y8.com/games/basketball_stars"
  },

  {
    title: "Fireboy and Watergirl",
    letter: "F",
    colors: ["#ff2e9a", "#ffc857"],
    category: "puzzle",
    source: "Friv",
    url: "https://www.friv.com/z/games/fireboyandwatergirllight/game.html"
  },

  {
    title: "Moto X3M Pool Party",
    letter: "P",
    colors: ["#00e5ff", "#8c5bff"],
    category: "runner",
    source: "Y8",
    url: "https://www.y8.com/games/moto_x3m_pool_party"
  },

  {
    title: "Stickman Hook",
    letter: "H",
    colors: ["#ffc857", "#8c5bff"],
    category: "action",
    source: "Y8",
    url: "https://www.y8.com/games/stickman_hook"
  },

  {
    title: "Soccer Skills",
    letter: "⚽",
    colors: ["#00e5ff", "#ff2e9a"],
    category: "sports",
    source: "Y8",
    url: "https://www.y8.com/games/soccer_skills_2021"
  },

  {
    title: "Puzzle Escape",
    letter: "P",
    colors: ["#8c5bff", "#ffc857"],
    category: "puzzle",
    source: "Y8",
    url: "https://www.y8.com/games/arrows_-_puzzle_escape"
  },

  {
    title: "Traffic Jam 3D",
    letter: "T",
    colors: ["#ff2e9a", "#00e5ff"],
    category: "puzzle",
    source: "Y8",
    url: "https://www.y8.com/games/traffic_jam_3d"
  },

  {
    title: "Rooftop Snipers",
    letter: "R",
    colors: ["#ffc857", "#ff2e9a"],
    category: "action",
    source: "Y8",
    url: "https://www.y8.com/games/rooftop_snipers"
  },

  {
    title: "Tunnel Rush",
    letter: "⚡",
    colors: ["#8c5bff", "#00e5ff"],
    category: "runner",
    source: "Y8",
    url: "https://www.y8.com/games/tunnel_rush"
  }

];


const grid =
  document.getElementById("grid");

const emptyState =
  document.getElementById("emptyState");

const searchInput =
  document.getElementById("search");

const chips =
  document.querySelectorAll(
    "#gamingPanel .chip"
  );


let activeFilter = "all";
let query = "";


/* ================= RENDER ================= */

function renderGames() {

  const filtered =
    games.filter(game => {

      const filterMatch =
        activeFilter === "all" ||
        game.category === activeFilter;


      const searchMatch =
        game.title
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );


      return filterMatch &&
             searchMatch;

    });


  grid.innerHTML = "";


  emptyState.classList.toggle(
    "show",
    filtered.length === 0
  );


  filtered.forEach(game => {

    const card =
      document.createElement("a");


    card.className =
      "cabinet";


    card.href =
      game.url;


    card.target =
      "_blank";


    card.rel =
      "noopener noreferrer";


    card.innerHTML = `

      <div
        class="screen"
        style="
          --bg-color-1:${game.colors[0]};
          --bg-color-2:${game.colors[1]};
        "
      >

        <span class="glow-badge">
          ${game.source}
        </span>

        <span>
          ${game.letter}
        </span>

      </div>


      <div class="cab-info">

        <p class="cab-title">
          ${game.title}
        </p>

        <div class="cab-meta">

          <span class="src">
            ${game.category.toUpperCase()}
          </span>

          <span class="play-hint">
            PLAY →
          </span>

        </div>

      </div>

    `;


    grid.appendChild(card);

  });

}


/* ================= FILTER ================= */

chips.forEach(chip => {

  chip.addEventListener(
    "click",
    () => {

      chips.forEach(c =>
        c.classList.remove("active")
      );

      chip.classList.add("active");


      activeFilter =
        chip.dataset.filter;


      renderGames();

    }
  );

});


/* ================= SEARCH ================= */

searchInput.addEventListener(
  "input",
  event => {

    query =
      event.target.value;

    renderGames();

  }
);


renderGames();
