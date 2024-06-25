const url = "https://pokeapi.co/api/v2/pokemon";

// ポケモン詳細
const getSinglePokemon = async () => {
  // 各ポケモンごとのURLエンドポイントを生成
  const dataItemId = sessionStorage.getItem("dataItemId");
  const detailUrl = url + "/" + dataItemId;

  const res = await fetch(detailUrl, { cache: "force-cache" });
  const pokemon = await res.json();

  const pokemonTypes = await getPokemonTypes(pokemon)
  // console.log(pokemonTypes)

  const typesText = document.createElement('p');
  pokemonTypesText = pokemonTypes.join(' ')
  typesText.textContent = "タイプ： " + pokemonTypesText


  const speciesUrl = pokemon.species.url;
  const speciesRes = await fetch(speciesUrl, { cache: "force-cache" });
  const species = await speciesRes.json();

  const flavorTextEntryJa = species.flavor_text_entries.find(
    (flavor_text_entry) => flavor_text_entry.language.name === "ja"
  );

  let flavor_text;
  if (flavorTextEntryJa) {
    // 日本語のflavor_text_entryがある場合
    flavor_text = flavorTextEntryJa.flavor_text;
  } else {
    // 日本語のflavor_text_entryがない場合
    flavor_text = "日本語のフレーバーテキストが見つかりません。";
  }

  // ポケモンの日本語名取得
  const name = species.names.find((name) => name.language.name === "ja").name;

  // 日本語の種族名取得
  const genera = species.genera.find(
    (genus) => genus.language.name === "ja-Hrkt"
  ).genus;

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

  const physique = document.createElement('div');

  const heightText = document.createElement("span");
  const height = pokemon.height;
  heightText.textContent = "高さ: " + height / 10 + "m ";

  const weightText = document.createElement("span");
  const weight = pokemon.weight;
  weightText.textContent = "重さ: " + weight / 10 + "kg";

  physique.appendChild(heightText)
  physique.appendChild(weightText)

  dataItem.appendChild(dataImg);
  dataItem.appendChild(nameText);
  dataItem.appendChild(generaText);
  dataItem.appendChild(flavorText);
  dataItem.appendChild(physique);
  dataItem.appendChild(typesText)
  dataContainer.appendChild(dataItem);
};

getSinglePokemon();

const getPokemonParams = () => {

}

const appendElements = () => {

}

const getPokemonTypes = async (pokemon) => {
  const types = pokemon.types;
  const jaTypes = [];

  // 各タイプの情報を非同期で取得
  const promises = types.map(async (type) => {
    const res = await fetch(type.type.url, { cache: "force-cache" });
    const json = await res.json();
    const jaType = json.names.find((name) => name.language.name === "ja-Hrkt");
    if (jaType) {
      jaTypes.push(jaType.name);
    }
  });

  // すべての非同期処理が完了するのを待つ
  await Promise.all(promises);

  return jaTypes;
};