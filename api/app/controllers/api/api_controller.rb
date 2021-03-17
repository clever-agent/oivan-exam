class Api::ApiController < ApplicationController
    before_action :auth_api   
    
    def auth_api
        authenticate UserRole::STUDENT        
    end
end