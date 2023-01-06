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