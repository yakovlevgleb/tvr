$(document).ready(function () {
	$(".js-fancybox3").fancybox({
		padding: 0,
		margin: 0,
		height: 'auto',
		autoHeight: 'true',
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

	$('.js-show-more').click(function () {
		$(this).toggleClass('active');
		$(this).parent().find('.scity__column--hidden, .scountry__column--hidden').slideToggle();
		if ($(this).hasClass('active')) {
			$(this).text('Скрыть');
		} else {
			$(this).text('Показать ещё');
		}
	});
});
