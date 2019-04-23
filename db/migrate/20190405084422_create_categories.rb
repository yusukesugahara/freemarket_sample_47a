class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :ancestry, index: true
      t.string :parent, index: true
      t.string :child, index: true
      t.string :item_size_id
      t.timestamps
    end
  end
end
