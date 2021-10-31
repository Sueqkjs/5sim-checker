const $ = document.querySelector.bind(document);
const blackCount = [ 0, 1000, 2000 ];

$("#check").onclick = async() => {
  const product = $("#product").value;
  const r = await (
    await fetch("https://leftunacceptablecoderesource.sueqk.repl.co/c?product=" + product, { mode: "cors" })
  ).text();
  console.log(r);
  if (r?.match("incorrect")) return $("#result").value = "プロダクトミスってるぞあほ";
  const res = JSON.parse(r)product];
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
