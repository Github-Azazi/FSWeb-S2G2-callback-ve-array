/*- [ ] Ülke kısaltmalarını parametre olarak alan ve dünya kupasında yer alma sayılarını dönünen bir fonksiyon yaratabilirsiniz.*/

const { fifaData } = require('./fifa.js');

function dunyaKupasiYerAlmaSayisi(kisaltmalar) {
    let yerAlmaSayilari = '';
    for (let i = 0; i < kisaltmalar.length; i++) {
      let ulkeYerAlmaSayisi = 0;
      for (let j = 0; j < fifaData.length; j++) {
        if (fifaData[j]['Home Team Initials'] === kisaltmalar[i]) {
          ulkeYerAlmaSayisi++;
        }
        if (fifaData[j]['Away Team Initials'] === kisaltmalar[i]) {
          ulkeYerAlmaSayisi++;
        }
      }
      yerAlmaSayilari += `${kisaltmalar[i]}: ${ulkeYerAlmaSayisi} kez\n`;
    }
    return yerAlmaSayilari;
}
console.log(dunyaKupasiYerAlmaSayisi(['BRA', 'GER', 'ITA']));



/*- [ ] Ülke kısaltmalarını parametre olarak alan ve dünya kupasında attıkları gol sayılarını(1930 sonrası) dönen bir fonksiyon yaratabilirsiniz.*/

function dunyaKupasiGolSayisi(kisaltmalar) {
    let golSayilari = '';
    for (let i = 0; i < kisaltmalar.length; i++) {
      let ulkeGolSayisi = 0;
      for (let j = 0; j < fifaData.length; j++) {
        if (fifaData[j]['Home Team Initials'] === kisaltmalar[i]) {
          ulkeGolSayisi += fifaData[j]['Home Team Goals'];
        }
        if (fifaData[j]['Away Team Initials'] === kisaltmalar[i]) {
          ulkeGolSayisi += fifaData[j]['Away Team Goals'];
        }
      }
      golSayilari += `${kisaltmalar[i]}: ${ulkeGolSayisi} gol\n`;
    }
    return golSayilari;
  }
  console.log(dunyaKupasiGolSayisi(['BRA', 'GER', 'ITA']));


