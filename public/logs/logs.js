getData();

const selfies = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time);
});

document.getElementById('mood').addEventListener('click', event => {
  sortData((a, b) => {
    if (b.itemid > a.itemid) return -1;
    else return 1;
  });
});

function sortData(compare) {
  for (let item of selfies) {
    item.elt.remove();
  }
  selfies.sort(compare);
  for (let item of selfies) {
    document.body.append(item.elt);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('p');
    const name = document.createElement('div');
    const itemid = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');
    
    name.textContent = `name: ${item.mood}`;
    itemid.textContent = `item id: ${item.itemid}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;
    image.alt = 'its image';

    root.append(name, itemid, date, image);

    selfies.push({ elt: root, time: item.timestamp, itemid: item.itemid });
    document.body.append(root);
  }
  console.log(data);
}
