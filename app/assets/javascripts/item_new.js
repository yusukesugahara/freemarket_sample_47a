$(window).on('load',function(){
  if(document.URL.match("new")) {

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

    function builduploadimageresultHTML(image_no,image_url){
      var html = `
                  <div class="item_new__image--view preview" id="preview_${image_no}" value="${image_no}">
                    <img class="item_new__image--view-image" src="${image_url}">
                      <div class="item_new__image--view-buttons">
                        <div class="item_new__image--view-buttons-edit-button">
                          編集
                        </div>
                      <div class="item_new__image--view-buttons-delete-button">
                        削除
                      </div>
                    </div>
                  </div>
                  `
      return html;
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

      $(document).on("click",'.preview',function(){
        var image_box_no = $(this).attr("value");
        $('.input_image_10'+ image_box_no).remove();
        $(this).remove();
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
      }
    });
  };
});


