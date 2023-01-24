export function alarm() {
  console.log('hi');


  let alarmHours = document.getElementById('alarmHours');
  let alarmMinutes = document.getElementById('alarmMinutes');
  let alarmSetBtn = document.getElementById('alarmSetBtn');
  let alarmStopBtn = document.getElementById('alarmStopBtn');
  let alarmMsg = document.getElementById('alarmMsg');



  alarmHours.value = new Date().getHours();
  alarmMinutes.value = new Date().getMinutes();

  [alarmHours, alarmMinutes].forEach(item => {
    item.addEventListener('change', () => {
      console.log(item.value)
      if (item.value < 9) {
        item = '0' + item;
      }
    })
  })



  alarmSetBtn.addEventListener('click', alarm);
  let x;
  function alarm() {
    if (alarmHours.value && alarmMinutes.value) {
      alarmStopBtn.classList.remove('hidden'); //deja de ocultar el btn 
      x = setInterval(() => {
        setAlarm();
      }, 1000);
    } else {
      alert('Has dejado uno o ambos campos vacíos!');
    }
  }
  function setAlarm() {
    let d = new Date().toLocaleDateString();
    let then = new Date(`${d} ${alarmHours.value}:${alarmMinutes.value}`).getTime();
    let now = new Date().getTime();
    let distance = then - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //si son de un digito, le añadimos un 0
    hours < 10 ? hours = '0' + hours : hours = hours;
    minutes < 10 ? minutes = '0' + minutes : minutes = minutes;
    seconds < 10 ? seconds = '0' + seconds : seconds = seconds;

    alarmMsg.textContent = `Alarma dentro de ${hours}:${minutes}:${seconds}`;

    let choosenUrl = 'https://www.youtube.com/watch?v=yxe0_BbNdWo'

    if (distance < 0) {
      clearInterval(x);
      alarmMsg.textContent = `La alarma ha sido completada :)`;

      window.open(choosenUrl, '_blank');
    }

    // alarmStopBtn.style.visibility = 'visible';
    alarmStopBtn.addEventListener('click', () => {
      alarmMsg.textContent = `Has cancelado la alarma`;
      // audio.pause();
      // alarmStopBtn.style.visibility = 'hidden';
      clearInterval(x);
      /* 
          alarmHours.value = '--';
          alarmMinutes.value = '--'; */
    });
  }




}