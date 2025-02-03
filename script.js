// script.js

document.addEventListener('DOMContentLoaded', async function() {
  const form = document.getElementById('itemForm');
  const itemsContainer = document.getElementById('itemsContainer');

  // Lade vorhandene Artikel aus localStorage oder lege ein leeres Array an
  let items = JSON.parse(localStorage.getItem('items')) || [];

  // Funktion: Artikel anzeigen
  function renderItems() {
    itemsContainer.innerHTML = '';
    if (items.length === 0) {
      itemsContainer.innerHTML = '<p>Keine Artikel verfügbar.</p>';
      return;
    }
    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'item-card';

      // Falls ein Bild-URL vorhanden ist, zeige das Bild an
      if (item.image_url) {
        const img = document.createElement('img');
        img.src = item.image_url;
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

  // Cloudinary-Konfiguration
  const cloudName = 'dfm6pstmt';
  const uploadPreset = 'familienhandel-unsigned';

  // Formular-Submit-Event: Neuen Artikel speichern
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const email = document.getElementById('email').value;
    const imageInput = document.getElementById('image');

    // Neues Artikelobjekt vorbereiten; image_url wird später gesetzt
    const newItem = {
      title,
      description,
      price,
      email,
      image_url: null
    };

    // Wenn ein Bild ausgewählt wurde, lade es zu Cloudinary hoch
    if (imageInput.files && imageInput.files[0]) {
      const file = imageInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.secure_url) {
          newItem.image_url = data.secure_url;
        } else {
          console.error("Cloudinary-Fehler:", data);
        }
      } catch (error) {
        console.error("Fehler beim Upload zu Cloudinary:", error);
      }
    }

    // Füge den neuen Artikel zur Liste hinzu, speichere in localStorage und aktualisiere die Anzeige
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    form.reset();
  });
});
