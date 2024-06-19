// Poke APIのエンドポイント
const url = "https://pokeapi.co/api/v2/pokemon?limit=21";

// ページネーションに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  const res = await fetch(url, { cache: "force-cache" });
  const json = await res.json();

  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = ""; // 不要なDOM操作の削減

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

  pokemonDetails.forEach((pokemonDetail, index) => {
    const pokemon = pokemons[index];

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");
    dataItem.id = pokemon.url.split("/")[6];

    const dataImg = document.createElement("img");
    dataImg.src = pokemonDetail.sprites.front_default;
    dataImg.classList.add("pokemon-img");

    const dataText = document.createElement("p");
    dataText.textContent = pokemonDetail.species.name;
    dataText.classList.add("pokemon-name");

    dataItem.appendChild(dataImg);
    dataItem.appendChild(dataText);

    dataContainer.appendChild(dataItem);

    // クリックイベントを最適化
    dataItem.addEventListener("click", () => {
      sessionStorage.setItem("dataItemId", dataItem.id);
      location.href = "detail.html";
    });
  });

  // ページネーションの制御を最適化
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
};


// 初期ページ表示
getPokemonsByPage(url);
