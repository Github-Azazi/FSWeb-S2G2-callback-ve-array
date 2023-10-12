const { fifaData } = require('./fifa.js');



/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const final2014 = fifaData.filter((item)=>{
	return item.Stage === "Final" && item.Year === 2014

})
console.log(final2014[0]["Home Team Name"])
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(final2014[0]["Away Team Name"])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(final2014[0]["Home Team Goals"])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(final2014[0]["Away Team Goals"])
//(e) 2014 Dünya kupası finali kazananı*/
	if (final2014[0]["Home Team Goals"]>final2014[0]["Away Team Goals"]) {
		console.log("Kazanan",final2014[0]["Home Team Name"])
	}
	else  {
		console.log("Kazanan",final2014[0]["Away Team Name"])

	}
		

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	const result = data.filter((item)=>{
		return item.Stage === "Final"	
	})
	return result
}

//console.log(Finaller(fifaData))


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data,callback) {
	const years = []
	const finaller  = callback(data)
	for( let i=0; i<finaller.length; i++){
		years.push (finaller[i].Year)	
	}
	return years;
}

console.log(Yillar(fifaData,Finaller))
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	function Kazananlar(data,callback) {
		const kazananlar = []
		const finaller = callback(data);
		for(let i=0; i < finaller.length; i++) {
		 if (finaller[i]["Home Team Goals"] > finaller[i]["Away Team Goals"]) {
		  kazananlar.push(finaller[i]["Home Team Name"]);
		  
		 }
		 else {
		  kazananlar.push(finaller[i]["Away Team Name"]);
		 }
	   
		}
		return kazananlar;
	   	  	
	   }
	   	   //console.log(Kazananlar(fifaData,Finaller));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data,finaller,yillar,kazananlar) {
	const result = []
	const years = yillar(data,finaller)
	const winners = kazananlar(data,finaller)
	for(let i =0; i< years.length; i++){
		const metin = `${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`
		result.push(metin)
	}
	return result

}
console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar))

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return) yapılmalı
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
	
    const toplamGol = finaller.reduce ((total,item)=>{
	const mactaAtilanGOl = item["Home Team Goals"] +item["Away Team Goals"]
	return total+mactaAtilanGOl
	},0)
	const avarage = toplamGol/finaller.length
	return avarage.toFixed(2)
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)))


/// EKSTRA ÇALIŞMALARR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data,takimKisaltmalari) {
	
    /* key olarak object yaratıp value olarak kazanma ( for döngü , if  ile kazanan takım, boş obje oluşturup, kazanan takım varmı, yokmu diye bak. 
		varsa 1 ekle, daha önce kazanmış ise sıfır) */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	
   let depo ={};

   let finaller =data.filter((element) => {
	return element.Stage == "Final"
   })
   finaller.forEach(element => {
	if (depo[element["Home Team Name"]] == undefined) {
		depo[element["Home Team Name"]] = element["Home Team Goals"]
	}
	else { 
		depo[element["Home Team Name"]] += element["Home Team Goals"]

	}
	if (depo[element["Away Team Name"]] == undefined) {
		depo[element["Away Team Name"]] = element["Away Team Goals"]
	}
	else { 
		depo[element["Away Team Name"]] += element["Away Team Goals"]

	}
   });
   console.log(depo);	
   let max = 0;
let result = "";

for(let key in depo){

	if(depo[key] > max){

		max = depo[key];

	result = key;
	}
}

return result;

}

console.log(EnCokGolAtan(fifaData))

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
	let depo ={};

   let finaller =data.filter((element) => {
	return element.Stage == "Final"
   })
   finaller.forEach(element => {
	if (depo[element["Home Team Name"]] == undefined) {
		depo[element["Home Team Name"]] = element["Away Team Goals"]
	}
	else { 
		depo[element["Home Team Name"]] += element["Away Team Goals"]

	}
	if (depo[element["Away Team Name"]] == undefined) {
		depo[element["Away Team Name"]] = element["Home Team Goals"]
	}
	else { 
		depo[element["Away Team Name"]] += element["Home Team Goals"]

	}
   });
   console.log(depo);	
   let max = 0;
let result = "";

for(let key in depo){

	if(depo[key] > max){

		max = depo[key];

	result = key;
	}
}

return result;

}

console.log(EnKotuDefans(fifaData))

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
