class Book
    def search text
        raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
    end
end