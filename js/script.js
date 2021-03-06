$(document).ready(function() {

	$('body').addClass('js'); // Browser has JS test

// Search
// =====================================================
	$('.icon-search').click(function(e) {
		e.preventDefault();
		$('.icon-menu').removeClass('is-active');
		$('.menu').removeClass('is-open');
		$(this).toggleClass('is-active');
		$('.searchform').toggleClass('is-open');
		$('.searchform input[type="text"]').focus().val('');
	});

// Menu
// =====================================================

	$('.icon-menu').click(function(e) {
		e.preventDefault();
		$('.icon-search').removeClass('is-active');
		$('.searchform').removeClass('is-open');
		$(this).toggleClass('is-active');
		$('.menu').toggleClass('is-open');
	});
	
// Infinite Scroll
// =====================================================

	// Create the spinners
	$('.main').append('<div class="main-spinner spinner">Loading&hellip;</div>')
	$('.sidebar-scroll').append('<div class="sidebar-spinner spinner">Loading&hellip;</div>')
	
	loadPostAndCount();

	// Load Next Article
	function loadPostAndCount() {
		var is_page = $('body').hasClass('page');

		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100 && !is_page) {
			loadPost();
			pageNumber++;
		}
	}

	// Load sidebar articles
	$('.load-sidebar').click(function(e) {
		e.preventDefault();
		console.log(sidebarPageNumber);
		loadSidebar();
		sidebarPageNumber++;
	});


// Change URL
// =====================================================
	function changeUrl() {
		var is_home = $('body').hasClass('home'),
			is_mobile = $(window).width() < 784;

		if ( (!is_home && is_mobile) || !is_mobile ) { // is not home on mobile

			var permalink = $('.main-entry:first').attr('data-permalink');
			var title = $('.main-entry:first').attr('data-permalink')
			
			$('.main-entry').each(function() {
				if ( $(this).offset().top < $(window).scrollTop() + 200 ) { 
					permalink = $(this).attr('data-permalink');
					highlightSidebar($(this).attr('data-id'));
				}
			});

			window.history.pushState(null, null, permalink);
		}
	}


	function highlightSidebar(id) {
		$('.sidebar-entry').removeClass('active');
		$('.sidebar-entry#post-' + id).addClass('active'); // potentially a stupid feature. I may remove it. 
	}

// Scroll Event
// =====================================================
	$(window).scroll(function() {
		loadPostAndCount();
		changeUrl();
	});

// Keyboard Controls
// =====================================================
	$('body').keyup(function(e){
		// ESC : Close Menus
		if (e.keyCode == 27) {
			e.preventDefault();
			$('.searchform').removeClass('is-open');
			$('.menu').removeClass('is-open');
			$('.tool-menu a').removeClass('is-active');
		}
		// Arrown Down : Load Article
		if (e.keyCode == 40) {
			e.preventDefault();
			$(window).load(function() {
				$("html, body").animate({ scrollTop: $(document).height() }, 1000);
			});
			loadArticle(pageNumber);
			pageNumber++;
		}
	});

});

