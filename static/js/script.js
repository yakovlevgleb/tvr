$(document).ready(function () {
	$(".js-fancybox3").fancybox({
		padding: 0,
		margin: 0,
		height: 'auto',
		closeBtn: false,
		helpers: {
			overlay: {
				css: {
					'background': '#1f785f'
				}
			}
		}
	});

	$('.js-countries-tab-btn').click(function () {
		var tab_id = $(this).attr('data-countries-tab');

		$('.js-countries-tab-btn').removeClass('active');

		$(this).addClass('active');

		$('.js-countries-tab.active').fadeOut(200 ,function () {
			$(this).removeClass('active')
			$("#countries-tab-" + tab_id)
				.fadeIn('slow')
				.addClass('active');
		});
	});

	$('.js-cityes-tab-btn').click(function () {
		var tab_id = $(this).attr('data-cityes-tab');

		$('.js-cityes-tab-btn').removeClass('active');

		$(this).addClass('active');

		$('.js-cityes-tab.active').fadeOut(200, function () {
			$(this).removeClass('active')
			$("#cityes-tab-" + tab_id)
				.fadeIn('slow')
				.addClass('active');
		});
	});
});
