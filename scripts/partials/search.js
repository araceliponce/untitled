export function searchWithHelpers() {
  console.log('search with helpers loaded')

  let searchHelpers = [
    {
      label: 'Traducir a español',
      key: 'ae',
      represents: 'https://www.deepl.com/translator#en/es/'
    },
    {
      label: 'Traducir a inglés',
      key: 'ai',
      represents: 'https://www.deepl.com/translator#es/en/'
    },
    {
      label: 'Buscar en Google Fonts',
      key: 'gf',
      represents: 'https://fonts.google.com/?preview=&query='
    },
    {
      label: 'Buscar en mi Gmail',
      key: 'gm',
      represents: 'https://mail.google.com/mail/u/0/#search/'
    },
    {
      label: 'Buscar en Genius',
      key: 'gn',
      represents: 'https://genius.com/search?q='
    },
  ]


  const searchInput = document.getElementById('searchInput');
  const wholeInput = document.getElementById('wholeInput')

  let url;
  let existeEnArreglo; //se obtiene con funcion
  createDataList();
  listenToFirstInput();


  function createDataList() {
    let datalist = document.createElement('datalist')
    datalist.setAttribute('id', 'helpersList')
    searchHelpers.forEach(helper => {
      let bb = document.createElement('option');
      bb.value = helper.label; /* value es lo que aparece */
      bb.innerText = helper.label;
      datalist.append(bb)
    })

    document.documentElement.append(datalist)

  }
  function listenToFirstInput() {
    searchInput.addEventListener('keydown', (e) => {
      // console.log(e.code)
      if (e.code == 'Enter') {
        //obtenemos el valor del input sin los espacios de los costados
        let searchInputValue = searchInput.value.trim();

        //buscamos
        findInArray(searchInputValue, searchHelpers, 'label')

        //Si el value no se encuentra en ningun helper, la busqueda es simple
        if (!existeEnArreglo) {
          console.log(searchInputValue);
          url = 'https://www.google.com/search?&q=' + searchInputValue;
          window.open(url)
        }
        if (existeEnArreglo) {
          //auto crear y enfocar
          let createdInput = document.createElement('input');
          createdInput.setAttribute('id', 'createdInput');
          createdInput.className = 'underlined';
          createdInput.setAttribute('autocomplete', 'off')
          searchInput.insertAdjacentElement('afterend', createdInput)

          //bug solucionado: ya no pueden tenerse mas de dos inputs en contenedor
          while (wholeInput.children.length > 2) {
            let lastChild = wholeInput.querySelector(':last-child');
            wholeInput.removeChild(lastChild);
          };

          createdInput.focus();

          createdInput.addEventListener('keydown', (e) => {

            if (e.code == "Enter") {
              let createdValue = createdInput.value.replaceAll(' ', '%20')

              let raiz = existeEnArreglo.represents;
              url = raiz + createdValue;
              console.log(url)
              window.open(url)
            }
          })
        }
      }
    })
  }






  //--------------------
  //devuelve el objeto donde se encuentra el value. util para usar en condicionales y acceder a sus keys
  function findInArray(valor, arreglo, key) {
    // valueIsOnObject = Object.values(unobjeto).includes(unvalor);
    existeEnArreglo = arreglo.find((o) => o[key] === valor);
    // console.log(existeEnArreglo)
    return existeEnArreglo;
  }

}