/**
 * Simple Javascript to render HTML Table from Spreadsheet data
 * Depends on the https://spreadsheets.google.com/tq API
 */

// Handles the response from /tq
function handleTqResponse(data) {
	if (!jQuery.isReady) {
		console.log("DOM not yet ready");
		$(function() {
			handleTqResponse(data);
		});
	};

	data.table.rows.forEach(function(r) {
		var rowData = r.c.map(function(cell) { // transform data into simple array structure
			return (cell && cell.v) || null;
		});

		if (!rowData[0]) {  // skip empty rows
			return;
		}

		if (rowData[1]) { // no event name meaning it is a header
			makeDataRow(rowData);
		} else { // otherwise render as header row
			makeHeaderRow(rowData);
		}
	});
}

function makeHeaderRow(rowData) {
	var tbl = $("#main-table");
	var row = $("<tr/>")
		.appendTo(tbl);
	$("<td>")
		.appendTo(row)
		.attr("colspan", "2")
		.html(rowData[0])
		.css({
			"background": "#D9D9D9",
			"padding": ".75pt",
			"font-size": "16.0pt",
			"font-weight": "bold"
		});
}

function makeDataRow(rowData) {
	var tbl = $("#main-table");
	var tr = $("<tr/>").appendTo(tbl);
	$("<td>")
	  .appendTo(tr)
	  .attr("width", "20%")
	  .html(rowData[0]);
	var td = $("<td>")
		.appendTo(tr)
	$("<a>")
		.appendTo(td)
		.html(rowData[1])
		.attr("href", rowData[2]);
	var video = rowData[3];
	if (video) {
		var a = $("<a>")
			.appendTo(td)
			.attr("href", video);
		$("<img>")
			.appendTo(a)
			.attr("src", "page5.files/image002.gif");
	}
}

// Start fetching data from spreadsheet as soon as possible
$.ajax({
	url: 'https://spreadsheets.google.com/tq?key=1bNYlj2QbGXfF0uMlUwP5hOw4oKQnQYw_XlcCRqYznhA&tqx=responseHandler:handleTqResponse',
	dataType: 'jsonp'
});
