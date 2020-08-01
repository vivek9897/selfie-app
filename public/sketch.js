function setup() {
  

// for search


  noCanvas();
  const video = createCapture(VIDEO);
  video.size(300, 200);
  // let lat, lon;
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('name').value;
    const itemid = document.getElementById('itemid').value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    const data = { mood, image64, itemid };
    alert('image is capture . now click explore now ')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });

}



