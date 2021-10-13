function solution(files) {
  const arr = [];
  for (const x of files) {
    const [, head, num] = x.match(/([a-zA-z-.\r]+)([0-9]{1,5})/);
    console.log(head, num);
    arr.push([x, head, num]);
  }

  arr.sort((a, b) =>
    a[1].toLowerCase() > b[1].toLowerCase()
      ? 1
      : b[1].toLowerCase() > a[1].toLowerCase()
      ? -1
      : +a[2] > +b[2]
      ? 1
      : +b[2] > +a[2]
      ? -1
      : 0
  );

  return arr.map(v => v[0]);
}

console.log(
  solution([
    'img00000.png',
    'img10.png',
    'img1.png',
    'IMG01.GIF',
    'img02.png',
    'img2.JPG',
    '-2'
  ])
);
console.log(
  solution([
    'F-5 Freedom Fighter',
    'B-50 Superfortress',
    'A-10 Thunderbolt II',
    'F-14 Tomcat'
  ])
);
