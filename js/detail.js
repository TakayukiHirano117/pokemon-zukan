const url = "https://pokeapi.co/api/v2/pokemon";

// ポケモン詳細
const getSinglePokemon = async () => {
  const dataItemId = sessionStorage.getItem("dataItemId");
  const detailUrl = url + "/" + dataItemId;

  const res = await fetch(detailUrl, { cache: "force-cache" });
  const pokemon = await res.json();
  
  try {
    const speciesUrl = pokemon.species.url;
    const speciesRes = await fetch(speciesUrl, { cache: "force-cache" });
    const species = await speciesRes.json();

    const name = species.names.find((name) => name.language.name === "ja").name;
    const genera = species.genera.find(
      (genus) => genus.language.name === "ja"
    ).genus;

    const flavor_text = species.flavor_text_entries.find(
      (flavor_text_entry) => flavor_text_entry.language.name === "ja"
    ).flavor_text;

    const dataContainer = document.getElementById("data-container");

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    const dataImg = document.createElement("img");
    dataImg.src = pokemon.sprites.front_default;
    dataImg.classList.add("pokemon-img");

    const nameText = document.createElement("p");
    nameText.textContent = name;
    nameText.classList.add("pokemon-name");

    const generaText = document.createElement("p");
    generaText.textContent = genera;
    generaText.classList.add("genera-text");

    const flavorText = document.createElement("p");
    flavorText.innerHTML = flavor_text.replace(/\n/g, "<br>");
    flavorText.classList.add("flavor-text");

    const heightText = document.createElement("span");
    const height = pokemon.height;
    heightText.textContent = "高さ: " + height / 10 + "m ";

    const weightText = document.createElement("span");
    const weight = pokemon.weight;
    weightText.textContent = "重さ: " + weight / 10 + "kg";

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
    dataItem.appendChild(nameText);
    dataItem.appendChild(generaText);
    dataItem.appendChild(flavorText);
    dataItem.appendChild(heightText);
    dataItem.appendChild(weightText);
    dataItem.appendChild(typesText);
    dataContainer.appendChild(dataItem);
  } catch (error) {
    console.log(error);
  }
};

getSinglePokemon();
