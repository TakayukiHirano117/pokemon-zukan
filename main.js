// Poke APIのエンドポイント
const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";

// ページネーションに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  const res = await fetch(url);
  const pokemons = await res.json();

  // 再描画する前にdata-containerの中身をすべて削除
  const dataContainer = document.getElementById("data-container");
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }

  // セッションに次のページと前のページのURIを保存
  sessionStorage.setItem("next", pokemons.next);
  sessionStorage.setItem("previous", pokemons.previous);

  const result = Object.values(pokemons.results);

  result.map(async (pokemon) => {
    const res = await fetch(pokemon.url);

    // ポケモンの詳細情報取得
    const pokemonDetail = await res.json();

    // ポケモン情報を挿入するdiv要素を取得
    const dataContainer = document.getElementById("data-container");

    // 1件のポケモン情報を挿入するdiv要素を取得
    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");
    dataContainer.appendChild(dataItem);

    // ポケモンの画像を取得し、imgタグに挿入
    const dataImg = document.createElement("img");
    dataImg.src = pokemonDetail.sprites.front_default;
    dataImg.classList.add("pokemon-img");

    // ポケモンの名前を取得し、pタグに挿入
    const dataText = document.createElement("p");
    dataText.textContent = pokemonDetail.species.name;
    dataText.classList.add("pokemon-name");
    
    // dataItemタグにポケモン画像と名前を挿入
    dataItem.appendChild(dataImg);
    dataItem.appendChild(dataText);
  });
};

// 初期ページ表示
getPokemonsByPage(url);
