let vh = 0.01 * window.innerHeight;
function render(t) {
  return function (e, a) {
    return a % 2 ? t[e] : e;
  };
}
document.documentElement.style.setProperty("--vh", `${vh}px`),
  window.addEventListener("resize", () => {
    let t = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${t}px`);
  });
let relaPath = "./",
  prioridad = document.URL.includes("prioridad"),
  personalizar = document.URL.includes("personalizar"),
  mallaPersonal = document.URL.includes("malla."),
  contact = document.URL.includes("contact"),
  fullCareerName = "",
  texts = "Malla";
mallaPersonal
  ? (texts = "Personal")
  : prioridad
  ? (texts = "Prioridad")
  : personalizar && (texts = "Generadora"),
  ("Malla" !== texts || contact) && (relaPath = "../");
let params = new URLSearchParams(window.location.search),
  carr = params.get("m");
carr || (carr = "UAI_INF_IND2020");
let sct = !1;
"true" === params.get("SCT") && (sct = !0), console.log("dom");
let includes = document.querySelectorAll("[data-include]"),
  promises = [],
  welcomeTexts = {};
includes.forEach((t) => {
  let e =
    relaPath + "views/" + t.attributes["data-include"].nodeValue + ".html";
  promises.push(
    fetch(e)
      .then((t) => t.text())
      .then((e) => {
        t.insertAdjacentHTML("afterbegin", e);
      })
  );
});
let fileURL = relaPath + "data/welcomeTexts.json";
function removePopUp() {
  d3.select("body").style("overflow", "initial"),
    d3
      .selectAll(".overlay")
      .style("-webkit-backdrop-filter", "blur(0px) contrast(100%)"),
    d3
      .selectAll(".overlay")
      .style("backdrop-filter", "blur(0px) contrast(100%)"),
    d3.select(".overlay-content").transition().style("filter", "opacity(0)"),
    d3
      .select(".overlay")
      .transition()
      .style("filter", "opacity(0)")
      .on("end", function () {
        d3.select(this).remove();
      });
}
function changeCreditsSystem() {
  let t = "SCT",
    e = "true";
  const a = new URLSearchParams(window.location.search);
  a.has(t) && (e = !("true" === a.get(t))),
    (t = encodeURI(t)),
    (e = encodeURI(e));
  for (
    var r, s = document.location.search.substr(1).split("&"), i = s.length;
    i--;

  )
    if ((r = s[i].split("="))[0] === t) {
      (r[1] = e), (s[i] = r.join("="));
      break;
    }
  i < 0 && (s[s.length] = [t, e].join("=")),
    (document.location.search = s.join("&"));
}
promises.push(fetch(fileURL).then((t) => t.json())),
  Promise.all(promises)
    .then(() => fetch(new Request(relaPath + "date.txt")))
    .then((t) => {
      console.log(t);
      let e = t.headers.get("last-modified"),
        a = new Date(e);
      console.log(a),
        (document.getElementById("lastUpdate").textContent =
          a.toLocaleString());
    }),
  Promise.all(promises)
    .then((t) => {
      welcomeTexts = t.pop()[texts];
      let e = document.getElementById("goToHome"),
        a = document.getElementById("goToCalculator"),
        r = document.getElementById("goToGenerator"),
        s = document.getElementById("contact");
      return (
        mallaPersonal
          ? r.setAttribute("href", relaPath + "personalizar/?m=" + carr)
          : (prioridad
              ? a.classList.add("active")
              : a.setAttribute("href", relaPath + "prioridad/?m=" + carr),
            personalizar
              ? (r.classList.add("active"),
                document
                  .getElementById("generate")
                  .setAttribute("href", "./malla.html?m=" + carr))
              : r.setAttribute("href", relaPath + "personalizar/?m=" + carr)),
        contact && s.classList.add("active"),
        s.setAttribute("href", relaPath + "contact/"),
        e.setAttribute("href", relaPath + "?m=" + carr),
        fetch(relaPath + "/data/carreras.json")
      );
    })
    .then((t) => t.json())
    .then((t) => {
      let e = document
          .querySelector('script[data-template="tab-template1"]')
          .text.split(/\${(.+?)}/g),
        a = document
          .querySelector('script[data-template="tab-template2"]')
          .text.split(/\${(.+?)}/g);
      contact &&
        document.querySelectorAll(".carrers").forEach((t) => t.remove()),
        t.forEach((t) => {
          if (t.Link === carr)
            if (
              ((fullCareerName = t.Nombre),
              (welcomeTexts.welcomeTitle = welcomeTexts.welcomeTitle.replace(
                "CARRERA",
                t.Nombre
              )),
              $(".carrera").text(t.Nombre),
              mallaPersonal)
            ) {
              let e = document.title;
              document.title = e + " basada en " + t.Nombre;
            } else {
              let e = document.title.slice(0, 17);
              (e += " " + t.Nombre),
                (e += document.title.slice(17)),
                (document.title = e);
            }
        }),
        $("#carreras1-nav").append(
          t.map(function (t) {
            return e.map(render(t)).join("");
          })
        ),
        $("#carreras2-nav").append(
          t.map(function (t) {
            return a.map(render(t)).join("");
          })
        ),
        document.querySelector(".overlay-content h1") &&
          ((document.querySelector(".overlay-content h1").textContent =
            welcomeTexts.welcomeTitle),
          (document.querySelector(".overlay-content h5").textContent =
            welcomeTexts.welcomeDesc));
    }),
  $(function () {
    if (contact) return;
    if (sct) {
      document.getElementById("creditsExample").textContent = "Cr??ditos SCT";
      let t = parseInt(
        document.getElementById("creditsNumberExample").textContent
      );
      document.getElementById("creditsNumberExample").textContent = Math.round(
        (5 * t) / 3
      ).toString();
    }
    let t = null,
      e = null;
    prioridad
      ? ((t = new Malla(sct, SelectableRamo, 0.804, 1)),
        t.enableCreditsSystem(),
        document
          .getElementById("custom-credits-USM")
          .addEventListener("input", function () {
            "" == this.value
              ? document
                  .getElementById("custom-credits-SCT")
                  .setAttribute("placeholder", "Ingrese un valor")
              : document
                  .getElementById("custom-credits-SCT")
                  .setAttribute(
                    "placeholder",
                    Math.round((5 * this.value) / 3).toString()
                  );
          }))
      : personalizar && !mallaPersonal
      ? ((t = new Malla(sct, SelectableRamo, 0.804, 1)),
        t.enableCreditsSystem(),
        document
          .getElementById("custom-credits-USM")
          .addEventListener("input", function () {
            "" == this.value
              ? document
                  .getElementById("custom-credits-SCT")
                  .setAttribute("placeholder", "Ingrese un valor")
              : document
                  .getElementById("custom-credits-SCT")
                  .setAttribute(
                    "placeholder",
                    Math.round((5 * this.value) / 3).toString()
                  );
          }),
        document
          .getElementById("custom-creditsa-USM")
          .addEventListener("input", function () {
            "" == this.value
              ? document
                  .getElementById("custom-creditsa-SCT")
                  .setAttribute("placeholder", "Ingrese un valor")
              : document
                  .getElementById("custom-creditsa-SCT")
                  .setAttribute(
                    "placeholder",
                    Math.round((5 * this.value) / 3).toString()
                  );
          }))
      : mallaPersonal
      ? ((t = new CustomMalla(sct)),
        document
          .getElementById("cleanApprovedButton")
          .addEventListener("click", () => t.cleanSubjects()),
        t.enableCreditsStats(),
        t.enableCreditsSystem())
      : ((t = new Malla(sct)),
        t.enableCreditsStats(),
        t.enableCreditsSystem(),
        t.enableSave(),
        document
          .getElementById("cleanApprovedButton")
          .addEventListener("click", () => t.cleanSubjects()));
    let a = t
      .setCareer(carr, fullCareerName, relaPath)
      .then((e) => t.drawMalla(".canvas"));
    a.then(() => {
      t.updateStats(),
        t.displayCreditSystem(),
        t.showColorDescriptions(".color-description"),
        document.getElementById("overlay").addEventListener("click", () => {
          prioridad || (personalizar && !mallaPersonal)
            ? t.semesterManager.loadSemesters()
            : t.loadApproved(),
            t.enablePrerCheck();
        });
    }),
      a.then(() => {
        prioridad
          ? ((e = new Priorix(t, "#priorix")),
            (e.subjectsInManySemesters = !0),
            e.mallaEditor.loadSubjects())
          : personalizar &&
            !mallaPersonal &&
            ((e = new Generator(t, "#priorix")),
            e.mallaEditor.loadSubjects(),
            e.mallaEditor.loadCategories()),
          t.setSemesterManager(e),
          t.generateCode();
      });
  });
class Malla {
  constructor(t = !1, e = Ramo, a = 1, r = 1) {
    (this.scaleX = a),
      (this.scaleY = r),
      (this.subjectType = e),
      (this.rawMalla = {}),
      (this.categories = {}),
      (this.malla = {}),
      (this.sct = t),
      (this.longestSemester = 0),
      (this.totalCredits = 0),
      (this.totalSubjects = 0),
      (this.semesterManager = null),
      (this.currentMalla = null),
      (this.APPROVED = []),
      (this.SUBJECTID = 1),
      (this.ALLSUBJECTS = {}),
      (this.checkPrer = !1),
      (this.saveEnabled = !1),
      (this.isMallaSet = !1),
      (this.showCreditSystem = !1),
      (this.showCreditStats = !1),
      (this.totalCredits = 0),
      (this.totalSubjects = 0);
  }
  enableCreditsStats() {
    this.showCreditStats = !0;
  }
  enableCreditsSystem() {
    this.showCreditSystem = !0;
  }
  enableSave() {
    this.saveEnabled = !0;
  }
  setCareer(t, e, a) {
    (this.currentMalla = t), (this.fullCareerName = e);
    let r = [];
    return (
      r.push(d3.json(a + "data/data_" + this.currentMalla + ".json")),
      r.push(d3.json(a + "data/colors_" + this.currentMalla + ".json")),
      Promise.all(r).then((t) => {
        this.setMallaAndCategories(t[0], t[1]);
      })
    );
  }
  setMallaAndCategories(t, e) {
    let a,
      r = 0,
      s = 0,
      i = 0;
    for (a in ((this.rawMalla = t), (this.categories = e), this.rawMalla))
      (this.malla[a] = {}),
        t[a].length > r && (r = t[a].length),
        t[a].forEach((t) => {
          (i += 1),
            7 === t.length
              ? (this.malla[a][t[1]] = new this.subjectType(
                  t[0],
                  t[1],
                  t[2],
                  t[4],
                  t[5],
                  this.SUBJECTID++,
                  this,
                  t[3],
                  !1,
                  t[6]
                ))
              : (this.malla[a][t[1]] = new this.subjectType(
                  t[0],
                  t[1],
                  t[2],
                  t[3],
                  t.length > 4 ? t[4] : [],
                  this.SUBJECTID++,
                  this
                )),
            (this.ALLSUBJECTS[t[1]] = this.malla[a][t[1]]),
            (s += this.malla[a][t[1]].getDisplayCredits());
        });
    (this.longestSemester = r),
      (this.totalCredits = s),
      (this.totalSubjects = i),
      (this.isMallaSet = !0);
  }
  setSemesterManager(t) {
    this.semesterManager = t;
  }
  addSubject(t) {
    this.ALLSUBJECTS[t.sigla] = t;
  }
  delSubjects(t) {
    Object.values(this.ALLSUBJECTS).forEach((e) => {
      e.prer.has(t.sigla) && (e.prer.delete(t.sigla), e.verifyPrer());
    }),
      delete this.ALLSUBJECTS[t.sigla];
  }
  drawMalla(t) {
    if (!this.isMallaSet) return;
    let e = 10,
      a = 30 * this.scaleY,
      r =
        this.subjectType.getDisplayWidth(this.scaleX) *
          Object.keys(this.malla).length +
        e * (Object.keys(this.malla).length - 1),
      s =
        (this.subjectType.getDisplayHeight(this.scaleY) + e) *
          this.longestSemester +
        2 * a +
        e,
      i = r + e,
      l = s + 5;
    const n = d3
      .select(t)
      .append("svg")
      .attr("width", i)
      .attr("height", l)
      .attr("role", "figure");
    n.append("title").text("Malla " + this.fullCareerName);
    const o = n;
    let c = 5,
      d = 0,
      h = !1,
      m = 0,
      p = 0,
      u = null,
      g = null,
      y = null;
    Object.keys(this.malla).forEach((t) => {
      if (((d = 0), 0 === m)) {
        y = o
          .append("g")
          .attr("cursor", "pointer")
          .attr("role", "heading")
          .attr("aria-level", "5")
          .classed("year", !0);
        let t = y.append("title");
        (u = y
          .append("rect")
          .attr("x", c)
          .attr("y", d)
          .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
          .attr("height", a)
          .attr("fill", "gray")
          .classed("bars", !0)),
          m++,
          (g = y
            .append("text")
            .attr("x", c + this.subjectType.getDisplayWidth(this.scaleX) / 2)
            .attr("y", d + a / 2)
            .text("A??o " + p++ + " 1/2")
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")),
          t.text("A??o " + p + " 1/2"),
          y.on("click", () => {
            let t = d3.select(d3.event.currentTarget),
              e = parseInt(t.select("text").text().substr(4));
            t.node().getBBox().width <=
            2 * this.subjectType.getDisplayWidth(this.scaleX) -
              this.subjectType.getDisplayWidth(this.scaleX) / 2
              ? d3.select("#sem" + (2 * e + 1)).dispatch("click")
              : (d3.select("#sem" + 2 * e).dispatch("click"),
                d3.select("#sem" + (2 * e - 1)).dispatch("click"));
          });
      } else
        u.attr("width", 2 * this.subjectType.getDisplayWidth(this.scaleX) + e),
          g.text("A??o " + p),
          g.attr("x", c - 5),
          (m = 0),
          y.select("title").text("A??o " + p);
      (d += a + e),
        h ||
          (o
            .append("rect")
            .attr("x", c)
            .attr("y", d)
            .attr("width", r)
            .attr("height", a)
            .attr("fill", "#EEE")
            .classed("sem", !0),
          (h = !0));
      let s = t;
      s = "s" === s[0] ? parseInt(s.substr(1)) : parseInt(s);
      let i = o
        .append("g")
        .attr("id", "sem" + s)
        .attr("cursor", "pointer")
        .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
        .attr("height", a)
        .attr("role", "heading")
        .attr("aria-level", "6")
        .classed("sem", !0);
      i.append("title").text("Semestre " + s),
        i
          .append("rect")
          .attr("cursor", "pointer")
          .attr("x", c)
          .attr("y", d)
          .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
          .attr("height", a)
          .classed("sem", !0)
          .attr("fill", "#EEE"),
        i
          .append("text")
          .attr("x", c + this.subjectType.getDisplayWidth(this.scaleX) / 2)
          .attr("y", d + a / 2)
          .text(this.romanize(s))
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle"),
        i.on("click", () => {
          let e = d3.select(d3.event.currentTarget),
            a = this.deRomanize(e.select("text").text());
          "s" === t[0] && (a = "s" + a),
            Object.values(this.malla[a]).forEach((t) => {
              t.isBeingClicked();
            });
        }),
        (d += a + e),
        Object.keys(this.malla[t]).forEach((a) => {
          this.malla[t][a].draw(o, c, d, this.scaleX, this.scaleY),
            (d += this.subjectType.getDisplayHeight(this.scaleY) + e);
        }),
        (c += this.subjectType.getDisplayWidth(this.scaleX) + e);
    });
  }
  showColorDescriptions() {
    Object.keys(this.categories).forEach((t) => {
      let e = d3
        .select(".color-description")
        .append("div")
        .attr("style", "display:flex;vertical-align:middle;margin-right:15px;");
      e
        .append("svg")
        .attr("height", "25px")
        .attr("width", "25px")
        .append("circle")
        .attr("r", 10)
        .attr("cx", 12)
        .attr("cy", 12)
        .attr("fill", this.categories[t][0]),
        e.append("span").text(this.categories[t][1]);
    });
  }
  enablePrerCheck() {
    (this.checkPrer = !0), this.verifyPrer();
  }
  verifyPrer() {
    this.checkPrer &&
      (Object.values(this.ALLSUBJECTS).forEach((t) => {
        t.verifyPrer();
      }),
      this.saveApproved());
  }
  displayCreditSystem() {
    this.showCreditSystem &&
      d3.select("#credits-system").text(this.sct ? "SCT" : "UAI");
  }
  updateStats() {
    if (!this.showCreditStats) return;
    let t = 0,
      e = 0;
    this.APPROVED.forEach((a) => {
      (t += a.getDisplayCredits()), (e += 1);
    });
    let a = (t / this.totalCredits) * 100,
      r = (e / this.totalSubjects) * 100;
    d3.select("#credits").text(parseInt(t)),
      d3.select("#credPercentage").text(parseInt(a)),
      d3.select("#ramoPercentage").text(parseInt(r));
  }
  cleanSubjects() {
    [...this.APPROVED].forEach((t) => {
      t.cleanRamo();
    }),
      this.verifyPrer(),
      this.updateStats();
  }
  approveSubject(t) {
    this.APPROVED.push(t);
  }
  deApproveSubject(t) {
    let e = this.APPROVED.indexOf(t);
    e > -1 && this.APPROVED.splice(e, 1);
  }
  getSubject(t) {
    return this.ALLSUBJECTS[t];
  }
  saveApproved() {
    if (this.saveEnabled) {
      let t = "approvedRamos_" + this.currentMalla,
        e = [];
      this.APPROVED.forEach((t) => {
        e.push(t.sigla);
      }),
        (localStorage[t] = JSON.stringify(e));
    }
  }
  loadApproved() {
    if (this.saveEnabled) {
      let t = localStorage["approvedRamos_" + this.currentMalla];
      if (t) {
        JSON.parse(t).forEach((t) => {
          void 0 !== this.ALLSUBJECTS[t] && this.ALLSUBJECTS[t].approveRamo();
        }),
          this.verifyPrer();
      }
    }
  }
  deRomanize(t) {
    let e = this.getRnums(),
      a = this.getAnums(),
      r = t.replace(/i/g, "M"),
      s = 0,
      i = 0,
      l = r,
      n = e.length;
    for (let t = 1; t < n; ++t) {
      const l = e[t].length;
      for (; r.substr(0, l) === e[t]; ) {
        if (i++ > 30) return -1;
        (s += a[t]), (r = r.substr(l, r.length - l));
      }
      if (r.length <= 0) break;
    }
    return (
      0 !== r.length && alert(t + " INVALID truncating to " + l.replace(r, "")),
      0 < s && s < 4e6 ? s : -1
    );
  }
  romanize(t) {
    if (t > 3999999 || t < 1) return "Expect number from 1 to 3,999,999";
    let e = this.getRnums(),
      a = this.getAnums(),
      r = parseInt(t),
      s = "",
      i = 0,
      l = e.length;
    for (let t = 1; t < l; ++t) {
      for (; r >= parseInt(a[t]); ) {
        if (i++ > 30) return -1;
        (s += e[t]), (r -= a[t]);
      }
      if (r <= 0) break;
    }
    return s;
  }
  getRnums() {
    let t = Array();
    return (
      (t[1] = "m"),
      (t[2] = "cm"),
      (t[3] = "d"),
      (t[4] = "cd"),
      (t[5] = "c"),
      (t[6] = "xc"),
      (t[7] = "l"),
      (t[8] = "xl"),
      (t[9] = "x"),
      (t[10] = "Mx"),
      (t[11] = "v"),
      (t[12] = "Mv"),
      (t[13] = "M"),
      (t[14] = "CM"),
      (t[15] = "D"),
      (t[16] = "CD"),
      (t[17] = "C"),
      (t[18] = "XC"),
      (t[19] = "L"),
      (t[20] = "XL"),
      (t[21] = "X"),
      (t[22] = "IX"),
      (t[23] = "V"),
      (t[24] = "IV"),
      (t[25] = "I"),
      t
    );
  }
  getAnums() {
    let t = Array();
    return (
      (t[1] = 1e6),
      (t[2] = 9e5),
      (t[3] = 5e5),
      (t[4] = 4e5),
      (t[5] = 1e5),
      (t[6] = 9e4),
      (t[7] = 5e4),
      (t[8] = 4e4),
      (t[9] = 1e4),
      (t[10] = 9e3),
      (t[11] = 5e3),
      (t[12] = 4e3),
      (t[13] = 1e3),
      (t[14] = 900),
      (t[15] = 500),
      (t[16] = 400),
      (t[17] = 100),
      (t[18] = 90),
      (t[19] = 50),
      (t[20] = 40),
      (t[21] = 10),
      (t[22] = 9),
      (t[23] = 5),
      (t[24] = 4),
      (t[25] = 1),
      t
    );
  }
  generateCode() {
    let t = {};
    Object.keys(this.malla).forEach((e) => {
      let a;
      (a = e.includes("s") ? e : "s" + e),
        (t[a] = []),
        Object.keys(this.malla[e]).forEach((e) => {
          let r = this.ALLSUBJECTS[e],
            s = [];
          s.push(r.name),
            s.push(r.sigla),
            s.push(r.getUSMCredits()),
            r.USMtoSCT ? s.push(0) : s.push(r.getSCTCredits()),
            s.push(r.category),
            s.push([...r.prer]),
            s.push(r.dictatesIn),
            t[a].push(s);
        });
    });
    let e = JSON.stringify(t).match(
        /("s[0-9]+":)+|(\[(?:,?[^\[\]])+(?:,\[[^\]]*])(?:,?[^\]]*)+])+/g
      ),
      a = "{\n",
      r = !0,
      s = !0;
    e.forEach((t) => {
      /("s[0-9]+":)/.test(t)
        ? (s
            ? ((a += "    " + t + " [\n"), (s = !1))
            : (a += "\n    ],\n    " + t + " [\n"),
          (r = !0))
        : r
        ? ((a += "        " + t), (r = !1))
        : (a += ",\n        " + t);
    }),
      (a += "\n    ]\n}");
    let i = JSON.stringify(this.categories).match(/("[^\]]+\],?)/g),
      l = "{";
    if (
      (i.forEach((t) => {
        l += "\n    " + t;
      }),
      (l += "\n}"),
      document.getElementById("mallaCode"))
    ) {
      new ClipboardJS(".btn"),
        (document.getElementById("mallaCode").textContent = a),
        (document.getElementById("colorCode").textContent = l),
        PR.prettyPrint(),
        (document.getElementById("abrev").value = this.currentMalla),
        (document.getElementById("carrMalla1").textContent = this.currentMalla),
        (document.getElementById("carrMalla2").textContent = this.currentMalla),
        (document.getElementById("carrColor1").textContent = this.currentMalla),
        (document.getElementById("carrColor2").textContent = this.currentMalla);
      let t = new Blob([a], { "aplication/json": "aplication/json" }),
        e = new Blob([l], { "aplication/json": "aplication/json" }),
        r = document.getElementById("dMalla"),
        s = document.getElementById("dColor");
      r.setAttribute("href", URL.createObjectURL(t)),
        r.setAttribute("download", "data_" + this.currentMalla + ".json"),
        s.setAttribute("href", URL.createObjectURL(e)),
        s.setAttribute("download", "colors_" + this.currentMalla + ".json");
    } else console.log(a), console.log(l);
    document.getElementById("abrev") &&
      document.getElementById("abrev").addEventListener("input", function (t) {
        (document.getElementById("carrMalla1").textContent =
          t.target.value.toUpperCase()),
          (document.getElementById("carrMalla2").textContent =
            t.target.value.toUpperCase()),
          (document.getElementById("carrColor1").textContent =
            t.target.value.toUpperCase()),
          (document.getElementById("carrColor2").textContent =
            t.target.value.toUpperCase()),
          document
            .getElementById("dMalla")
            .setAttribute(
              "download",
              "data_" + t.target.value.toUpperCase() + ".json"
            ),
          document
            .getElementById("dColor")
            .setAttribute(
              "download",
              "colors_" + t.target.value.toUpperCase() + ".json"
            ),
          $('[data-toggle="tooltip"]').tooltip(),
          $('[data-toggle="tooltip"]').tooltip("disable");
      });
  }
}
let width = 100,
  height = 100;
class Ramo {
  static get width() {
    return width;
  }
  static get height() {
    return height;
  }
  static getDisplayWidth(t) {
    return width * t;
  }
  static getDisplayHeight(t) {
    return height * t;
  }
  constructor(t, e, a, r, s = [], i, l, n = 0, o = !1, c = "") {
    (this.name = t),
      (this.sigla = e),
      (this.credits = a),
      (this.category = r),
      (this.prer = new Set(s)),
      n
        ? ((this.creditsSCT = n), (this.USMtoSCT = !1))
        : ((this.creditsSCT = Math.round((5 * a) / 3)), (this.USMtoSCT = !0)),
      (this.dictatesIn = c),
      (this.malla = l),
      (this.isCustom = o),
      (this.beenEdited = !1),
      (this.id = i),
      (this.ramo = null),
      (this.approved = !1);
  }
  getSCTCredits() {
    return this.creditsSCT;
  }
  getUSMCredits() {
    return this.credits;
  }
  updateCredits(t, e = 0) {
    (this.credits = t), (this.creditsSCT = e || Math.round((5 * t) / 3));
  }
  getDisplayCredits() {
    return this.malla.sct ? this.getSCTCredits() : this.getUSMCredits();
  }
  draw(t, e, a, r, s) {
    this.ramo = t
      .append("g")
      .attr("cursor", "pointer")
      .attr("role", "img")
      .classed("subject", !0)
      .attr("id", this.sigla);
    let i = this.constructor.getDisplayWidth(r),
      l = this.constructor.getDisplayHeight(s),
      n = l / 5,
      o = this.getDisplayCredits(this.credits),
      c = this.malla.categories[this.category][0],
      d = "",
      h = this.prer.size - 1,
      m = 0;
    this.prer.forEach((t) => {
      (d += 0 === m ? t : m === h ? " y " + t : ", " + t), (m += 1);
    }),
      this.ramo
        .append("title")
        .text(
          "Ramo " +
            this.sigla +
            ", " +
            this.name +
            ". Este ramo tiene " +
            this.getUSMCredits() +
            " cr??ditos UAI y " +
            this.getSCTCredits() +
            " cr??ditos SCT. Se dicta en " +
            {
              "": "??ambos semestres?",
              P: "semestres pares",
              I: "semestres impares",
              A: "ambos semestres",
            }[this.dictatesIn] +
            " y " +
            (this.prer.size
              ? "tiene como prerrequisitos a " + d
              : "no tiene prerrequisitos") +
            "."
        ),
      this.ramo
        .append("rect")
        .attr("x", e)
        .attr("y", a)
        .attr("width", i)
        .attr("height", l)
        .attr("fill", c),
      this.ramo
        .append("rect")
        .attr("x", e)
        .attr("y", a)
        .attr("width", i)
        .attr("height", n)
        .attr("fill", "#6D6E71")
        .classed("bars", !0),
      this.ramo
        .append("rect")
        .attr("x", e)
        .attr("y", a + l - n)
        .attr("width", i)
        .attr("height", n)
        .attr("fill", "#6D6E71")
        .classed("bars", !0),
      this.ramo
        .append("rect")
        .attr("x", e + i - 22 * r)
        .attr("y", a + l - n)
        .attr("width", 20 * r)
        .attr("height", n)
        .attr("fill", "white"),
      this.ramo
        .append("text")
        .attr("x", e + i - 22 * r + (20 * r) / 2)
        .attr("y", a + l - n / 2)
        .text(o)
        .attr("font-weight", "regular")
        .attr("fill", "black")
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("font-size", 12 * s),
      this.ramo
        .append("text")
        .attr("x", e + i / 2)
        .attr("y", a + l / 2)
        .attr("dy", 0)
        .text(this.name)
        .attr("class", "ramo-label")
        .attr("fill", () => (this.needsWhiteText(c) ? "white" : "#222222"))
        .attr("font-size", 13)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central"),
      this.ramo
        .append("text")
        .attr("x", e + 2)
        .attr("y", a + 10)
        .attr("dominant-baseline", "central")
        .text(this.sigla)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("font-size", r < 0.85 ? 11 : 12),
      ("P" !== this.dictatesIn && "I" !== this.dictatesIn) ||
        this.ramo
          .append("text")
          .attr("x", e + i - (r < 0.85 ? 25 : 30))
          .attr("y", a + 10)
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle")
          .text(this.dictatesIn)
          .attr("font-weight", "bold")
          .attr("fill", "yellow")
          .attr("font-size", r < 0.85 ? 11 : 12),
      this.drawActions(e, a, i, l),
      this.ramo
        .append("circle")
        .attr("cx", e + i - 10)
        .attr("cy", a + n / 2)
        .attr("fill", "white")
        .attr("r", 8),
      this.ramo
        .append("text")
        .attr("x", e + i - 10)
        .attr("y", a + n / 2)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", 10)
        .text(this.id);
    let p = 0;
    this.prer.forEach((t) => {
      let s = 9,
        i = 10,
        o = 5;
      r < 0.83 && (s--, i--, (o = 1));
      let c = this.malla.categories[this.malla.ALLSUBJECTS[t].category][0];
      this.ramo
        .append("circle")
        .attr("cx", e + s + p + o)
        .attr("cy", a + l - n / 2)
        .attr("r", s)
        .attr("fill", c)
        .attr("stroke", "white"),
        this.ramo
          .append("text")
          .attr("x", e + s + p + o)
          .attr("y", a + l - n / 2)
          .text(this.malla.ALLSUBJECTS[t].id)
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle")
          .attr("font-size", i)
          .attr("dy", 0)
          .attr("fill", () => (this.needsWhiteText(c) ? "white" : "#222222")),
        (p += 2 * s);
    }),
      this.createActionListeners(),
      this.wrap(i - 5, (l / 5) * 3);
  }
  drawActions(t, e, a, r) {
    if (null == this.ramo) return null;
    this.ramo
      .append("rect")
      .attr("x", t)
      .attr("y", e)
      .attr("width", a)
      .attr("height", r)
      .attr("fill", "white")
      .attr("opacity", "0.001")
      .attr("class", "non-approved"),
      this.ramo
        .append("g")
        .attr("class", "cross")
        .attr("opacity", 0)
        .append("path")
        .attr("d", "M" + t + "," + e + "L" + (t + a) + "," + (e + r))
        .attr("stroke", "#550000")
        .attr("stroke-width", 9);
  }
  createActionListeners() {
    this.ramo.on("click", () => this.isBeingClicked());
  }
  isBeingClicked() {
    this.approveRamo(),
      this.malla.verifyPrer(),
      this.malla.updateStats(),
      this.malla.saveApproved();
  }
  approveRamo() {
    this.approved
      ? (this.isCustom ||
          d3
            .select("#" + this.sigla)
            .select(".cross")
            .transition()
            .delay(20)
            .attr("opacity", "0.01"),
        this.malla.deApproveSubject(this))
      : (this.isCustom ||
          d3
            .select("#" + this.sigla)
            .select(".cross")
            .transition()
            .delay(20)
            .attr("opacity", "1"),
        this.malla.approveSubject(this)),
      (this.approved = !this.approved);
  }
  cleanRamo() {
    this.approved && this.approveRamo();
  }
  verifyPrer() {
    if (this.isCustom) return;
    let t = [];
    this.malla.APPROVED.forEach(function (e) {
      t.push(e.sigla);
    }),
      (t = new Set(t));
    for (let e of this.prer)
      if (!t.has(e))
        return void this.ramo
          .select(".non-approved")
          .transition()
          .delay(20)
          .attr("opacity", "0.71");
    this.ramo
      .select(".non-approved")
      .transition()
      .delay(20)
      .attr("opacity", "0.0");
  }
  wrap(t, e) {
    let a,
      r,
      s,
      i = this.ramo.select(".ramo-label"),
      l = i.text().split(/\s+/).reverse(),
      n = [],
      o = 0,
      c = parseInt(i.attr("font-size"), 10),
      d = i
        .text(null)
        .append("tspan")
        .attr("x", i.attr("x"))
        .attr("dominant-baseline", "central")
        .attr("dy", "0em");
    for (a = l.pop(); a; ) {
      for (
        n.push(a), d.text(n.join(" "));
        d.node().getComputedTextLength() > t;

      )
        1 === n.length
          ? i.attr("font-size", String(--c))
          : (n.pop(),
            d.text(n.join(" ")),
            (n = [a]),
            (d = i
              .append("tspan")
              .attr("x", i.attr("x"))
              .attr("dominant-baseline", "central")
              .attr("dy", "1.1em")
              .text(a)));
      a = l.pop();
    }
    let h = i.selectAll("tspan");
    for (
      i.attr("dy", 0),
        r = h._groups[0].length,
        s = i.node().getBoundingClientRect().height;
      s > e - 5;

    )
      i.attr("font-size", String(--c)),
        i.attr("dy", 0),
        (s = i.node().getBoundingClientRect().height),
        (o = 0);
    if (1 !== r) {
      h.filter(function (t, e) {
        return 0 === e;
      }).attr("dy", -((1.1 * r) / 2 - 0.55) + "em");
    }
    i.attr("dy", 0);
  }
  needsWhiteText(t) {
    let e = 0,
      a = 0,
      r = 0;
    4 === t.length
      ? ((e = "0x" + t[1] + t[1]),
        (a = "0x" + t[2] + t[2]),
        (r = "0x" + t[3] + t[3]))
      : 7 === t.length &&
        ((e = "0x" + t[1] + t[2]),
        (a = "0x" + t[3] + t[4]),
        (r = "0x" + t[5] + t[6]));
    let s = [0, 0, 0];
    (s[0] = e / 255), (s[1] = a / 255), (s[2] = r / 255);
    for (let t in s)
      s[t] <= 0.03928
        ? (s[t] /= 12.92)
        : (s[t] = Math.pow((s[t] + 0.055) / 1.055, 2.4));
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2] <= 0.6;
  }
}
