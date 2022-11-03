
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

// ボタンクリックで配列にpush→localStorageに入れる
$('.btn button').on('click', () => {
  if ($('#artist').val() === "" && $('#song').val() === "") {
    alert("ArtistかSongを入力してください");
    return;
  }
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
  $('.header').append(`<div class="box${storage.length - 1}"></div>`);
  $(`.header .box${storage.length - 1}`).append(array[storage.length - 1]);
  $(`.header .box${storage.length - 1}`).append(`<button class="send ${storage.length - 1}">send</button>`);
  $(`.header .box${storage.length - 1}`).append(`<button class="delete num${storage.length - 1}">delete</button>`);

  search();
  console.log()
})

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
    $(`.header .box${i}`).append(`<button class="send num${i}">send</button>`);
    $(`.header .box${i}`).append(`<button class="delete num${i}">delete</button>`);
  }
}

// デリート機能
// 動的に作られたdivタグの連番をとれば変数に入れて配列、localStorageを削除できる
// ↑まだコードは書いていない
// クリックイベントは<div class=header></div>内のdivタグに設定されている
//    →index($(this))でクリックされた要素を持ってこれない
$('.header div').on('click', '.delete', () => {
  let number = $('.header div').index($(this));
  console.log(number)
  console.log('hoge');
})

// --------------------- API -------------------------
const search = () => {
  // 検索ワード
  const keyword = $('#artist').val() + ' ' + $('#song').val();
  // 検索条件のベースとなるもの
  const params = {
    lang: 'ja_jp',
    entry: 'music',
    media: 'music',
    country: 'JP',
    term: keyword,
    limit: 21
  };

  // iTunes API コール
  $.ajax({
    url: 'https://itunes.apple.com/search',
    method: 'GET',
    data: params,
    // dataTypeをjsonpにする必要があります
    dataType: 'jsonp',

    // 処理が成功したら、jsonが返却されます
    success: (json) => {
      showData(json);
      console.log(json);
    },

    error: () => {
      console.log('itunes api search error. 検索に失敗しました');
    }
  })
}

// 成功したときに出力
// 取得したデータを表示する
const showData = (json) => {
  crearTable();
  for (let i = 0, len = json.results.length; i < len; i++) {
    let result = json.results[i];
    let html = '<p>Title : ' + " " + result.trackName + '</p>';
    $('.api').append(`<div class="item${i}"></div>`)
    html += `<img src="${result.artworkUrl100}">`;
    html += '<p>Artist : ' + result.artistName + '</p>';
    html += '<audio src="' + result.previewUrl + '" controls />';
    html += '<button>ライブラリへ保存</button>';
    $(`.api .item${i}`).append(html);
  }
}

// すでに表示してあるものを削除
const crearTable = () => {
  $('.api div').remove();
}


// 検索する
// search({
//   term: 'きゃりーぱみゅぱみゅ',
//   limit: 30
// });