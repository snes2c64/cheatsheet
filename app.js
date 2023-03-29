let mapstring = window.location.hash.substring(1);
let maps = [];
for (let i = 0; i < 8; i++) {
  maps.push(mapstring.substring(i * 10 * 2, (i + 1) * 10 * 2));
}

let num2icon = {
  1: "c64_joy_up",
  2: "c64_joy_down",
  4: "c64_joy_left",
  8: "c64_joy_right",
  16: "c64_btn_1",
  32: "c64_btn_2",
  64: "c64_btn_3",
  128: "c64_btn_a",
};
let map2icon = [
  "dpad_up",
  "dpad_down",
  "dpad_left",
  "dpad_right",
  "snes_button_b-full",
  "snes_button_a-full",
  "snes_button_y-full",
  "snes_button_x-full",
];

maps = maps.map((map) => {
  let r = [];
  for (let i = 0; i < 10; i++) {
    let j = parseInt(map.substring(i * 2, (i + 1) * 2), 16);
    let m = [];
    for (let k = 1; k <= 128; k *= 2) {
      if (j & k) {
        m.push(k);
      }
    }

    r.push(m);
  }
  return r;
});

//maps is an array of arrays, filter out all maps with only empty arrays
maps = maps.filter((map) => {
  return map.some((action) => {
    return action.length > 0;
  });
});

console.log(maps);
let out = {
  maps: [],
};
for (let mapIdx in maps) {
  let map = maps[mapIdx];
  let omap = {
    name: "Map" + mapIdx,
    icon: map2icon[mapIdx],
    actions: [],
  };
  for (actions of map) {
    let a = [];
    for (action of actions) {
      a.push(num2icon[action]);
    }
    omap.actions.push(a);
  }

  out.maps.push(omap);
}

document.getElementsByTagName("body")[0].innerHTML = template(out);
