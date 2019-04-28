class SearchesController < ApplicationController
  before_action :set_category, only:  [:index]

  def index
    @view_items = params[:keyword].empty? ? []  : Item.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)

    @search = Item.ransack(:q)
    @items = @search.result(distinct: true).includes(:item_images)
  end

  def create
      @search = Item.ransack(search_params)
      @items = @search.result(distinct: true).includes(:item_images)
      respond_to do |format|
        format.json
      end
  end

  private
  def search_params
    params.require(:q).permit(:name_cont,{:categories_ancestry_eq => []},{:categories_id_in => []},:brands_name_eq,{:item_sizes_id_in => []},:price_gteq,:price_lteq,{:condition_id_in => []},{:shipping_burden_id_in => []},{:status_id_in => []},:s)

  end

  def set_category
    @category = Category.all
  end

end
