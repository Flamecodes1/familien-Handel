// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Deine Firebase-Konfiguration (ersetze diese Werte durch deine eigenen, falls nötig)
const firebaseConfig = {
  apiKey: "AIzaSyAygS_8Z-cfAZz2uPz1Yp0A6GoGPsKQ6dU",
  authDomain: "familien-handel.firebaseapp.com",
  projectId: "familien-handel",
  storageBucket: "familien-handel.firebasestorage.app",
  messagingSenderId: "575671866152",
  appId: "1:575671866152:web:f98ecf4735ac4456def61d",
  measurementId: "G-208YZ2YH7S"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('itemForm');
  const itemsContainer = document.getElementById('itemsContainer');

  // Funktion: Artikel aus Firestore laden und anzeigen
  async function renderItems() {
    itemsContainer.innerHTML = '';
    try {
      const itemsRef = collection(db, 'items');
      const q = query(itemsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        itemsContainer.innerHTML = '<p>Keine Artikel verfügbar.</p>';
      } else {
        querySnapshot.forEach((doc) => {
          const item = doc.data();
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
    } catch (error) {
      console.error("Fehler beim Laden der Artikel: ", error);
      itemsContainer.innerHTML = '<p>Fehler beim Laden der Artikel.</p>';
    }
  }

  // Artikel beim Laden der Seite abrufen
  renderItems();

  // Formular-Submit-Event: Artikel speichern
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const email = document.getElementById('email').value;
    const imageInput = document.getElementById('image');

    // Objekt, das den neuen Artikel beschreibt
    const newItem = {
      title,
      description,
      price,
      email,
      imageData: null,
      timestamp: serverTimestamp()
    };

    // Falls ein Bild ausgewählt wurde, erstelle eine Data-URL
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        newItem.imageData = event.target.result;
        try {
          await addDoc(collection(db, 'items'), newItem);
          renderItems();
          form.reset();
        } catch (error) {
          console.error("Fehler beim Speichern des Artikels: ", error);
        }
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      try {
        await addDoc(collection(db, 'items'), newItem);
        renderItems();
        form.reset();
      } catch (error) {
        console.error("Fehler beim Speichern des Artikels: ", error);
      }
    }
  });
});
