class Portal::UsersController < Portal::PortalController
    def index     
        user_id = Token.get_user_id params[:token]
        users = User.where.not(id: user_id).select("id, name, email, role")
        render json: users
    end

    def show       
        user = User.where(id: params[:id]).select("id, name, email, role").first
        render json: user
    end

    def create
        result = User.create_or_update(params)        
        render json: result
    end

    def destroy
        result = User.destroy_user(params)
        render json: result
    end
end