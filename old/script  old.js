
//FUNCTION EXAMPLE IMAGE SELECT
let allImages = []

nodelist = document.querySelectorAll("img[class^='imgChoose'")
allImages = Array.from(nodelist)
//console.log(allImages)
let selectedImg;

allImages.forEach((l) => {

    l.addEventListener("click", (e) => {

        allImages.forEach((l) => {
            if ($(l).hasClass("chosen")) {
                $(l).removeClass("chosen")
            }

        })

        selectedImg = e.srcElement
        console.log(selectedImg)
        $(selectedImg).toggleClass("chosen")

    })

})

let uploadInput = document.getElementById("img");
let uploadedImage;

let ui8a;

/* uploadInput.addEventListener("change", (e) => {

    //uploadInput.files = e.dataTransfer.files
    uploadedImage = uploadInput.files[0];
    console.log(uploadedImage,typeof(uploadedImage))

    /*  let queryString = window.location.href;
             let urlParams = new URLSearchParams(queryString);
            // console.log(urlParams)
             urlParams.set("img",  uploadedImage) 
})
 */


uploadInput.addEventListener("change", async event => {
    uploadedImage= await uploadInput.files[0].arrayBuffer();
    ui8a = new Uint8Array(uploadedImage);
    console.log("Uint8Array", ui8a);
});


//COLORI
let optionsContainer = document.getElementById("optionsContainer")
let colourConverter = document.getElementById("chooseColourConversion")
let colourProfile = document.getElementById("colourProfile")

let s;
let o;

let selectorsRGB = ["red", "green", "blue"]
let coolorsRGB = ["red", "green", "blue"]
let bgCoolorsRGB = ["#ff0000", "#00ff00", "#0000ff"]

let selectorsCMYK = ["cyan", "magenta", "yellow", "black"]
let coolorsCMYK = ["cyan", "magenta", "yellow", "black"]
let bgCoolorsCMYK = ["#00ffff", "#ff00ff", "#ffff00", "#000000"]

colourProfile.onchange = function () {

    let selectors = document.querySelectorAll("select.OPTION")
    let selectorA = Array.from(selectors)

    selectorA.forEach((l) => {
        l.remove()
    })

    if (colourProfile.value === "RGB") {
        for (let i = 0; i < 3; i++) {
            s = document.createElement("select")
            $(s).addClass("RGB")
            $(s).addClass("OPTION")
            s.name = selectorsRGB[i]
            s.id = selectorsRGB[i]
            s.style.backgroundColor = bgCoolorsRGB[i]
            //console.log(bgCoolorsRGB[i])

            o = document.createElement("option")
            o.value = coolorsRGB[i]
            o.innerHTML = coolorsRGB[i]

            s.appendChild(o);
            optionsContainer.appendChild(s);
        }

    } else if (colourProfile.value == "CMYK") {
        for (let i = 0; i < 4; i++) {
            s = document.createElement("select")
            $(s).addClass("CMYK")
            $(s).addClass("OPTION")
            
            console.log(selectorsCMYK)
            s.name = selectorsCMYK[i]
            s.id = selectorsCMYK[i]
            s.style.backgroundColor = bgCoolorsCMYK[i]

            o = document.createElement("option")
            o.value = coolorsCMYK[i]
            o.innerHTML = coolorsCMYK[i]
            o.name = coolorsCMYK[i]

            s.appendChild(o);
            optionsContainer.appendChild(s);
        }

        if (s.name = "black") {
            s.style.color = "#ffffff"
        }

    } else if (colourProfile.value == "BLACK") {
        s = document.createElement("select")
        $(s).addClass("BLACK")
        $(s).addClass("OPTION")
        s.name = "black"
        s.id = "black"
        s.style.backgroundColor = "#000000"
        s.style.color = "#ffffff"

        o = document.createElement("option")
        o.value = "black"
        o.innerHTML = "black"

        s.appendChild(o);
        optionsContainer.appendChild(s);
    }





    //FUNCTION COLORS OPTIONS
    let nodesOPTIONS = document.querySelectorAll(".OPTION")
    let OPTIONSContainer = Array.from(nodesOPTIONS)
    //console.log(OPTIONSContainer)
    let risoCoolors = Array.from(RISOCOLORS)
    //console.log(risoCoolors)

    OPTIONSContainer.forEach((colOpt) => {
        risoCoolors.forEach((l) => {

            let snglE = document.createElement("option")
            snglE.innerHTML = l.name.toLowerCase();

            let col = rgbToHex(l.color[0], l.color[1], l.color[2])

            snglE.style.backgroundColor = col

            colOpt.appendChild(snglE);

            colOpt.onchange = function () {
                console.log(col)

                colorName = this.options[this.selectedIndex].style.backgroundColor

                //console.log(colorName)
                colOpt.style.backgroundColor = colorName
            }
        })
    })
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}





let userSize;
let userColorProfile;

let renderBtn = document.getElementById("renderBtn")

let userC = {
    img: "",
    size: "",
    colorProfile: "",
    colorCustomProfile:[]
};

