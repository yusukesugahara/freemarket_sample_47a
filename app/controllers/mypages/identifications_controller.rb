class Mypages::IdentificationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_category, only:  :new

  def new
  end

  private
  def set_category
    @category = Category.all
  end

end
