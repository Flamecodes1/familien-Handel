/* styles.css */
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  background: #f5f5f5;
  color: #333;
}

header {
  background: #4CAF50;
  color: white;
  padding: 1rem;
  text-align: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.upload-section, .items-section {
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

form label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

form input[type="text"],
form input[type="email"],
form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form input[type="file"] {
  margin-top: 0.5rem;
}

form button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background: #45a049;
}

.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item-card {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  flex: 1 1 calc(50% - 1rem);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.item-card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.item-card h3 {
  margin: 0;
  font-size: 1.2rem;
}

.item-card p {
  flex: 1;
}

.contact-button {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
}

.contact-button:hover {
  background: #1976D2;
}
