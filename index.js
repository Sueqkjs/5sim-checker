const $ = document.querySelector.bind(document);
const blackCount = [ 0, 1000, 2000 ];

$("#check").onclick = async() => {
  const product = $("#product").value;
  const r = await fetch("https://5sim.net/v1/guest/prices?product=" + product, { mode: "no-cors" });
  console.log(r);
  if (r.status === 400) return $("#result").value = "プロダクトミスってるぞあほ";
  const res = (await r.json())[product];
  let result;
  for (let country in res) {
    for (let channelId in res[country]) {
      const channel = res[country][channelId];
      if (blackCount.includes(channel.count)) return;
      if (!result) result = {
        country,
        channelId,
        ...channel
      };
      if (result.cost > channel.cost) result = {
        country,
        channelId,
        ...channel
      };
    }
  }
  $("#result").value = `
  ${product}で一番安いのは、${result.country}のチャネル ${result.channelId}です。
  値段は${result.cost}で在庫数は${result.count}個です。
  `;
}
