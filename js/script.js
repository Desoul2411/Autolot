$(document).ready(function() {
    /*** Show/hide navigation menu starts***/
    let burgerOpenButton = document.querySelector('#main-menu-open-button');
    let burgerCloseButton = document.querySelector('#main-menu-close-button');
    let menu = document.querySelector('.main-menu_header');
    let menuList = document.querySelector('.main-menu__list');

    burgerCloseButton.addEventListener('click', () => {
        menuList.style.visibility = 'hidden';
        menuList.style.right = '-100%';
        document.body.style.overflow = 'auto';

    });

    burgerOpenButton.addEventListener('click', () => {
        menuList.style.visibility = 'visible';
        menuList.style.right = '0';
        /*document.body.style.overflow = 'hidden';*/
    });
    /*** Show/hide navigation menu end***/


    /*** Align partners-block and tab-content width ***/
    if ($(window).width() > 992) {
        let partnersBlock = document.querySelector('.partners-block');
        let partnersBlockContainer = document.querySelector('.partners-block-container');
        let tabContentBlock = document.querySelector('.tab-content');

        partnersBlockContainer.style.width = tabContentBlock.clientWidth + 'px';
        window.addEventListener('resize', function(event){
            partnersBlockContainer.style.width = tabContentBlock.clientWidth + 'px';
        });
    };


    /*** Fotorama settings starts ***/
    $(function () {
        //  Initialize fotorama manually.
        var $fotoramaDiv = $('.fotorama').fotorama();
        //  Get the API object.
        var fotorama = $fotoramaDiv.data('fotorama');

        $('.fotorama').on('fotorama:fullscreenenter', function (e, fotorama) {
            fotorama.setOptions({
                fit: 'contain'
            });
        });

        $('.fotorama').on('fotorama:fullscreenexit', function (e, fotorama) {
            fotorama.setOptions({
                fit: 'cover'
            });
        });

    });

    /*** Fotorama settings end ***/


    const calculateCarCardParameters = () => {
        /*** Calculate car gallery navigation blocks width starts ***/
        let carGalleryBlocks = document.querySelectorAll('.car-gallery-block__slider-big');
        let carGalleryBlockWidth;
        let navBlockWidth;

        if ($(window).width() <= 1250) {
            carGalleryBlocks.forEach(carGalleryBlock => {
                carGalleryBlockWidth = carGalleryBlock.clientWidth;
                navBlockWidth = carGalleryBlockWidth/3;
                carGalleryBlock.setAttribute('data-thumbwidth',`${navBlockWidth}`);
            });
        };
        /*** Calculate car gallery navigation blocks width end ***/ 

        /*** Add to favourites starts ***/
        let favouritesLinks = document.querySelectorAll('.description-top-block-favourites__add-to-favourites_link');
        favouritesLinks.forEach(link => {
            link.addEventListener('click', function(e){
                event.preventDefault();
                let starFillProperty = this.querySelector('.fill-color');
                starFillProperty.classList.toggle('active');
            });
        });
        /*** Add to favourites end ***/
    };


    if(($('.current-lots-tab-content').children('.car-card').length > 0) || ($('.finished-lots-tab-content').children('.car-card').length > 0) ) {
        calculateCarCardParameters();
    };


    /*** Switch content tabs starts ***/
    let currentLotsTab = document.querySelector('.cars-section-tabs__curent-lots-button');
    let finishedLotsTab = document.querySelector('.cars-section-tabs__finished-lots-button');
    let currentLotsContent = document.querySelector('.current-lots-tab-content');
    let finishedLotsContent = document.querySelector('.finished-lots-tab-content');
    let currentTabText = document.querySelector('.current-tab-text');
    let finishedTabText = document.querySelector('.finished-tab-text');
    currentLotsTab.classList.add('active');
    finishedLotsContent.style.display = "none";
        
    const showCurrentLots = () => {
        finishedLotsContent.style.display = "none";
        finishedLotsTab.classList.remove('active');
        finishedTabText.style.color = '#FFFFFF';
        currentLotsTab.classList.add('active');
        currentTabText.style.color = '#2A2A2A';
        currentLotsContent.style.display = 'block';
        $('.fotorama').resize();
    }   

    const showFinishedLots = () => {
        currentLotsContent.style.display = "none";
        currentLotsTab.classList.remove('active');
        currentTabText.style.color = '#FFFFFF';
        finishedLotsTab.classList.add('active');
        finishedLotsContent.style.display = 'block';
        finishedTabText.style.color = '#2A2A2A';
        $('.fotorama').resize();
    }   

    currentLotsTab.addEventListener('click', showCurrentLots);
    finishedLotsTab.addEventListener('click', showFinishedLots);

    /* redirect from other pages */
    if (window.location.hash == "#finished-lots") {
        showFinishedLots();
    }

    if (window.location.hash == "#current-lots") {
        showCurrentLots();
    }
    /*** Switch content end ***/


    /*** Find-parts-panel accordeon (max-width 475px) starts ***/
    if ($(window).width() <= 475) {
        $('.find-parts-panel-title').click(function(){
            $(this).next('.find-parts-form').slideToggle();
        });
    }
    /*** Find-parts-panel accordeon (max-width 475px) end ***/


    /***  Year parse starts ***/
    const yearParseDesktop = () => {
        let yearFrom = document.getElementById('from-year-select-desktop');
        let yearUpTo = document.getElementById('up-to-year-select-desktop');
        let currentYear = new Date().getFullYear();
        yearFrom.insertAdjacentHTML( 'beforeend','<option selected disabled value=""></option>');
        let j = 1960; 
        while(j<= currentYear) {
            yearFrom.insertAdjacentHTML('beforeend', `<option value='${j}'>${j}</option>`);
            j++;
        }
        yearUpTo.insertAdjacentHTML( 'beforeend','<option selected disabled value=""></option>');
        let k = 1960; 
        while(k<= currentYear) {
            yearUpTo.insertAdjacentHTML('beforeend', `<option value='${k}'>${k}</option>`);
            k++;
        }
    }
    yearParseDesktop();

    
    let registrationCountrySelect = document.querySelector('#registration_country');
    let registrationRegionSelect = document.querySelector('#registration_region_select');
    let registrationRegionInput = document.querySelector('#registration_region_input');

    registrationCountrySelect.addEventListener('change', (event) => {
        let target = event.target.value;
        if (target === 'Беларусь') {
            registrationRegionSelect.style.display = 'block';
            registrationRegionInput.style.display = 'none';
            registrationRegionInput.removeAttribute('required');
            registrationRegionSelect.setAttribute('required','');

        } else {
            registrationRegionSelect.style.display = 'none';
            registrationRegionInput.style.display = 'block';
            registrationRegionSelect.removeAttribute('required');
            registrationRegionInput.setAttribute('required','');
        }
    });


    /*** Day and year pars (registration form) ***/
    const dayParse = () => {
        let day = document.getElementById('day');
        let i = 1; 
            while(i<= 31) {
                if (i <= 9) {
                    day.insertAdjacentHTML('beforeend', `<option value='0 + ${i}'>0${i}</option>`);
                } else {
                    day.insertAdjacentHTML('beforeend', `<option value='${i}'>${i}</option>`);
                }
                i++;
            }
            day.insertAdjacentHTML('beforeend','</select>');

    }
    dayParse();

    const yearParse = () => {
        let currentYear = new Date().getFullYear();
        let year = document.getElementById('year');
        // year.insertAdjacentHTML( 'beforeend','<option selected disabled value="">Year</option>');
        let j = 1960; 
        while(j<= currentYear) {
            year.insertAdjacentHTML('beforeend', `<option value='${j}'>${j}</option>`);
            j++;
        }
    }
    yearParse();


    /*** Registartion form checkbox starts ***/
    let partivipateInAuctionsCheckbox = document.querySelector('.registration-benefits__benefit_checkbox'); 
    let checkboxImage = document.querySelector('.benefit-icon-fill'); 
    let auctionParticipateFields = document.querySelectorAll('.auction-participate'); 
    let auctionParticipateFieldsLabels = document.querySelectorAll('.auction-participate-label');

    partivipateInAuctionsCheckbox.addEventListener("change",() => {
        if (partivipateInAuctionsCheckbox.checked) {
            checkboxImage.style.fill = '#FFC800';
            auctionParticipateFields.forEach(elem => elem.removeAttribute("disabled", "disabled"));
            auctionParticipateFieldsLabels.forEach(elem =>{ elem.classList.add('required')});

        } else {
            checkboxImage.style.fill = '#999999';
            auctionParticipateFields.forEach(elem => elem.setAttribute("disabled", "disabled"));
            auctionParticipateFieldsLabels.forEach(elem =>{ elem.classList.remove('required')});
        }
    });
    /*** Registartion form checkbox end ***/


    // Модальное окно
    function showRegistrationForm(event) { 
        event.preventDefault();
        $('body').css('overflow','auto');
        $('.cars-section-container').css('min-height','1700px');
        slowScroll('#top',300);
        $('.overlay').css("height", "100%");
        $('.popup').removeClass("put-car-popup");
        $('.popup').removeClass("authorization-popup");
        $('.popup').addClass("registration-popup");
        //$('.popup').css("top", "1040px");

        $('.modal-content-remind-password').css("display", "none");
        $('.modal-content-successful-registration').css("display", "none");
        $('.modal-content-authorization').css("display", "none");
        $('.modal-content-put-car').css("display", "none");
        $('.modal-content-registration').css("display", "block");
        $('.js-overlay-campaign').fadeIn();
        $('.js-overlay-campaign').addClass('disabled');
        partivipateInAuctionsCheckbox.setAttribute('checked',"checked");
        checkboxImage.style.fill = '#FFC800';
        auctionParticipateFields.forEach(elem => elem.removeAttribute("disabled", "disabled"));
        auctionParticipateFieldsLabels.forEach(elem =>{ elem.classList.add('required')});
    };


    function showAuthorizationForm(event) {
        event.preventDefault();
        //Disable scroll
        let $body = $(document.body);
        let oldWidth = $body.innerWidth();
        $body.css("overflow", "hidden");
        $body.width(oldWidth);
    
        //Vertical position for popup window
        let verticalPopupPos = pageYOffset + document.documentElement.clientHeight/2 + 'px';
        $('.popup').css( "top", verticalPopupPos);
        $('.overlay').css("height", "100%");
        $('.popup').removeClass("put-car-popup");
        $('.popup').removeClass("registration-popup");
        $('.popup').addClass("authorization-popup");
        $('.modal-content-remind-password').css("display", "none");
        $('.modal-content-registration').css("display", "none");
        $('.modal-content-put-car').css("display", "none");
        $('.modal-content-successful-registration').css("display", "none");
        $('.modal-content-authorization').css("display", "block");

        $('.js-overlay-campaign').fadeIn();
        $('.js-overlay-campaign').addClass('disabled');
    };

    function showPutCarForm(event) {
        event.preventDefault();
        slowScroll('#top',300);
        $('.overlay').css("height", "100%");
        $('.popup').removeClass("authorization-popup");
        $('.popup').removeClass("registration-popup");
        $('.popup').addClass("put-car-popup");
        //$('.popup').css("top", "50vh");
        $('.modal-content-authorization').css("display", "none");
        $('.modal-content-registration').css("display", "none");
        $('.modal-content-successful-registration').css("display", "none");
        $('.modal-content-remind-password').css("display", "none");
        $('.modal-content-put-car').css("display", "block");
        //modal-content-put-car
        $('.car-photo-inputs-block__file-upload-status').html('Файл не выбран');
        $('.js-overlay-campaign').fadeIn();
        $('.js-overlay-campaign').addClass('disabled');
    
    
        const yearParse = () => {
            let currentYear = new Date().getFullYear();
            let year = document.getElementById('put-car_car-year-select');
            // year.insertAdjacentHTML( 'beforeend','<option selected disabled value="">Year</option>');
            let j = 1960; 
            while(j<= currentYear) {
                year.insertAdjacentHTML('beforeend', `<option value='${j}'>${j}</option>`);
                j++;
            }
        }       
        yearParse();
    };


    /*** file upload inputs customization starts ***/
    /* Replace standard button with custom one */
    $(document).ready(function() {
        $("input[type=file]").fileinput("<button>Выбрать файл</button>");
    })

    /* Show file upload status */
    let fileInputs =  document.querySelectorAll('.car-photo-inputs-block__photo-field_field');  
    fileInputs.forEach(elem => {
        elem.addEventListener('change', (event) =>{
            if(event.target.value) {
                let span = event.target.parentElement.parentElement.lastElementChild;
                span.innerHTML = event.target.files[0].name;
            }
        }) 
    });

    /* Contract files uploaded names if it contains more than 20 characters */
    let statusFieldInputs = document.querySelectorAll('.car-photo-inputs-block__photo-field_field');
    let statusFieldName;

    statusFieldInputs.forEach(input => {
        input.addEventListener('change',() => {
            let contractVal;
            let statusFieldSpan = input.parentElement.nextElementSibling;
            statusFieldName = statusFieldSpan.innerText;
            if(statusFieldName.length > 21) {
                contractVal = statusFieldName.substr(0, 10) + '...' + statusFieldName.substr(-10);
                statusFieldSpan.innerText = contractVal;
            } else { 
                return false
            }
        });
    });
    /*** file upload inputs customization end ***/


    /*** Show remond password modal content***/
    $('.authorization-forgot-password-button').click(function() {
        event.preventDefault();
        $('.modal-content-authorization').css("display", "none");
        $('.modal-content-remind-password').fadeIn()
    // modal-content-remind-password
    });



    $('.user-menu__cabinet-link').click(showAuthorizationForm);
    $('.user-menu__registration-link').click(showRegistrationForm);
    $('.authorization-to-register-button').click(showRegistrationForm);
    $('.put-auto-link').click(showPutCarForm);


    // открыть по кнопке
    $('.js-button-campaign').click(function() { 
        $('.js-overlay-campaign').fadeIn();
        $('.js-overlay-campaign').addClass('disabled');
    });

    // закрыть на крестик
    $('.js-close-campaign').click(function() { 
        $("form").trigger("reset");
        $('.js-overlay-campaign').fadeOut();
        $('body').css('overflow','auto');
        $('.cars-section-container').css('min-height','1230px');
    });

    // закрыть по клику вне окна
    $(document).mouseup(function (e) { 
        var popup = $('.js-popup-campaign');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $(".authorization-form").trigger("reset");
            $(".registration-form").trigger("reset");
            $(".put-car-form").trigger("reset");
            $('.js-overlay-campaign').fadeOut();
            $('body').css('overflow','auto');
            $('.cars-section-container').css('min-height','1230px');
        }
    });

    // закрыть окно подтверждения регистрации
    $('.modal-content-successful-registration__button__button').click(function() { 
        $("form").trigger("reset");
        $('.js-overlay-campaign').fadeOut();
        $('body').css('overflow','auto');
    });


    /*** Send forms starts ***/
    /* Registration form*/
    $('.registration-form').submit(function(event) {
        event.preventDefault();
        //Disable scroll
        $.ajax({
            type: "POST",
            url: "../mail.php",
            data: $(this).serialize(),
            success:function() {
                //Disable scroll
                slowScroll('#top',300);
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);

                $('.popup').removeClass("registration-popup");
                $('.popup').addClass("authorization-popup");
                $('.overlay').css("height", "100%");
                $('.modal-content-registration').css("display", "none");
                $('.modal-content-successful-registration__text').text('Вы успешно зарегистрированы!');
                $('.modal-content-successful-registration').css("display", "block");
                $(this).find("input").val("");
                $(this).find("select").val("");
                $("#form").trigger("reset");
            },
            error: function(data) {
                slowScroll('#top',300);
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);

                $('.popup').removeClass("registration-popup");
                $('.popup').addClass("authorization-popup");
                $('.overlay').css("height", "100%");
                $('.modal-content-registration').css("display", "none");
                $('.modal-content-successful-registration__text').text('При отправке данных произошла ошибка!');
                $('.modal-content-successful-registration').css("display", "block");
                $(this).find("input").val("");
                $(this).find("select").val("");
                $("#form").trigger("reset");
            }
        });
    });


    /* remind email form */
    $('.modal-content-remind-password__email-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function() {
                //Disable scroll
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);
                let verticalPopupPos = pageYOffset + document.documentElement.clientHeight/2 + 'px';
                $('.popup').css( "top", verticalPopupPos);
                $('.overlay').css("height", "100%");
                $('.modal-content-remind-password').css("display", "none");
                $('.modal-content-successful-registration__text').text('Письмо c новым паролем отправлено!');
                $('.modal-content-successful-registration').fadeIn();
                $(this).find("input").val("");
                $(".modal-content-remind-password__email-form").trigger("reset");
            },
            error: function() {
                //Disable scroll
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);
                let verticalPopupPos = pageYOffset + document.documentElement.clientHeight/2 + 'px';
                $('.popup').css( "top", verticalPopupPos);
                $('.overlay').css("height", "100%");
                $('.modal-content-remind-password').css("display", "none");
                $('.modal-content-successful-registration__text').text('При отправке данных произошла ошибка!');
                $('.modal-content-successful-registration').fadeIn();
                $(this).find("input").val("");
                $(".modal-content-remind-password__email-form").trigger("reset");
            }
        });
    });


     /* put-car-form */
    $('.put-car-form').submit(function(event) {
        event.preventDefault();
        //Disable scroll
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function() {
                //Disable scroll
                slowScroll('#top',300);
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);
    
                $('.popup').removeClass("put-car-popup");
                $('.popup').addClass("authorization-popup");
                $('.overlay').css("height", "100%");
                $('.modal-content-put-car').css("display", "none");
                $('.modal-content-successful-registration__text').text('Ваше авто выставлено на аукцион!');
                $('.modal-content-successful-registration').fadeIn();
                $(this).find("input").val("");
                $(this).find("select").val("");
                $(".put-car-form").trigger("reset");
            },
            error: function() {
                //Disable scroll
                slowScroll('#top',300);
                let $body = $(document.body);
                let oldWidth = $body.innerWidth();
                $body.css("overflow", "hidden");
                $body.width(oldWidth);
    
                $('.popup').removeClass("put-car-popup");
                $('.popup').addClass("authorization-popup");
                $('.overlay').css("height", "100%");
                $('.modal-content-put-car').css("display", "none");
                $('.modal-content-successful-registration__text').text('При отправке данных произошла ошибка!');
                $('.modal-content-successful-registration').fadeIn();
                $(this).find("input").val("");
                $(this).find("select").val("");
                $(".put-car-form").trigger("reset");
            }
        });
    });
    /*** Send forms end ***/


    /*** To screen top button starts ***/
    let upButton = document.querySelector('.up-button');
    upButton.addEventListener('click', ()=>{
    slowScroll('#top',500);
    })
    function slowScroll(id, duration) {
        var offset = 20;
        $('html,body').animate ({
            scrollTop: $(id).offset().top - offset
        },duration);
        return false;
    };


    /* Align up buttom horizontal position  */
    let containerOffset;
    let containerOffsetLeft;

    containerOffset = $('.container').offset();
    containerOffsetLeft = containerOffset.left;
    upButton.style.right = containerOffsetLeft +'px';
    window.addEventListener('resize', function(event){
        containerOffset = $('.container').offset();
        containerOffsetLeft = containerOffset.left;
        upButton.style.right = containerOffsetLeft +'px';
    });
    /*** To screen top button end ***/
});