import { useState } from 'react';

export default function Clock() {
  const [clock, setClock] = useState();

  setInterval(function () {
    let time = new Date();
    // let sec = time.getSeconds();
    let min = time.getMinutes();
    let hr = time.getHours();
    let day = time.getDay();
    if (day === 0) {
      day = 'Sun';
    }
    if (day === 1) {
      day = 'Mon';
    }
    if (day === 2) {
      day = 'Tue';
    }
    if (day === 3) {
      day = 'Wed';
    }
    if (day === 4) {
      day = 'Thu';
    }
    if (day === 5) {
      day = 'Fri';
    }
    if (day === 6) {
      day = 'Sat';
    }

    if (min < 10) {
      min = '0' + min;
    }
    if (hr < 10) {
      hr = '0' + hr;
    }
    const sat = hr + ':' + min + ' ' + day;
    setClock(sat);
  });

  return (
    <>
      <div class="clock">
        <div class="display">{clock}</div>
      </div>
    </>
  );
}
