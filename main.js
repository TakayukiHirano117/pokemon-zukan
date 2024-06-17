// Poke APIのエンドポイント
const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";

// ページネーションに応じたポケモン取得
const getPokemonsByPage = async (url) => {
  // 非同期処理を用いてPoke APIからポケモン情報を取得
  const res = await fetch(url);
  const json = await res.json();

  // dataContainer配下の要素があれば削除
  const dataContainer = document.getElementById("data-container");
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }

  // セッションに次のページと前のページのURIを保存
  sessionStorage.setItem("next", json.next);
  sessionStorage.setItem("previous", json.previous);

  const pokemons = json.results;

  console.log(pokemons)
  
  for (const pokemon of pokemons) {
    const res = await fetch(pokemon.url);
    const pokemonDetail = await res.json();

    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    const dataImg = document.createElement("img");
    dataImg.src = pokemonDetail.sprites.front_default;
    dataImg.classList.add("pokemon-img");

    const dataText = document.createElement("p");
    dataText.textContent = pokemonDetail.species.name;
    dataText.classList.add("pokemon-name");

    dataItem.appendChild(dataImg);
    dataItem.appendChild(dataText);

    dataContainer.appendChild(dataItem);
  }
};


// 初期ページ表示
getPokemonsByPage(url);

// ポケモン詳細
const getSinglePokemon = () => {
  // imgのsrc属性から.pngの前の数字を取得
  // `https://pokeapi.co/api/v2/pokemon/${.pngの前の数字}`みたいなurlでfetch
  // data-itemクラスの要素を取得、idを付与しておく、一意の画像を取得できるように。
  
}