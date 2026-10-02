// MV 源为 bilibili：official=true 为官方账号投稿（GEM鄧紫棋 / 蜂鸟音乐），false 为高画质搬运版
// 封面已本地化到 public/covers/mv/
export const mvs = [
  { title: '光年之外', en: 'LIGHT YEARS AWAY', year: '2016', bvid: 'BV1ws411Y7wi', cover: '/covers/mv/light-years.jpg', official: false, note: '电影《太空旅客》中文主题曲，B站播放近 500 万' },
  { title: '倒数', en: 'TIK TOK', year: '2018', bvid: 'BV1Xs411M7yW', cover: '/covers/mv/tik-tok.jpg', official: true, note: '官方厂牌蜂鸟音乐投稿，B站播放超 370 万' },
  { title: 'GLORIA', en: 'REVELATION · Chapter 01', year: '2022', bvid: 'BV1kd4y1N7sb', cover: '/covers/mv/gloria.jpg', official: true, note: '《启示录》MV 连续剧第一章，官方投稿' },
  { title: '句号', en: 'FULL STOP', year: '2019', bvid: 'BV1RJ411R7tF', cover: '/covers/mv/full-stop.jpg', official: false, note: 'B站播放超 1,300 万的人气版本' },
  { title: '来自天堂的魔鬼', en: 'AWAY', year: '2015', bvid: 'BV1KL411A721', cover: '/covers/mv/away.jpg', official: false, note: '8K 修复画质' },
  { title: '受难曲', en: 'PASSION', year: '2022', bvid: 'BV1wv4y1F7tF', cover: '/covers/mv/passion.jpg', official: true, note: '《启示录》第六章，官方投稿' },
  { title: '新的心跳', en: 'HEARTBEAT', year: '2015', bvid: 'BV1Le4y1N7dC', cover: '/covers/mv/heartbeat.jpg', official: false, note: '4K Hi-Res 修复画质' },
  { title: '摩天动物园', en: 'CITY ZOO', year: '2019', bvid: 'BV18J411C7Ys', cover: '/covers/mv/city-zoo.jpg', official: false, note: '专辑同名主打' },
  { title: '多远都要在一起', en: 'LONG DISTANCE', year: '2015', bvid: 'BV1BZ421B7FF', cover: '/covers/mv/long-distance.jpg', official: false, note: '4K 臻藏修复版' },
  { title: '我的秘密', en: 'MY SECRET', year: '2011', bvid: 'BV1CQ4y1r7bb', cover: '/covers/mv/my-secret.jpg', official: false, note: '《My Secret》专辑代表作' },
]

// 特别收录：启示录 MV 连续剧完整版（官方投稿）
export const mvSpecial = {
  title: '《启示录》MV 连续剧 · 全旅程版',
  bvid: 'BV1rG4y177pP',
  cover: '/covers/mv/revelation-journey.jpg',
  official: true,
  note: '57 分钟完整版：14 首 MV 串成一部科幻电影，从乐土到废土的完整故事。官方投稿。',
}

// 《启示录》MV 连续剧：官方按「章」投稿的单独版本，14 章齐全
export const revelationChapters = [
  { chapter: '01', title: 'GLORIA', bvid: 'BV1kd4y1N7sb', cover: '/covers/mv/gloria.jpg' },
  { chapter: '02', title: 'HELL', bvid: 'BV1oF411w7Kv', cover: '/covers/mv/hell.jpg' },
  { chapter: '03', title: '只有我和你的地方', bvid: 'BV1qW4y1h7wv', cover: '/covers/mv/only-you-and-me.jpg' },
  { chapter: '04', title: '你不是第一个离开的人', bvid: 'BV1gB4y1z78T', cover: '/covers/mv/not-the-first.jpg' },
  { chapter: '05', title: '不想回家', bvid: 'BV1vg411r7mq', cover: '/covers/mv/not-going-home.jpg' },
  { chapter: '06', title: '受难曲', bvid: 'BV1wv4y1F7tF', cover: '/covers/mv/passion.jpg' },
  { chapter: '07', title: '冰河时代', bvid: 'BV1bt4y1E7UU', cover: '/covers/mv/ice-age.jpg' },
  { chapter: '08', title: '少年与海', bvid: 'BV1gU4y1r73F', cover: '/covers/mv/young-and-sea.jpg' },
  { chapter: '09', title: '老人与海', bvid: 'BV1Ta41137HH', cover: '/covers/mv/old-man-and-sea.jpg' },
  { chapter: '12', title: '让世界暂停一分钟', bvid: 'BV1XW4y1i72L', cover: '/covers/mv/pause-the-world.jpg' },
  { chapter: '10', title: 'FIND YOU', bvid: 'BV1ve4y1o7k3', cover: '/covers/mv/find-you.jpg' },
  { chapter: '11', title: '离心力', bvid: 'BV1324y1Z7F9', cover: '/covers/mv/centrifugal-force.jpg' },
  { chapter: '13', title: '夜的尽头', bvid: 'BV1z8411t7tB', cover: '/covers/mv/end-of-the-night.jpg' },
  { chapter: '14', title: '天空没有极限', bvid: 'BV1fd4y1T72J', cover: '/covers/mv/sky-no-limits.jpg' },
]


// 西语版《Revelación》：官方账号（GEM鄧紫棋）按章投稿（第 12/13/14 集 B 站暂无单独投稿）；zh 为对应的中文版曲目
export const spanishChapters = [
  { chapter: '01', title: 'Gloria', zh: '同名西语版', bvid: 'BV1Xh411K7Ts', cover: '/covers/mv/gloria-es.jpg' },
  { chapter: '02', title: 'Hell', zh: '同名西语版', bvid: 'BV12a4y1c7kc', cover: '/covers/mv/hell-es.jpg' },
  { chapter: '03', title: 'Me & You', zh: '只有我和你的地方', bvid: 'BV1Pm4y1E7ns', cover: '/covers/mv/me-and-you-es.jpg' },
  { chapter: '04', title: 'El Hombre que Ríe', zh: '你不是第一个离开的人', bvid: 'BV11k4y1K7kj', cover: '/covers/mv/el-hombre-que-rie-es.jpg' },
  { chapter: '05', title: 'One More Night', zh: '不想回家', bvid: 'BV1aN411m7bd', cover: '/covers/mv/one-more-night-es.jpg' },
  { chapter: '06', title: 'Pasión', zh: '受难曲', bvid: 'BV1Tx4y1o7n8', cover: '/covers/mv/pasion-es.jpg' },
  { chapter: '07', title: 'La Edad de Hielo', zh: '冰河时代', bvid: 'BV1eg4y1w7Wo', cover: '/covers/mv/la-edad-de-hielo-es.jpg' },
  { chapter: '08', title: 'El Joven y El Mar', zh: '少年与海', bvid: 'BV1hk4y1P7Ax', cover: '/covers/mv/el-joven-y-el-mar-es.jpg' },
  { chapter: '09', title: 'Yo Soy Eterno', zh: '老人与海', bvid: 'BV11M4y1j7dR', cover: '/covers/mv/yo-soy-eterno-es.jpg' },
  { chapter: '10', title: 'Find You', zh: '同名西语版', bvid: 'BV1CM4y1j7mt', cover: '/covers/mv/find-you-es.jpg' },
  { chapter: '11', title: 'Fuerza Centrífuga', zh: '离心力', bvid: 'BV1vV4y1h7nv', cover: '/covers/mv/fuerza-centrifuga-es.jpg' },
]
