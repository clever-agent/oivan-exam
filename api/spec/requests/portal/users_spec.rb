require 'rails_helper'

RSpec.describe 'Portal Users', type: :request do
    # initialize test data
    let!(:user1) { create(:user, :teacher1) }
    let!(:user2) { create(:user, :teacher2) }
    let(:user_id) { user2.id }
  
    describe 'GET /portal/users' do
      # make HTTP get request before each example
      #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
  
      it 'returns users' do
        # Note `json` is a custom helper to parse JSON responses
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"} 
        get '/portal/users', headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
  
      it 'returns status code 200' do
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"} 
        get '/portal/users', headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(response).to have_http_status(200)
      end

      it 'no authenticated - returns status code 401' do
        # Act
        #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} 
        get '/portal/users'

        # Assert
        expect(response).to have_http_status(401)
      end
    end

    describe 'GET /portal/users/id' do
      # make HTTP get request before each example
      #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
  
      it 'returns user' do
        # Note `json` is a custom helper to parse JSON responses
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        get "/portal/users/#{user_id}", headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(json["email"]).to eq("teacher2@example.com")
      end
  
      it 'returns status code 200' do
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        get "/portal/users/#{user_id}", headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(response).to have_http_status(200)
      end

      it 'no authenticated - returns status code 401' do
        # Act
        #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"}
        get "/portal/users/#{user_id}"

        # Assert
        expect(response).to have_http_status(401)
      end
    end

    describe 'DELETE /portal/users/id' do
      # make HTTP get request before each example
      #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
  
      it 'returns success' do
        # Note `json` is a custom helper to parse JSON responses
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        delete "/portal/users/#{user_id}", headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(json["success"]).to eq(true)
      end
  
      it 'returns status code 200' do
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        delete "/portal/users/#{user_id}", headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(response).to have_http_status(200)
      end

      it 'not authenticated - returns status code 401' do
        # Act
        #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"}
        delete "/portal/users/#{user_id}"

        # Assert
        expect(response).to have_http_status(401)
      end
    end

    describe 'POST /portal/users' do
      # make HTTP get request before each example
      #before { post '/auth/login', params: {email: "teacher@example.com", password: "12345678"} }
  
      it 'returns success' do
        # Note `json` is a custom helper to parse JSON responses
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        post "/portal/users", params: {email: "test@example.com", password: "123"}, headers: { Authorization: "Bearer #{json['token']}" } 

        # Assert
        expect(json["success"]).to eq(true)
      end
  
      it 'returns status code 200' do
        # Act
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        post "/portal/users", params: {email: "test@example.com", password: "123"}, headers: { Authorization: "Bearer #{json['token']}" }

        # Assert
        expect(response).to have_http_status(200)
      end

      it 'not authenticated - returns status code 401' do
        # Act
        #post '/auth/login', params: {email: "teacher@example.com", password: "12345678"}
        post "/portal/users", params: {email: "test@example.com", password: "123"} 

        # Assert
        expect(response).to have_http_status(401)
      end
    end
end
  