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
    });
    /*** Show/hide navigation menu end ***/


    /*** Switch content tabs starts ***/
    /*let currentLotsTab = document.querySelector('.cars-section-tabs__curent-lots-button');
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
        console.log(event.target)
        currentTabText.style.color = '#2A2A2A';
        currentLotsContent.style.display = 'block';
    }   

    const showFinishedLots = () => {
        currentLotsContent.style.display = "none";
        currentLotsTab.classList.remove('active');
        currentTabText.style.color = '#FFFFFF';
        finishedLotsTab.classList.add('active');
        finishedLotsContent.style.display = 'block';
        finishedTabText.style.color = '#2A2A2A';
    }   

    currentLotsTab.addEventListener('click', showCurrentLots);
    finishedLotsTab.addEventListener('click', showFinishedLots);*/
    /*** Switch content end ***/



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
    /** file upload inputs customization end **/


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
            let j = 1960; 
            while(j<= currentYear) {
                year.insertAdjacentHTML('beforeend', `<option value='${j}'>${j}</option>`);
                j++;
            }
        }       
        yearParse();
    }

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

    // закрыть окно подтверждения 
    $('.modal-content-successful-registration__button__button').click(function() { 
        $("form").trigger("reset");
        $('.js-overlay-campaign').fadeOut();
        $('body').css('overflow','auto');
    });
    /*** Put auto form end ***/


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

    if ($(window).width() > 1490) {
        containerOffset = $('.container').offset();
        containerOffsetLeft = containerOffset.left;
        upButton.style.right = containerOffsetLeft + 2 +'px';
        window.addEventListener('resize', function(event){
            containerOffset = $('.container').offset();
            containerOffsetLeft = containerOffset.left;
            upButton.style.right = containerOffsetLeft + 2 +'px';
        });
    };
    /*** To screen top button end ***/
});