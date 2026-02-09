const map = L.map("map").setView([33.3, 133.6], 8);

// 地図タイル
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// アイコン
const icons = {
  nature: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32]
  }),
  history: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [32, 32]
  }),
  food: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32]
  })
};

// 観光地データ（13か所）
const spots = [
  // 自然
  { name:"四万十川", lat:32.991, lng:132.933, type:"nature",
    img:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Shimanto_River.jpg",
    desc:"日本最後の清流",
    dialect:"めっちゃきれいやき！" },

  { name:"柏島", lat:32.779, lng:132.646, type:"nature",
    img:"https://upload.wikimedia.org/wikipedia/commons/5/53/Kashiwajima.jpg",
    desc:"透明度抜群の海",
    dialect:"海が宝石みたいやき！" },

  { name:"足摺岬", lat:32.783, lng:132.958, type:"nature",
    img:"https://upload.wikimedia.org/wikipedia/commons/0/0c/Ashizuri_Cape.jpg",
    desc:"太平洋の絶景",
    dialect:"絶景すぎて声出るで！" },

  { name:"室戸岬", lat:33.258, lng:134.176, type:"nature",
    img:"https://upload.wikimedia.org/wikipedia/commons/6/64/Muroto_Cape.jpg",
    desc:"ダイナミックな海岸",
    dialect:"迫力がすごいき！" },

  // 歴史
  { name:"高知城", lat:33.559, lng:133.531, type:"history",
    img:"https://upload.wikimedia.org/wikipedia/commons/4/4c/Kochi_Castle.jpg",
    desc:"現存天守",
    dialect:"高知のシンボルやき！" },

  { name:"坂本龍馬記念館", lat:33.507, lng:133.570, type:"history",
    img:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Ryoma_Museum.jpg",
    desc:"龍馬の生涯",
    dialect:"龍馬好きにはたまらん！" },

  { name:"岩崎弥太郎生家", lat:33.445, lng:133.043, type:"history",
    img:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Iwasaki_birthplace.jpg",
    desc:"三菱財閥創始者の生家",
    dialect:"ここが原点ながやき！" },

  { name:"中岡慎太郎館", lat:33.319, lng:134.154, type:"history",
    img:"https://upload.wikimedia.org/wikipedia/commons/3/35/Nakaoka_Museum.jpg",
    desc:"幕末志士の資料館",
    dialect:"歴史を感じるで！" },

  // 食
  { name:"ひろめ市場", lat:33.559, lng:133.532, type:"food",
    img:"https://upload.wikimedia.org/wikipedia/commons/6/6a/Hirome_Market.jpg",
    desc:"カツオのたたき",
    dialect:"食べんと帰れんき！" },

  { name:"久礼大正町市場", lat:33.344, lng:133.255, type:"food",
    img:"https://upload.wikimedia.org/wikipedia/commons/3/3f/Kure_Market.jpg",
    desc:"漁師町の市場",
    dialect:"新鮮そのもんやき！" },

  { name:"安芸しらす食堂", lat:33.502, lng:133.904, type:"food",
    img:"https://upload.wikimedia.org/wikipedia/commons/8/86/Shirasu_don.jpg",
    desc:"しらす丼",
    dialect:"ペロッといける！" },

  { name:"室戸キンメ丼", lat:33.258, lng:134.171, type:"food",
    img:"https://upload.wikimedia.org/wikipedia/commons/2/25/Kinmedon.jpg",
    desc:"室戸名物",
    dialect:"これは贅沢やき！" }
];

// マーカー管理
const markers = [];

spots.forEach(spot => {
  const marker = L.marker([spot.lat, spot.lng], {
    icon: icons[spot.type]
  }).addTo(map);

  marker.type = spot.type;

  marker.bindPopup(`
    <strong>${spot.name}</strong><br>
    <img src="${spot.img}" class="popup-img">
    ${spot.desc}
    <div class="dialect">${spot.dialect}</div>
  `);

  markers.push(marker);
});

// カテゴリON/OFF
document.querySelectorAll("#filter input").forEach(cb => {
  cb.addEventListener("change", () => {
    const type = cb.dataset.type;
    markers.forEach(marker => {
      if (marker.type === type) {
        cb.checked ? map.addLayer(marker) : map.removeLayer(marker);
      }
    });
  });
});
