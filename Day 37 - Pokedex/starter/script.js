const poke_container = document.getElementById('poke-container');
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const main_types = Object.keys(colors);
let pokeID = 1;

const fetchPokemons = async (entries) => {
  let [entry] = entries;

  if (entry.isIntersecting) {
    let pokemonPromises = [];
    for (let i = 0; i < 18; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
      pokemonPromises.push(fetch(url).then((res) => res.json()));
      pokeID++;
    }
    const data = await Promise.all(pokemonPromises);
    for (let j = 0; j < data.length; j++) {
      createPokemonCard(data[j]);
    }
  }
};

const pokeDetective = document.getElementById('poke-detective');
const detectiveOption = {
  root: null,
  threshold: [0],
  marginRoot: '0px',
};
let pokeObserver = new IntersectionObserver(fetchPokemons, detectiveOption);
pokeObserver.observe(pokeDetective);
const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};
