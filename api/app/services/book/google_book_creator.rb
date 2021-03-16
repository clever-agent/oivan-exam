require_relative "book_creator"
require_relative "google_book"

class GoogleBookCreator < BookCreator
    def factory_method
        GoogleBook.new
    end
end