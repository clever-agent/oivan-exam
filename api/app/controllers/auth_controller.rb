class AuthController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def login
        user = User.authenticate params[:email], params[:password]
        token, user_id = nil
        unless user.nil?
            token = Token.generate user
            user_id = user.id
            UserSession.create(user_id: user.id, token: token)
        end

        render json: {token: token, user_id: user_id}
    end

    def logout
        user_session = UserSession.find_by_token(params[:token])
        if user_session.nil?
            render json: {logout: false}
        else
            user_session.delete
            render json: {logout: true}
        end
    end
end