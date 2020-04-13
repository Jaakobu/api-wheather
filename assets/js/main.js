$(function() {
    var apiKey = 'f861524ae224fa39b222aa4639289ad9';
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + '&units=metric&lang=fr';


    $('#weather button').click(function(e) {
        e.preventDefault();

        var city = $('#city');
        var cityValue = city.val();

        var params = {
            url: baseUrl + '&q=' + cityValue,
            method: 'GET'
        };

        $.ajax(params).done(function(response) {
                //show card
                $('.card').removeClass('d-none');

                //Error
                city.removeClass('is-invalid');
                $('.invalid-feedback').slideUp();
                $('.card').show();

                //title
                $('.card-title').text(response.name);

                //description
                $('.description-weather').text(response.weather[0].description);

                //température
                var temp = Math.round(response.main.temp) + ' °C';
                var tempMax = Math.round(response.main.temp_max) + ' °C';
                var tempMin = Math.round(response.main.temp_min) + ' °C';

                $('.temp-weather').text(temp);
                $('.temp-max-weather').text(tempMax);
                $('.temp-min-weather').text(tempMin);

                //Images
                var image = response.weather[0].icon;
                $('.image-weather').attr('src', 'http://openweathermap.org/img/wn/' + image + '.png');
                $('.image-weather').attr('alt', response.name);

            })
            .fail(function() {
                $('.invalid-feedback').slideDown();
                city.addClass('is-invalid');
                $('.card').hide();
            });
    });
});