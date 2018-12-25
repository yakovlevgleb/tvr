$(document).ready(function () {
	$(".js-fancybox3").fancybox({
		padding: 0,
		margin: 0,
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

		$('.js-countries-tab.active').fadeOut(399 ,function () {
			$(this).removeClass('active')
		});

		setTimeout(function () {
			$("#countries-tab-" + tab_id)
				.fadeIn('slow')
				.addClass('active');
		}, 400);

	})
});
