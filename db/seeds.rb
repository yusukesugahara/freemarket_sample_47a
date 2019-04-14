require "csv"

CSV.foreach('db/data_reading_files/shipping_burdens.csv') do |row|
  ShippingBurden.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/date_of_shipments.csv') do |row|
  DateOfShipment.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/shipping_styles.csv') do |row|
  ShippingStyle.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/conditions.csv') do |row|
  Condition.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/statuses.csv') do |row|
  Status.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/users.csv') do |row|
  User.create(:email => row[0],:password => row[1],:password_confirmation => row[1])
end
CSV.foreach('db/data_reading_files/item_size.csv') do |row|
  ItemSize.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/brand_result.csv') do |row|
  Brand.create(:name => row[0])
end
CSV.foreach('db/data_reading_files/category_result.csv') do |row|
  Category.create(:name => row[0],:ancestry => row[1])
end
CSV.foreach('db/data_reading_files/item_image.csv') do |row|
  ItemImage.create( image: File.open('db/data_reading_files/images/'+ row[0]))
end

CSV.foreach('db/data_reading_files/items.csv') do |row|
  Item.create(name: row[0],description: row[1], user_id: row[2], condition_id: row[3], shipping_burden_id: row[4], shipping_style_id: row[5], prefecture_id: row[6], date_of_shipment_id: row[7], price: row[8], status_id: row[9], category_ids: row[10], item_size_ids: row[11], item_image_ids: [row[12],row[13],row[14],row[15]],)
end

