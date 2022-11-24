const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

// SKENARIO UJI COBA 1
Scenario('menampilkan halaman favorit restoran yang kosong', ({ I }) => {
  // I.waitForElement('.restaurant-item', 5);
  // Saya mencari elemen #favorite-restaurant
  I.seeElement('.restaurant-item');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada restoran yang divaforitkan oleh konsumen', '.restaurant-item');
});

// SKENARIO UJIA COBA 2
Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({ I }) => {
  I.see('Tidak ada restoran yang divaforitkan oleh konsumen', '.restaurant-item');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  // LIKE RESTAURANT
  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// SKENARIO UJI COBA 3
Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({ I }) => {
  I.see('Tidak ada restoran yang divaforitkan oleh konsumen', '.restaurant-item');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  // UNLIKE RESTAURANT
  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-item');

  const unlikedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, unlikedRestaurantTitle);
  I.click(unlikedRestaurantTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.restaurant-item');

  const noFavoriteRestaurant = await I.grabTextFrom('.restaurant__title');
  // MEMERIKSA APAKAH HALAMAN FAVORITE SUDAH KOSONG
  assert.strictEqual(noFavoriteRestaurant, 'Tidak ada restoran yang divaforitkan oleh konsumen');
});
