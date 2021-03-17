require 'rails_helper'

RSpec.describe 'API Tests', type: :request do
    # initialize test data
    let!(:user) { create(:user, :student) }
    let(:user_id) { user.id }
    let!(:tests) { create_list(:test, 2) }
    let(:test_id) { tests.first.id }
  
    describe 'GET /api/tests' do
      # make HTTP get request before each example
      #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
  
      it 'returns tests' do
        # Note `json` is a custom helper to parse JSON responses
        # Act

        post '/auth/login', params: {email: "student@example.com", password: "12345678"}
        get '/api/tests', headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(json).not_to be_empty
        expect(json.size).to eq(2)
      end
  
      it 'returns status code 200' do
        # Act
        post '/auth/login', params: {email: "student@example.com", password: "12345678"} 
        get '/api/tests', headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(response).to have_http_status(200)
      end

      it 'no authenticated - returns status code 401' do
        # Act
        #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} 
        get '/api/tests'# + json["token"]

        # Assert
        expect(response).to have_http_status(401)
      end
    end

    describe 'GET /api/tests/id' do
        # make HTTP get request before each example
        #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
    
        it 'returns test' do
          # Note `json` is a custom helper to parse JSON responses
          # Act
          post '/auth/login', params: {email: "student@example.com", password: "12345678"}
          get "/api/tests/#{test_id}", headers: { Authorization: "Bearer #{json['token']}" }
  
          # Assert
          expect(json["id"]).to eq(test_id)
        end
    
        it 'returns status code 200' do
          # Act
          post '/auth/login', params: {email: "student@example.com", password: "12345678"}
          get "/api/tests/#{test_id}", headers: { Authorization: "Bearer #{json['token']}" }
  
          # Assert
          expect(response).to have_http_status(200)
        end
  
        it 'no authenticated - returns status code 401' do
          # Act
          #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"}
          get "/api/tests/#{test_id}"
  
          # Assert
          expect(response).to have_http_status(401)
        end
    end
end
  