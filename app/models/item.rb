class Item < ApplicationRecord
  belongs_to :user

  has_many :Category_items, dependent: :destroy
  has_many :categories, through: :Category_items, dependent: :destroy
  has_many :BrandItems
  has_many :brands, through: :BrandItems, dependent: :destroy
  has_many :item_image_items
  has_many :item_images, through: :item_image_items, dependent: :destroy
  belongs_to :condition
  belongs_to :shipping_burden
  belongs_to :shipping_style
  belongs_to :date_of_shipment
  has_many :credit
  has_many :buyer
  has_many :item_size_items, dependent: :destroy
  has_many :item_sizes, through: :item_size_items
  belongs_to :status
  has_many :messages, dependent: :destroy


  accepts_nested_attributes_for :item_images

  validates_presence_of :name,:description, :user_id, :condition_id, :shipping_burden_id, :shipping_style_id, :prefecture_id, :date_of_shipment_id, :price, :status_id, :category_ids

  extend ActiveHash::Associations::ActiveRecordExtensions
    belongs_to_active_hash :prefecture

  accepts_nested_attributes_for :item_images, allow_destroy: true
end
