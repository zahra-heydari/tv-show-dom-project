const container = document.querySelector(".container-fluid");
document.body.style.textAlign = "center";
const input = document.querySelector("input");
const section1 = document.createElement("section");
section1.classList.add("row");

let restEpisode = [];
const fetchAPI = async function () {
  try {
    // const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    // const data=await res.json();
    // console.log(data);
    await fetch("https://api.tvmaze.com/shows/82/episodes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        episFunc(data);
        search(data);
        select(data);
      });
  } catch (error) {
    console.log(error);
  }
};
container.append(section1);
const replaceFunc = function (str) {
  str = str.replaceAll("<p>", "");
  str = str.replaceAll("</p>", "");
  str = str.replaceAll("<br />", "");
  str = str.replaceAll("</br>", "");
  str = str.replaceAll("<br>", "");
  return str;
};

const episFunc = function (data) {
  data.map((episode) => {
    const section2 = document.createElement("section");
    section2.className = "col col-sm-6 col-md-4 col-xl-3 col-lg-4";

    section1.append(section2);
    const a = document.createElement("a");
    a.classList.add("aTag");
    a.classList.add("fw-semibold");
    a.href = episode.url;
    a.style.textDecoration = "none";
    a.style.color = "black";
    const div = document.createElement("div");

    div.classList.add("d");

    div.classList.add("card");
    div.style.width = "18rem";

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = episode.image.medium;
    div.append(img);

    const divtodiv = document.createElement("div");
    divtodiv.classList.add("card-body");
    div.append(divtodiv);

    a.innerText = episode.name;
    a.classList.add("card-title");

    const p = document.createElement("p");
    p.classList.add("card-text");
    divtodiv.append(a);

    const seasonNumber = Number(episode.season).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const episodeNumber = Number(episode.number).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const p2 = document.createElement("p");
    p2.textContent = `S${seasonNumber}E${episodeNumber}`;
    divtodiv.append(p2);
    divtodiv.append(p2);
    p.append(replaceFunc(episode.summary).split(" ", 20).join(" "));
    divtodiv.append(p);
    div.addEventListener("mouseover", () => {
      div.classList.add("divCss");
    });
    div.addEventListener("mouseleave", () => {
      div.classList.remove("divCss");
    });

    section2.append(div);
  });
};

fetchAPI();
const p = document.querySelector(".count");
const i = document.querySelector("i");

function search(data) {
  input.addEventListener("input", (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    if (searchInput) {
      restEpisode = data.filter(
        (element) =>
          element.name.toLowerCase().includes(searchInput) ||
          element.summary.toLowerCase().includes(searchInput)
      );

      section1.innerHTML = "";
      episFunc(restEpisode);
      p.textContent = `${restEpisode.length} is found`;
      p.style.marginRight = "85%";
      p.style.marginTop = "0px";
      p.style.color = "#891618";
    } else {
      p.textContent = "";
    }
  });
}
let arr = [];
const sele = document.querySelector("#select");

function select(data) {
  data.map((element) => {
    const option = document.createElement("option");
    option.value = element.name;
    const seasonNumber = Number(element.season).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const episodeNumber = Number(element.number).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    option.textContent = `S${seasonNumber}E${episodeNumber} - ${element.name}`;
    sele.append(option);
  });
  sele.addEventListener("change", () => {
    if (sele.value === "All Episodes") {
      section1.innerHTML = "";
      episFunc(data);
    } else {
      arr = data.filter((ele) => ele.name === sele.value);
      section1.innerHTML = "";
      episFunc(arr);
    }
  });
}
