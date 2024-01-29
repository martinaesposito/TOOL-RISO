//DIV CONTENITORI
let divCtn;
let divCtnClass = [
  "chooseImage",
  "chooseSize",
  "chooseThreshold",
  "chooseColourProfile",
  "chooseColourConversion",
];
let d; //div
let divArray;

//ISTRUZIONI
let p;
let p2;
let p3;
let p4;
let p5;
let p6;

//IMMAGINI
let chooseImage;
//immagini di esempio
let allImages = [
  "assets/anelli.jpg",
  "./assets/ciotole.jpg",
  "././assets/donna.jpg",
  "././assets/vasetti.jpg",
];
let imgElements = [];
let examples; //array con i node delle immagini
let imgGallery; //div container immagini

let selectedImg;
let imgSrc;

//user upload
let uploadInput;
let uploadedImage;

//SIZE
let chooseSize;
let userSize;

//THRESHOLD
let chooseThreshold;
let userThreshold;

//COLORI
//COLOR PROFILE
let colourProfile;
let setColourProfile;
let colProfileOpt = ["CMYK", "RGB", "BLACK"];

let optionCtn;
let option;

let selectors;

let s; //section
let o; //option

let first; //disable first option


let coolorsRGB = ["red", "green", "blue"];
let bgCoolorsRGB = ["#ff0000", "#00ff00", "#0000ff"];

let coolorsCMYK = ["cyan", "magenta", "yellow", "black"];
let bgCoolorsCMYK = ["#00ffff", "#ff00ff", "#ffff00", "#000000"];

let risoCoolors = Array.from(RISOCOLORS);

let snglE;
let colOptions = []; //array che contiene tutti i selector con le opzioni
let cooolors = []; //array che contiene tutte le singole opzioni

let convertedC = [];
let allCoooloors = [];
let index;
let col;

let changed = false; // boleana che si attiva ogni volta che cambio profilo colore

//ALERT
let Aalert; //div di alert

//INFO CHECK
let userValues;
let invalidS;

let validationMessage;


let imgExists = false; //booleana che controlla il caricamento dell'immagine
let error = false; //booleana che controlla che le informazioni siano complete

//RENDER
let body;
let html;
let renderBtn;
let cnv;
let cnvCtn;

let userData = {
  img: "",
  size: "",
  threshold: "",
  colorProfile: "",
  colorConversion: [],
};

let ditherType = "bayer";

//RISO EFFECT
let imgG;
let imgS;
let imgT;

//cmyk
let JustMagenta;
let JustCyan;
let JustYellow;
let JustBlack;

let ditheredMagenta;
let ditheredCyan;
let ditheredYellow;
let ditheredBlack;

let indexC;
let indexM;
let indexY;
let indexK;

let magenta;
let cyan;
let yellow;
let black;

let magentaImage;
let cyanImage;
let yellowImage;
let blackImage;

//rgb
let JustBlue;
let JustRed;
let JustGreen;

let ditheredBlue;
let ditheredRed;
let ditheredGreen;

let indexR;
let indexG;
let indexB;

let red;
let green;
let blue;

let redImage;
let greenImage;
let blueImage;

//black
let ditheredImage;

let indexI;

let risoImage;

//SAVE
let saveBtn;


