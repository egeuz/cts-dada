const canvas = document.getElementById("canvas");
const PIXABAY_API_KEY = "16039785-9343e80ccc5b33cee31650748"

setInterval(generateCanvas, 1000);

async function generateCanvas() {
  /*** generate some random words ***/
  const url = 'https://random-word-api.herokuapp.com/word?number=5&swear=0';
  const response = await fetch(url);
  const words = await response.json();

  /*** make image searches with each word ***/
  words.forEach(async word => {
    /*** search each word on pixabay ***/
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${word}&safesearch=true`;
    const response = await fetch(url);
    const result = await response.json();

    /*** if the result is successful, pick a random image from the results ***/
    if(result.totalHits !== 0) {
      const imageData = result.hits[rng(0, result.hits.length)];

      /*** create some html attributes and css property values from the data ***/
      const src = imageData.previewURL;
      const width = imageData.previewWidth * 1.5;
      const height = imageData.previewHeight * 1.5;
      const left = rng(0, window.innerWidth - width);
      const top = rng(0, window.innerHeight - height);
      const rotate=rng(0, 359);

      /*** create the image element and place it into the canvas ***/
      const style = `position:absolute; left:${left}px; top:${top}px; transform:rotate(${rotate}deg)`;
      const image = `<img src="${src}" style="${style}" width=${width} height=${height}>`;
      canvas.innerHTML += image;
    }
  });
}

/*** HELPER METHODS ***/
const rng = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);