const APIKEY = `pk.eyJ1Ijoia29sc2tpZG1hbiIsImEiOiJjbG9sY3c1bjQyaDNtMmttZXdrNnAxZjAwIn0.f4R1XZVWs3r625gg-7GhHA`;

const BASEURL = `https://api.mapbox.com/search/searchbox/v1/suggest`;
export async function getSuggestions(input) {
  let sugs = [];
  try {
    const result = await fetch(
      `${BASEURL}?access_token=${APIKEY}&session_token=345666&q=${input}&country=us&types=address`
    );
    const { suggestions } = await result.json();
    sugs = suggestions.map((sug) => {
      const {
        address: { address_number: num, street_name: name },
        place: { name: city },
        postcode: { name: zipCode },
        region: { name: state, region_code: stateCode },
      } = sug.context;
      return {
        num,
        name,
        city,
        state,
        zipCode,
        stateCode,
      };
    });
  } catch (err) {
    console.log(err);
  }

  return sugs;
}
