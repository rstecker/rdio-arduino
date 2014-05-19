$(window).on('message', function(event) {
  console.log("SHIT JUST GOT REAL! "+event.rebecca);
  $('.notes').append(event.rebecca+"<BR>")
 // document.write("I just got something");
});
