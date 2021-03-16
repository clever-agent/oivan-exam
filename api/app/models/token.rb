class Token
	SECRET = 'my$ecretK3y'

	def self.generate user
		exp = Time.now.to_i + 3600*24*30
		payload = { data: {user_id: user.id, user_role: user.role}, exp: exp }
		token = JWT.encode payload, SECRET, 'HS256'

		return token
	end

	def self.validate token
		begin
		  decoded_token = JWT.decode token, SECRET, true, { algorithm: 'HS256' }
		  return decoded_token
		rescue 
		  return nil
		end
    end
    
    def self.authenticate token, role
        user_session = UserSession.find_by_token token
        decrypted_token = Token.validate token
        if user_session.nil? || decrypted_token.nil? || decrypted_token[0]["data"]["user_role"] != role
            return false
        else
            return true
        end
    end

	def self.get_user_id token
		begin
			decrypted_token = JWT.decode token, SECRET, true, { algorithm: 'HS256' }
			return decrypted_token[0]["data"]["user_id"]
		rescue Exception => e
			return nil
		end
	end
end