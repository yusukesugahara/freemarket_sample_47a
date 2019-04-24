$(window).on('load',function(){
  if(document.URL.match("edit")) {
    //指定する文字列がURLに含まれる場合に実行する内容



    function buildimagedestroyHTML(image_box_no,image_no){
      var html = `
                 <input value="${image_box_no}" type="hidden" name="item[item_images_attributes][${image_no}][_destroy]" id="item_item_images_attributes_0__destroy">
                  `
      return html;
    };

    var image_num = 0
    $(document).on("click",'.preview',function(){
      var image_box_no = $(this).attr("value");
      var index = $(this).attr("index");
      $('.item_new__image--views-box'+image_box_no).empty();
      var image_destroy_html = buildimagedestroyHTML(image_box_no,index)
      $('.item_new__edit--inputed-'+index).empty();
      $('.item_new__edit--inputed-'+index).append(image_destroy_html);
      image_num += 1
    });


    function builduploadimageHTML(image_box_no){
      var html = `
                  <input id="input_image_${image_box_no+1}" type="file" name="item[item_images_attributes][${image_box_no}][image]" class= "input_image_${image_box_no+1} item_new__image--input-input item_image_new">
                  `
      return html;
    };

    function builduploadboxHTML(){
      var html = `
        <div class="item_new__image--select">
        </div>
                  `
      return html;
    };

    function builduploadimageresultHTML(image_no,image_url,index){
      var html = `
                  <div class="item_new__image--view preview" id="preview_${image_no}" value="${image_no}" index="${index}">
                    <img class="item_new__image--view-image" src="${image_url}">
                      <div class="item_new__image--view-buttons">
                        <div class="item_new__image--view-buttons-edit-button">

                        </div>
                      <div class="item_new__image--view-buttons-delete-button">
                        削除
                      </div>
                    </div>
                  </div>
                  `
      return html;
    };

    input_image_boxs = []
    $('.item_new__image--views-box-input').each(function(index,Element,value){
      var image_value = $(this).attr("value");
      var image_url = $(this).attr("image_url");
      var image_inputed_hash = {index: index,value: image_value, image_url: image_url}
      input_image_boxs.push(image_inputed_hash)
    })

    if (input_image_boxs.length <= 5){
      $(input_image_boxs).each(function(index,value,){
      var image_url =$(this).attr("image_url");
      var value = $(this).attr("value");
      $('.item_new__image--box-prevews').append(builduploadimageresultHTML(value,image_url,index));
    })}else if (input_image_boxs > 5 ){
      $(input_image_boxs).each(function(index,value,){
      var image_url = $(this).attr("image_url");
      var value = $(this).attr("value");
      if (index >= 4){
        $('.item_new__image--box-prevews-1').append(builduploadimageresultHTML(value,image_url,index))
      }else{
        $('.item_new__image--box-prevews').append(builduploadimageresultHTML(value,image_url,index))
      };
    });
    };


      var image_no = 0;
    $('form').on('change', 'input[type="file"],.item_image_new', function(e) {
       image_no += 1;
        var file = e.target.files[0],
            reader = new FileReader(),
            $preview = $(".item_new__image--box-prevews");
            t = this;
        if(file.type.indexOf("image") < 0){
          return false;
        }
        reader.onload = (function(file) {
          return function(e) {
            $preview.append(builduploadimageresultHTML(image_no,e.target.result))
          };
        })(file);
        reader.readAsDataURL(file);
        $(this).addClass("item_new__image--views-box-input");
        setTimeout(function(){
          var preview_count = $('.item_new__image--box-prevews').children().length;
          var preview_count_1 = $('.item_new__image--box-prevews-1').children().length;
          if (preview_count == 5 && preview_count_1 == 0 ) {
            var children_html = $('.item_new__image--box-prevews').html();
            $('.item_new__image--box-prevews-1').append(children_html);
            $('.item_new__image--box-prevews').empty();

          }else if(preview_count == 5 && preview_count_1 == 5){
            $('.item_new__image--input').css('display','none');
          };
        },10);
      });

      $(document).on("click",'.item_new__image--view-buttons-delete-button',function(){
        var image_box_no = $(this).parent().parent().attr("value");
        $('.input_image_10'+ image_box_no).remove();
        $(this).parent().parent().remove();
        var preview_count_1 = $('.item_new__image--box-prevews-1').children().length;
        var preview_count = $('.item_new__image--box-prevews').children().length;
        if( preview_count_1 == 4 ){
          var children_html = $('.item_new__image--box-prevews .item_new__image--view').prop("outerHTML");
          $('.item_new__image--box-prevews-1').append(children_html);
          $('.item_new__image--box-prevews .item_new__image--view:first').remove();
          if(preview_count == 0){
            var children_html = $('.item_new__image--box-prevews-1').html();
            $('.item_new__image--box-prevews').append(children_html);
            $('.item_new__image--box-prevews-1').empty();
          };
        };
        $('.item_new__image--input').css('display','unset');
      });

      var new_image_box_no = 100
      $(document).on("click",'.item_new__image--input',function(){
        var add_html = builduploadimageHTML(new_image_box_no)
        $(".item_new__image--select").prepend(add_html);
        var input_image_id = $('.item_new__image--select > .item_new__image--input-input').attr("id");
        $("#"+input_image_id).trigger("click");
        var image_input_html = $('.item_new__image--select').html();
        $('.item_new__image--select').removeClass().addClass("item_new__image--select-inputed");
        var builduploadbox = builduploadboxHTML();
        $('.item_new__image--description').append(builduploadbox);
          new_image_box_no += 1
      });

    var price_value = $('.item_new__price--price-input').attr("value");
    var sales_commission = (price_value * 0.1)
    var sales_commission_value = Math.round(sales_commission)
    $(".item_new__price--price-sales-commission-value").text(sales_commission_value)
    var price_profit = (price_value * 0.9)
    var price_profit_value = Math.round(price_profit)
    $(".item_new__price--price-profit-value").text(price_profit_value)

    var input_price = $(".item_new__price--price-input").val();
    if (input_price == "" ) {
      $(".item_new__price--price-sales-commission-value").text("ー")
      $(".item_new__price--price-profit-value").text("ー")
      }

    $(document).on("keyup",".item_new__price--price-input",function(){
      var input_price = $(".item_new__price--price-input").val();
      if (input_price <= 9999999 && input_price >= 300){
        var sales_commission = (input_price * 0.1)
        var sales_commission_value = Math.round(sales_commission)
        $(".item_new__price--price-sales-commission-value").text(sales_commission_value.toLocaleString())
        var price_profit = input_price * 0.9
        var price_profit_value = Math.round(price_profit);
        $(".item_new__price--price-profit-value").text(price_profit_value.toLocaleString());
      }else{
        $(".item_new__price--price-sales-commission-value").text("ー")
        $(".item_new__price--price-profit-value").text("ー")
      };
    });

  // カテゴリの選択
    var parent_value = ""
    $(document).on("change","#item_new__category--parent",function(){
      $(".item_new__category-input--child").css("display","none");
      $(".item_new__category-input--grandchild").css("display","none");
        parent_value = $('#item_new__category--parent option:selected').val();
      $(".item_new__category--"+parent_value).css("display","unset")
      $(".item_new__category-input--child-input").val("");
      $(".item_new__category-input--grandchild-input").val("");
    });
    $(document).on("change",".item_new__category-input--child-input",function(){
      $(".item_new__category-input--grandchild").css("display","none");
      var category_id = '#item_new__category-child-' + parent_value
      var child_num = $(category_id).val();
      $(".item_new__category-" + child_num).css("display","unset");
      $(".item_new__category-input--grandchild-input").val("");
    });

    $('.item_new__send--send-button').on('click',function(){
      $('.item_new__category-input--child').each(function(){
        if($(this).css('display') == 'none'){
          $(this).remove();
        };
      });
      $('.item_new__category-input--grandchild').each(function(){
        if($(this).css('display') == 'none'){
          $(this).remove();
        };
      });

      $('.item_new__item_size--input').each(function(){
        if($(this).css('display') == 'none'){
          $(this).remove();
        };
      });
    });

    $(document).on("change","#item_new__item_size",function(){
      var item_size_parent_id = $(this).val();
      $(".item_new__item_size--input").css("display","none");
      $(".item_new__item_size-"+item_size_parent_id).css("display","unset");
      $(".item_new__item_size--input-box").val("");
    });

  function buildHTML(keyword){
    var html = `
                <div class= "item_new__brand--input-suggest-text">${keyword.name}</div>
                `
    return html;
  };

  $('.item_new__brand--box').on('keyup', function(e) {
    e.preventDefault();
    var keyword = $(this).val();
    $(".item_new__brand--input-suggest").empty();
    $("item_new__brand--input-suggest").css('display','unset');
    $.ajax({
      type: 'GET',
      url: "/search_keywords",
      data: {keyword: keyword},
      dataType: 'json'
    })
    .done(function(keywords){
      keywords.forEach(function(keywords){
      var html = buildHTML(keywords);
      $(".item_new__brand--input-suggest").append(html);
      });
    })
    .fail(function(error){
      alert('error')
    });
  });

  $(document).on("click",".item_new__brand--input-suggest-text",function(){
    var keyword = $(this).text();
     $(".item_new__brand--box").val(keyword);
  });
  $(".item_new__brand--box").focusin(function(e) {
    $(".item_new__brand--input-suggest").css("display","unset")
  });
  $(".item_new__brand--box").focusout(function(e) {
    setTimeout(function(){
       $(".item_new__brand--input-suggest").css("display","none")
    },200);
  });



  };
});

