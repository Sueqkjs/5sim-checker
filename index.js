const $ = document.querySelector.bind(document);
const blackCount = [ 0, 1000, 2000 ];

$("#check").onclick = async() => {
  const product = $("#product").value;
  const r = await (
    await fetch("https://leftunacceptablecoderesource.sueqk.repl.co/c?product=" + product, { mode: "cors" })
  ).text();
  if (r?.match("incorrect")) return $("#result").value = "プロダクトミスってるぞあほ";
  const res = JSON.parse(r)[product];
  let result = list(res, 3);
  $("#result").value = 
    result.map((x, i) => `${product}で${i + 1}番目に安いのは、${x.country}のチャネル ${x.channelId} です。
値段は${x.cost}ロシアルーブルで在庫数は${x.count}個です。`).join("\n\n");
}

function list(res, i) {
  const arr = new Set();
  while (arr.size < i) {
    let result;
    for (let country in res) {
      for (let channelId in res[country]) {
        const channel = res[country][channelId];
        if (!channel) continue;
        if (blackCount.includes(channel.count)) continue;
        if (!result) result = {
          country,
          channelId,
          ...channel
        };
        if (result.cost > channel.cost) {
          result = Object.create({
            country,
            channelId,
            ...channel
          });
          delete res[country][channelId];
        }
      }
    }
    arr.add(result);
  }
  return [ ...arr ];
}
