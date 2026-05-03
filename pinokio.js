module.exports = {
  version: "2.0",
  title: "Space Shooter",
  description: "HTML5 Space Shooter Oyunu",
  icon: "fa-solid fa-rocket",
  menu: async (kernel) => {
    return [
      {
        html: '<i class="fa-solid fa-play"></i> Başlat',
        href: "start.json"
      }
    ]
  }
}
