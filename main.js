// Poke APIのエンドポイント
const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";

// ページを開いた直後のポケモン取得
const getAllPokemons = async () => {
  const res = await fetch(url);
  const pokemons = await res.json();

  sessionStorage.setItem("next", pokemons.next);
  sessionStorage.setItem("previous", pokemons.previous);

  const result = Object.values(pokemons.results);
  result.map(async (pokemon) => {
    const res = await fetch(pokemon.url);

    // ポケモンの詳細情報取得
    const pokemonDetail = await res.json();

    const dataContainer = document.getElementById("data-container");
    const dataContainerChild = document.getElementById("data-container-child");

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    dataContainer.appendChild(dataItem);

    const dataImg = document.createElement("img");
    const dataText = document.createElement("p");
    dataItem.appendChild(dataImg);
    dataImg.src = pokemonDetail.sprites.front_default;
    dataItem.appendChild(dataText);
    dataText.textContent = pokemonDetail.species.name;

    dataImg.classList.add("pokemon-img");
    dataText.classList.add("pokemon-name");
  });
};

getAllPokemons();

// ページネーションに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  const res = await fetch(url);
  const pokemons = await res.json();

  // 再描画する前にdata-containerの中身をすべて削除
  const dataContainer = document.getElementById("data-container");

  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }

  sessionStorage.setItem("next", pokemons.next);
  sessionStorage.setItem("previous", pokemons.previous);

  const result = Object.values(pokemons.results);
  result.map(async (pokemon) => {
    const res = await fetch(pokemon.url);

    // ポケモンの詳細情報取得
    const pokemonDetail = await res.json();

    const dataContainer = document.getElementById("data-container");

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    dataContainer.appendChild(dataItem);

    const dataImg = document.createElement("img");
    const dataText = document.createElement("p");
    dataItem.appendChild(dataImg);
    dataImg.src = pokemonDetail.sprites.front_default;
    dataItem.appendChild(dataText);
    dataText.textContent = pokemonDetail.species.name;

    dataImg.classList.add("pokemon-img");
    dataText.classList.add("pokemon-name");
  });
};
