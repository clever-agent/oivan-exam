class Token
	SECRET = 'my$ecretK3y'

	def self.generate user
		exp = Time.now.to_i + 3600*24*30
		payload = { data: {user_id: user.id, user_role: user.role}, exp: exp }
		token = JWT.encode payload, SECRET, 'HS256'

		token
	end

	def self.validate token
		decoded_token = nil
		begin
		  decoded_token = JWT.decode token, SECRET, true, { algorithm: 'HS256' }
		rescue 
		end

		decoded_token
    end
    
    def self.authenticate token, role
        user_session = UserSession.find_by_token token
        decrypted_token = Token.validate token
        !user_session.nil? && !decrypted_token.nil? && decrypted_token[0]["data"]["user_role"] == role
    end

	def self.get_user_id token
		user_id = nil
		begin
			decrypted_token = JWT.decode token, SECRET, true, { algorithm: 'HS256' }
			user_id = decrypted_token[0]["data"]["user_id"]
		rescue Exception => e
		end

		user_id
	end
end