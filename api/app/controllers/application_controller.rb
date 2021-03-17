class ApplicationController < ActionController::Base
	skip_before_action :verify_authenticity_token
	
	def authenticate role
        authenticated = Token.authenticate bearer_token, role
        render json: {}, status: 401 if !authenticated
    end

    def bearer_token
        pattern = /^Bearer /
        header  = request.headers['Authorization']
        header.gsub(pattern, '') if header && header.match(pattern)
    end
end
