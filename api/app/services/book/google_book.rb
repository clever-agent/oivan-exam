require 'net/http'
require 'json'
require_relative "book"

class GoogleBook < Book
    def search text
        response = Net::HTTP.get(URI.parse('https://www.googleapis.com/books/v1/volumes?q=' + text))
        result = JSON.parse(response)

        return result["items"].nil? ? [] : result["items"]
    end
end

