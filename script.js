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
  "/assets/anelli.jpg",
  "/assets/ciotole.jpg",
  "/assets/vasetti.jpg",
  "/assets/vasone.jpg",
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

let changed = false;// boleana che si attiva ogni volta che cambio profilo colore

//ALERT
let Aalert; //div di alert

//INFO CHECK
let userValues;
let invalidS;

let imgExists = false; //booleana che controlla il caricamento dell'immagine
let error = false; //booleana che controlla che le informazioni siano complete

//RENDER
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

function setup() {
  pixelDensity(1);

  divCtn = createElement("div");
  divCtn.id("sectionContainer");

  //DIV
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

  //INPUT
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
  userSize.attribute("placeholder", "ex.300");

  userSize.class("preview");
  userSize.attribute("max", "2000");
  userSize.value("");

  chooseSize = select("#chooseSize");

  chooseSize.child(p3);
  chooseSize.child(userSize);

  chooseSize.mouseClicked(() => {
    userSize.value("");
  });

  chooseSize.changed(() => {
    console.log(userSize.value());
    userSize.class("input");
  });

  //THRESHOLD
  p4 = createP("Choose the threshold (0-255):");
  userThreshold = createInput("", "number"); //input
  userThreshold.id("threshold");
  userThreshold.class("preview");

  userThreshold.attribute("max", "255");

  userThreshold.value("");
  userThreshold.attribute("placeholder", "ex.125");

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

  // setColourProfile.value("")
  // setColourProfile.attribute("placeholder", "CMYK")

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
    chooseColConversion;
    setColourProfile.class("input");
    
    changed=false;
    console.log("cambio")
     
    
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

  cnvCtn = createDiv();
  optionCtn.id("cnvCtn");
  cnv = createCanvas(1000, 400);
  cnv.style("display", "none");
  cnvCtn.child(cnv);
  divCtn.child(cnvCtn);

  //SAVE
  saveBtn = createInput("Download image", "submit");
  saveBtn.id("saveBtn");

  divCtn.child(saveBtn);
}

//FUNZIONE DI SELEZIONE DELLE IMMAGINI DI ESEMPIO
function imgSelect(l) {
  l.mousePressed(() => {
    imgElements.forEach((l) => {
      if (l.hasClass("chosen")) {
        l.removeClass("chosen");
      }
    });
    l.toggleClass("chosen");
  });
}

//CALLBACK UPLOAD IMAGE
function handleImage(file) {
  if (file.type === "image") {
    uploadedImage = createImg(file.data, "");
    uploadedImage.hide();

    imgSrc = uploadedImage.attribute("src"); //trasformo l'immagine caricata in una p5.image
    console.log(imgSrc);
    uploadedImage = loadImage(imgSrc);

    console.log(uploadedImage);
  } else {
    uploadedImage = null;
    console.log("error");
  }
}

//COLOR CONVERSION
function chooseColConversion() {
  selectors = Array.from(selectAll("select.OPTION"));

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

      colOptions.push(s);
    }

    if ((s.id = "black")) {
      s.style("color", "#ffffff");
    }
  } else if (setColourProfile.selected() == "BLACK") {
    s = createSelect(false);
    s.class("OPTION BLACK");
    s.id("black");
    s.style("background-color", "#000000");
    s.style("color", "#ffffff");

    changed=true;
    console.log(changed)

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

    e.changed(() => {
      //console.log(e.value());

      index = risoCoolors.find((user) => user.name === e.value().toUpperCase());
      col = rgbToHex(index.color[0], index.color[1], index.color[2]);

      console.log(index, col);
      e.style("background-color", col);

      changed=true;
      
    } );
  });
}

//convertitore da colori a esadecimale
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



//CHECK INFO BEFORE RENDERING
function infoCheck() {
    imgExists = false;
    error= false;

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
        // console.log(imgSrc)
        userData.img = loadImage(imgSrc, risoEffect, () => {
          console.log("errror");
        });
        //console.log( userData.img )
        imgExists = true;
      }
    });
  } else {
    //console.log(uploadedImage)
    imgExists = true;
    userData.img = uploadedImage;
    risoEffect();
  }

  divArray.forEach((l) => {
    l.elt.addEventListener("animationend", () => {
      // When the animation ends, remove the "bounce" class
      l.removeClass("bounce");
    });
  });

  userValues = Array.from(Object.values(userData));
  userValues.forEach((e, i) => {
    if (e == "") {
      invalidS = divArray[i];
      console.log(invalidS);

      invalidS.addClass("bounce");
      void invalidS.offsetHeight;

      error = true;
    }
  });

  
  //seleziona uno dei colori a disposizione della libreria
  if(changed== false){
    Aaalert()
    
    divArray[4].addClass("bounce");
  }


  if (error == true ) {
    //alert message
    Aaalert()
  }

  console.log(imgExists, error, changed);
  //renderCanva(userData)

  if (imgExists == true && error == false && changed== true ) {
    let html = select("html");
    html.style("overflow-y", "scroll");
    html.style("height", "auto");

    let body = select("body");
    body.style("overflow-y", "scroll");
    body.style("height", "auto");

    renderBtn.value("Update your preview");
    saveBtn.style("display", "block");

    cnv.style("display", "block");

    saveBtn.mousePressed(saveImages);
  }
}



function Aaalert(){
    
    Aalert = select("#alert");

    Aalert.removeClass("fade-in-alert");
    Aalert.style("display", "none");
    Aalert.style("opacity", "100%");
    Aalert.style("display", "flex");
    Aalert.style("z-index", "9999");

    setTimeout(function () {
      Aalert.addClass("fade-in-alert");
      //console.log(Aalert);
    }, 1000);
}



function risoEffect() {
  noStroke();

  //console.log(userData);
  imgG = userData.img;
  imgS = userData.size;
  imgT = userData.threshold;

  //console.log(cnv);
  cnv.resize(imgS, (imgS * imgG.height) / imgG.width);
  clearRiso();

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
  } else if (userData.colorProfile == "CMYK") {
    JustCyan = extractCMYKChannel(userData.img, "cyan"); //extract cyan from img
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
  } else if (userData.colorProfile == "BLACK") {
    ditheredImage = ditherImage(imgG, ditherType, imgT);

    black = new Riso(userData.colorConversion[0]);
    risoImage = black.image(
      ditheredImage,
      0,
      0,
      imgS,
      (imgS * imgG.height) / imgG.width
    );

    drawRiso();
  }
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
  } else if (userData.colorProfile == "BLACK") {
    risoImage.save("blackImg", "png");
  }
}