renderBtn.addEventListener("click", (e) => {
    e.preventDefault()

    //console.log("ciao")
    //console.log(e)

    /* exampleImgs.forEach((img) => {
        if($(img).hasClass("chosen")){
            let queryString = window.location.href;
            let urlParams = new URLSearchParams(queryString);
            console.log(urlParams)
            urlParams.set("img", img)
            console.log(img)
        } 
    }) */

    if (uploadedImage == undefined) {
        /* allImages.forEach((l) => { */
            for(let i=0; i<allImages.length; i++) {
                if ($(allImages[i]).hasClass("chosen")) {
                    userC.img = allImages[i].src
                    console.log(userC.img)
                } 
                /* else 
                console.log("no image has been defined") */
            }
        /* }) */
    } else {
        
       /*  let imgArray= httpGet(uploadedImage.src, "arrayBuffer")

        userC.img = imgArray
        console.log(userC.img) */
        
        console.log("userCostumUpload")
    }

    userSize = document.getElementById("size");
    //console.log(userSize.value)

    colorProfile = document.getElementById("colourProfile");
    //console.log(colorProfile)

    userC.size= userSize.value 
    userC.colorProfile= colorProfile.value

    colorCustomProfile()
    
    /*  let userIMG= document.createElement("img");
     userIMG.src=uploadedImage */
})

function colorCustomProfile(){
    userC.colorCustomProfile=[]

    if (colorProfile.value=="CMYK")
    {
        let c= document.getElementById("cyan")
        let m= document.getElementById("magenta")
        let y= document.getElementById("yellow")
        let k= document.getElementById("black")

        //console.log(c,m,y,k)
        userC.colorCustomProfile.push(c.value,m.value,y.value,k.value)
        console.log(userC)
        renderPreview()

    } else if (colorProfile.value=="RGB")
    {
        let b= document.getElementById("blue")
        let r= document.getElementById("red")
        let g= document.getElementById("green")

        //console.log(r,g,b) 
        coolors= userC.colorCustomProfile.push(r.value,g.value,b.value)
        console.log(userC)
        renderPreview()

    } else if (colorProfile.value=="BLACK")
    {
        let b= document.getElementById("black")
        //console.log(b)
        coolors= userC.colorCustomProfile.push(b.value)
        console.log(userC)
        renderPreview()
    }
}


let customImg;

function renderPreview(){

    console.log(userC)
    canvas =document.querySelector("canvas")
    canvas.style.display="block"
    renderBtn.value="Update your preview";
    /* renderBtn.style.display="none"; */

    setup()
}

/* function preload(){
    /* console.log(typeof(userC.img)) 
    setup()
} */


function setup() {
    
    clear()

    if (!userC.img) {
        // Wait until the earthquake data has loaded before drawing.
        return 
    } else {
    
    customImg=loadImage(userC.img)
    console.log(customImg)

    /* if (typeof(customImg)=="string"){ */
        createCanvas(1000,1000);
        
        drawCanvas()
    }
    /* }
    else {
        console.log("fileuploaded")
        /* handleImage(customImg) 
        customImgData= createImg(customImg.data, '');
        customImgData.hide();
        customImgData=customImg
      }

    createCanvas(windowWidth, 500);
     */
    
   // ellipse(50,50,80,80);
   
   /* imageObject = loadImage(urlOfImageFile, () => {image(imageObject, 0, 0)} */
    
  }
  
function drawCanvas(){
    background(220);
    let imageHeight=(userC.size*customImg.height)/customImg.width

    
    //image(customImg, 0, 0, userC.size, imageHeight);

    let x=0;
    let y=0;
    let h=imageHeight;
    let w
    if(userC.size>500){
        w=500;
        h=(w*customImg.height)/customImg.width 
        //console.log(w)
    } else {
    w=userC.size;
    }


    /* console.log(colorCustomProfile.length) */
if (userC.colorCustomProfile.length!=1){
    let newCH= h+(200*customImg.height)/customImg.width+100
    resizeCanvas(1000, newCH)

    //DISEFNO LA BIG PREVIEW
    image(customImg, x, y, w, h);

        for (let i=0; i<userC.colorCustomProfile.length; i++){
            
            /* console.log(userC.colorCustomProfile.length) */
            image(customImg, x, h+50, 200, (200*customImg.height)/customImg.width );
            
            x=x+250;  
            //y=y+h+20
            
    }
} else {
    let newCH= h+50
    resizeCanvas(1000, newCH)

    //DISEFNO LA BIG PREVIEW
    image(customImg, x, y, w, h);
}

    /* noLoop() */
    loop()
}

/* function handleImage(file) {
    if (file.type === 'image') {
        customImg= createImg(file.data, '');
        customImg.hide();
    } else {
        customImg = null;
    }
  } */
//console.log(rgbToHex(255, 51, 255));


//FORM SUBMIT
/* let form= document.getElementById("form")

form.onformdata = (e) => {
    console.log("formdata fired");
  
    // modifies the form data
    const formData = e.formData;
    formData.set("img", formData.get("img").toLowerCase());
    formData.set("size", formData.get("size").toLowerCase());
    formData.set("ColourProfile", formData.get("ColourProfile").toLowerCase());

    console.log(formData)
}
 */


/* let form= document.getElementById("form")
console.log(form)

form.onformdata = (e) => {
    console.log("formdata fired");
}
 */