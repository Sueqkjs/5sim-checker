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
    result.map((x, i) => `${product}で${i}番目に安いのは、${x.country}のチャネル ${x.channelId} です。
値段は${x.cost}ロシアルーブルで在庫数は${x.count}個です。`).join("\n\n");
  let length = Math.max(...$("#result").value.split("\n").map(x => x.length));
  $("#result").setAttribute("cols", length + 17);
  $("#result").setAttribute("rows", $("#result").value.split("\n").length+1);
}

function list(res, i) {
  const arr = [];
  let no = [];
  for(let j = 0; j < i; j++) {
    let result;
    for (let country in res) {
      for (let channelId in res[country]) {
        const channel = res[country][channelId];
        if (no.find(x => x.country === country && x.channelId === channelId)) continue;
        if (blackCount.includes(channel.count)) continue;
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
        no.push({ country, channelId });
      }
    }
    arr.push(result);
  }
  return arr;
}
