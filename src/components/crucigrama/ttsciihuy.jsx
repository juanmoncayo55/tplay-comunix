export default function initCrosswordGame(data) {
  const transform = data.respuesta.map(({ pregunta, respuesta, ...resto }) => ({
    clue: pregunta,
    word: respuesta,
    ...resto
  }));
  var ttss = transform

  let appdata = {
    maincolor: "2a797a",
    qcount: 5
  };

  function saveData() {
    localStorage.setItem("ttsasyik", JSON.stringify(appdata));
  }

  var preguntasArr = [];
  function startttsgame() {
    // Tu lógica original de startttsgame aquí
    // Mantén la implementación que tenías en tu script original
      for (var e, t = [], o = [], a = 0; a < appdata.qcount; a++) {
          var n = (e = ttss.length, Math.floor(Math.random() * e)),
          i = ttss[n];
          t.push(i.word),
          o.push(i.clue),
          ttss.splice(n, 1)
      }
      var r = new Crossword(t, o),
      s = r.getSquareGrid(10);
      if (null != s) {
            document.getElementById("crossword").innerHTML = CrosswordUtils.toHtml(s, !0),
          function (e) {
              for (var t in  e) {
                  for (var o = [], a = 0; a < e[t].length; a++){
                    o.push("<li><strong>" + e[t][a].position + ".</strong> " + e[t][a].clue + "</li>");
                    preguntasArr.push({ p: e[t][a].position, q: e[t][a].clue });
                  }
                  //document.getElementById(t).innerHTML = o.join("\n")
              }

          } (r.getLegend(s))
      } else {
          var c = r.getBadWords(),
          d = [];
          for (a = 0; a < c.length; a++) d.push(c[a].word);
          location.reload()
      }
      localStorage.setItem("question", JSON.stringify(preguntasArr));
  }

  // Resto de las funciones auxiliares como typechar, toggleAnswer, etc.
  function setqcount(e) {
      appdata.qcount = e,
      saveData(),
      location.reload()
  }
  function resetsettings() {
      localStorage.clear(),
      location.reload()
  }
  function tsep(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  function vtext(e) {
      return !! e.match(/^[A-Za-z0-9]+$/)
  }
  function toggledrawer() {
      $("#drawer").toggle()
  }
  function removeads() {
      try {
          Android.removeAds()
      } catch(e) {
          console.log(e)
      }
  }
  function rateapp() {
      try {
          Android.rateApp()
      } catch(e) {
          console.log(e)
      }
  }
  null === localStorage.getItem("ttsasyik") ? saveData() : appdata = JSON.parse(localStorage.getItem("ttsasyik"));
  var canswershown = !1;
  function toggleAnswer() {
      canswershown ? ($(".canswer").hide(), $(".uanswer").show(), canswershown = !1) : ($(".canswer").show(), $(".uanswer").hide(), canswershown = !0),
      ciihuy.showAd()
  }
  function activatetts() {
      $("td").click(function() {
          "&nbsp;" != $(this).find(".canswer").html() && null != $(this).find(".canswer").html() && (console.log("Clicked: " + $(this).find(".canswer").html()), console.log($(this).find(".uanswer").attr("id")), selectedua = $(this).find(".uanswer").attr("id"))
      })
  }
  var selectedua = -1; //$("#vkeyboard").show()
  let wordC = [];
  function typechar(e) {
    $("#" + selectedua) .html(e.value)
    $("#vkeyboard") .hide()

    /* Validacion para ver si la letra agregada es correcta o incorreta */
    if(e.parentNode.querySelector(".canswer").textContent === e.value){
      e.parentNode.style.backgroundColor = "#0079F2"; //correcto
      e.style.color = "#fff"; //incorrecto
    }else if(e.parentNode.querySelector(".canswer").textContent !== e.value){
      e.parentNode.style.backgroundColor = "#F1273F"; //incorrecto
      e.style.color = "#fff"; //incorrecto
    }else{
      e.parentNode.style.backgroundColor = "#FFF"; //por defecto
    }

    /* validacion para ver si las letras escritas son todas correctas */
    let allTds = document.querySelectorAll(".crossword td:not(.no-border)");
    allTds.forEach(td => {
      if(td.style.backgroundColor === "rgb(0, 121, 242)" && e.parentNode === td){//Si el color del td es correcto

        wordC.push(td)

        if(wordC.length === allTds.length){
          alert("Completo el crucigrama")
        }
      }
    })
  }

  // Llamada inicial
  if (localStorage.getItem("ttsasyik") === null) {
    saveData();
  }

  // Iniciar el juego
  
  setTimeout(function(){
    startttsgame(),
    activatetts(),
    $("#crossword").css({
        width: 32 * $("tbody:eq(0)").find("tr:eq(0)").find("td").length + "px"
    }),
    $("#game").css("display", "flex")
  }, 2000)
}