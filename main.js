// offset先に渡す
const url = "https://pokeapi.co/api/v2/pokemon?offset=21&limit=21";
// const url = "https://pokeapi.co/api/v2/pokemon?offset=21&limit=1302";

const getAllPokemons = async (limit) => {
  const res = await fetch(`${url}?limit=${limit}`);
  const pokemons = await res.json();
  console.log(pokemons.results);
  return pokemons;
};

const func = async () => {
  const res = await fetch(url);
  const pokemons = await res.json();

  // sessionに前後のページのURIを保存。ページ遷移した後は、すでにあるやつは削除して再保存すること。
  // なんか削除しなくてよさそう
  sessionStorage.setItem("next", pokemons.next);
  sessionStorage.setItem("previous", pokemons.previous);
  sessionStorage.setItem("previous", pokemons.previous);
  // sessionStorage.removeItem('name');

  // 次のページの情報。前のページの情報はpreviousプロパティにわたってくる。
  console.log(pokemons);
  console.log(pokemons.next);

  const result = Object.values(pokemons.results);
  result.map(async (pokemon) => {
    const res = await fetch(pokemon.url);

    // ポケモンの詳細情報取得
    const pokemonDetail = await res.json();
    // ポケモンの名前取得
    // console.log(pokemonDetail.species.name);
    // ポケモンの正面の画像を取得
    // console.log(pokemonDetail.sprites.front_default);
    const dataContainer = document.getElementById("data-container");
    const dataContainerChild = document.getElementById('data-container-child');
    // data-itemクラスをもつdivタグを作成、☑
    // その中にappendChildでimgタグとpタグを作成し、画像と名前を入れる。
    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    dataContainerChild.appendChild(dataItem);

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

func();

const getPokemons = async (url) => {
  const res = await fetch(url);
  const pokemons = await res.json();

  // 再描画する前にdata-containerの中身をすべて削除
  const dataContainer = document.getElementById("data-container");
  const dataContainerChild = document.getElementById('data-container-child');
  dataContainer.removeChild(dataContainerChild);

  console.log(url);
};
