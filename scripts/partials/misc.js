export function spinDiceOnClick() {
  let randNumber;
  let x, y;

  const dice = document.querySelector('#dice');
  const diceContainer = document.querySelector('#diceContainer');

  diceContainer.addEventListener('click', function () {

    randNumber = Math.floor(Math.random() * 6 + 1);

    switch (randNumber) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
      default:
        x = 720 + (6 - randNumber) * 90;
        y = 900;
        break;
    }
    dice.style.transform = `translateZ(-300px) rotateY(${x}deg) rotateX(${y}deg)`;
    // console.log(randNumber, x, y, dice)
  });
}


export function shuffleColors() {
  const allBlocks = document.querySelectorAll('.liInner'); //en algunos casos son enlaces, en otros son botones
  const dice = document.getElementById('diceContainer');
  const cssColorKeys = [
    '--color1',
    '--color2',
    '--color3',
    '--color4',
    '--color5',
    '--color6',
    '--color7'
  ];
  let cssColorValues = []; // llenamos el array con los values de los keys 

  let todoLoTipeado;
  //1ro obtenemos los values de las keys
  getCSSValues(cssColorKeys, cssColorValues);
  //2do cada bloque obtiene un valor random que pasa a ser su bg
  attachColors(cssColorValues, allBlocks);


  //change colors on 'shuf' 
  document.addEventListener('keyup', (e) => {
    //escribe shuf para generar y attach colores random
    if (listenToWhatsWritten(e, 'shuf', 4)) {
      attachColors(cssColorValues, allBlocks);
    }
  })
  //or when clicking the dice 
  dice.addEventListener('click', () => {

    setTimeout(() => {
      attachColors(cssColorValues, allBlocks);
    }, 500);
  })

  function listenToWhatsWritten(e, palabra, palabraLongitud) {
    todoLoTipeado += e.key;
    const ultimasLetras = todoLoTipeado.substr(todoLoTipeado.length - palabraLongitud);

    if (ultimasLetras.toLowerCase() == `${palabra}`) {
      console.log(`atajo ${palabra} activado`)
      return true;
    }
  }
  /* cuidado con colocar addeventlisteners dentro de otros addeventlisteners, puede resultar en doble resultados, como aabbcc.. 
  */

  function getCSSValues(arrayOfKeys, outputArray) {
    arrayOfKeys.forEach((item) => {
      arrayOfKeys = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(item);

      outputArray.push(arrayOfKeys);
    });
    //console.log({ outputArray });
  }


  function attachColors(colorsArray, elements) {

    elements.forEach((element) => {
      let rand = Math.floor(Math.random() * colorsArray.length);
      let randEl = colorsArray[rand];

      element.style.background = randEl;
    });
    //console.log({ colorsArray }, { elements })
  }
}

export function makeItemsSortable() {

  var bookmarksUl = document.querySelector("#bookmarksUl");
  var sortable = new Sortable(bookmarksUl, {
    forceFallback: true,
    animation: 520,
    dataIdAttr: "id",
    filter: '.pinned', // items w this class will be not draggable
    store: {
      get: function (sortable) {
        var order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split("|") : [];
      },
      set: function (sortable) {
        var order = sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join("|"));
      },
    }
  });
}


export function listenToToggles() {
  let allToggles = document.querySelectorAll('[aria-expanded]');

  allToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      console.log(e.currentTarget)
      let toggableElId = e.currentTarget.getAttribute('aria-controls');
      let toggableEl = document.getElementById(toggableElId)

      showAndHide(e.currentTarget, toggableEl);

      function showAndHide(button, element) {
        if (element.classList.contains('hidden')) {
          element.classList.remove('hidden');
          button.setAttribute('aria-expanded', 'true')
        } else {
          element.classList.add('hidden');
          button.setAttribute('aria-expanded', 'false')
        }
      }
    })
  })
}