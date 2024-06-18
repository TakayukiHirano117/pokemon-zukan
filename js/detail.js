const url = "https://pokeapi.co/api/v2/pokemon";

// ポケモン詳細
const getSinglePokemon = async () => {
  // const targetDataItem = document.getElementById();
  // imgのsrc属性から.pngの前の数字を取得
  // `https://pokeapi.co/api/v2/pokemon/${.pngの前の数字}`みたいなurlでfetch
  // const res = await fetch(`url${}`);
  // const json = await res.json();

  // location.href =
  // data-itemをaタグで囲む

  const dataItemId = sessionStorage.getItem("dataItemId");
  const detailUrl = url + "/" + dataItemId;

  const res = await fetch(detailUrl);
  const pokemon = await res.json();

  console.log(pokemon.types);

  const dataContainer = document.getElementById("data-container");

  const dataItem = document.createElement("div");
  dataItem.classList.add("data-item");

  const dataImg = document.createElement("img");
  dataImg.src = pokemon.sprites.front_default;
  dataImg.classList.add("pokemon-img");

  const dataText = document.createElement("p");
  dataText.textContent = pokemon.species.name;
  dataText.classList.add("pokemon-name");

  const heightText = document.createElement("p");
  const height = pokemon.height;
  heightText.textContent = "Height: " + height;

  const weightText = document.createElement("p");
  const weight = pokemon.weight;
  weightText.textContent = "Weight: " + weight;
  //   const typesText = document.createElement('span');
  //   const types = pokemon.types;

  dataItem.appendChild(dataImg);
  dataItem.appendChild(dataText);
  dataItem.appendChild(heightText);
  dataItem.appendChild(weightText);

  dataContainer.appendChild(dataItem);

  // types
};

getSinglePokemon();
