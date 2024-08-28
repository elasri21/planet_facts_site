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
            for (let planet of data) {
                if (this.dataset.name == planet.name) {
                    // console.log(planet);
                    displayPlanet(planet);
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
                        <button class="overview-btn active"><span>01</span>overview</button>
                        <button class="structure-btn"><span>02</span>internal structure</button>
                        <button class="surface-btn"><span>03</span>surface geology</button>
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
