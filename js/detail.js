const url = "https://pokeapi.co/api/v2/pokemon";

// ポケモン詳細
const getSinglePokemon = async () => {
  const dataItemId = sessionStorage.getItem("dataItemId");
  const detailUrl = url + "/" + dataItemId;

  const res = await fetch(detailUrl, { cache: "force-cache" });
  const pokemon = await res.json();

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

  const typesText = document.createElement("div");
  const types = pokemon.types;
  typesText.textContent = "types: ";
  typesText.classList.add("types-text");

  for (type of types) {
    let typeText = document.createElement("span");
    typeText.textContent = type.type.name + " ";
    typesText.appendChild(typeText);
  }

  dataItem.appendChild(dataImg);
  dataItem.appendChild(dataText);
  dataItem.appendChild(heightText);
  dataItem.appendChild(weightText);
  dataItem.appendChild(typesText);
  dataContainer.appendChild(dataItem);
};

getSinglePokemon();
