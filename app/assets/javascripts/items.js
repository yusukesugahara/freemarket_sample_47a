$(function(){
  $('.slider').slick({
    speed: 1000,
    prevArrow: '<a class="fas fa-angle-left slide-arrow prev-arrow"></a>',
    nextArrow: '<a class="fas fa-angle-right slide-arrow next-arrow"></a>',
    dots: true,
    dotsClass: 'slide-dots'
  });

// categoryの表示
  $(document).on('mouseover','.header__buttons--category',function(){
    $('.header__category_brand--box').css('display','flex');
    $('.header__category_brand--box-parents').css('display','unset');
  });

  $(document).on('mouseover','.header__category_brand--box-parents',function(){
      $('.header__category_brand--box-child-button').css('background-color','');
      $('.header__category_brand--box-grandchild-button').css('background-color','');
      $('.header__category_brand--box-grandchild').css('display','none');
  });
  $(document).on('mouseover','.header__category_brand--box-parents-button',function(){
    $('.header__category_brand--box-parents-button').css('background-color','white');
    var child_id = $(this).attr('value');
    $(this).css('background-color','#ea352d');
    $('.header__category_brand--box').css('display','flex');
    $('.header__category_brand--box-parents').css('display','unset');
    $('.header__category_brand--box-child').css('display','none');
    $('.header__category_brand--box-child').each(function(){
      var current_child_id = $(this).attr('value');
      if ( current_child_id == child_id){
        $('.header__category_brand--box-child').css('display','none');
        $(this).css('display','unset');
      };
    });
  });

   $(document).on('mouseover','.header__category_brand--box-child-button',function(){
      var grand_child_id = $(this).attr('value');
      $('.header__category_brand--box-child-button').css('background-color','white');
      $('.header__category_brand--box-grandchild-button').css('background-color','white');
      $(this).css('background-color','#e6e6e6');
      $('.header__category_brand--box-grandchild').css('display','none');
      $('.header__category_brand--box-grandchild').each(function(){
        var current_grand_child_id = $(this).attr('value');
        if ( current_grand_child_id == grand_child_id){
          $('.header__category_brand--box-grandchild').css('display','none');
          $(this).css('display','unset');
          var test = $(this).children('a').length
          if (test == 0){
             $('.header__category_brand--box-grandchild').css('display','none');
          }
        };
      });
    });
  $(document).on('mouseover','.header__category_brand--box-grandchild-button',function(){

    $('.header__category_brand--box-grandchild-button').css('background-color','white');
    $(this).css('background-color','#e6e6e6');
  });
  $(document).on('mouseleave','.header__mouse_over',function(){
    $('.header__category_brand--box').css('display','none');
  });
});


