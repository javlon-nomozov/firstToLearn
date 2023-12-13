const usdUzsUrl = 'https://v6.exchangerate-api.com/v6/a8f130afe395d732e4ce754d/pair/USD/UZS';
(async () => {
  const response = await fetch(usdUzsUrl);
  console.log((await response.json()).conversion_rate);
})();
