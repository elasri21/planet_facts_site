async function fetchData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}

const data = await fetchData();

// console.log(data);

// get a planet
function getPlanet(btns) {
    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove("active");
            }
            for (let planet of data) {
                if (this.dataset.name == planet.name) {
                    // console.log(planet);
                    displayPlanet(planet);
                    this.classList.add("active");
                    return planet;
                } else {
                    continue;
                }
            }
        });
    });
}

function displayPlanet(planet) {
    container.innerHTML = `
                <div class="planet-info">
                <div class="image c-flex">
                    <img src="${planet.images.planet}" alt="${planet.name}">
                </div>
                <div class="info">
                    <div class="help-info">
                        <h2>${planet.name}</h2>
                        <p class="content">
                            ${planet.overview.content}
                        </p>
                        <div class="link">
                            source: 
                            <a href="${planet.overview.source}" target="_blank">
                                <span>wikipedia</span>
                                <img src="./assets/icon-source.svg" alt="source">
                            </a>
                        </div>
                    </div>
                    <div class="view">
                        <button class="${planet.name.toLowerCase()} overview-btn active"><span>01</span>overview</button>
                        <button class="${planet.name.toLowerCase()} structure-btn"><span>02</span>internal structure</button>
                        <button class="${planet.name.toLowerCase()} surface-btn"><span>03</span>surface geology</button>
                    </div>
                </div>
            </div>
            <div class="facts">
                <div class="box">
                    <p>rotation time</p>
                    <h3>${planet.rotation}</h3>
                </div>
                <div class="box">
                    <p>revolution time</p>
                    <h3>${planet.revolution}</h3>
                </div>
                <div class="box">
                    <p>radius</p>
                    <h3>${planet.radius}</h3>
                </div>
                <div class="box">
                    <p>average temp</p>
                    <h3>${planet.temperature}</h3>
                </div>
            </div>
    `;
    changeWhenClick(planet);
}

function changeWhenClick(planet) {
    const overviewBtn = document.querySelector(".overview-btn");
    const structureBtn = document.querySelector(".structure-btn");
    const surfaceBtn = document.querySelector(".surface-btn");
    const content = document.querySelector(".help-info p.content");
    const image = document.querySelector(".image img");
    const source = document.querySelector(".help-info .link a");
    overviewBtn.addEventListener("click", function() {
        content.textContent = planet.overview.content;
        image.src = planet.images.planet;
        source.href = planet.overview.source;
        Array.from(this.parentElement.children).forEach(ch => {
            ch.classList.remove("active");
        })
        this.classList.add("active");
    });
    structureBtn.addEventListener("click", function() {
        content.textContent = planet.structure.content;
        image.src = planet.images.internal;
        source.href = planet.structure.source;
        Array.from(this.parentElement.children).forEach(ch => {
            ch.classList.remove("active");
        })
        this.classList.add("active");
    });
    surfaceBtn.addEventListener("click", function() {
        content.textContent = planet.geology.content;
        image.src = planet.images.geology;
        source.href = planet.geology.source;
        Array.from(this.parentElement.children).forEach(ch => {
            ch.classList.remove("active");
        })
        this.classList.add("active");
    });
}

//handle menu
const openMenu = document.querySelector(".open");
const closeMenu = document.querySelector(".close");
const nav = document.querySelector("nav");
const container = document.querySelector("main .container")
const buttons = document.querySelectorAll("nav a");

getPlanet(buttons);
const earth = {
    name: "Earth",
    overview: {
      content: "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
      source: "https://en.wikipedia.org/wiki/Earth"
    },
    structure: {
      content: "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
      source: "https://en.wikipedia.org/wiki/Earth#Internal_structure"
    },
    geology: {
      content: "The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.",
      source: "https://en.wikipedia.org/wiki/Earth#Surface"
    },
    rotation: "0.99 Days",
    revolution: "365.26 Days",
    radius: "6,371 KM",
    temperature: "16°c",
    images: {
      planet: "./assets/planet-earth.svg",
      internal: "./assets/planet-earth-internal.svg",
      geology: "./assets/geology-earth.png"
    }
}
changeWhenClick(earth);

openMenu.addEventListener("click", function() {
    this.style.display = "none";
    closeMenu.style.display = "flex";
    nav.style.display = "block";
});

closeMenu.addEventListener("click", function() {
    this.style.display = "none";
    openMenu.style.display = "flex";
    nav.style.display = "none";
});
