const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const ResponsiAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (ResponsiAPI.status == 200) {
        const data = await ResponsiAPI.json();
        return data;
    }


}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {    
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not found :/';
        pokemonNumber.innerHTML = '';
    }
}



form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})



renderPokemon(searchPokemon);

