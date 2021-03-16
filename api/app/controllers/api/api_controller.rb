class Api::ApiController < ApplicationController
    before_action :auth_api   
    skip_before_action :verify_authenticity_token
    
    def auth_api
        authenticated = Token.authenticate params[:token], UserRole::STUDENT
        if !authenticated
            render json: {}, status: 401
        end
    end
end