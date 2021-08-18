/****  Variables Initiation  ****/
var doc = document;
var docEl = document.documentElement;
var $sidebar = $('.sidebar');
var $sidebarFooter = $('.sidebar .sidebar-footer');
var $mainContent = $('.main-content');
var $pageContent = $('.page-content');
var $topbar = $('.topbar');
var $logopanel = $('.logopanel');
var $sidebarWidth = $(".sidebar").width();
var content = document.querySelector('.page-content');
$loader = $('#preloader');
var docHeight = $(document).height();
var windowHeight = $(window).height();
var windowWidth = $(window).width();

$(window).load(function() {
  "use strict";
  setTimeout(function () {
      $('.loader-overlay').addClass('loaded');
      $('body > section').animate({
        opacity: 1,
      }, 400);
  }, 500);

});

/* ==========================================================*/
/* APPLICATION SCRIPTS                                       */
/* ========================================================= */

/* ==========================================================*/
/* BEGIN SIDEBAR                                             */
/* Toggle submenu open */
function toggleSidebarMenu() {
    // Check if sidebar is collapsed
    if($('body').hasClass('sidebar-collapsed'))
      $('.nav-sidebar .children').css({display: ''});
    else
      $('.nav-active.active .children').css('display', 'block');
    $('.nav-sidebar').on('click', 'li.nav-parent > a', function (e) {
        e.preventDefault();
        if($('body').hasClass('sidebar-collapsed') && !$('body').hasClass('sidebar-hover')) return;
        if($('body').hasClass('submenu-hover')) return;
        var parent = $(this).parent().parent();
        parent.children('li.active').children('.children').slideUp(200);
        $('.nav-sidebar .arrow').removeClass('active');
        parent.children('li.active').removeClass('active');
        var sub = $(this).next();
        var slideSpeed = 200;
        if (sub.is(":visible")) {
            $(this).parent().removeClass("active");
            sub.slideUp(slideSpeed);
        } else {
            $(this).find('.arrow').addClass('active');
            sub.slideDown(slideSpeed, function () {
              $(this).parent().addClass("active");
            });
        }
    });
}

// Add class everytime a mouse pointer hover over it
var hoverTimeout;
 $('.nav-sidebar > li').hover(function() {
    clearTimeout(hoverTimeout);
    $(this).siblings().removeClass('nav-hover');
    $(this).addClass('nav-hover');
}, function() {
    var $self = $(this);
    hoverTimeout = setTimeout(function() {
        $self.removeClass('nav-hover');
    }, 200);
});

 $('.nav-sidebar > li .children').hover(function() {
    clearTimeout(hoverTimeout);
    $(this).closest('.nav-parent').siblings().removeClass('nav-hover');
    $(this).closest('.nav-parent').addClass('nav-hover');
}, function() {
    var $self = $(this);
    hoverTimeout = setTimeout(function() {
        $(this).closest('.nav-parent').removeClass('nav-hover');
    }, 200);
});

 
 // Menu Toggle
function toggleSidebar(){
    $('.topbar').on('click', '.menutoggle', function(){
      var body = $('body');
      var bodypos = body.css('position');
      if(bodypos != 'relative') {
         if(!body.hasClass('sidebar-collapsed')) {
            body.addClass('sidebar-collapsed');
            $('.nav-sidebar ul').attr('style','');
            $(this).addClass('menu-collapsed');
         } else {
            body.removeClass('sidebar-collapsed');
            $('.nav-sidebar li.active ul').css({display: 'block'});
            $(this).removeClass('menu-collapsed');
         }
      } else {
         if(body.hasClass('sidebar-show'))
            body.removeClass('sidebar-show');
         else
            body.addClass('sidebar-show');     
      }
   });

    var body = $('body');
    var bodypos = body.css('position');
    windowWidth = $(window).width();
    if(windowWidth < 1024) {
        body.addClass('sidebar-collapsed');
        $('.nav-sidebar ul').attr('style','');
        $(this).addClass('menu-collapsed');
    }
    else{
        body.removeClass('sidebar-collapsed');
        $('.nav-sidebar li.active ul').css({display: 'block'});
        $(this).removeClass('menu-collapsed');
    }

}

/* END SIDEBAR                                               */
/* ========================================================= */

// Check if sidebar is collapsed
if($('body').hasClass('sidebar-collapsed'))
  $('.nav-sidebar .children').css({display: ''});
  
/***** Scroll to top button *****/
function scrollTop(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
}

function select2(){
  if($.fn.select2){
      $('select:not(.select-picker)').each(function(){
          $(this).select2({
              placeholder: $(this).data('placeholder') ?  $(this).data('placeholder') : '',
              allowClear: $(this).data('allowclear') ? $(this).data('allowclear') : true,
              minimumInputLength: $(this).data('minimumInputLength') ? $(this).data('minimumInputLength') : -1,
              minimumResultsForSearch: $(this).data('search') ? 1 : -1,
              dropdownCssClass: $(this).data('style') ? 'form-white' : ''
          });
      });
  }
}


/****  Initiation of Main Functions  ****/
$(document).ready(function () {
    toggleSidebarMenu();
    toggleSidebar();
    select2();
    scrollTop();
});


$( window ).resize(function() {
  setTimeout(function () {
    toggleSidebar();


  }, 100);

});