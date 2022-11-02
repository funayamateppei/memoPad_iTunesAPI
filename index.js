
// ------------------- hamburger menu -----------------------
const bar = document.querySelector('.navbar');
const p = document.querySelector('.nav p');
const list = document.querySelector('.search-list');


bar.addEventListener('click', () => {
  list.classList.toggle('list-active');
  bar.classList.toggle('toggle');
  p.classList.toggle('none');
});


// ------------------ localStorage ------------------------
const storage = [];
const array = [];
const l = storage.length;

// ボタンクリックで配列にpush→localStorageに入れる
$('.btn button').on('click', () => {
  const data = {
    artist: $('#artist').val(),
    song: $('#song').val()
  }
  storage.push(data);
  const jsonData = JSON.stringify(storage);
  localStorage.setItem('kye', jsonData);
  // 検索履歴作成
  let end = storage[storage.length - 1];
  array.push('<p>' + end.artist + ' _ ' + end.song + '</p>');
  $('.header').append(`<div class="box${storage.length}"></div>`);
  $(`.header .box${storage.length -1}`).append(array[storage.length - 1]);
  $(`.header .box${storage.length -1}`).append('<button class="send">send</button>');
  $(`.header .box${storage.length -1}`).append('<button class="delete">delete</button>');
})

// デリート機能
// $('.delete').on('click', () => {

// })

// リロードしたときの更新
if (localStorage.getItem('kye')) {
  const jsonData = localStorage.getItem('kye');
  const Data = JSON.parse(jsonData);
  for (let i = 0; i < Data.length; i++) {
    storage.push(Data[i]);
  }
  // 検索履歴作成
  for (let i = 0; i < storage.length; i++) {
    array.push('<p>' + storage[i].artist + ' _ ' + storage[i].song + '</p>');
    $('.header').append(`<div class="box${i}"></div>`);
    $(`.header .box${i}`).append(array[i]);
    $(`.header .box${i}`).append('<button class="send">send</button>');
    $(`.header .box${i}`).append('<button class="delete">delete</button>');
  }
}
