class Api::ApiController < ApplicationController
    before_action :auth_api   
    skip_before_action :verify_authenticity_token
    
    def auth_api
        authenticated = Token.authenticate params[:token], UserRole::STUDENT
        render json: {}, status: 401 if !authenticated
    end
end