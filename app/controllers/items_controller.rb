class ItemsController < ApplicationController
  before_action :authenticate_user!,only: [:new,:create,:buy,:pay]
  before_action :set_category, only: [:index, :show]

  def index

    @category_women = Category.find(1)
    @items_category_women = @category_women.items.order("created_at DESC").limit(4)

    @category_men = Category.find(2)
    @items_category_men = @category_men.items.order("created_at DESC").limit(4)

    @category_baby = Category.find(3)
    @items_category_baby = @category_baby.items.order("created_at DESC").limit(4)

    @category_cosmetic = Category.find(7)
    @items_category_cosmetic = @category_cosmetic.items.order("created_at DESC").limit(4)

    @brand_chanel = Brand.find(4116)
    @items_brand_chanel = @brand_chanel.items.order("created_at DESC").limit(4)

    @brand_louis_vuitton = Brand.find(4117)
    @items_brand_louis_vuitton = @brand_louis_vuitton.items.order("created_at DESC").limit(4)

    @brand_supreme = Brand.find(4118)
    @items_brand_supreme = @brand_supreme.items.order("created_at DESC").limit(4)

    @brand_nike = Brand.find(4119)
    @items_brand_nike = @brand_nike.items.order("created_at DESC").limit(4)
  end

  def new
    @item = Item.new
    @item.item_images.build
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update

    @item = Item.find(params[:id])
    if @item.user_id == current_user.id
      @item.update_attributes(item_params)
    end
    redirect_to root_path

  end

  def show
    @item = Item.find(params[:id])
    @item_name = Item.select("name")
    @item_price = Item.select("price")
    @items1 = Item.all.order("RAND(1)").limit(4)
    @items2 = Item.all.order("RAND(2)").limit(4)
  end

  def destroy
    item = Item.find(params[:id])
    if item.user_id == current_user.id
      item.destroy
      redirect_to root_path
    end
  end

  def buy
    @item = Item.find(params[:id])
    @credits = CreditCard.all
  end

  def pay
    Payjp.api_key = "#{ENV['PAYJP_PRIVATE_KEY']}"
    customer_id = current_user.credit_cards.last.customer_id
    price = params[:item_price]

    Payjp::Charge.create(
    amount: price,
    currency: 'jpy',
    customer: customer_id
    )
    item_id = params[:item_id]
    @item = Item.find(item_id)
    @item.status_id = 4
    @item.save

    redirect_to  root_path
  end

  private
  def item_params
    params.require(:item).permit(:status_id ,:category_ids, :item_size_ids, :brand_ids ,:name,:description,:condition_id,:shipping_burden_id, :shipping_style_id ,:prefecture_id,:date_of_shipment_id ,:price,item_images_attributes: [:id ,:image,:_destroy] ).merge(user_id: current_user.id)
  end

  def set_category
    @category = Category.all
  end

end
