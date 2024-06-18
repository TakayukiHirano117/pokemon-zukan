// Poke APIのエンドポイント
const url = "https://pokeapi.co/api/v2/pokemon?limit=21";
// https://pokeapi.co/api/v2/pokemon-species/9/

// ページネーションに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  // 非同期処理を用いてPoke APIからポケモン情報を取得
  const res = await fetch(url);
  const json = await res.json();

  console.log(json);

  // dataContainer配下の要素があれば削除
  const dataContainer = document.getElementById("data-container");
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }

  // セッションに次のページと前のページのURIを保存
  sessionStorage.setItem("next", json.next);
  sessionStorage.setItem("previous", json.previous);
  sessionStorage.setItem("count", json.count);

  // 1ページ目では前のページに行けないように設定
  if (sessionStorage.getItem("previous") === "null") {
    const previous = document.getElementById("previous");
    previous.disabled = true;
    previous.classList.add("disable-hover-style");
  } else {
    const previous = document.getElementById("previous");
    previous.disabled = false;
    previous.classList.remove("disable-hover-style");
  }

  // 最後のページではそれ以上後ろのページに行けないように設定
  if (sessionStorage.getItem("next") == "null") {
    const next = document.getElementById("next");
    next.disabled = true;
    next.classList.add("disable-hover-style");
  } else {
    const next = document.getElementById("next");
    next.disabled = false;
    next.classList.remove("disable-hover-style");
  }

  const pokemons = json.results;

  for (const pokemon of pokemons) {
    const res = await fetch(pokemon.url);
    const pokemonDetail = await res.json();

    console.log(pokemonDetail);

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");
    dataItem.id = pokemon.url.split("/")[6];

    // const dataAnker = document.createElement("a");

    const dataImg = document.createElement("img");
    dataImg.src = pokemonDetail.sprites.front_default;
    dataImg.classList.add("pokemon-img");

    const dataText = document.createElement("p");
    dataText.textContent = pokemonDetail.species.name;
    dataText.classList.add("pokemon-name");

    dataItem.appendChild(dataImg);
    dataItem.appendChild(dataText);

    dataContainer.appendChild(dataItem);

    dataItem.addEventListener("click", (e) => {
      const clickedElementId = e.target.id;
      sessionStorage.setItem("dataItemId", clickedElementId);

      location.href = "detail.html";
    });
  }
};

// 初期ページ表示
getPokemonsByPage(url);

const transitionDetailPage = () => {
  location.href = "detail.html";
};
