class Portal::PortalController < ApplicationController
    before_action :auth_portal
    skip_before_action :verify_authenticity_token

    def auth_portal
        authenticated = Token.authenticate params[:token], UserRole::TEACHER
        if !authenticated
            render json: {}, status: 401
        end
    end
end