class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.references :user, null:false,foreign_key: true
      t.references :condition, null: false, foreign_key: true
      t.references :shipping_burden, null: false, foreign_key: true
      t.references :shipping_style, null: false, foreign_key: true
      t.integer :prefecture_id, null: false
      t.references :date_of_shipment, null: false, foreign_key: true
      t.integer    :price, null: false
      t.references :status, null: false, foreign_key: true
      t.string :brand_name
      t.timestamps
    end
  end
end
