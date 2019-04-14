FactoryBot.define do
  factory :item do
    name {"メルカリ商品の名前"}
    description {"メルカリ商品の説明文"}
    user_id {"1"}
    shipping_burden_id {"1"}
    shipping_style_id {"1"}
    prefecture_id {"1"}
    date_of_shipment_id {"1"}
    price {"1000"}
    status_id {"1"}
    condition_id {"1"}
  end
end
