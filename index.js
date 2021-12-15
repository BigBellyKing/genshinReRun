// every single one of my fucking projects i keep the same code that i started with even though it FUCKING SUCKS

// but i can't be bothered to redo it so.....


characters = [
    "",
]

char5Star = [
    "Albedo", "Itto", "Eula", "Ganyu", "Hu Tao",
    "Kazuha", "Ayaka", "Keqing", "Klee",
    "Shogun", "Kokomi", "Tartaglia", "Venti", "Xiao",
    "Yoimiya", "Zhongli",
]

char4Star = [
    "Barbara", // <3
    "Beidou", "Bennett", "Chongyun", 
    "Diona", "Fischl", "Gorou", "Sara", "Ningguang",
    "Noelle", // <3
    "Razor", "Rosaria", "Sayu", "Sucrose", "Thoma", "Xiangling",
    "Xingqiu", "Xinyan", "Yanfei"
]

characters = characters.concat(char5Star);
characters = characters.concat(char4Star)

bannerNames = [ // I do not care about the actual names, noone knows them
    "Venti 1","Klee 1","Tartaglia 1","Zhongli 1","Albedo 1","Ganyu 1","Xiao 1","Keqing","Hu Tao 1","Venti 2","Tartaglia 2","Zhongli 2",
    "Eula 1","Klee 2","Kazuha 1","Ayaka 1","Yoimiya 1","Shogun 1","Kokomi 1","Tartaglia 3","Hu Tao 2","Albedo 2 & Eula 2","Itto 1"
]

banners = [
    [ // 0
        "Venti",
        "Fischl",
        "Xiangling",
        "Barbara"
    ],
    [ // 1
        "Klee",
        "Sucrose",
        "Noelle",
        "Xingqiu"
    ],
    [ // 2
        "Tartaglia",
        "Ningguang",
        "Beidou",
        "Diona"
    ],
    [ // 3
        "Zhongli",
        "Chongyun",
        "Razor",
        "Xinyan"
    ],
    [ // 4
        "Albedo",
        "Fischl",
        "Sucrose",
        "Bennett",
    ],
    [ // 5
        "Ganyu",
        "Xiangling",
        "Noelle",
        "Xingqiu"
    ],
    [ // 6
        "Xiao",
        "Beidou",
        "Xinyan",
        "Diona"
    ],
    [ // 7
        "Keqing",
        "Barbara",
        "Bennett",
        "Ningguang"
    ],
    [ // 8
        "Hu Tao",
        "Xiangling",
        "Chongyun",
        "Xingqiu"
    ],
    [ // 9
        "Venti",
        "Sucrose",
        "Noelle",
        "Razor"
    ],
    [ // 10
        "Tartaglia",
        "Fischl",
        "Barbara",
        "Rosaria"
    ],
    [ // 11
        "Zhongli",
        "Noelle",
        "Diona",
        "Yanfei"
    ],
    [ // 12
        "Eula",
        "Xingqiu",
        "Beidou",
        "Xinyan"
    ],
    [ // 13
        "Klee",
        "Fischl",
        "Barbara",
        "Sucrose"
    ],
    [ // 14
        "Kazuha",
        "Bennett",
        "Razor",
        "Rosaria"
    ],
    [ // 15
        "Ayaka",
        "Chongyun",
        "Ningguang",
        "Yanfei"
    ],
    [ // 16
        "Yoimiya",
        "Xinyan",
        "Diona",
        "Sayu"
    ],
    [ // 17
        "Shogun",
        "Xiangling",
        "Sucrose",
        "Sara"
    ],
    [ // 18
        "Kokomi",
        "Xingqiu",
        "Beidou",
        "Rosaria"   
    ],
    [ // 19
        "Tartaglia",
        "Chongyun",
        "Ningguang",
        "Yanfei"
    ],
    [ // 20
        "Hu Tao",
        "Diona",
        "Sayu",
        "Thoma"
    ],
    [ // 21
        "Albedo","Eula",
        "Noelle",
        "Rosaria",
        "Bennett"
    ],
    [ // 22
        "Itto",
        "Gorou",
        "Barbara",
        "Xiangling"
    ]
]

var charCount = {} // Character: num since

for (i in characters) { // Init charcount
    charCount[characters[i]] = -1;
}

var ctable = document.getElementById("charTable"); // Init character and banner table
var table = document.getElementById("bannerTable")

for (i in characters) {
    character = characters[i];
    var tr = document.createElement("tr");
    tr.id = "char" + character.replaceAll(" ","_");
    if (i == 0) {
        var td = document.createElement("th");
    } else {
        var td = document.createElement("td");
    }
    td.innerText = character;
    tr.appendChild(td);
    ctable.appendChild(tr)
    var tr = document.createElement("tr");
    tr.id = "char" + character.replaceAll(" ","_");
    table.appendChild(tr)
}

var tableChildren = table.childNodes; // Add banners

for (ii in banners) {
    banner = banners[ii];
    var th = document.createElement("th");
    th.innerText = bannerNames[ii];
    tableChildren[0].appendChild(th);
    for (i in characters) {
        if (i == 0) {continue;}
        character = characters[i];
        if (banner.includes(character)) {
            charCount[character] = 0;
        } else if (charCount[character] >= 0) {
            charCount[character] += 1;
        }
        var td = document.createElement("td");
        td.className = "z" + charCount[character];
        if (banners.length != Number(ii)+1) {
            if (banners[Number(ii)+1].includes(character)) {
                td.classList.add("lastThing");
            }
        }

        td.title = character;

        if (charCount[character] == 0) {
            td.innerText = "✔";
        } else if (charCount[character] == -1) {
            td.innerText = "-"
        } else {
            td.innerText = charCount[character];
        }

        // This part is for ?ing 4 stars we don't know

        // i > 16 is all 4 star characters, if a 5 star is added add one
        // ii is banner number
        if (ii > 22 && i > 16 && character != "t") { // CHANGE WHEN CHARACTERS FOR next wishes are revealed please
            td.innerText = "?"
            td.className = ""
        }

        tableChildren[i].appendChild(td);
    }
}

// SORTING TIME!!!

function sortObjectEntries(obj){
    return  Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(el=>el[0])
} // https://medium.com/@gmcharmy/sort-objects-in-javascript-e-c-how-to-get-sorted-values-from-an-object-142a9ae7157c

var sortedCount = sortObjectEntries(charCount);

function goThroughAllTheChars(fives=true) { // poor way of doing this :)
    for (i in sortedCount) {
        var character = sortedCount[i];
        console.log(char5Star.includes(character) && fives,character)
        if (char5Star.includes(character) && fives || char4Star.includes(character) && !fives) {
            character = character.replaceAll(" ","_");
            ctable.appendChild(ctable.querySelector("#char" + character));
            table.appendChild(table.querySelector("#char" + character));
        }
    }
}

goThroughAllTheChars(true);
goThroughAllTheChars(false);
