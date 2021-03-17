require 'rails_helper'

RSpec.describe 'Auth', type: :request do
    # initialize test data   
    let!(:users) { create(:user, :teacher1) }
  
    # Test suite for GET /todos
    describe 'POST /auth/login' do
      # make HTTP get request before each example
      #before { get '/portal/users' }
  
      it 'auth login' do
        post '/auth/login', params: {email: "teacher1@example.com", password: "12345678"}
        # Note `json` is a custom helper to parse JSON responses

        expect(json["token"]).not_to be_nil
      end      
    end
end
  