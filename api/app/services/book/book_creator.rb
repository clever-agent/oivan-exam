class BookCreator
    def factory_method
      raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
    end
  
    def search_book text
      product = factory_method
      result = product.search text
  
      result
    end
end