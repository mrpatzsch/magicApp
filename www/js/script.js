$(function() {
	var searchParams = "";
	var cardTemplate = $('#card-template').html();
	
	$('#search').on('submit', function(event) {
		event.preventDefault();
		
		searchParams = $('#cardname').val();
		if (searchParams === "") {
				$('#error').toggleClass("hidden");
			} else {
			searchParams = searchParams.split(' ').join('');
			
			searchParams = searchParams.replace(",", "");
		  $.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + document.getElementById("cardname").value, function(data) {
		  	if (data !== []) {
			    for(var key in data) {
			    	for (var key2 in data[key]["editions"]) {
			    		$('#cardImage').attr('src', data[key]["editions"][key2].image_url);
			    		var cardId = data[key]["editions"][key2].multiverse_id;
			    		var result = Mustache.render(cardTemplate, data[key]);
				      $('#cardInfo').prepend(result)
				    	$("#cardname").val("");
				    	$('#newCard').attr('id', data[key]["editions"][key2].multiverse_id);
					  	}
						};
					};
		  	});
		  };
		});

	$('#cardInfo').on('click', function(event) {
		var target = $(event.target);
		if(target.is('h1')) {
			var $this = target.closest('.multiverseId');
			var thisId = $this.attr('id');
			var newUrl = "https://image.deckbrew.com/mtg/multiverseid/" + thisId + ".jpg";
			$("#cardImage").attr('src', newUrl);
			// 
		  $("html, body").animate({ scrollTop: 0 }, "slow");
		};
	});

	$.get("http://blacklotusproject.com/json/?=Avacyn", function(data) {
		console.log(data);
	})
	//ADVANCED SEARCH
	// $('#advanceOpen').on('click', function(event) {
	// 	event.preventDefault();
	// 	$('#advanced').toggleClass('hidden');
	// });

	// $('#advancedSearch').on('submit', function(event) {
	// 	event.preventDefault();
	// 	var advancedSearchParams = $('#advancedParams').val();
	// 	advancedSearchParams = searchParams.split(' ').join('+');
	// 	$.get("https://api.deckbrew.com/mtg/cards?oracle=" + advancedSearchParams, function(data) {
	// 		console.log(data);
	// 	});
	// });



	//typeahead for magic api
	// "https://api.deckbrew.com/mtg/cards/typeahead?q="
	// function log( message ) {
 //    $( "#cardName" ).text( message ).prependTo( "#cardname" );
 //    $( "#cardname" ).scrollTop( 0 );
 //  }
	$("#cardname").autocomplete({
				source: function(request, response) {
					$.ajax({
						url: "https://api.deckbrew.com/mtg/cards/typeahead?q=" + document.getElementById("cardname").value,
						dataType:"json",
						success: function(data) {
							response($.map(data, function(item) {
									console.log(item);
									return {
										value: item.name
									}
								}));
							}
						});
					},
				minLength: 2,
				open: function() {
					$(this).removeClass("ui-corner-all").addClass("ui-corner-top autocomplete");
				},
				close: function() {
					$(this).removeClass("ui-corner-top autocomplete").addClass("ui-corner-all");
				}
			});	

	$('.name').on("click", function(event) {
		event.preventDefault();
		console.log($(this));
	});
});
