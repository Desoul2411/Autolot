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


    /*** Show/hide "No deposit" warning starts***/
    /* let depositSumMobile = document.querySelector('.user-panel-info__deposit_sum_mobile'); */
    let depositSumDesktop = document.querySelector('.user-panel-info__deposit_sum_desktop');
    let warningMessage = document.querySelector('.user-panel-info__no-deposit-warning');

    if(depositSumDesktop.innerText == '0') {
        depositSumDesktop.classList.add('warning');
        warningMessage.style.display = "flex";
        /* depositSumMobile.classList.add('warning');
        warningMessage.style.display = "flex"; */
    } else {
        depositSumDesktop.classList.remove('warning');
        warningMessage.style.display = "none";
    /*  depositSumMobile.classList.remove('warning');
        warningMessage.style.display = "none"; */
    }    

    /*** Show/hide "No deposit" warning end ***/


    /*** Align partners-block and tab-content width ***/
    if ($(window).width() > 992) {
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


    if(($('.current-lots-tab-content').children('.car-card').length > 0) || ($('.finished-lots-tab-content').children('.car-card').length > 0) || ($('.favourites-lots-tab-content').children('.car-card').length > 0)) {
        calculateCarCardParameters();
    };


    /*** Switch content tabs starts ***/
    let currentLotsTab = document.querySelector('.cars-section-tabs__curent-lots-button');
    let finishedLotsTab = document.querySelector('.cars-section-tabs__finished-lots-button');
    let favouritesLotsTab = document.querySelector('.cars-section-tabs__favourites-lots-button');

    let currentLotsContent = document.querySelector('.current-lots-tab-content');
    let finishedLotsContent = document.querySelector('.finished-lots-tab-content');
    let favouritesLotsContent = document.querySelector('.favourites-lots-tab-content');

    let currentTabText = document.querySelector('.current-tab-text');
    let finishedTabText = document.querySelector('.finished-tab-text');
    let favouritesTabText = document.querySelector('.favourites-tab-text');


    currentLotsTab.classList.add('active');
    finishedLotsContent.style.display = "none";
    favouritesLotsContent.style.display = "none";
        
    const showCurrentLots = () => {
        finishedLotsContent.style.display = "none";
        favouritesLotsContent.style.display = "none";

        finishedLotsTab.classList.remove('active');
        finishedTabText.style.color = '#FFFFFF';
        favouritesLotsTab.classList.remove('active');
        favouritesTabText.style.color = '#FFFFFF';

        currentLotsTab.classList.add('active');
        currentTabText.style.color = '#2A2A2A';
        currentLotsContent.style.display = 'block';
        $('.fotorama').resize();
        
    }   

    const showFinishedLots = () => {
        currentLotsContent.style.display = "none";
        favouritesLotsContent.style.display = "none";

        currentLotsTab.classList.remove('active');
        currentTabText.style.color = '#FFFFFF';
        favouritesLotsTab.classList.remove('active');
        favouritesTabText.style.color = '#FFFFFF';

        finishedLotsTab.classList.add('active');
        finishedLotsContent.style.display = 'block';
        finishedTabText.style.color = '#2A2A2A';
        $('.fotorama').resize();
    }   

    const showFavouritesLots = () => {
        currentLotsContent.style.display = "none";
        finishedLotsContent.style.display = "none";

        currentLotsTab.classList.remove('active');
        currentTabText.style.color = '#FFFFFF';
        finishedLotsTab.classList.remove('active');
        finishedTabText.style.color = '#FFFFFF';

        favouritesLotsTab.classList.add('active');
        favouritesLotsContent.style.display = 'block';
        favouritesTabText.style.color = '#2A2A2A';
        $('.fotorama').resize();
    }   

    currentLotsTab.addEventListener('click', showCurrentLots);
    finishedLotsTab.addEventListener('click', showFinishedLots);
    favouritesLotsTab.addEventListener('click', showFavouritesLots);
    /*** Switch content end ***/


    /*** Switch "Вы лидер"/ "Ставка перебита" status ***/
    let statusButton = document.querySelector('.description-bid-indicator');
    if(statusButton.classList.contains('lider')) {
        statusButton.innerHTML = 'ВЫ ЛИДЕР!'
    } else if (statusButton.classList.contains('failed')) {
        statusButton.innerHTML = 'СТАВКА ПЕРЕБИТА'
    }


    /*** Find-parts-panel accordeon (max-width 475px) starts ***/
        $('.find-parts-link').click(function(event){
            $(this).next('.find-parts-form').slideToggle();
            $('.find-parts-form').css('display', 'flex');
            $('.find-parts-form').css('flex-direction', 'column');
        });

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

    /*** Put auto form starts ***/
    /** file upload inputs customization starts **/

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
        };
    });

    // закрыть окно подтверждения 
    $('.modal-content-successful-registration__button__button').click(function() { 
        $("form").trigger("reset");
        $('.js-overlay-campaign').fadeOut();
        $('body').css('overflow','auto');
    });


    /* Send put-car-form */
    $('.put-car-form').submit(function(event) {
        event.preventDefault();
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
    /*** Put auto form end ***/


    /*** To screen top button starts ***/
    let upButton = document.querySelector('.up-button');
        upButton.addEventListener('click', ()=>{
        slowScroll('#top');
    })
    function slowScroll(id) {
        var offset = 20;
        $('html,body').animate ({
            scrollTop: $(id).offset().top - offset
        },500);
        return false;
    };


    /* Align up buttom horizontal position */
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

    if ($(window).width() > 1490) {
        upButton.style.right = containerOffsetLeft + 3 + 'px';
        window.addEventListener('resize', function(event){
            upButton.style.right = containerOffsetLeft + 3 + 'px';
        });
    }
    /*** To screen top button end ***/
});