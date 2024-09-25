(function($) {
	"use strict";
	$(document).ready(function(){
		$( '.bwp-portfolio' ).each(function(){
			var $this 			= $(this);
			var $id 			= this.id;
			var $pf_id 			= ('#' + this.id );
			var $bwp_style 		= $this.data('style');
			var $container_id 	= $('#container_'+ $id);
			var $tab_id 		= $('#tab_'+ $id);
			var $container 		= $container_id; 
			if( $bwp_style == 'fitRows' ){
				$container.imagesLoaded().progress( function() {
					$container.isotope({ //Isotope options, 'item' matches the class in the PHP
						layoutMode : 'fitRows'
					});
				});
			}else{
				var window_width = $( window ).width();
				if (window_width >= 768) {
					$container.imagesLoaded().progress( function() {
						$container.isotope({ //Isotope options, 'item' matches the class in the PHP
							layoutMode : 'masonry',
							percentPosition: true,
							masonry: {
							  columnWidth: '.portfolio-item'
							}
						});
					});
				}
			}
			//Add the class selected to the item that is clicked, and remove from the others
			var $optionSets = $tab_id,
			$optionLinks = $optionSets.find('li');
			$optionLinks.on( "click", function(){
				var $this = $(this);
				// don't proceed if already selected
				if ( $this.hasClass('selected') ) {
				  return false;
				}
				var $optionSet = $this.parents($tab_id);
				$optionSets.find('.selected').removeClass('selected');
				$this.addClass('selected');
				//When an item is clicked, sort the items.
				 var selector = $(this).attr('data-portfolio-filter');
				$container.isotope({ filter: selector });
				return false;
			});
		});
	});
})(jQuery);