const url = "https://pokeapi.co/api/v2/pokemon";
// const url = "https://pokeapi.co/api/v2/pokemon/1";
// const limit = 50;
// 画像とかはid指定しないと取れない

//offsetはデータ取得の開始位置、limitは取得する数

const getAllPokemons = async (limit) => {
  const res = await fetch(`${url}?limit=${limit}`);
  const pokemons = await res.json();
  console.log(pokemons.results);
  // console.log(pokemons);
  // console.log(pokemons.sprites.front_default);
  return pokemons;
};

// getAllPokemons(100);

const func = async () => {
  const res = await fetch(`${url}`);
  const pokemons = await res.json();

  const result = Object.values(pokemons.results);
  // console.log(result);
  result.map(async (pokemon) => {
    // console.log(pokemon.url)
    // console.log(pokemon);

    const res = await fetch(pokemon.url);

    // ポケモンの詳細情報取得
    const pokemonDetail = await res.json();
    // ポケモンの名前取得
    console.log(pokemonDetail.species.name);
    // ポケモンの正面の画像を取得
    console.log(pokemonDetail.sprites.front_default);
    const dataContainer = document.getElementById("data-container");

    // data-itemクラスをもつdivタグを作成、☑
    // その中にappendChildでimgタグとpタグを作成し、画像と名前を入れる。
    const dataItem =  document.createElement('div');
    dataItem.classList.add('data-item');


  });
};

func();
