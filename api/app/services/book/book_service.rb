require_relative "google_book_creator"

class BookService
    def self.search_book(text)
        creator = GoogleBookCreator.new
        result = creator.search_book text
        result
    end
end