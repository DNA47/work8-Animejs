console.log("start anime.js");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
  const str = (Math.random() * (max - min) + min).toFixed(2);

  return parseFloat(str);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const transformLibrary = [
  {
    name: "scale",
    unit: "",
    maxValue: 1,
  },
  {
    name: "scaleX",
    unit: "",
    maxValue: 1,
  },
  {
    name: "scaleY",
    unit: "",
    maxValue: 1,
  },
  {
    name: "scaleZ",
    unit: "",
    maxValue: 1,
  },
  {
    name: "rotate",
    unit: "deg",
    maxValue: 360,
  },
  {
    name: "skew",
    unit: "deg",
    maxValue: 360,
  },
];

const createElBtn = document.querySelector("#createElement");
const buildingArea = document.querySelector("#buildingArea");


class AnimatedElement {
  constructor(node, animeConfig) {
    console.log("start constructor");
    this.node = node;
    this.animeConfig = animeConfig;
  }

  animate() {
    const randomIndex = randomIntFromInterval(0, transformLibrary.length - 1);
    const randomTransformationObj = transformLibrary[randomIndex];
    const randomValue = getRandomFloat(0.4, randomTransformationObj.maxValue);
    
    console.log(randomTransformationObj.name);
    console.log(randomValue);

    this.animeConfig.targets = this.node;
    // при использовании стрелочной функции мы получаем нужный контекст вызова (иначе this ссылается на экземпляр внутри библиотеки Anime.js)
    this.animeConfig.complete = () => {
      console.log(this);
    }

    this.animeConfig[randomTransformationObj.name] = randomValue + randomTransformationObj.unit;

    anime(this.animeConfig);
  }
}

function createElement() {
  const newElem = document.createElement("div");
  // дать новому элеемнту класс (какой?)
  newElem.classList.add("box");
  // дать новому элементу внутренний текст для теста
  newElem.textContent = "test";
  // вернуть новый элемент
  return newElem;
}

function addRandomElement() {
  const createdElement = createElement();
  buildingArea.prepend(createdElement);
  const elementConfig = {
    marginLeft: anime.random(0, 400),
    backgroundColor: getRandomColor(),
    borderRadius: ["0%", "50%"],
    easing: "easeInOutQuad"
  };
  const animatedElement = new AnimatedElement(createdElement, elementConfig);

  animatedElement.animate();
}

createElBtn.addEventListener("click", addRandomElement);
