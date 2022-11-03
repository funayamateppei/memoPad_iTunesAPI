
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
  $('.header ol').remove()
  array.push('<li>' + storage[storage.length - 1].artist + ' _ ' + storage[storage.length - 1].song + '</li>');
  $('.header').append(`<ol></ol>`);
  storage.map((element, index) => {
    $(`ol`).append(array[index]);
  })
  search();
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
    array.push('<li>' + storage[i].artist + ' _ ' + storage[i].song + '</li>');
  }
  $('.header').append(`<ol></ol>`);
  storage.map((element, index) => {
    $(`ol`).append(array[index]);
  })
}




// デリート機能
$('.delete').on('click', () => {
  // 入力されている番号のデータを削除
  let number = $('#number').val() - 1;
  console.log(storage);
  storage.splice(number, 1);
  // 入力されたnumber番目の配列の中身を削除し、localStorageを上書き
  const jsonData = JSON.stringify(storage);
  localStorage.setItem('kye', jsonData);
  // すでに表示してある検索履歴を全部削除
  $('.header ol').remove();
  console.log(array);
  // リスト表示する配列を空にする
  array.length = 0;
  // 削除後の配列を使って検索履歴を再作成
  for (let i = 0; i < storage.length; i++) {
    array.push('<li>' + storage[i].artist + ' _ ' + storage[i].song + '</li>');
  }
  $('.header').append(`<ol></ol>`);
  storage.map((element, index) => {
    $(`ol`).append(array[index]);
  })
})


// 検索履歴を使ったform上書き機能
$('.send').on('click', () => {
  let number = $('#number').val() - 1;
  $('#artist').val(storage[number].artist);
  $('#song').val(storage[number].song);
  search();
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
    $(`.api .item${i}`).append(html);
  }
}

// すでに表示してあるものを削除
const crearTable = () => {
  $('.api div').remove();
}