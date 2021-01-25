$(document).ready(function () {
  //EVENT LISTENERS
  const $modal = $("#plotModal");
  const $createPlot = $("#createPlot");
  const $close = $(".close");
  const $columnInput = $("#columnInput");
  const $rowInput = $("#rowInput");
  const $plotName = $("#plotName");
  const $plotTable = $("#plotTable");
  const $makePlot = $("#makePlot");
  const $plantModal = $("#plantModal");
  const $noteList = $(".list-container .list-group");
  const $plotNameInput = $("#plotNameInput");
  const $generated = $(".generated");

  //HIDE TABLE ON LAUNCH
  $plotTable.hide();


  //CREATE PLOT FUNCTION
  function createPlot() {
    $rowInput.empty();
    $columnInput.empty();
    $plotNameInput.empty();
    $plotTable.show();
    var num_rows = $rowInput.val();
    var num_cols = $columnInput.val();

    var theader = '<table border="1">\n';
    var tbody = "";

    //CREATE TABLE FOR PLOT BASED ON USER INPUT
    for (var i = 0; i < num_rows; i++) {
      tbody += "<tr>";
      for (var j = 0; j < num_cols; j++) {
        tbody += "<td>";
        tbody +=
          "<img src=https://img.icons8.com/cotton/64/000000/lotus--v1.png>";
        tbody += "</td>";
      }
      tbody += "</tr>\n";
    }
    var tfooter = "</table>";
    document.getElementById("plotTable").innerHTML = theader + tbody + tfooter;

    //ADD PLOT TITLE
    $plotName.text($plotNameInput.val());

  }

  // RENDERS LIST WITH PLOT NAMES
  // function renderPlotList(plot) {
  //   // console.log(plots);
  //   // $noteList.empty();

  //   const plotListItems = [];

  //   plotListItems.push($plotNameInput.val());

  //   for (i=0; i < plotListItems.length; i++) {
  //     $("#plotList2").append(`<button class='generated'>${plotListItems[i]}</button>`);
  //   };

    

    // Returns jquery object for li with given text and delete button
    // unless withDeleteButton argument is provided as false
    // function create$li(text) {
    //   const $li = $("<li class='list-group-item'>");
    //   const $span = $("<span>").text(text);
    //   $li.append($span);

      /*
          if (withDeleteButton) {
            const $delBtn = $(
              "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
            );
            $li.append($delBtn);
          }
          return $li;
          */
    // }

    // if (notes.length === 0) {
    //   noteListItems.push(create$li("No saved Notes"));
    // }

    // notes.forEach(function (note) {
    //   const $li = create$li(note.name).data(note);
    //   plotListItems.push($li);
    //   console.log(plotListItems);
    // });

    // $noteList.append(noteListItems);
  // }

  // $generated.click(retrievePlot());

  // $generated.innerText
  // function retrievePlot(){
  //   let getPlotName = $(this).val();
  //   console.log(getPlotName);
  //   console.log(getPlotName)
  //   // console.log("start");
  //    $.get("/api/plot/" + getPlotName, function(response){
  //     console.log(response);
  //    });
     
    //  .then(function(response){
      
    //   console.log(response)
      // for (i=0; i < WHATEVER.length; i++){
      //   if ( $generated.innerText === req.params.plot_name){
      //     var num_rows = req.params.plot_rows;
      //     var num_cols = req.params.plot_columns;
  
      //     var theader = '<table border="1">\n';
      //     var tbody = "";
  
      //     //CREATE TABLE FOR PLOT BASED ON USER INPUT
      //     for (var i = 0; i < num_rows; i++) {
      //       tbody += "<tr>";
      //       for (var j = 0; j < num_cols; j++) {
      //         tbody += "<td>";
      //         tbody +=
      //           "<img src=https://img.icons8.com/cotton/64/000000/lotus--v1.png>";
      //         tbody += "</td>";
      //       }
      //       tbody += "</tr>\n";
      //     }
      //     var tfooter = "</table>";
      //     document.getElementById("plotTable").innerHTML = theader + tbody + tfooter;
  
      //     //ADD PLOT TITLE
      //     $plotName.append(req.params.plot_name);
      //       }
      //     } 
  // };
  


  

  //SAVE NEW PLOT
  function handleNoteSave() {
    //TURN DATA INTO OBJECT
    const newPlot = {
      plot_name: $plotNameInput.val(),
      plot_rows: $rowInput.val(),
      plot_columns: $columnInput.val(),
    };
    savePlot(newPlot).then(function (plot) {
      // renderPlotList(plot);
      console.log('Success');
    });
  }

  //EDIT CELL DATA
  var td = $("td");

  td.click(function () {
    $plantModal.addClass("is-active");
  });

  //WHEN CREATE PLOT BUTTON IS CLICKED OPEN CREATE PLOT MODAL
  $createPlot.click(function () {
    $modal.addClass("is-active");
  });

  //CLOSE CREATE PLOT MODEL
  $close.click(function () {
    $modal.removeClass("is-active");
    $plantModal.removeClass("is-active");
  });

  //OPEN PLOT
  $makePlot.click(function () {
    $modal.removeClass("is-active");
    createPlot();
    handleNoteSave();
  });

  //FUNCTION FOR SAVING PLOT TO DATABASE
  function savePlot(note) {
    return $.ajax({
      url: "/api/plot",
      data: note,
      method: "POST",
    });
  }

  //FUNCTION FOR GETTING PLOTS FROM DATABASE
  // function getPlot() {
  //     console.log("start");
  //    $.get("/api/plot/:plot_name").then(function(response){
      
  //     console.log(response)
  //    });
  //    console.log("end");
  // };
  // getPlot();

  //WEATHER ICON AND CURRENT DATE GET REQUEST
  $.get("/api/currentweather/1").then(function (response) {
    console.log(response);
    let currentWeatherIcon = response.weather[0].icon;
    $("#currentWeatherImg").html(
      `<img id="icon" class="pixelate level-item mr-3" style="height: 40px;" alt="weather-icon" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png"/>`
    );
  });

  $("#currentDateTime").text(dayjs().format("ddd. MMM DD, YYYY"));
});
