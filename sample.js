const url = "https://pokeapi.co/api/v2/pokemon-species?limit=21";

const getPokemonSpecies = async (url) => {
  const res = await fetch(url, { cache: "force-cache" });
  const json = await res.json();

  results = json.results;

//   ポケモンの日本語の名前・フレーバーテキスト・種類を取得
  results.map(async (result) => {
    const res = await fetch(result.url, { cache: "force-cache" });
    const json = await res.json();

    const name = json.names.find((name) => name.language.name === "ja").name;
    const genera = json.genera.find(
      (genus) => genus.language.name === "ja"
    ).genus;
    const flavor_text = json.flavor_text_entries.find(
      (flavor_text_entry) => flavor_text_entry.language.name === "ja"
    ).flavor_text;

  });
};

getPokemonSpecies(url);
