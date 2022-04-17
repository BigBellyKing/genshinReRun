// Satan possesses those who read this. Beware.

const LEAKS = window.location.search.substring(1) == "leaks";

// Chars that should only show while leaks are shown
var LEAKED_CHARS = [];
var LEAKED_BANNERS = 0;
var LEAKED_UNCERTAIN = 0;

if (!LEAKED_BANNERS && !LEAKED_UNCERTAIN) {
    document.getElementById("leakToggle").disabled = true;
}

if (LEAKS) {
    var LEAKED_CHARS = []; // These two contain stuff that is hidden so when leaks are on just don't hide stuff 
    var LEAKED_BANNERS = 0;
} else {
    var LEAKED_UNCERTAIN = 0; // However, this one is added to the normal uncertain var which means it shouldn't be set if we aren't showing leaks
}

if (LEAKS) {
    document.getElementById("leakToggle").checked = true;
}

function toggleLeaks() {
    if (LEAKS) {
        window.location.search = "";
    } else {
        window.location.search = "leaks";
    }
}

characters = [
    "",
]

char5Star = [
    "Albedo", "Itto", "Eula", "Ganyu", "Hu Tao",
    "Kazuha", "Ayaka", "Ayato", /*"Keqing",*/ "Klee",
    "Shenhe", "Shogun", "Kokomi", "Tartaglia", "Venti",
    "Xiao", "Yae Miko", "Yoimiya", "Zhongli",
]

char4Star = [
    "Barbara", "Beidou", "Bennett", "Chongyun", 
    "Diona", "Fischl", "Gorou", "Sara", "Ningguang",
    "Noelle", // <3
    "Razor", "Rosaria", "Sayu", "Sucrose", "Thoma", "Xiangling",
    "Xingqiu", "Xinyan", "Yanfei", "Yun Jin"
]

characters = characters.concat(char5Star);
characters = characters.concat(char4Star);

bannerNames = [ // I do not care about the actual names, noone knows them
    "Venti","Klee","Tartaglia","Zhongli","Albedo","Ganyu","Xiao","Keqing","Hu Tao","Venti","Tartaglia","Zhongli",
    "Eula","Klee","Kazuha","Ayaka","Yoimiya","Shogun","Kokomi","Tartaglia","Hu Tao","Albedo & Eula","Itto",
    "Shenhe & Xiao", "Zhongli & Ganyu", "Yae Miko", "Shogun & Kokomi", "Ayato & Venti", "Ayaka"
]

var UNCERTAIN_4_STAR_BANNERS = 0

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
        "Albedo", "Eula",
        "Noelle",
        "Rosaria",
        "Bennett"
    ],
    [ // 22
        "Itto",
        "Gorou",
        "Barbara",
        "Xiangling"
    ],
    [ // 23
        "Shenhe", "Xiao",
        "Yun Jin",
        "Ningguang",
        "Chongyun"
    ],
    [ // 24
        "Zhongli", "Ganyu",
        "Xingqiu",
        "Beidou",
        "Yanfei"
    ],
    [ // 25
        "Yae Miko",
        "Fischl",
        "Diona",
        "Thoma"
    ],
    [ // 26
        "Shogun", "Kokomi",
        "Sara",
        "Xinyan",
        "Bennett"
    ],
    [ // 27
        "Ayato", "Venti",
        "Yun Jin",
        "Sucrose",
        "Xiangling"
    ],
    [ // 28
        "Ayaka",
        "Razor",
        "Sayu",
        "Rosaria"
    ],
]

// Latest X are uncertain
var UNCERTAIN_4_STAR_BANNERS = UNCERTAIN_4_STAR_BANNERS + LEAKED_UNCERTAIN;

// Ignores above if characters name matches
const CONFIRMED_4_STAR = "N";

var charCount = {} // Character: num since

for (i in characters) { // Init charcount
    if (LEAKED_CHARS.includes(characters[i])) {continue;}
    charCount[characters[i]] = -1;
}

var ctable = document.getElementById("charTable"); // Init character and banner table
var table = document.getElementById("bannerTable")

for (i in characters) {
    character = characters[i];

    if (LEAKED_CHARS.includes(character)) {continue;}

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
    ii = Number(ii)
    if (ii >= (banners.length - LEAKED_BANNERS)) {continue}

    var uncertainbanner = Boolean(ii > banners.length - 1 - UNCERTAIN_4_STAR_BANNERS)
    var uncertainbannerup = Boolean(ii+1 > banners.length - 1 - UNCERTAIN_4_STAR_BANNERS)

    banner = banners[ii];
    var th = document.createElement("th");
    th.innerText = bannerNames[ii];
    tableChildren[0].appendChild(th);
    var childN = 0;
    for (i in characters) {
        if (i == 0) {continue;}
        character = characters[i];

        if (LEAKED_CHARS.includes(character)) {continue;}

        if (banner.includes(character) && (!uncertainbanner || char5Star.includes(character))) {
            charCount[character] = 0;
        } else if (charCount[character] >= 0) {
            charCount[character] += 1;
        }
        var td = document.createElement("td");
        td.className = "z" + charCount[character];
        if (banners.length != ii+1) {
            if (banners[ii+1].includes(character) && (!uncertainbannerup || char5Star.includes(character))) {
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

        if (uncertainbanner && (i > char5Star.length) && (character != CONFIRMED_4_STAR)) {
            td.innerText += "?"
            td.className = ""
        }

        childN += 1;
        tableChildren[childN].appendChild(td);
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
        if (char5Star.includes(character) && fives || char4Star.includes(character) && !fives) {
            character = character.replaceAll(" ","_");
            ctable.appendChild(ctable.querySelector("#char" + character));
            table.appendChild(table.querySelector("#char" + character));
        }
    }
}


window.addEventListener("scroll",function() {
    ctable.style.left = window.scrollX + "px";
})

table.style.left = ctable.getBoundingClientRect().width;

window.scrollTo(window.scrollMaxX,0);
goThroughAllTheChars(true);
goThroughAllTheChars(false);
