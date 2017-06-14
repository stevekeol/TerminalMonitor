function init() {
  initHost('001');
  initHost('002');
  initHost('003');
  initHost('004');
}

var seriesOptions = [
  { strokeStyle: 'rgba(255, 0, 0, 1)',   fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 1 },
  { strokeStyle: 'rgba(0, 255, 0, 1)',   fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 1 },
  { strokeStyle: 'rgba(0, 0, 255, 1)',   fillStyle: 'rgba(0, 0, 255, 0.1)', lineWidth: 1 },
  { strokeStyle: 'rgba(255, 255, 0, 1)', fillStyle: 'rgba(255, 255, 0, 0.1)', lineWidth: 1 }
];

function initHost(BedID) {

  // Initialize an empty TimeSeries for each Person(in the hospital).
  var heartDataSets = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];

  var now = new Date().getTime();
  for (var t = now - 1000 * 50; t <= now; t += 1000) {
    addRandomValueToDataSets(t, heartDataSets);
  }
  // Every second, simulate a new set of readings being taken from each Person(in the hospital).
  setInterval(function() {
    addRandomValueToDataSets(new Date().getTime(), heartDataSets);
  }, 1000);

  // Build the timeline
  var timeline = new SmoothieChart({ millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 }});
  for (var i = 0; i < heartDataSets.length; i++) {
    timeline.addTimeSeries(heartDataSets[i], seriesOptions[i]);
  }
  timeline.streamTo(document.getElementById('Person-' + BedID), 1000);
}

function addRandomValueToDataSets(time, dataSets) {
  for (var i = 0; i < dataSets.length; i++) {
    dataSets[i].append(time, Math.random());
  }
}

