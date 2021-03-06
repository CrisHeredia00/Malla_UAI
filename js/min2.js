let vh = 0.01 * window.innerHeight;
function render(e) {
  return function (t, s) {
    return s % 2 ? e[t] : t;
  };
}
document.documentElement.style.setProperty("--vh", `${vh}px`),
  window.addEventListener("resize", () => {
    let e = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${e}px`);
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
includes.forEach((e) => {
  let t =
    relaPath + "views/" + e.attributes["data-include"].nodeValue + ".html";
  promises.push(
    fetch(t)
      .then((e) => e.text())
      .then((t) => {
        e.insertAdjacentHTML("afterbegin", t);
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
  let e = "SCT",
    t = "true";
  const s = new URLSearchParams(window.location.search);
  s.has(e) && (t = !("true" === s.get(e))),
    (e = encodeURI(e)),
    (t = encodeURI(t));
  for (
    var a, r = document.location.search.substr(1).split("&"), i = r.length;
    i--;

  )
    if ((a = r[i].split("="))[0] === e) {
      (a[1] = t), (r[i] = a.join("="));
      break;
    }
  i < 0 && (r[r.length] = [e, t].join("=")),
    (document.location.search = r.join("&"));
}
promises.push(fetch(fileURL).then((e) => e.json())),
  Promise.all(promises)
    .then(() => fetch(new Request(relaPath + "date.txt")))
    .then((e) => {
      console.log(e);
      let t = e.headers.get("last-modified"),
        s = new Date(t);
      console.log(s),
        (document.getElementById("lastUpdate").textContent =
          s.toLocaleString());
    }),
  Promise.all(promises)
    .then((e) => {
      welcomeTexts = e.pop()[texts];
      let t = document.getElementById("goToHome"),
        s = document.getElementById("goToCalculator"),
        a = document.getElementById("goToGenerator"),
        r = document.getElementById("contact");
      return (
        mallaPersonal
          ? a.setAttribute("href", relaPath + "personalizar/?m=" + carr)
          : (prioridad
              ? s.classList.add("active")
              : s.setAttribute("href", relaPath + "prioridad/?m=" + carr),
            personalizar
              ? (a.classList.add("active"),
                document
                  .getElementById("generate")
                  .setAttribute("href", "./malla.html?m=" + carr))
              : a.setAttribute("href", relaPath + "personalizar/?m=" + carr)),
        contact && r.classList.add("active"),
        r.setAttribute("href", relaPath + "contact/"),
        t.setAttribute("href", relaPath + "?m=" + carr),
        fetch(relaPath + "/data/carreras.json")
      );
    })
    .then((e) => e.json())
    .then((e) => {
      let t = document
          .querySelector('script[data-template="tab-template1"]')
          .text.split(/\${(.+?)}/g),
        s = document
          .querySelector('script[data-template="tab-template2"]')
          .text.split(/\${(.+?)}/g);
      contact &&
        document.querySelectorAll(".carrers").forEach((e) => e.remove()),
        e.forEach((e) => {
          if (e.Link === carr)
            if (
              ((fullCareerName = e.Nombre),
              (welcomeTexts.welcomeTitle = welcomeTexts.welcomeTitle.replace(
                "CARRERA",
                e.Nombre
              )),
              $(".carrera").text(e.Nombre),
              mallaPersonal)
            ) {
              let t = document.title;
              document.title = t + " basada en " + e.Nombre;
            } else {
              let t = document.title.slice(0, 17);
              (t += " " + e.Nombre),
                (t += document.title.slice(17)),
                (document.title = t);
            }
        }),
        $("#carreras1-nav").append(
          e.map(function (e) {
            return t.map(render(e)).join("");
          })
        ),
        $("#carreras2-nav").append(
          e.map(function (e) {
            return s.map(render(e)).join("");
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
      let e = parseInt(
        document.getElementById("creditsNumberExample").textContent
      );
      document.getElementById("creditsNumberExample").textContent = Math.round(
        (5 * e) / 3
      ).toString();
    }
    let e = null,
      t = null;
    prioridad
      ? ((e = new Malla(sct, SelectableRamo, 0.804, 1)),
        e.enableCreditsSystem(),
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
      ? ((e = new Malla(sct, SelectableRamo, 0.804, 1)),
        e.enableCreditsSystem(),
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
      ? ((e = new CustomMalla(sct)),
        document
          .getElementById("cleanApprovedButton")
          .addEventListener("click", () => e.cleanSubjects()),
        e.enableCreditsStats(),
        e.enableCreditsSystem())
      : ((e = new Malla(sct)),
        e.enableCreditsStats(),
        e.enableCreditsSystem(),
        e.enableSave(),
        document
          .getElementById("cleanApprovedButton")
          .addEventListener("click", () => e.cleanSubjects()));
    let s = e
      .setCareer(carr, fullCareerName, relaPath)
      .then((t) => e.drawMalla(".canvas"));
    s.then(() => {
      e.updateStats(),
        e.displayCreditSystem(),
        e.showColorDescriptions(".color-description"),
        document.getElementById("overlay").addEventListener("click", () => {
          prioridad || (personalizar && !mallaPersonal)
            ? e.semesterManager.loadSemesters()
            : e.loadApproved(),
            e.enablePrerCheck();
        });
    }),
      s.then(() => {
        prioridad
          ? ((t = new Priorix(e, "#priorix")),
            (t.subjectsInManySemesters = !0),
            t.mallaEditor.loadSubjects())
          : personalizar &&
            !mallaPersonal &&
            ((t = new Generator(e, "#priorix")),
            t.mallaEditor.loadSubjects(),
            t.mallaEditor.loadCategories()),
          e.setSemesterManager(t),
          e.generateCode();
      });
  });
class Malla {
  constructor(e = !1, t = Ramo, s = 1, a = 1) {
    (this.scaleX = s),
      (this.scaleY = a),
      (this.subjectType = t),
      (this.rawMalla = {}),
      (this.categories = {}),
      (this.malla = {}),
      (this.sct = e),
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
  setCareer(e, t, s) {
    (this.currentMalla = e), (this.fullCareerName = t);
    let a = [];
    return (
      a.push(d3.json(s + "data/data_" + this.currentMalla + ".json")),
      a.push(d3.json(s + "data/colors_" + this.currentMalla + ".json")),
      Promise.all(a).then((e) => {
        this.setMallaAndCategories(e[0], e[1]);
      })
    );
  }
  setMallaAndCategories(e, t) {
    let s,
      a = 0,
      r = 0,
      i = 0;
    for (s in ((this.rawMalla = e), (this.categories = t), this.rawMalla))
      (this.malla[s] = {}),
        e[s].length > a && (a = e[s].length),
        e[s].forEach((e) => {
          (i += 1),
            7 === e.length
              ? (this.malla[s][e[1]] = new this.subjectType(
                  e[0],
                  e[1],
                  e[2],
                  e[4],
                  e[5],
                  this.SUBJECTID++,
                  this,
                  e[3],
                  !1,
                  e[6]
                ))
              : (this.malla[s][e[1]] = new this.subjectType(
                  e[0],
                  e[1],
                  e[2],
                  e[3],
                  e.length > 4 ? e[4] : [],
                  this.SUBJECTID++,
                  this
                )),
            (this.ALLSUBJECTS[e[1]] = this.malla[s][e[1]]),
            (r += this.malla[s][e[1]].getDisplayCredits());
        });
    (this.longestSemester = a),
      (this.totalCredits = r),
      (this.totalSubjects = i),
      (this.isMallaSet = !0);
  }
  setSemesterManager(e) {
    this.semesterManager = e;
  }
  addSubject(e) {
    this.ALLSUBJECTS[e.sigla] = e;
  }
  delSubjects(e) {
    Object.values(this.ALLSUBJECTS).forEach((t) => {
      t.prer.has(e.sigla) && (t.prer.delete(e.sigla), t.verifyPrer());
    }),
      delete this.ALLSUBJECTS[e.sigla];
  }
  drawMalla(e) {
    if (!this.isMallaSet) return;
    let t = 10,
      s = 30 * this.scaleY,
      a =
        this.subjectType.getDisplayWidth(this.scaleX) *
          Object.keys(this.malla).length +
        t * (Object.keys(this.malla).length - 1),
      r =
        (this.subjectType.getDisplayHeight(this.scaleY) + t) *
          this.longestSemester +
        2 * s +
        t,
      i = a + t,
      l = r + 5;
    const o = d3
      .select(e)
      .append("svg")
      .attr("width", i)
      .attr("height", l)
      .attr("role", "figure");
    o.append("title").text("Malla " + this.fullCareerName);
    const c = o;
    let n = 5,
      d = 0,
      h = !1,
      u = 0,
      m = 0,
      p = null,
      S = null,
      g = null;
    Object.keys(this.malla).forEach((e) => {
      if (((d = 0), 0 === u)) {
        g = c
          .append("g")
          .attr("cursor", "pointer")
          .attr("role", "heading")
          .attr("aria-level", "5")
          .classed("year", !0);
        let e = g.append("title");
        (p = g
          .append("rect")
          .attr("x", n)
          .attr("y", d)
          .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
          .attr("height", s)
          .attr("fill", "gray")
          .classed("bars", !0)),
          u++,
          (S = g
            .append("text")
            .attr("x", n + this.subjectType.getDisplayWidth(this.scaleX) / 2)
            .attr("y", d + s / 2)
            .text("A??o " + m++ + " 1/2")
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")),
          e.text("A??o " + m + " 1/2"),
          g.on("click", () => {
            let e = d3.select(d3.event.currentTarget),
              t = parseInt(e.select("text").text().substr(4));
            e.node().getBBox().width <=
            2 * this.subjectType.getDisplayWidth(this.scaleX) -
              this.subjectType.getDisplayWidth(this.scaleX) / 2
              ? d3.select("#sem" + (2 * t + 1)).dispatch("click")
              : (d3.select("#sem" + 2 * t).dispatch("click"),
                d3.select("#sem" + (2 * t - 1)).dispatch("click"));
          });
      } else
        p.attr("width", 2 * this.subjectType.getDisplayWidth(this.scaleX) + t),
          S.text("A??o " + m),
          S.attr("x", n - 5),
          (u = 0),
          g.select("title").text("A??o " + m);
      (d += s + t),
        h ||
          (c
            .append("rect")
            .attr("x", n)
            .attr("y", d)
            .attr("width", a)
            .attr("height", s)
            .attr("fill", "#EEE")
            .classed("sem", !0),
          (h = !0));
      let r = e;
      r = "s" === r[0] ? parseInt(r.substr(1)) : parseInt(r);
      let i = c
        .append("g")
        .attr("id", "sem" + r)
        .attr("cursor", "pointer")
        .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
        .attr("height", s)
        .attr("role", "heading")
        .attr("aria-level", "6")
        .classed("sem", !0);
      i.append("title").text("Semestre " + r),
        i
          .append("rect")
          .attr("cursor", "pointer")
          .attr("x", n)
          .attr("y", d)
          .attr("width", this.subjectType.getDisplayWidth(this.scaleX))
          .attr("height", s)
          .classed("sem", !0)
          .attr("fill", "#EEE"),
        i
          .append("text")
          .attr("x", n + this.subjectType.getDisplayWidth(this.scaleX) / 2)
          .attr("y", d + s / 2)
          .text(this.romanize(r))
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle"),
        i.on("click", () => {
          let t = d3.select(d3.event.currentTarget),
            s = this.deRomanize(t.select("text").text());
          "s" === e[0] && (s = "s" + s),
            Object.values(this.malla[s]).forEach((e) => {
              e.isBeingClicked();
            });
        }),
        (d += s + t),
        Object.keys(this.malla[e]).forEach((s) => {
          this.malla[e][s].draw(c, n, d, this.scaleX, this.scaleY),
            (d += this.subjectType.getDisplayHeight(this.scaleY) + t);
        }),
        (n += this.subjectType.getDisplayWidth(this.scaleX) + t);
    });
  }
  showColorDescriptions() {
    Object.keys(this.categories).forEach((e) => {
      let t = d3
        .select(".color-description")
        .append("div")
        .attr("style", "display:flex;vertical-align:middle;margin-right:15px;");
      t
        .append("svg")
        .attr("height", "25px")
        .attr("width", "25px")
        .append("circle")
        .attr("r", 10)
        .attr("cx", 12)
        .attr("cy", 12)
        .attr("fill", this.categories[e][0]),
        t.append("span").text(this.categories[e][1]);
    });
  }
  enablePrerCheck() {
    (this.checkPrer = !0), this.verifyPrer();
  }
  verifyPrer() {
    this.checkPrer &&
      (Object.values(this.ALLSUBJECTS).forEach((e) => {
        e.verifyPrer();
      }),
      this.saveApproved());
  }
  displayCreditSystem() {
    this.showCreditSystem &&
      d3.select("#credits-system").text(this.sct ? "SCT" : "UAI");
  }
  updateStats() {
    if (!this.showCreditStats) return;
    let e = 0,
      t = 0;
    this.APPROVED.forEach((s) => {
      (e += s.getDisplayCredits()), (t += 1);
    });
    let s = (e / this.totalCredits) * 100,
      a = (t / this.totalSubjects) * 100;
    d3.select("#credits").text(parseInt(e)),
      d3.select("#credPercentage").text(parseInt(s)),
      d3.select("#ramoPercentage").text(parseInt(a));
  }
  cleanSubjects() {
    [...this.APPROVED].forEach((e) => {
      e.cleanRamo();
    }),
      this.verifyPrer(),
      this.updateStats();
  }
  approveSubject(e) {
    this.APPROVED.push(e);
  }
  deApproveSubject(e) {
    let t = this.APPROVED.indexOf(e);
    t > -1 && this.APPROVED.splice(t, 1);
  }
  getSubject(e) {
    return this.ALLSUBJECTS[e];
  }
  saveApproved() {
    if (this.saveEnabled) {
      let e = "approvedRamos_" + this.currentMalla,
        t = [];
      this.APPROVED.forEach((e) => {
        t.push(e.sigla);
      }),
        (localStorage[e] = JSON.stringify(t));
    }
  }
  loadApproved() {
    if (this.saveEnabled) {
      let e = localStorage["approvedRamos_" + this.currentMalla];
      if (e) {
        JSON.parse(e).forEach((e) => {
          void 0 !== this.ALLSUBJECTS[e] && this.ALLSUBJECTS[e].approveRamo();
        }),
          this.verifyPrer();
      }
    }
  }
  deRomanize(e) {
    let t = this.getRnums(),
      s = this.getAnums(),
      a = e.replace(/i/g, "M"),
      r = 0,
      i = 0,
      l = a,
      o = t.length;
    for (let e = 1; e < o; ++e) {
      const l = t[e].length;
      for (; a.substr(0, l) === t[e]; ) {
        if (i++ > 30) return -1;
        (r += s[e]), (a = a.substr(l, a.length - l));
      }
      if (a.length <= 0) break;
    }
    return (
      0 !== a.length && alert(e + " INVALID truncating to " + l.replace(a, "")),
      0 < r && r < 4e6 ? r : -1
    );
  }
  romanize(e) {
    if (e > 3999999 || e < 1) return "Expect number from 1 to 3,999,999";
    let t = this.getRnums(),
      s = this.getAnums(),
      a = parseInt(e),
      r = "",
      i = 0,
      l = t.length;
    for (let e = 1; e < l; ++e) {
      for (; a >= parseInt(s[e]); ) {
        if (i++ > 30) return -1;
        (r += t[e]), (a -= s[e]);
      }
      if (a <= 0) break;
    }
    return r;
  }
  getRnums() {
    let e = Array();
    return (
      (e[1] = "m"),
      (e[2] = "cm"),
      (e[3] = "d"),
      (e[4] = "cd"),
      (e[5] = "c"),
      (e[6] = "xc"),
      (e[7] = "l"),
      (e[8] = "xl"),
      (e[9] = "x"),
      (e[10] = "Mx"),
      (e[11] = "v"),
      (e[12] = "Mv"),
      (e[13] = "M"),
      (e[14] = "CM"),
      (e[15] = "D"),
      (e[16] = "CD"),
      (e[17] = "C"),
      (e[18] = "XC"),
      (e[19] = "L"),
      (e[20] = "XL"),
      (e[21] = "X"),
      (e[22] = "IX"),
      (e[23] = "V"),
      (e[24] = "IV"),
      (e[25] = "I"),
      e
    );
  }
  getAnums() {
    let e = Array();
    return (
      (e[1] = 1e6),
      (e[2] = 9e5),
      (e[3] = 5e5),
      (e[4] = 4e5),
      (e[5] = 1e5),
      (e[6] = 9e4),
      (e[7] = 5e4),
      (e[8] = 4e4),
      (e[9] = 1e4),
      (e[10] = 9e3),
      (e[11] = 5e3),
      (e[12] = 4e3),
      (e[13] = 1e3),
      (e[14] = 900),
      (e[15] = 500),
      (e[16] = 400),
      (e[17] = 100),
      (e[18] = 90),
      (e[19] = 50),
      (e[20] = 40),
      (e[21] = 10),
      (e[22] = 9),
      (e[23] = 5),
      (e[24] = 4),
      (e[25] = 1),
      e
    );
  }
  generateCode() {
    let e = {};
    Object.keys(this.malla).forEach((t) => {
      let s;
      (s = t.includes("s") ? t : "s" + t),
        (e[s] = []),
        Object.keys(this.malla[t]).forEach((t) => {
          let a = this.ALLSUBJECTS[t],
            r = [];
          r.push(a.name),
            r.push(a.sigla),
            r.push(a.getUSMCredits()),
            a.USMtoSCT ? r.push(0) : r.push(a.getSCTCredits()),
            r.push(a.category),
            r.push([...a.prer]),
            r.push(a.dictatesIn),
            e[s].push(r);
        });
    });
    let t = JSON.stringify(e).match(
        /("s[0-9]+":)+|(\[(?:,?[^\[\]])+(?:,\[[^\]]*])(?:,?[^\]]*)+])+/g
      ),
      s = "{\n",
      a = !0,
      r = !0;
    t.forEach((e) => {
      /("s[0-9]+":)/.test(e)
        ? (r
            ? ((s += "    " + e + " [\n"), (r = !1))
            : (s += "\n    ],\n    " + e + " [\n"),
          (a = !0))
        : a
        ? ((s += "        " + e), (a = !1))
        : (s += ",\n        " + e);
    }),
      (s += "\n    ]\n}");
    let i = JSON.stringify(this.categories).match(/("[^\]]+\],?)/g),
      l = "{";
    if (
      (i.forEach((e) => {
        l += "\n    " + e;
      }),
      (l += "\n}"),
      document.getElementById("mallaCode"))
    ) {
      new ClipboardJS(".btn"),
        (document.getElementById("mallaCode").textContent = s),
        (document.getElementById("colorCode").textContent = l),
        PR.prettyPrint(),
        (document.getElementById("abrev").value = this.currentMalla),
        (document.getElementById("carrMalla1").textContent = this.currentMalla),
        (document.getElementById("carrMalla2").textContent = this.currentMalla),
        (document.getElementById("carrColor1").textContent = this.currentMalla),
        (document.getElementById("carrColor2").textContent = this.currentMalla);
      let e = new Blob([s], { "aplication/json": "aplication/json" }),
        t = new Blob([l], { "aplication/json": "aplication/json" }),
        a = document.getElementById("dMalla"),
        r = document.getElementById("dColor");
      a.setAttribute("href", URL.createObjectURL(e)),
        a.setAttribute("download", "data_" + this.currentMalla + ".json"),
        r.setAttribute("href", URL.createObjectURL(t)),
        r.setAttribute("download", "colors_" + this.currentMalla + ".json");
    } else console.log(s), console.log(l);
    document.getElementById("abrev") &&
      document.getElementById("abrev").addEventListener("input", function (e) {
        (document.getElementById("carrMalla1").textContent =
          e.target.value.toUpperCase()),
          (document.getElementById("carrMalla2").textContent =
            e.target.value.toUpperCase()),
          (document.getElementById("carrColor1").textContent =
            e.target.value.toUpperCase()),
          (document.getElementById("carrColor2").textContent =
            e.target.value.toUpperCase()),
          document
            .getElementById("dMalla")
            .setAttribute(
              "download",
              "data_" + e.target.value.toUpperCase() + ".json"
            ),
          document
            .getElementById("dColor")
            .setAttribute(
              "download",
              "colors_" + e.target.value.toUpperCase() + ".json"
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
  static getDisplayWidth(e) {
    return width * e;
  }
  static getDisplayHeight(e) {
    return height * e;
  }
  constructor(e, t, s, a, r = [], i, l, o = 0, c = !1, n = "") {
    (this.name = e),
      (this.sigla = t),
      (this.credits = s),
      (this.category = a),
      (this.prer = new Set(r)),
      o
        ? ((this.creditsSCT = o), (this.USMtoSCT = !1))
        : ((this.creditsSCT = Math.round((5 * s) / 3)), (this.USMtoSCT = !0)),
      (this.dictatesIn = n),
      (this.malla = l),
      (this.isCustom = c),
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
  updateCredits(e, t = 0) {
    (this.credits = e), (this.creditsSCT = t || Math.round((5 * e) / 3));
  }
  getDisplayCredits() {
    return this.malla.sct ? this.getSCTCredits() : this.getUSMCredits();
  }
  draw(e, t, s, a, r) {
    this.ramo = e
      .append("g")
      .attr("cursor", "pointer")
      .attr("role", "img")
      .classed("subject", !0)
      .attr("id", this.sigla);
    let i = this.constructor.getDisplayWidth(a),
      l = this.constructor.getDisplayHeight(r),
      o = l / 5,
      c = this.getDisplayCredits(this.credits),
      n = this.malla.categories[this.category][0],
      d = "",
      h = this.prer.size - 1,
      u = 0;
    this.prer.forEach((e) => {
      (d += 0 === u ? e : u === h ? " y " + e : ", " + e), (u += 1);
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
        .attr("x", t)
        .attr("y", s)
        .attr("width", i)
        .attr("height", l)
        .attr("fill", n),
      this.ramo
        .append("rect")
        .attr("x", t)
        .attr("y", s)
        .attr("width", i)
        .attr("height", o)
        .attr("fill", "#6D6E71")
        .classed("bars", !0),
      this.ramo
        .append("rect")
        .attr("x", t)
        .attr("y", s + l - o)
        .attr("width", i)
        .attr("height", o)
        .attr("fill", "#6D6E71")
        .classed("bars", !0),
      this.ramo
        .append("rect")
        .attr("x", t + i - 22 * a)
        .attr("y", s + l - o)
        .attr("width", 20 * a)
        .attr("height", o)
        .attr("fill", "white"),
      this.ramo
        .append("text")
        .attr("x", t + i - 22 * a + (20 * a) / 2)
        .attr("y", s + l - o / 2)
        .text(c)
        .attr("font-weight", "regular")
        .attr("fill", "black")
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("font-size", 12 * r),
      this.ramo
        .append("text")
        .attr("x", t + i / 2)
        .attr("y", s + l / 2)
        .attr("dy", 0)
        .text(this.name)
        .attr("class", "ramo-label")
        .attr("fill", () => (this.needsWhiteText(n) ? "white" : "#222222"))
        .attr("font-size", 13)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central"),
      this.ramo
        .append("text")
        .attr("x", t + 2)
        .attr("y", s + 10)
        .attr("dominant-baseline", "central")
        .text(this.sigla)
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("font-size", a < 0.85 ? 11 : 12),
      ("P" !== this.dictatesIn && "I" !== this.dictatesIn) ||
        this.ramo
          .append("text")
          .attr("x", t + i - (a < 0.85 ? 25 : 30))
          .attr("y", s + 10)
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle")
          .text(this.dictatesIn)
          .attr("font-weight", "bold")
          .attr("fill", "yellow")
          .attr("font-size", a < 0.85 ? 11 : 12),
      this.drawActions(t, s, i, l),
      this.ramo
        .append("circle")
        .attr("cx", t + i - 10)
        .attr("cy", s + o / 2)
        .attr("fill", "white")
        .attr("r", 8),
      this.ramo
        .append("text")
        .attr("x", t + i - 10)
        .attr("y", s + o / 2)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", 10)
        .text(this.id);
    let m = 0;
    this.prer.forEach((e) => {
      let r = 9,
        i = 10,
        c = 5;
      a < 0.83 && (r--, i--, (c = 1));
      let n = this.malla.categories[this.malla.ALLSUBJECTS[e].category][0];
      this.ramo
        .append("circle")
        .attr("cx", t + r + m + c)
        .attr("cy", s + l - o / 2)
        .attr("r", r)
        .attr("fill", n)
        .attr("stroke", "white"),
        this.ramo
          .append("text")
          .attr("x", t + r + m + c)
          .attr("y", s + l - o / 2)
          .text(this.malla.ALLSUBJECTS[e].id)
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle")
          .attr("font-size", i)
          .attr("dy", 0)
          .attr("fill", () => (this.needsWhiteText(n) ? "white" : "#222222")),
        (m += 2 * r);
    }),
      this.createActionListeners(),
      this.wrap(i - 5, (l / 5) * 3);
  }
  drawActions(e, t, s, a) {
    if (null == this.ramo) return null;
    this.ramo
      .append("rect")
      .attr("x", e)
      .attr("y", t)
      .attr("width", s)
      .attr("height", a)
      .attr("fill", "white")
      .attr("opacity", "0.001")
      .attr("class", "non-approved"),
      this.ramo
        .append("g")
        .attr("class", "cross")
        .attr("opacity", 0)
        .append("path")
        .attr("d", "M" + e + "," + t + "L" + (e + s) + "," + (t + a))
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
    let e = [];
    this.malla.APPROVED.forEach(function (t) {
      e.push(t.sigla);
    }),
      (e = new Set(e));
    for (let t of this.prer)
      if (!e.has(t))
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
  wrap(e, t) {
    let s,
      a,
      r,
      i = this.ramo.select(".ramo-label"),
      l = i.text().split(/\s+/).reverse(),
      o = [],
      c = 0,
      n = parseInt(i.attr("font-size"), 10),
      d = i
        .text(null)
        .append("tspan")
        .attr("x", i.attr("x"))
        .attr("dominant-baseline", "central")
        .attr("dy", "0em");
    for (s = l.pop(); s; ) {
      for (
        o.push(s), d.text(o.join(" "));
        d.node().getComputedTextLength() > e;

      )
        1 === o.length
          ? i.attr("font-size", String(--n))
          : (o.pop(),
            d.text(o.join(" ")),
            (o = [s]),
            (d = i
              .append("tspan")
              .attr("x", i.attr("x"))
              .attr("dominant-baseline", "central")
              .attr("dy", "1.1em")
              .text(s)));
      s = l.pop();
    }
    let h = i.selectAll("tspan");
    for (
      i.attr("dy", 0),
        a = h._groups[0].length,
        r = i.node().getBoundingClientRect().height;
      r > t - 5;

    )
      i.attr("font-size", String(--n)),
        i.attr("dy", 0),
        (r = i.node().getBoundingClientRect().height),
        (c = 0);
    if (1 !== a) {
      h.filter(function (e, t) {
        return 0 === t;
      }).attr("dy", -((1.1 * a) / 2 - 0.55) + "em");
    }
    i.attr("dy", 0);
  }
  needsWhiteText(e) {
    let t = 0,
      s = 0,
      a = 0;
    4 === e.length
      ? ((t = "0x" + e[1] + e[1]),
        (s = "0x" + e[2] + e[2]),
        (a = "0x" + e[3] + e[3]))
      : 7 === e.length &&
        ((t = "0x" + e[1] + e[2]),
        (s = "0x" + e[3] + e[4]),
        (a = "0x" + e[5] + e[6]));
    let r = [0, 0, 0];
    (r[0] = t / 255), (r[1] = s / 255), (r[2] = a / 255);
    for (let e in r)
      r[e] <= 0.03928
        ? (r[e] /= 12.92)
        : (r[e] = Math.pow((r[e] + 0.055) / 1.055, 2.4));
    return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2] <= 0.6;
  }
}
class SelectableRamo extends Ramo {
  constructor(e, t, s, a, r, i, l, o = 0, c = !1, n = "") {
    super(e, t, s, a, r, i, l, o, c, n),
      (this.isCustom = c),
      (this.selected = !1);
  }
  drawActions(e, t, s, a) {
    super.drawActions(e, t, s, a),
      this.ramo
        .append("rect")
        .attr("x", e)
        .attr("y", t)
        .attr("width", s)
        .attr("height", a)
        .attr("stroke", "green")
        .attr("stroke-width", "7")
        .attr("opacity", "0.001")
        .attr("fill-opacity", "0.001")
        .attr("class", "selected");
  }
  isBeingClicked() {
    this.selectRamo();
  }
  selectRamo() {
    if (this.approved) this.isCustom || this.showWarning();
    else {
      if (this.selected) {
        this.isCustom ||
          this.ramo
            .select(".selected")
            .transition()
            .delay(20)
            .attr("opacity", "0.01"),
          this.malla.semesterManager.removeSubject(this),
          d3
            .select("#p-" + this.sigla)
            .transition()
            .duration(300)
            .style("opacity", "0.001")
            .remove();
      } else
        this.isCustom ||
          this.ramo
            .select(".selected")
            .transition()
            .delay(20)
            .attr("opacity", ".8"),
          this.malla.semesterManager.addSubject(this);
      this.selected = !this.selected;
    }
  }
  showWarning(e = "red") {
    if (!this.isCustom) {
      this.ramo.select(".selected").attr("stroke", e);
      let t = this.ramo
        .select(".selected")
        .transition()
        .duration(200)
        .attr("opacity", ".8")
        .transition()
        .duration(150)
        .attr("opacity", ".5")
        .transition()
        .duration(150)
        .attr("opacity", ".8")
        .transition()
        .duration(200)
        .attr("opacity", ".001")
        .attr("stroke", "green");
      this.selected && t.transition().attr("opacity", ".8");
    }
  }
}
class SemesterManager {
  constructor(e, t, s = !1) {
    (this.selectedPerSemester = { 1: [] }),
      (this.semester = 1),
      (this.saveEnabled = !1),
      (this.subjectsInManySemesters = !1),
      (this.malla = e),
      (this.card = d3.select(t)),
      (this.displayedSubjects = {}),
      (this.saveEnabled = !0),
      (this.mallaEditor = s || null),
      (this.semesterIndicator = this.card.select("#semester")),
      this.card.select("#reset").on("click", () => this.cleanSemester()),
      this.card.select("#resetc").on("click", () => this.cleanAll()),
      this.card.select("#forward").on("click", () => this.nextSemester()),
      (this.backButton = this.card
        .select("#back")
        .on("click", () => this.prevSemester())),
      (this.noSubjectsText = this.card.select(".no-subjects")),
      this.updateSemesterIndicator();
  }
  updateSemesterIndicator() {
    this.semesterIndicator.text(this.semester);
  }
  addSubject(e) {
    if (
      (console.log(this.selectedPerSemester[this.semester]),
      void 0 === this.selectedPerSemester[this.semester])
    )
      this.noSubjectsText.classed("d-none", !0),
        (this.selectedPerSemester[this.semester] = []);
    else {
      0 === this.selectedPerSemester[this.semester].length &&
        (this.noSubjectsText.classed("d-none", !0),
        (this.selectedPerSemester[this.semester] = []));
    }
    this.selectedPerSemester[this.semester].push(e), this.displaySubject(e);
  }
  removeSubject(e) {
    let t = this.selectedPerSemester[this.semester].indexOf(e);
    t > -1 && this.selectedPerSemester[this.semester].splice(t, 1),
      this.unDisplaySubject(e),
      0 === this.selectedPerSemester[this.semester].length &&
        this.noSubjectsText.classed("d-none", !1);
  }
  removeSubjectOutsideSemester(e) {
    Object.keys(this.selectedPerSemester).forEach((t) => {
      if (t !== this.semester) {
        let s = this.selectedPerSemester[t].indexOf(e);
        -1 !== s &&
          (this.selectedPerSemester[t].splice(s, 1),
          t < this.semester && e.approveRamo());
      }
    });
  }
  displaySubject(e) {}
  updateDisplayedSubject(e) {}
  unDisplaySubject(e) {}
  nextSemester() {
    let e = [...this.selectedPerSemester[this.semester]];
    this.saveSemesters(),
      (this.saveEnabled = !1),
      this.cleanSemester(),
      (this.selectedPerSemester[this.semester] = e),
      this.selectedPerSemester[this.semester].forEach((e) => e.approveRamo()),
      this.semester++,
      2 === this.semester &&
        (this.backButton.classed("disabled", !1),
        this.backButton.attr("disabled", null)),
      this.updateSemesterIndicator(),
      void 0 !== this.selectedPerSemester[this.semester] &&
        ((e = [...this.selectedPerSemester[this.semester]]),
        e.forEach((e) => {
          e.selectRamo();
        }),
        (this.selectedPerSemester[this.semester] = e)),
      (this.saveEnabled = !0),
      this.malla.verifyPrer();
  }
  prevSemester() {
    let e = this.selectedPerSemester[this.semester];
    (void 0 === e || e === []) &&
    this.semester >= Object.values(this.selectedPerSemester).length
      ? delete this.selectedPerSemester[this.semester]
      : (e = [...this.selectedPerSemester[this.semester]]),
      this.saveSemesters(),
      (this.saveEnabled = !1),
      this.cleanSemester(),
      void 0 !== e && e !== [] && (this.selectedPerSemester[this.semester] = e),
      this.deApprovePrevSemester(),
      this.semester--,
      1 === this.semester &&
        (this.backButton.classed("disabled", !0),
        this.backButton.attr("disabled", "disabled")),
      this.updateSemesterIndicator(),
      (e = [...this.selectedPerSemester[this.semester]]),
      e.forEach((e) => {
        e.selectRamo();
      }),
      (this.selectedPerSemester[this.semester] = e),
      (this.saveEnabled = !0),
      this.malla.verifyPrer();
  }
  deApprovePrevSemester() {
    this.selectedPerSemester[this.semester - 1].forEach((e) => {
      e.approved && e.approveRamo();
    });
  }
  cleanSemester() {
    if (void 0 !== this.selectedPerSemester[this.semester]) {
      [...this.selectedPerSemester[this.semester]].forEach((e) => {
        e.selectRamo();
      });
    }
  }
  cleanAll() {
    (this.saveEnabled = !1),
      this.cleanSemester(),
      (this.semester = 1),
      this.updateSemesterIndicator(),
      (this.selectedPerSemester = {}),
      this.backButton.classed("disabled", !0),
      this.backButton.attr("disabled", "disabled"),
      this.malla.cleanSubjects(),
      (this.saveEnabled = !0),
      this.saveSemesters();
  }
  loadSemesters() {
    console.log("Fake Loading...");
  }
  saveSemesters() {
    this.saveEnabled && console.log("Fake Saving...");
  }
}
class Priorix extends SemesterManager {
  constructor(e, t) {
    super(e, t),
      (this.faes = { 1: 1 }),
      (this.prevSemesterSums = { USM: {}, SCT: {} }),
      (this.currentSemesterSum = { USM: 0, SCT: 0 }),
      (this.totalCredits = { USM: 0, SCT: 0 }),
      (this.totalApprovedCredits = { USM: {}, SCT: {} }),
      (this.subjectGrades = {}),
      this.card.select(".fae").on("input", () => this.calculate()),
      (this.calculationsEnabled = !0),
      (this.mallaEditor = new MallaEditor(this, "#unoficialSubjects"));
  }
  addSubject(e) {
    super.addSubject(e),
      (this.totalCredits.USM = this.totalCredits.USM + e.getUSMCredits()),
      (this.totalCredits.SCT = this.totalCredits.SCT + e.getSCTCredits()),
      this.calculate();
  }
  removeSubject(e) {
    super.removeSubject(e),
      (this.totalCredits.USM = this.totalCredits.USM - e.getUSMCredits()),
      (this.totalCredits.SCT = this.totalCredits.SCT - e.getSCTCredits()),
      this.calculate();
  }
  removeSubjectOutsideSemester(e) {
    Object.keys(this.selectedPerSemester).forEach((t) => {
      if (t !== this.semester) {
        let s = this.selectedPerSemester[t].indexOf(e);
        if (
          -1 !== s &&
          (this.selectedPerSemester[t].splice(s, 1), t < this.semester)
        ) {
          e.approveRamo(),
            (this.totalCredits.USM -= e.getUSMCredits()),
            (this.totalCredits.SCT -= e.getSCTCredits());
          let s = this.subjectGrades[t][e.sigla],
            a = s * e.getUSMCredits(),
            r = s * e.getSCTCredits();
          for (delete this.subjectGrades[t][e.sigla]; t < this.semester; t++)
            s > 54 &&
              ((this.totalApprovedCredits.USM[t] -= e.getUSMCredits()),
              (this.totalApprovedCredits.SCT[t] -= e.getSCTCredits())),
              (this.prevSemesterSums.USM[t] -= a),
              (this.prevSemesterSums.SCT[t] -= r);
        }
      }
    });
  }
  displaySubject(e) {
    if (-1 !== this.malla.APPROVED.indexOf(e)) return;
    let t = this.card.select(".subjects").append("div");
    t.attr("id", "p-" + e.sigla),
      t.attr("class", "form-group mb-2"),
      t.attr("style", "opacity:0.001"),
      t
        .append("label")
        .attr("class", "text-left mb-0")
        .attr("for", "nota-" + e.sigla)
        .text(e.name);
    let s = Boolean(this.semester % 2);
    t
      .append("small")
      .classed(
        "form-text bg-light rounded text-center mt-0 d-block mb-1 text-danger infmessage",
        !0
      ),
      s && "P" === e.dictatesIn
        ? t
            .select(".infmessage")
            .classed("d-block", !1)
            .text(
              "Esta asignatura normalmente solo se dicta en semestres pares"
            )
        : s ||
          "I" !== e.dictatesIn ||
          t
            .select("infmessage")
            .classed("d-block", !1)
            .text(
              "Esta asignatura normalmente solo se dicta en semestres Impares"
            );
    let a = t.append("div");
    a.attr("class", "input-group"),
      a
        .append("div")
        .attr("class", "input-group-prepend")
        .append("span")
        .attr("class", "input-group-text")
        .text("Nota");
    let r = a
      .append("input")
      .attr("class", "form-control")
      .attr("id", "nota-" + e.sigla)
      .attr("name", "nota-" + e.sigla)
      .attr("type", "number")
      .attr("inputmode", "numeric")
      .attr("autocomplete", "off")
      .attr("min", "0")
      .attr("max", "100")
      .attr("placeholder", "0")
      .on("input", () => {
        this.calculate();
      });
    a
      .append("div")
      .attr("class", "input-group-append")
      .append("span")
      .attr("class", "input-group-text")
      .text("x " + e.getUSMCredits() + " USM | " + e.getSCTCredits() + " SCT"),
      t.transition().duration(300).style("opacity", "1"),
      (this.displayedSubjects[e.sigla] = [t, r]),
      this.calculate();
  }
  unDisplaySubject(e) {
    this.displayedSubjects[e.sigla][1].on("input", null),
      this.displayedSubjects[e.sigla][0]
        .transition()
        .duration(300)
        .style("opacity", "0.001")
        .remove(),
      delete this.displayedSubjects[e.sigla];
  }
  nextSemester() {
    this.calculationsEnabled = !1;
    let e = [],
      t = [...this.selectedPerSemester[this.semester]];
    (this.prevSemesterSums.USM[this.semester] = this.currentSemesterSum.USM),
      (this.prevSemesterSums.SCT[this.semester] = this.currentSemesterSum.SCT),
      t.forEach((t) => {
        (this.totalCredits.USM += t.getUSMCredits()),
          (this.totalCredits.SCT += t.getSCTCredits()),
          this.displayedSubjects[t.sigla][1].property("value") > 54
            ? (t.selectRamo(), t.approveRamo())
            : this.selectedPerSemester[this.semester + 1]
            ? t.selectRamo()
            : (this.displayedSubjects[t.sigla][1].property("value", ""),
              this.displayedSubjects[t.sigla][0]
                .select(".infmessage")
                .classed("d-block", !1)
                .text("Asignatura reprobada el semestre anterior"),
              t.showWarning("yellow")),
          e.push(t);
      });
    let s = this.selectedPerSemester[this.semester];
    (this.selectedPerSemester[this.semester] = t),
      this.semester++,
      2 === this.semester &&
        (this.backButton.classed("disabled", !1),
        this.backButton.attr("disabled", null)),
      this.updateSemesterIndicator(),
      this.selectedPerSemester[this.semester]
        ? ((t = [...this.selectedPerSemester[this.semester]]),
          t.forEach((t) => {
            t.selectRamo(),
              this.displayedSubjects[t.sigla][1].property(
                "value",
                this.subjectGrades[this.semester][t.sigla]
              ),
              e.push(t);
          }),
          (this.selectedPerSemester[this.semester] = t))
        : (this.selectedPerSemester[this.semester] = s),
      (this.calculationsEnabled = !0),
      this.calculate(),
      this.malla.verifyPrer(),
      e.forEach((e) => this.mallaEditor.updateState(e));
  }
  prevSemester() {
    this.calculationsEnabled = !1;
    let e = [],
      t = this.selectedPerSemester[this.semester];
    (void 0 === t || t === []) &&
    this.semester >= Object.values(this.selectedPerSemester).length
      ? delete this.selectedPerSemester[this.semester]
      : (t = [...this.selectedPerSemester[this.semester]]),
      this.deApprovePrevSemester();
    let s = [...this.selectedPerSemester[this.semester - 1]];
    t.forEach((t) => {
      -1 === s.indexOf(t)
        ? t.selectRamo()
        : ((this.totalCredits.USM -= t.getUSMCredits()),
          (this.totalCredits.SCT -= t.getSCTCredits())),
        e.push(t);
    }),
      t !== [] && (this.selectedPerSemester[this.semester] = t),
      this.semester--,
      1 === this.semester &&
        (this.backButton.classed("disabled", !0),
        this.backButton.attr("disabled", "disabled")),
      s.forEach((t) => {
        t.selected ||
          (t.selectRamo(),
          (this.totalCredits.USM -= t.getUSMCredits()),
          (this.totalCredits.SCT -= t.getSCTCredits())),
          this.displayedSubjects[t.sigla][1].property(
            "value",
            this.subjectGrades[this.semester][t.sigla]
          ),
          e.push(t);
      }),
      (this.selectedPerSemester[this.semester] = s),
      this.updateSemesterIndicator(),
      (this.calculationsEnabled = !0),
      this.calculate(),
      this.malla.verifyPrer(),
      e.forEach((e) => this.mallaEditor.updateState(e));
  }
  cleanSemester() {
    super.cleanSemester(),
      (this.faes[this.semester] = 1),
      (this.card.select(".fae").node().value = 1),
      this.calculate();
  }
  cleanAll() {
    (this.calculationsEnabled = !1),
      super.cleanAll(),
      (this.faes = { 1: 1 }),
      (this.prevSemesterSums = { USM: {}, SCT: {} }),
      (this.currentSemesterSum = { USM: 0, SCT: 0 }),
      (this.totalCredits = { USM: 0, SCT: 0 }),
      (this.totalApprovedCredits = { USM: {}, SCT: {} }),
      (this.subjectGrades = {}),
      (this.card.select(".fae").node().value = 1),
      (this.selectedPerSemester[1] = []),
      (this.calculationsEnabled = !0),
      this.calculate(),
      delete localStorage["priorixUserData" + this.malla.currentMalla],
      this.mallaEditor.updateAllStates(),
      this.backButton.classed("disabled", !0),
      this.backButton.attr("disabled", "disabled");
  }
  saveSemesters() {
    if (this.saveEnabled) {
      let e = JSON.stringify([this.subjectGrades, this.faes]);
      localStorage["priorixUserData" + this.malla.currentMalla] = e;
    }
  }
  loadSemesters() {
    let e = !1,
      t = localStorage["priorixUserData" + this.malla.currentMalla];
    if (t) t = JSON.parse(t);
    else {
      let s =
          localStorage["prioridad-" + this.malla.currentMalla + "_SEMESTRES"],
        a = localStorage["prioridad-" + this.malla.currentMalla + "_SEMESTRES"];
      if (!a || !s) return;
      (t = []),
        t.push(JSON.parse(s)),
        t.push(JSON.parse(a)),
        (localStorage["priorixUserData" + this.malla.currentMalla] =
          JSON.stringify(t)),
        (e = !0);
    }
    (this.saveEnabled = !1),
      (this.subjectGrades = Object.assign({}, t[0])),
      (this.faes = t[1]);
    let s = 1,
      a = this.subjectGrades[1];
    this.selectedPerSemester[1] = [];
    let r = {};
    for (
      Object.keys(a).forEach((e) => {
        void 0 !== this.malla.ALLSUBJECTS[e]
          ? (this.malla.ALLSUBJECTS[e].selectRamo(),
            this.displayedSubjects[e][1].property("value", t[0][1][e]))
          : (void 0 === r[1] && (r[1] = []),
            r[1].push([e + ": " + this.subjectGrades[1][e]]),
            delete this.subjectGrades[1][e]);
      }),
        this.calculate();
      s < Object.keys(this.subjectGrades).length;
      s++
    )
      (this.selectedPerSemester[s + 1] = []),
        Object.keys(this.subjectGrades[s + 1]).forEach((e) => {
          void 0 !== this.malla.ALLSUBJECTS[e]
            ? this.selectedPerSemester[s + 1].push(this.malla.ALLSUBJECTS[e])
            : (void 0 === r[s + 1] && (r[s + 1] = []),
              r[s + 1].push([e + ": " + this.subjectGrades[s + 1][e]]),
              delete this.subjectGrades[s + 1][e]);
        }),
        this.nextSemester();
    if (0 !== Object.keys(r).length) {
      $(".toast").toast("show");
      let e = d3.select("#deletedSubjects").append("ul");
      Object.keys(r).forEach((t) => {
        let s = e.append("li").text(`Semestre ${t}`).append("ul");
        r[t].forEach((e) => {
          s.append("li").text(e);
        });
      }),
        d3.select("#deletedCard").classed("d-none", !1);
    }
    (this.saveEnabled = !0),
      e &&
        (this.saveSemesters(),
        delete localStorage[
          "prioridad-" + this.malla.currentMalla + "_SEMESTRES"
        ],
        delete localStorage[
          "prioridad-" + this.malla.currentMalla + "_SEMESTRES"
        ]);
  }
  calculate() {
    if (this.calculationsEnabled) {
      let e,
        t,
        s,
        a,
        r = {};
      1 !== this.semester
        ? ((e = this.totalApprovedCredits.USM[this.semester - 1]),
          (t = this.totalApprovedCredits.SCT[this.semester - 1]),
          (s = this.prevSemesterSums.USM[this.semester - 1]),
          (a = this.prevSemesterSums.SCT[this.semester - 1]))
        : ((e = 0), (t = 0), (s = 0), (a = 0)),
        this.selectedPerSemester[this.semester].forEach((i) => {
          let l = this.displayedSubjects[i.sigla][1].property("value");
          (r[i.sigla] = l),
            l > 54 && ((e += i.getUSMCredits()), (t += i.getSCTCredits())),
            (s += l * i.getUSMCredits()),
            (a += l * i.getSCTCredits());
        });
      let i = this.card.select(".fae").property("value"),
        l = 0,
        o = 0;
      0 !== this.totalCredits.USM &&
        ((l =
          (((s / (14 * Math.pow(this.semester, 1.06))) * 100 * e) /
            this.totalCredits.USM) *
          i),
        (l = Math.round(100 * l) / 100),
        (o =
          (((a / ((70 / 3) * Math.pow(this.semester, 1.06))) * 100 * t) /
            this.totalCredits.SCT) *
          i),
        (o = Math.round(100 * o) / 100)),
        this.card.select(".resSCT").text(o),
        (this.subjectGrades[this.semester] = r),
        (this.currentSemesterSum.USM = s),
        (this.currentSemesterSum.SCT = a),
        (this.faes[this.semester] = i),
        (this.totalApprovedCredits.USM[this.semester] = e),
        (this.totalApprovedCredits.SCT[this.semester] = t),
        this.saveSemesters();
    }
  }
}
class MallaEditor {
  constructor(e, t, s = !1) {
    if (
      ((this.semesterManager = e),
      (this.customManager = document.querySelector(t)),
      (this.categories = Object.assign(
        {},
        this.semesterManager.malla.categories
      )),
      (this.categoryList = {}),
      (this.subjectList = []),
      (this.tableList = {}),
      (this.defaultSector = ["#000000", "Fuera de la malla | editado"]),
      (this.categories.Custom = this.defaultSector),
      s)
    ) {
      document
        .getElementById("deleteCategories")
        .addEventListener("click", this.restoreCategories.bind(this)),
        (this.categoryManager = document.querySelector(s));
      let e = document.querySelector("#showCatModal");
      e.addEventListener("click", this.setUpCategoryModal.bind(this, !1, null));
      let t = e.getAttribute("data-target");
      (this.createCatEventListener = this.createCategory.bind(this, null)),
        (this.editCatEventListener = null),
        (this.deleteCatEventListener = null),
        (this.categoryModal = $(t)),
        this.categoryModal.on("hidden.bs.modal", (e) => {
          (e.target.querySelector("#cat-name").value = ""),
            (e.target.querySelector("#small-cat-name").value = ""),
            e.target
              .querySelector("#small-cat-name")
              .removeAttribute("disabled"),
            (e.target.querySelector("#cat-color").value = ""),
            console.log("hidden"),
            e.target
              .querySelector("#sectorDeleteButton")
              .classList.remove("d-none"),
            e.target
              .querySelector("#sectorDeleteButton")
              .removeEventListener("click", this.deleteCatEventListener);
          let t = e.target.querySelector("#sectorDoneButton");
          t.removeEventListener("click", this.createCatEventListener),
            t.removeEventListener("click", this.editCatEventListener),
            (t.textContent = "Agregar"),
            (e.target.querySelector("#catTitle").textContent = "Agregar");
        });
    } else this.categoryManager = null;
    this.subjectTable = this.customManager.querySelector("#customTableContent");
    let a = this.customManager
      .getElementsByClassName("button-create-subject")[0]
      .getAttribute("data-target");
    (this.createSubjectModal = $(a)),
      this.createSubjectModal.on("hidden.bs.modal", (e) => {
        (e.target.querySelector("#custom-name").value = ""),
          (e.target.querySelector("#custom-sigla").value = ""),
          (e.target.querySelector("#custom-credits-USM").value = ""),
          (e.target.querySelector("#custom-credits-SCT").value = ""),
          (e.target.querySelector("#custom-credits-SCT").placeholder =
            "Ingrese un valor");
      }),
      (this.createAdvancedSubjectModal = null);
    let r = document.querySelector(a);
    r.querySelector("#createSubject").addEventListener("click", (e) => {
      this.createSubject(r);
    }),
      document
        .getElementById("deleteSubjects")
        .addEventListener("click", this.cleanSubjects.bind(this));
    let i = this.customManager.getElementsByClassName(
      "button-advanced-subject"
    );
    if (0 !== i.length) {
      (this.createSubEventListener = this.createAdvancedSubject.bind(this)),
        (this.editSubEvent = null),
        (this.advanced = !0);
      let e = i[0].getAttribute("data-target");
      (this.createAdvancedSubjectModal = $(e)),
        i[0].addEventListener("click", () => {
          this.setUpModal();
        }),
        this.createAdvancedSubjectModal.on("hidden.bs.modal", (e) => {
          e.target.querySelector("#custom-namea").value = "";
          let t = e.target.querySelector("#custom-siglaa");
          (t.value = ""),
            t.removeAttribute("disabled"),
            (e.target.querySelector("#custom-creditsa-USM").value = ""),
            (e.target.querySelector("#custom-creditsa-SCT").value = ""),
            (e.target.querySelector("#custom-creditsa-SCT").placeholder =
              "Ingrese un valor"),
            (e.target.querySelector("#dictatesIn").value = "");
          let s = e.target.querySelector("#sectorChooser");
          s.textContent = "";
          let a = document.createElement("option");
          (a.value = this.defaultSector[0]), s.append(a);
          let r = e.target.querySelector("#prerChooser");
          r.textContent = "";
          let i = document.createElement("option");
          (i.value = "0"),
            (i.textContent = "Elige los prerrequisitos"),
            r.append(i),
            (e.target.querySelector("#prerList").textContent = "");
          let l = e.target.querySelector("#createAdvSubject");
          (l.textContent = "Agregar"),
            l.removeEventListener("click", this.createSubEventListener),
            l.removeEventListener("click", this.editSubEvent),
            (this.createAdvancedSubjectModal
              .get(0)
              .querySelector("#advSubjectTitle").textContent = "Agregar");
        }),
        this.createAdvancedSubjectModal
          .get(0)
          .querySelector("#prerChooser")
          .addEventListener("change", this.addPrerToModal.bind(this));
    } else this.advanced = !1;
    this.subjectModalPrer = new Set();
  }
  setUpModal(e = !1, t = null) {
    let s = this.createAdvancedSubjectModal.get(0),
      a = s.querySelector("#sectorChooser");
    Object.keys(this.categories).forEach((e) => {
      if ("Custom" !== e) {
        let t = document.createElement("option");
        (t.value = e), (t.textContent = this.categories[e][1]), a.append(t);
      }
    }),
      this.categories.Custom
        ? (a.firstElementChild.textContent = this.categories.Custom[1])
        : (a.firstElementChild.textContent = this.defaultSector[1]);
    let r = s.querySelector("#prerChooser");
    if (
      (Object.keys(this.semesterManager.malla.ALLSUBJECTS).forEach((e) => {
        let t = document.createElement("option");
        (t.value = e),
          (t.textContent =
            this.semesterManager.malla.ALLSUBJECTS[e].name + " | " + e),
          r.append(t);
      }),
      (this.subjectModalPrer = new Set()),
      e)
    ) {
      s.querySelector("#custom-namea").value = t.name;
      let e = s.querySelector("#custom-siglaa");
      (e.value = t.sigla),
        e.setAttribute("disabled", "disabled"),
        (s.querySelector("#custom-creditsa-USM").value = t.getUSMCredits()),
        Math.round((5 * t.getUSMCredits()) / 3) !== t.getSCTCredits() &&
          (s.querySelector("#custom-creditsa-SCT").value = t.getSCTCredits()),
        (a.value = t.category),
        t.prer.forEach((e) => {
          (r.value = e), this.addPrerToModal(null, r);
        }),
        (s.querySelector("#dictatesIn").value = t.dictatesIn),
        this.tableList[t.sigla]
          ? (this.editSubEvent = this.tableList[t.sigla][1])
          : (this.editSubEvent = this.editSubject.bind(this, t)),
        (this.createAdvancedSubjectModal
          .get(0)
          .querySelector("#createAdvSubject").textContent = "Editar"),
        (this.createAdvancedSubjectModal
          .get(0)
          .querySelector("#advSubjectTitle").textContent = "Editar"),
        this.createAdvancedSubjectModal
          .get(0)
          .querySelector("#createAdvSubject")
          .addEventListener("click", this.editSubEvent),
        this.createAdvancedSubjectModal.modal("show");
    } else
      this.createAdvancedSubjectModal
        .get(0)
        .querySelector("#createAdvSubject")
        .addEventListener("click", this.createSubEventListener);
  }
  displaySubject(e) {
    let t = document.createElement("tr");
    t.setAttribute("id", "custom-" + e.sigla);
    let s = document.createElement("td");
    s.setAttribute("scope", "row"), (s.textContent = e.sigla);
    let a = document.createElement("td");
    a.textContent = e.name;
    let r = document.createElement("td");
    r.textContent = e.getUSMCredits() + " UAI | " + e.getSCTCredits() + " SCT";
    let i = document.createElement("td");
    i.setAttribute("id", "state"),
      e.selected
        ? (i.textContent = "Seleccionado")
        : (i.textContent = "No seleccionado");
    let l = null;
    if (this.advanced) {
      l = document.createElement("td");
      let t = 0;
      e.prer.forEach((e) => {
        0 === t ? ((l.textContent = e), (t = 1)) : (l.textContent += " | " + e);
      }),
        0 === l.textContent.length && (l.textContent = "Sin prerrequisitos");
    }
    let o = document.createElement("td");
    o.classList.add("py-0");
    let c = document.createElement("div");
    c.classList.add("btn-group"), c.setAttribute("role", "group");
    let n = document.createElement("button");
    n.setAttribute("id", "sel-" + e.sigla),
      n.setAttribute("type", "button"),
      n.classList.add("btn", "btn-secondary"),
      (n.textContent = "Seleccionar"),
      n.addEventListener("click", (t) => {
        e.selectRamo(), this.updateState(e);
      }),
      e.selected && (n.textContent = "Deseleccionar"),
      c.append(n);
    let d = null,
      h = null;
    if (
      (this.advanced &&
        ((d = document.createElement("button")),
        d.setAttribute("type", "button"),
        d.classList.add("btn", "btn-secondary"),
        (d.textContent = "Editar"),
        (h = this.editSubject.bind(this, e)),
        d.addEventListener("click", this.setUpModal.bind(this, !0, e)),
        c.append(d)),
      e.isCustom)
    ) {
      let t = document.createElement("button");
      t.setAttribute("id", "delete-" + e.sigla),
        t.classList.add("btn", "btn-danger"),
        (t.textContent = "Eliminar"),
        t.addEventListener("click", (t) => {
          this.deleteSubject(e);
        }),
        c.appendChild(t);
    } else {
      let t = document.createElement("button");
      t.setAttribute("id", "restore-" + e.sigla),
        t.classList.add("btn", "btn-danger"),
        (t.textContent = "Restaurar"),
        t.addEventListener("click", (t) => {
          this.restoreSubject(e);
        }),
        c.appendChild(t);
    }
    o.append(c),
      t.append(s),
      t.append(a),
      t.append(r),
      t.append(i),
      this.advanced && t.append(l),
      t.append(o),
      t.childNodes.forEach((e) => e.classList.add("align-middle")),
      t.animate && t.animate([{ opacity: 0 }, { opacity: 1 }], 500),
      this.subjectTable.append(t),
      (this.tableList[e.sigla] = [t, h]);
  }
  unDisplaySubject(e) {
    this.subjectTable.querySelector("#custom-" + e.sigla).remove(),
      delete this.tableList[e.sigla];
  }
  updateState(e) {
    if (!e.isCustom) {
      if (!e.beenEdited) return;
      if (void 0 === this.tableList[e.sigla])
        return void this.displaySubject(e);
    }
    let t = this.tableList[e.sigla][0].childNodes;
    if (
      ((t[1].textContent = e.name),
      (t[2].textContent =
        e.getUSMCredits() + " UAI | " + e.getSCTCredits() + " SCT"),
      this.advanced)
    ) {
      let s = t[4];
      s.textContent = null;
      let a = 0;
      e.prer.forEach((e) => {
        0 === a ? ((s.textContent = e), (a = 1)) : (s.textContent += " | " + e);
      }),
        0 === s.textContent.length && (s.textContent = "Sin prerrequisitos");
    }
    let s = t[3];
    if (((s.textContent = "No seleccionado"), e.selected))
      s.textContent = "Seleccionado";
    else {
      let t = !0;
      Object.keys(this.semesterManager.selectedPerSemester).forEach((a) => {
        if (a !== this.semesterManager.semester) {
          -1 !== this.semesterManager.selectedPerSemester[a].indexOf(e) &&
            a < this.semesterManager.semester &&
            (t
              ? ((s.textContent = "Seleccionado en S" + a), (t = !1))
              : (s.textContent += ", S" + a));
        }
      });
    }
    let a = this.tableList[e.sigla][0].querySelector("#sel-" + e.sigla);
    e.selected
      ? (a.textContent = "Deseleccionar")
      : (a.textContent = "Seleccionar"),
      e.approved
        ? a.setAttribute("disabled", "disabled")
        : a.removeAttribute("disabled");
  }
  updateAllStates() {
    this.subjectList.forEach((e) => this.updateState(e));
  }
  semesterChange() {
    this.subjectList.forEach((e) => {
      this.updateState(e);
    });
  }
  createSubject(e) {
    let t = e.querySelector("#custom-name").value,
      s = e.querySelector("#custom-sigla").value,
      a = parseInt(e.querySelector("#custom-credits-USM").value),
      r = parseInt(e.querySelector("#custom-credits-SCT").value);
    isNaN(r) && (r = 0);
    let i = new SelectableRamo(
      t,
      s,
      a,
      "Custom",
      [],
      this.semesterManager.malla.SUBJECTID++,
      this.semesterManager.malla,
      r,
      !0
    );
    this.subjectList.push(i),
      this.semesterManager.malla.addSubject(i),
      this.displaySubject(i),
      this.saveSubjects(),
      this.advanced && this.saveCategories();
  }
  createAdvancedSubject() {
    let e = this.createAdvancedSubjectModal.get(0),
      t = e.querySelector("#custom-namea").value,
      s = e.querySelector("#custom-siglaa").value,
      a = e.querySelector("#custom-creditsa-USM").value,
      r = e.querySelector("#custom-creditsa-SCT").value;
    isNaN(parseInt(a)) ? (a = 1) : (r = parseInt(a)),
      (r = isNaN(parseInt(r)) ? 2 : parseInt(r)),
      console.log(r, a, e.querySelector("#custom-creditsa-USM").value);
    let i = e.querySelector("#sectorChooser").value,
      l = e.querySelector("#dictatesIn").value,
      o = [];
    e.querySelector("#prerList")
      .querySelectorAll("li")
      .forEach((e) => {
        o.push(e.getAttribute("id").slice(4));
      });
    let c = new SelectableRamo(
      t,
      s,
      a,
      i,
      o,
      this.semesterManager.malla.SUBJECTID++,
      this.semesterManager.malla,
      r,
      !0,
      l
    );
    this.subjectList.push(c),
      this.semesterManager.malla.addSubject(c),
      this.createAdvancedSubjectModal.modal("hide"),
      this.displaySubject(c),
      this.saveSubjects();
  }
  editSubject(e) {
    let t = this.createAdvancedSubjectModal.get(0);
    (e.name = t.querySelector("#custom-namea").value),
      (e.category = t.querySelector("#sectorChooser").value),
      (e.prer = new Set(this.subjectModalPrer)),
      (e.dictatesIn = t.querySelector("#dictatesIn").value);
    let s = t.querySelector("#custom-creditsa-USM").value,
      a = t.querySelector("#custom-creditsa-SCT").value;
    0 === a.length && (a = null),
      e.updateCredits(s, a),
      e.verifyPrer(),
      e.beenEdited || this.subjectList.push(e),
      (e.beenEdited = !0),
      this.updateState(e),
      this.semesterManager.updateDisplayedSubject(e),
      this.saveSubjects();
  }
  deleteSubject(e) {
    e.selected && e.selectRamo(),
      this.semesterManager.removeSubjectOutsideSemester(e),
      this.unDisplaySubject(e);
    let t = this.subjectList.indexOf(e);
    t > -1 &&
      (this.subjectList.splice(t, 1),
      this.semesterManager.malla.delSubjects(e)),
      this.saveSubjects();
  }
  restoreSubject(e) {
    Object.values(this.semesterManager.malla.rawMalla).forEach((t) => {
      for (let s of t)
        if (s[1] === e.sigla) {
          (e.name = s[0]),
            e.updateCredits(s[2], s[3]),
            (e.category = s[4]),
            (e.prer = new Set(s[5])),
            (e.dictatesIn = s[6]),
            e.selected && this.semesterManager.updateDisplayedSubject(e),
            JSON.stringify(this.categories[s[4]]) !==
              JSON.stringify(this.semesterManager.malla.categories[s[4]]) &&
              this.restoreCategory(s[4]),
            this.unDisplaySubject(e);
          let t = this.subjectList.indexOf(e);
          t > -1 && this.subjectList.splice(t, 1), this.saveSubjects();
        }
    });
  }
  cleanSubjects() {
    [...this.subjectList].forEach((e) => {
      e.isCustom ? this.deleteSubject(e) : this.restoreSubject(e);
    });
  }
  saveSubjects() {
    let e = {};
    this.subjectList.forEach((t) => {
      (e[t.sigla] = [t.name, t.getUSMCredits(), t.category, [...t.prer]]),
        t.USMtoSCT ? e[t.sigla].push(0) : e[t.sigla].push(t.getSCTCredits()),
        e[t.sigla].push(t.dictatesIn);
    }),
      (e = JSON.stringify(e)),
      this.advanced
        ? (localStorage[
            "generatorUserSubjects" + this.semesterManager.malla.currentMalla
          ] = e)
        : (localStorage[
            "priorixUserSubjects" + this.semesterManager.malla.currentMalla
          ] = e);
  }
  loadSubjects() {
    let e;
    if (
      ((e = this.advanced
        ? localStorage[
            "generatorUserSubjects" + this.semesterManager.malla.currentMalla
          ]
        : localStorage[
            "priorixUserSubjects" + this.semesterManager.malla.currentMalla
          ]),
      void 0 === e)
    )
      return void this.loadOldSubjects();
    e = JSON.parse(e);
    let t = {};
    if (
      (Object.keys(e).forEach((s) => {
        let a = e[s];
        if (void 0 === this.semesterManager.malla.ALLSUBJECTS[s]) {
          a[3] = a[3].filter(
            (e) =>
              void 0 !== this.semesterManager.malla.ALLSUBJECTS[e] ||
              (void 0 === t[e] && (t[e] = []), t[e].push(s), !1)
          );
          let e = new SelectableRamo(
            a[0],
            s,
            a[1],
            a[2],
            a[3],
            this.semesterManager.malla.SUBJECTID++,
            this.semesterManager.malla,
            a[4],
            !0,
            6 === a.length ? a[5] : ""
          );
          this.semesterManager.malla.addSubject(e),
            this.subjectList.push(e),
            this.displaySubject(e);
        } else {
          let e = this.semesterManager.malla.ALLSUBJECTS[s];
          (e.name = a[0]),
            e.updateCredits(a[1], a[4]),
            (e.category = a[2]),
            (e.prer = new Set(a[3])),
            (e.beenEdited = !0),
            this.subjectList.push(e),
            this.updateState(e);
        }
      }),
      0 !== Object.keys(t).length)
    ) {
      let e = $(".toast");
      e.toast("show"), e.css("zIndex", "3");
      let s = d3.select("#deletedSubjects").append("ul");
      Object.keys(t).forEach((e) => {
        let a = s
          .append("li")
          .text(`Ramos que ten??an a ${e} como prerrequisito`)
          .append("ul");
        t[e].forEach((e) => {
          a.append("li").text(e);
        });
      }),
        d3.select("#deletedCard").classed("d-none", !1);
    }
  }
  loadOldSubjects() {
    let e;
    if (this.advanced) {
      if (
        ((e =
          localStorage[
            "Custom-" + this.semesterManager.malla.currentMalla + "_CUSTOM"
          ]),
        e)
      ) {
        let t = {},
          s = JSON.parse(e);
        for (let e in s) {
          let a = s[e],
            r = [];
          if (
            (6 === a.length ? (r = a[5]) : a[4] == [] && (r = a[4]),
            (r = r.filter(
              (s) =>
                void 0 !== this.semesterManager.malla.ALLSUBJECTS[s] ||
                (void 0 === t[s] && (t[s] = []), t[s].push(e), !1)
            )),
            void 0 === this.semesterManager.malla.ALLSUBJECTS[e])
          ) {
            let e = new this.semesterManager.malla.subjectType(
              a[0],
              a[1],
              a[2],
              a[3],
              r,
              this.semesterManager.malla.SUBJECTID++,
              this.semesterManager.malla,
              0,
              !0
            );
            this.semesterManager.malla.addSubject(e),
              this.subjectList.push(e),
              this.displaySubject(e);
          } else {
            let t = this.semesterManager.malla.ALLSUBJECTS[e];
            (t.name = a[0]),
              t.updateCredits(a[2]),
              (t.category = a[3]),
              (t.prer = r),
              (t.beenEdited = !0),
              this.updateState(t);
          }
        }
        if (
          (delete localStorage[
            "Custom-" + this.semesterManager.malla.currentMalla + "_CUSTOM"
          ],
          0 !== Object.keys(t).length)
        ) {
          let e = $(".toast");
          e.toast("show"), e.css("zIndex", "3");
          let s = d3.select("#deletedSubjects").append("ul");
          Object.keys(t).forEach((e) => {
            let a = s
              .append("li")
              .text(`Ramos que ten??an a ${e} como prerrequisito`)
              .append("ul");
            t[e].forEach((e) => {
              a.append("li").text(e);
            });
          }),
            d3.select("#deletedCard").classed("d-none", !1);
        }
      }
    } else if (
      ((e =
        localStorage[
          "prioridad-" + this.semesterManager.malla.currentMalla + "_CUSTOM"
        ]),
      e)
    ) {
      e = JSON.parse(e);
      for (let t in e) {
        let s = e[t],
          a = new this.semesterManager.malla.subjectType(
            s[0],
            s[1],
            s[2],
            s[3],
            [],
            this.semesterManager.malla.SUBJECTID++,
            this.semesterManager.malla,
            0,
            !0
          );
        this.semesterManager.malla.addSubject(a),
          this.subjectList.push(a),
          this.displaySubject(a);
      }
      delete localStorage[
        "prioridad-" + this.semesterManager.malla.currentMalla + "_CUSTOM"
      ];
    }
    this.saveSubjects();
  }
  addPrerToModal(e, t = null) {
    let s = null;
    s = t || e.target;
    let a = s.selectedOptions[0];
    if (0 !== a.value) {
      let e = a.textContent.split(" | ");
      this.subjectModalPrer.add(a.value),
        a.setAttribute("disabled", "disabled");
      let t = document.createElement("li");
      t.setAttribute("id", "pre-" + e[1]),
        t.classList.add(
          "list-group-item",
          "d-flex",
          "align-items-center",
          "pr-0",
          "py-0"
        );
      let s = document.createElement("div");
      s.classList.add("flex-grow-1"), (s.textContent = e.reverse().join(" | "));
      let r = document.createElement("button");
      r.classList.add("btn", "btn-danger"),
        r.setAttribute("type", "button"),
        (r.textContent = "Quitar"),
        r.addEventListener("click", () => {
          this.subjectModalPrer.delete(a.value),
            a.removeAttribute("disabled"),
            t.remove();
        }),
        t.append(s),
        t.append(r),
        this.createAdvancedSubjectModal
          .get(0)
          .querySelector("#prerList")
          .append(t);
    }
    s.firstElementChild.setAttribute("selected", !0);
  }
  fillCategories() {
    Object.keys(this.categories).forEach((e) => {
      this.displayCategory(e);
    });
  }
  createCategory(e = null) {
    let t, s, a;
    if (e) (s = e.name), (t = e.categorySN), (a = e.color);
    else {
      let e = this.categoryModal.get(0);
      (s = e.querySelector("#cat-name").value),
        (t = e.querySelector("#small-cat-name").value),
        (a = e.querySelector("#cat-color").value),
        this.categoryModal.modal("hide");
    }
    (this.categories[t] = [a, s]),
      this.displayCategory(t),
      this.saveCategories();
  }
  editCategory(e, t = null) {
    if (t) (this.categories[e][0] = t.color), (this.categories[e][1] = t.name);
    else {
      let t = this.categoryModal.get(0);
      (this.categories[e][0] = t.querySelector("#cat-color").value),
        (this.categories[e][1] = t.querySelector("#cat-name").value);
    }
    this.updateCategory(e), this.saveCategories();
  }
  deleteCategory(e) {
    this.categoryList[e].remove(),
      delete this.categoryList[e],
      delete this.categories[e],
      Object.values(this.semesterManager.malla.ALLSUBJECTS).forEach((t) => {
        t.category === e &&
          ((t.category = "Custom"),
          (t.beenEdited = !0),
          this.subjectList.push(t),
          this.updateState(t));
      }),
      this.saveSubjects(),
      this.saveCategories();
  }
  restoreCategory(e = "Custom", t = null) {
    let s = { categorySN: e };
    "Custom" === e
      ? ((s.name = this.defaultSector[1]), (s.color = this.defaultSector[0]))
      : ((s.name = this.semesterManager.malla.categories[e][1]),
        (s.color = this.semesterManager.malla.categories[e][0])),
      void 0 === this.categories[e]
        ? this.createCategory(s)
        : this.editCategory(e, s);
  }
  restoreCategories() {
    let e = this.semesterManager.malla.categories;
    Object.keys(this.categories).forEach((t) => {
      void 0 === e[t] && this.deleteCategory(t);
    }),
      Object.keys(e).forEach((e) => {
        this.restoreCategory(e);
      }),
      this.restoreCategory("Custom");
  }
  setUpCategoryModal(e = !1, t = "Custom") {
    if (e) {
      let e = this.categoryModal.get(0);
      e.querySelector("#cat-name").value = this.categories[t][1];
      let s = e.querySelector("#small-cat-name");
      (s.value = t),
        s.setAttribute("disabled", !0),
        (e.querySelector("#cat-color").value = this.categories[t][0]),
        (this.editCatEventListener = this.editCategory.bind(this, t, null)),
        (this.deleteCatEventListener = this.deleteCategory.bind(this, t)),
        "Custom" === t
          ? e.querySelector("#sectorDeleteButton").classList.add("d-none")
          : e
              .querySelector("#sectorDeleteButton")
              .addEventListener("click", this.deleteCatEventListener),
        e
          .querySelector("#sectorDoneButton")
          .addEventListener("click", this.editCatEventListener),
        (e.querySelector("#catTitle").textContent = "Editar"),
        (e.querySelector("#sectorDoneButton").textContent = "Editar"),
        this.categoryModal.modal("show");
    } else
      this.categoryModal
        .get(0)
        .querySelector("#sectorDeleteButton")
        .classList.add("d-none"),
        this.categoryModal
          .get(0)
          .querySelector("#sectorDoneButton")
          .addEventListener("click", this.createCatEventListener);
  }
  displayCategory(e) {
    let t = document.createElement("button");
    t.classList.add("list-group-item", "list-group-item-action", "sector");
    let s = this.categories[e][0];
    this.needsWhiteText(s) && t.classList.add("text-white"),
      t.setAttribute("type", "button"),
      t.setAttribute("id", "cat-" + e),
      (t.style.backgroundColor = s),
      (t.textContent = this.categories[e][1]),
      t.addEventListener("click", this.setUpCategoryModal.bind(this, !0, e)),
      this.categoryManager.append(t),
      (this.categoryList[e] = t);
  }
  updateCategory(e) {
    let t = this.categoryList[e];
    (t.style.backgroundColor = this.categories[e][0]),
      this.needsWhiteText(this.categories[e][0])
        ? t.classList.add("text-white")
        : t.classList.remove("text-white"),
      (t.textContent = this.categories[e][1]);
  }
  saveCategories() {
    localStorage[
      "generatorUserCategory" + this.semesterManager.malla.currentMalla
    ] = JSON.stringify(this.categories);
  }
  loadCategories() {
    let e =
      localStorage[
        "generatorUserCategory" + this.semesterManager.malla.currentMalla
      ];
    e ? ((e = JSON.parse(e)), (this.categories = e)) : this.loadOldCategories(),
      this.fillCategories();
  }
  loadOldCategories() {
    let e =
      localStorage[
        "Custom-" + this.semesterManager.malla.currentMalla + "_SECTORS"
      ];
    e &&
      ((e = JSON.parse(e)),
      Object.keys(e).forEach((t) => {
        this.categories[t] = e[t];
      }),
      this.saveCategories(),
      delete localStorage[
        "Custom-" + this.semesterManager.malla.currentMalla + "_CUSTOM"
      ]);
  }
  needsWhiteText(e) {
    let t = 0,
      s = 0,
      a = 0;
    4 === e.length
      ? ((t = "0x" + e[1] + e[1]),
        (s = "0x" + e[2] + e[2]),
        (a = "0x" + e[3] + e[3]))
      : 7 === e.length &&
        ((t = "0x" + e[1] + e[2]),
        (s = "0x" + e[3] + e[4]),
        (a = "0x" + e[5] + e[6]));
    let r = [0, 0, 0];
    (r[0] = t / 255), (r[1] = s / 255), (r[2] = a / 255);
    for (let e in r)
      r[e] <= 0.03928
        ? (r[e] /= 12.92)
        : (r[e] = Math.pow((r[e] + 0.055) / 1.055, 2.4));
    return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2] <= 0.6;
  }
}
