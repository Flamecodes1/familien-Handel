document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('itemForm');
  const itemsContainer = document.getElementById('itemsContainer');

  // Artikel aus localStorage laden (falls vorhanden)
  let items = JSON.parse(localStorage.getItem('items')) || [];

  // Funktion, um Artikel anzuzeigen
  function renderItems() {
    itemsContainer.innerHTML = '';
    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Keine Artikel verfügbar.</p>';
      return;
    }
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';

      if (item.imageData) {
        const img = document.createElement('img');
        img.src = item.imageData;
        img.alt = item.title;
        card.appendChild(img);
      }

      const title = document.createElement('h3');
      title.textContent = item.title;
      card.appendChild(title);

      const description = document.createElement('p');
      description.textContent = item.description;
      card.appendChild(description);

      if (item.price) {
        const price = document.createElement('p');
        price.textContent = 'Preis: ' + item.price;
        card.appendChild(price);
      }

      const contactLink = document.createElement('a');
      contactLink.className = 'contact-button';
      contactLink.href = 'mailto:' + item.email;
      contactLink.textContent = 'Kontaktieren';
      card.appendChild(contactLink);

      itemsContainer.appendChild(card);
    });
  }

  // Vorhandene Artikel anzeigen
  renderItems();

  // Formular-Submit-Event
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const email = document.getElementById('email').value;
    const imageInput = document.getElementById('image');

    const newItem = {
      title,
      description,
      price,
      email,
      imageData: null
    };

    // Wenn ein Bild ausgewählt wurde, erstelle eine Data-URL
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        newItem.imageData = event.target.result;
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
        form.reset();
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      items.push(newItem);
      localStorage.setItem('items', JSON.stringify(items));
      renderItems();
      form.reset();
    }
  });
});
