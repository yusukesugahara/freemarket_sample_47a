class ItemImage < ApplicationRecord
  has_many :item_image_items
  has_many :items, through: :item_image_items

  validates_presence_of :image

  mount_uploader :image, ImageUploader
end