//FOOTER
let footer;
let email;
let github;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//SETUP
function setup() {
  pixelDensity(1);

  html = select("html");
  body = select("body");


  //DIV
  divCtn = createElement("div");
  divCtn.id("sectionContainer");

  for (i = 0; i < divCtnClass.length; i++) {
    d = createElement("div");
    d.id(divCtnClass[i]);
    d.class("section");
    divCtn.child(d);
  }

  divArray = Array.from(selectAll(".section"));


  //IMMAGINI DI ESEMPIO
  for (i = 0; i < allImages.length; i++) {
    im = createImg(allImages[i], "");

    im.size(AUTO, 150);
    im.class("imgChoose");

    imgElements.push(im);
  }

  imgGallery = createElement("div"); //creo il div gallery
  imgGallery.id("imgGallery");

  examples = selectAll(".imgChoose"); //immagini di esempio nella galleria
  examples.forEach((element) => {
    imgGallery.child(element);
  });

  chooseImage = select("#chooseImage"); //galleria nel div di selezione immagine
  p = createP("Choose one of the example images"); //istruzioni
  p2 = createP("or input one of your own (.jpg/.jpeg/.png)");


  //IMAGE INPUT
  uploadInput = createFileInput(handleImage); //input dell'immagine utente + callback

  chooseImage.child(p);
  chooseImage.child(imgGallery);
  chooseImage.child(p2);
  chooseImage.child(uploadInput);

  imgElements.forEach(imgSelect); //FUNZIONE DI SELEZIONE DELLE IMMAGINI DI ESEMPIO

  
  //SIZE
  p3 = createP("Choose the final size of your image (10-2000):");
  userSize = createInput("", "number"); //input
  userSize.id("size");
  userSize.class("preview");

  userSize.attribute("placeholder", "ex.300");
  userSize.attribute("max", "2000");
  userSize.attribute("min", "10");
  userSize.value("");

  chooseSize = select("#chooseSize");

  chooseSize.child(p3);
  chooseSize.child(userSize);

  // chooseSize.mouseClicked(() => {
  //   userSize.value("");
  // });

  chooseSize.changed(() => {
    console.log(userSize.value());
    userSize.class("input");
  });


  //THRESHOLD
  p4 = createP("Choose the threshold (0-255):");
  userThreshold = createInput("", "number"); //input
  userThreshold.id("threshold");
  userThreshold.class("preview");

  userThreshold.attribute("min", "0");
  userThreshold.attribute("max", "255");
  userThreshold.attribute("placeholder", "ex.125");

  userThreshold.value("");

  chooseThreshold = select("#chooseThreshold");

  chooseThreshold.child(p4);
  chooseThreshold.child(userThreshold);

  chooseThreshold.changed(() => {
    console.log(userThreshold.value());
    userThreshold.class("input");
  });


  //COLOR PROFILE
  setColourProfile = createSelect(false);
  setColourProfile.id("colourProfile");
  setColourProfile.class("preview");

  for (i = 0; i < colProfileOpt.length; i++) {
    oc = setColourProfile.option(colProfileOpt[i]);
    setColourProfile.value("");
    setColourProfile.child(oc);
  }

  p4 = createP("Choose the colour profile for your final image:");
  chooseColorProfile = select("#chooseColourProfile");

  chooseColorProfile.child(p4);
  chooseColorProfile.child(setColourProfile);

  chooseColorProfile.changed(() => {

    setColourProfile.class("input");
    chooseColConversion();
  });


  //COLOUR CONVERSION
  optionCtn = createDiv();
  optionCtn.id("optionsContainer");

  option = createSelect(false);
  option.class("OPTION");

  optionCtn.child(option);

  chooseColorConversion = select("#chooseColourConversion");
  p5 = createP("Choose how you want to convert the colours:");

  chooseColorConversion.child(p5);
  chooseColorConversion.child(optionCtn);

  setColourProfile.changed(chooseColConversion);


  //RENDER
  renderBtn = createInput("Render your preview", "submit");
  renderBtn.id("renderBtn");
  divCtn.child(renderBtn);

  renderBtn.mousePressed(infoCheck);


  //FOOTER
  footer= createDiv("This tool was developed by Martina Esposito. Send her an <a href='mailto:martiiiesposito@gmail.com' Target= '_blank'> email </a> or visit her <a href='https://github.com/martinaesposito' Target= '_blank'> github profile </a>")
  footer.id("footer")

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//IMMAGINI

//FUNZIONE DI SELEZIONE DELLE IMMAGINI DI ESEMPIO
function imgSelect(l) {
  l.mousePressed(() => {
    imgElements.forEach((l) => {
      if (l.hasClass("chosen")) {
        l.removeClass("chosen");
        
      }
    });
    l.toggleClass("chosen");
    console.log(l)
  });
}


//CALLBACK UPLOAD IMAGE
function handleImage(file) {
  if (file.type === "image") {
    uploadedImage = createImg(file.data, "");
    uploadedImage.hide()

    imgSrc = uploadedImage.attribute("src"); //trasformo l'immagine caricata in una p5.image
    
  } else {
    uploadedImage = null;
    console.log("error");
  }
}


//COLORI

//COLOR CONVERSION
function chooseColConversion() {
  selectors = Array.from(selectAll("select.OPTION"));

  //svuoto tutti gli array
  selectors.forEach((l) => {
    l.remove();
    colOptions = [];
    cooolors = [];
    allCoooloors = [];
  });

  if (setColourProfile.selected() === "RGB") {
    for (let i = 0; i < 3; i++) {
      s = createSelect(false);
      s.class("OPTION RGB");
      s.id(coolorsRGB[i]);
      s.style("background-color", bgCoolorsRGB[i]);

      optionCtn.child(s);
      o = s.option(coolorsRGB[i]);
      s.child(o);

      changed = false;

      colOptions.push(s);
    }
  } else if (setColourProfile.selected() == "CMYK") {
    for (let i = 0; i < 4; i++) {
      s = createSelect(false);
      s.class("OPTION CMYK");
      s.id(coolorsCMYK[i]);
      s.style("background-color", bgCoolorsCMYK[i]);

      optionCtn.child(s);
      o = s.option(coolorsCMYK[i], coolorsCMYK[i]);
      s.child(o);

      changed = false;

      colOptions.push(s);
    }

    if (s.id == "black") {
      s.style("color", "#ffffff"); //se il blocchetto è nero metti la scritta bianca
    }
    
  } else if (setColourProfile.selected() == "BLACK") {
    s = createSelect(false);
    s.class("OPTION BLACK");
    s.id("black");
    s.style("background-color", "#000000");
    s.style("color", "#ffffff");

    changed = false;

    optionCtn.child(s);
    o = s.option("black");

    s.child(o);

    colOptions.push(s); //pusho i selector
  }


  colOptions.forEach((e) => {
    risoCoolors.forEach((j) => {
      snglE = e.option(j.name.toLowerCase()); //creo un opzione per ogni selector con il nome del colore
      e.child(snglE);
    });

    cooolors = Array.from(selectAll("option", e)); //prendo tutti gli elementi option
    allCoooloors.push([...cooolors]); //e li pusho in un array di array


    //funzione che disattiva le prime option
    first = cooolors.filter((d) => d.value() == "undefined");
    first.forEach((g) => {
      g.elt.disabled = true;
    });


    //funzione che al change cambia lo sfondo
    e.changed(() => {
      index = risoCoolors.find((user) => user.name === e.value().toUpperCase());
      col = rgbToHex(index.color[0], index.color[1], index.color[2]);

      console.log(index, col);
      e.style("background-color", col);

      changed = true;

      // let style= window.getComputedStyle(e)
      // let prop= style.getPropertyValue("background-color")
      // console.log(prop)

      if (e.value() == "black") {
        console.log(e);
        e.style("color", "#ffffff");
      } else {
        e.style("color", "#000000");
      }
    });
  });
}


//convertitore da colori a esadecimale
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



//RENDER

//CHECK INFO BEFORE RENDERING
function infoCheck() {

  imgExists = false;
  error = false;

  userData.size = userSize.value();
  userData.threshold = userThreshold.value();
  userData.colorProfile = setColourProfile.selected();

  userData.colorConversion = [];
  colOptions.forEach((e) => {
    userData.colorConversion.push(e.value());
  });

  //image processing
  if (uploadedImage == null || uploadedImage == undefined) {
    imgElements.forEach((l) => {
      if (l.hasClass("chosen")) {
        imgSrc = l.attribute("src"); //trasformo l'immagine caricata in una p5.image
        // userData.img = loadImage(imgSrc, risoEffect, () => {
        //   console.log("errror");
        // });
        imgExists = true;
        userData.img =imgSrc
      }
    });
  } else {

    // uploadedImage = loadImage(imgSrc, 
    //   ()=>{ console.log("good");risoEffect()}, 
    //   ()=>{ console.log("Error loading image:", error);
    // }) ;

   // console.log(uploadedImage);

    imgExists = true;
    userData.img =imgSrc
    //userData.img = uploadedImage;
  }

  divArray.forEach((l) => {
    l.elt.addEventListener("animationend", () => {
      l.removeClass("bounce"); // When the animation ends, remove the "bounce" class
    });
  });



  //ora che ho definito tutti i colori metto i risultati in un array e faccio il check
  userValues = Array.from(Object.values(userData));

  userValues.forEach((e, i) => {
    if (e == "") {
      invalidS = divArray[i];
      console.log(invalidS);

      invalidS.addClass("bounce"); //animazione di errore

      error = true;
    }
  });

  //check input numbers validity
  validationMessage = 0;
  validationMessage = checkUserValues();
  console.log(validationMessage)

  if (validationMessage !== "0") {

   if (validationMessage == "1" || validationMessage == "2"){ //se uno dei due input non è valido allora aggiungi l'animazione
    invalidS = divArray[validationMessage];
    invalidS.addClass("bounce");

    } else { //altrimenti anima entrambi

      divArray[1].addClass("bounce");
      divArray[2].addClass("bounce");
    }

    Aaalert();
    error = true;
  }


  //booleana che controlla che sia stata selezionato uno dei colori a disposizione della libreria
  if (changed == false) {
    Aaalert();
    divArray[4].addClass("bounce"); // nel caso animazione della sezione che segnala
  }


  //booleana in caso di errore o mancanza di dati
  if (error == true) {
    Aaalert(); //alert message
  }



//ultimo check di tutte le booleane
  console.log(imgExists, error, changed);


  //se ho già fatto un giro elimino gli elementi preesistenti
  if (renderBtn.value() == "Update your preview") {

    let cnvE = select("#cnv");
    let saveE = select("#saveBtn");
    console.log(saveE)
    let cnvCtnE = select("#cnvCtn");
    
    if(cnvE && saveE && cnvCtnE){
      cnvE.remove();
      saveE.remove();
      cnvCtnE.remove();

      console.log("entrato")
    //risoEffect()
    
    }
  }

//se tutte le booleane quindi sono ok
  if (imgExists == true && error == false && changed == true) {

    html.style("overflow-y", "scroll");
    html.style("height", "auto");

    body.style("overflow-y", "scroll");
    body.style("height", "auto");

    renderBtn.value("Update your preview"); //update il bottone
    console.log(renderBtn.value())

    userData.img = loadImage(imgSrc, 
      risoEffect, 
      () => {console.log("errror"); });

    body.class("loading");
    console.log("loading")
  }
}



//INPUT CHECKER
function checkUserValues() {

  if ((isNaN(userData.threshold) || userData.threshold < 0 || userData.threshold > 255) && (isNaN(userData.size) || userData.size < 10 || userData.size  > 2000)) {
    error = true;
    return "3";
  }
  
  if (userData.size  < 10 || userData.size  > 2000) {
    error = true;
    return "1";
  } 

  if (userData.threshold < 0 || userData.threshold > 255) {
    error = true;
    return "2";
  } 

  return "0";
}


//ALERT
function Aaalert() {
  Aalert = select("#alert");

  Aalert.removeClass("fade-in-alert");
  Aalert.style("opacity", "100%");
  Aalert.style("display", "flex");
  Aalert.style("z-index", "9999");

  setTimeout(function () { //animazione di sparizione
    Aalert.addClass("fade-in-alert");

    Aalert.elt.addEventListener("animationend", () => {
      Aalert.style("display", "none");
    })

  }, 1000);
}



//RISO EFFECT
function risoEffect() {
  noStroke();
  clearRiso();

  imgG = userData.img;
  imgS = userData.size;
  imgT = userData.threshold;

  imgG.resize(imgS, (imgS * imgG.height) / imgG.width);

  //CANVA
  cnvCtn = createDiv();
  cnvCtn.id("cnvCtn");

  cnv = createCanvas(imgG.width, imgG.height);
  cnv.id("cnv");
  cnv.style("display", "block");
  cnvCtn.child(cnv);
  divCtn.child(cnvCtn);
  // cnv.drawingContext('2d', { willReadFrequently: true });
  console.log(cnv);

  //SAVE
  saveBtn = createInput("Download image", "submit");
  saveBtn.id("saveBtn");
  saveBtn.style("display", "block");

  divCtn.child(saveBtn);

  saveBtn.mousePressed(saveImages);


  if (userData.colorProfile == "RGB") {
    console.log(userData.colorProfile);

    JustBlue = extractRGBChannel(imgG, "blue"); //extract cyan from img
    JustRed = extractRGBChannel(imgG, "red");
    JustGreen = extractRGBChannel(imgG, "green");

    red = new Riso(userData.colorConversion[0]);
    green = new Riso(userData.colorConversion[1]);
    blue = new Riso(userData.colorConversion[2]);

    ditheredBlue = ditherImage(JustBlue, ditherType, imgT);
    ditheredRed = ditherImage(JustRed, ditherType, imgT);
    ditheredGreen = ditherImage(JustGreen, ditherType, imgT);

    greenImage = green.image(
      ditheredGreen,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );
    blueImage = blue.image(
      ditheredBlue,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );
    redImage = red.image(
      ditheredRed,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );

    drawRiso();
    endLoading();
  } else if (userData.colorProfile == "CMYK") {
    JustCyan = extractCMYKChannel(userData.img, "cyan");
    JustMagenta = extractCMYKChannel(userData.img, "magenta");
    JustYellow = extractCMYKChannel(userData.img, "yellow");
    JustBlack = extractCMYKChannel(userData.img, "black");

    ditheredCyan = ditherImage(JustCyan, ditherType, imgT);
    ditheredMagenta = ditherImage(JustMagenta, ditherType, imgT);
    ditheredYellow = ditherImage(JustYellow, ditherType, imgT);
    ditheredBlack = ditherImage(JustBlack, ditherType, imgT);

    cyan = new Riso(userData.colorConversion[0]);
    magenta = new Riso(userData.colorConversion[1]);
    yellow = new Riso(userData.colorConversion[2]);
    black = new Riso(userData.colorConversion[3]);

    magentaImage = magenta.image(
      ditheredMagenta,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );
    cyanImage = cyan.image(
      ditheredCyan,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );
    yellowImage = yellow.image(
      ditheredYellow,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );
    blackImage = black.image(
      ditheredBlack,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );

    drawRiso();
    endLoading();
  } else if (userData.colorProfile == "BLACK") {
    ditheredImage = ditherImage(imgG, ditherType, imgT);

    console.log(ditheredImage);

    black = new Riso(userData.colorConversion[0]);
    risoImage = black.image(
      ditheredImage,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );

    drawRiso();
    endLoading();
  }
}


//HIDE LOADER
function endLoading() {
  body.removeClass("loading");
  console.log("loading ENDED")
}



//SAVE
function saveImages() {
  console.log("save");
  saveCanvas(cnv, "risoImage.png");

  if (userData.colorProfile == "RGB") {
    redImage.save("redImg", "png");
    blueImage.save("blueImg", "png");
    greenImage.save("greenImg", "png");

  } else if (userData.colorProfile == "CMYK") {
    magentaImage.save("magentaImg", "png");
    cyanImage.save("cyanImg", "png");
    yellowImage.save("yellowImg", "png");
    blackImage.save("blackImg", "png");
  } 
}
