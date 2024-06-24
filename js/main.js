// 1度に取得するポケモンの数、最終ページの取得開始位置を指定
const limit = 21;
const lastPageOffset = 1281;

// Poke APIのエンドポイント
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

// ページに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  const res = await fetch(url, { cache: "force-cache" });
  const json = await res.json();

  // dataContainerの中身を削除
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";

  // sessionから次のページ・前のページのURL, ポケモンの総数を取得
  sessionStorage.setItem("next", json.next);
  sessionStorage.setItem("previous", json.previous);
  sessionStorage.setItem("count", json.count);

  const pokemons = json.results;

  // ポケモンの詳細情報を並列で取得
  const pokemonDetailsPromises = pokemons.map(async (pokemon) => {
    const res = await fetch(pokemon.url, { cache: "force-cache" });
    return res.json();
  });

  const pokemonDetails = await Promise.all(pokemonDetailsPromises);

  const pokemonSpeciesPromises = pokemonDetails.map(async (pokemonDetail) => {
    const speciesUrl = pokemonDetail.species.url;
    const res = await fetch(speciesUrl, { cache: "force-cache" });
    return res.json();
  });

  const pokemonSpecies = await Promise.all(pokemonSpeciesPromises);

  pokemonDetails.forEach(async (pokemonDetail, index) => {
    // ポケモンの日本語名を取得
    const name = pokemonSpecies[index].names.find((name) => name.language.name === "ja").name;

    const pokemon = pokemons[index];
    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");
    dataItem.id = pokemon.url.split("/")[6];

    const dataImg = document.createElement("img");
    if (pokemonDetail.sprites.front_default === null) {
      dataImg.src = "public/substitute.png";
    } else {
      dataImg.src = pokemonDetail.sprites.front_default;
    }
    dataImg.classList.add("pokemon-img");

    const dataText = document.createElement("p");
    dataText.textContent = name;
    dataText.classList.add("pokemon-name");

    dataItem.appendChild(dataImg);
    dataItem.appendChild(dataText);

    dataContainer.appendChild(dataItem);

    dataItem.addEventListener("click", () => {
      sessionStorage.setItem("dataItemId", dataItem.id);
      location.href = "detail.html";
    });
  });

  const previous = document.getElementById("previous");
  const next = document.getElementById("next");

  if (sessionStorage.getItem("previous") === "null") {
    previous.disabled = true;
    previous.classList.add("disable-hover-style");
  } else {
    previous.disabled = false;
    previous.classList.remove("disable-hover-style");
  }

  if (sessionStorage.getItem("next") === "null") {
    next.disabled = true;
    next.classList.add("disable-hover-style");
  } else {
    next.disabled = false;
    next.classList.remove("disable-hover-style");
  }

  displayCurrentPage();
};

// 最初のページに飛ぶ
const getFirstPage = () => {
  getPokemonsByPage(url);
};

// 最後のページに飛ぶ
const getLastPage = () => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${lastPageOffset}&limit=${limit}`;
  getPokemonsByPage(url);
};

// 初期ページ表示
document.addEventListener("DOMContentLoaded", getPokemonsByPage(url));

// 現在のページ表示
const displayCurrentPage = () => {
  if (sessionStorage.getItem("previous") === "null") {
    currentPage = 1;
  } else if (sessionStorage.getItem("next") === "null") {
    currentPage = sessionStorage.getItem("count") / limit;
  } else {
    const next = sessionStorage.getItem("next");
    const nextObj = new URL(next);
    const nextParams = nextObj.searchParams;
    const nextOffset = nextParams.get("offset");

    currentPage = nextOffset / limit;
  }

  const target = document.getElementById("current-page");
  target.textContent = currentPage;
};
