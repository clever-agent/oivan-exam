FactoryBot.define do
    factory :user do
      trait :teacher1 do 
        #name { Faker::Lorem.word }
        #created_by { Faker::Number.number(10) }
        email { "teacher1@example.com" }
        password { "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f" }
        role {"teacher"}
      end

      trait :teacher2 do 
        #name { Faker::Lorem.word }
        #created_by { Faker::Number.number(10) }
        email { "teacher2@example.com" }
        password { "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f" }
        role {"teacher"}
      end

      trait :student do 
        email { "student@example.com" }
        password { "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f" }
        role {"student"}
      end
      
    end
  end