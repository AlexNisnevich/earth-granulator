// Adapted from https://github.com/stuartmemo/wavy-jones

var WavyJones = function (context, elem, color = 'yellow') {
  var analyser = context.createAnalyser();
  var elem = document.getElementById(elem);

  analyser.width = elem.offsetWidth;
  analyser.height = elem.offsetHeight;
  analyser.lineColor = color;
  analyser.lineThickness = 4;

  var svgNamespace = "http://www.w3.org/2000/svg";
  var paper = document.createElementNS(svgNamespace, "svg");
  paper.setAttribute('style', 'position: absolute; top: 0; left: 0;');
  paper.setAttribute('width', analyser.width);
  paper.setAttribute('height', analyser.height);
  paper.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  elem.appendChild(paper);

  var oscLine = document.createElementNS(svgNamespace, "path");
  oscLine.setAttribute("stroke", analyser.lineColor);
  oscLine.setAttribute("stroke-width", analyser.lineThickness);
  oscLine.setAttribute("fill","none");
  paper.appendChild(oscLine);

  var noDataPoints = 10,
    freqData = new Uint8Array(analyser.frequencyBinCount);


  var drawLine = function () {
    analyser.getByteTimeDomainData(freqData);

    var graphPoints = [],
      graphStr = '';

    graphPoints.push('M0, ' + (analyser.height/2));

    for (var i = 0; i < freqData.length; i++) {
      if (i % noDataPoints) {
        var point = (freqData[i] / 128) * (analyser.height / 2);
        graphPoints.push('L' + i + ', ' + point);
      }
    }

    for (i = 0; i < graphPoints.length; i++) {
      graphStr += graphPoints[i];
    }

    oscLine.setAttribute("stroke", analyser.lineColor);
    oscLine.setAttribute("stroke-width", analyser.lineThickness);

    oscLine.setAttribute("d", graphStr);

    setTimeout(drawLine, 100);
  };

  drawLine();

  return analyser;
};