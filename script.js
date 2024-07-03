document.getElementById('search-button').addEventListener('click', search);

document
  .getElementById('search-input')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      search();
    }
  });

document
  .getElementById('clear-button')
  .addEventListener('click', clearPokemonDetails);

function search() {
  const query = document
    .getElementById('search-input')
    .value.trim()
    .toLowerCase();
  const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Pokémon not found');
      }
      return res.json();
    })
    .then((data) => {
      clearPokemonDetails();
      createPokemonDetails();
      document.getElementById('pokemon-name').innerText =
        data.name.toUpperCase();
      document.getElementById('pokemon-id').innerText = `#${data.id}`;
      document.getElementById('weight').innerText = `  ${data.weight}`;
      document.getElementById('height').innerText = `  ${data.height}`;
      document.getElementById('hp').innerText = `  ${data.stats[0].base_stat}`;
      document.getElementById(
        'attack'
      ).innerText = `  ${data.stats[1].base_stat}`;
      document.getElementById(
        'defense'
      ).innerText = `  ${data.stats[2].base_stat}`;
      document.getElementById(
        'special-attack'
      ).innerText = `  ${data.stats[3].base_stat}`;
      document.getElementById(
        'special-defense'
      ).innerText = `  ${data.stats[4].base_stat}`;
      document.getElementById(
        'speed'
      ).innerText = `  ${data.stats[5].base_stat}`;

      const typesContainer = document.getElementById('types');
      data.types.forEach((typeInfo) => {
        const typeElement = document.createElement('div');
        typeElement.classList = `type ${typeInfo.type.name}`;
        typeElement.innerText = typeInfo.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
        document.getElementById(
          'screen'
        ).classList = `screen ${typeInfo.type.name}`;
        document.getElementById(
          'details-screen'
        ).classList = `details-screen ${typeInfo.type.name}`;
      });

      const sprite = document.getElementById('sprite');
      sprite.src = data.sprites.front_default;
      sprite.hidden = false;
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
      clearPokemonDetails();
    });

  document.getElementById('search-input').value = '';
}

function clearPokemonDetails() {
  document.getElementById('pokemon-name').innerText = '';
  document.getElementById('pokemon-id').innerText = '';
  document.getElementById('weight').innerText = '';
  document.getElementById('height').innerText = '';
  document.getElementById('hp').innerText = '';
  document.getElementById('attack').innerText = '';
  document.getElementById('defense').innerText = '';
  document.getElementById('special-attack').innerText = '';
  document.getElementById('special-defense').innerText = '';
  document.getElementById('speed').innerText = '';
  document.getElementById('types').innerHTML = '';
  document.getElementById('sprite').hidden = true;

  document.getElementById('weight-detail').innerText = '';
  document.getElementById('height-detail').innerText = '';
  document.getElementById('hp-detail').innerText = '';
  document.getElementById('attack-detail').innerText = '';
  document.getElementById('defense-detail').innerText = '';
  document.getElementById('special-attack-detail').innerText = '';
  document.getElementById('special-defense-detail').innerText = '';
  document.getElementById('speed-detail').innerText = '';
  document.getElementById('screen').classList = `screen`;
  document.getElementById('details-screen').classList = `details-screen`;
}

function createPokemonDetails() {
  document.getElementById('weight-detail').innerText = 'Weight: ';
  document.getElementById('height-detail').innerText = 'Height: ';
  document.getElementById('hp-detail').innerText = 'Hp: ';
  document.getElementById('attack-detail').innerText = 'Attack: ';
  document.getElementById('defense-detail').innerText = 'Defense:';
  document.getElementById('special-attack-detail').innerText = 'Sp. Attack: ';
  document.getElementById('special-defense-detail').innerText = 'Sp. Defense: ';
  document.getElementById('speed-detail').innerText = 'Speed: ';
}

const btnContainer = document.getElementById('btn-container');

const buttons = btnContainer.getElementsByTagName('button');

btnContainer.addEventListener('click', (event) => {
  const buttonId = event.target.id;
  let currentId = Number(
    document.getElementById('pokemon-id').innerText.replace('#', '')
  );
  const newSearch = document.getElementById('search-input');
  if (buttonId === 'down') {
    if (!currentId) {
      currentId = 0;
      newSearch.value = currentId += 1;
      search();
    } else {
      newSearch.value = currentId += 1;
      search();
    }
  } else if (buttonId === 'up') {
    if (!currentId) {
      currentId = 1026;
      newSearch.value = currentId -= 1;
      search();
    } else {
      newSearch.value = currentId -= 1;
      search();
    }
  } else if (buttonId === 'left') {
    if (!currentId) {
      currentId = 1035;
      newSearch.value = currentId -= 10;
      search();
    } else {
      newSearch.value = currentId -= 10;
      search();
    }
  } else if (buttonId === 'right') {
    if (!currentId) {
      currentId = -9;
      newSearch.value = currentId += 10;
      search();
    } else {
      newSearch.value = currentId += 10;
      search();
    }
  }
});
