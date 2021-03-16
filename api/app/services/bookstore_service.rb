require 'net/http'
require 'json'
require_relative "book/book_service"

class BookstoreService
    def self.search_book(text)
        searched_books = BookService.search_book(text) 
        books = searched_books.map do |item|
            {
                book_title: "#{item["volumeInfo"]["title"]}",
                book_link: item["selfLink"],
                book_thumbnail: item["volumeInfo"]["imageLinks"] != nil ? item["volumeInfo"]["imageLinks"]["thumbnail"] : "",
                book_authors: item["volumeInfo"]["authors"]
            }
        end

        books
    end

    def self.buy_book(params)
        order_info = OrderInfo.create({
            book_link: params[:book_link],
            book_title: params[:book_title],
            delivery_date: params[:delivery_date],
            delivery_type: params[:delivery_type],
            status: OrderStatus::NEW,
            customer_name: params[:customer_name],
            customer_address: params[:customer_address],
            cost: DeliveryCostFactor.calculate_cost(params[:delivery_type], params[:delivery_date])
        })
        assign_success = DeliveryService.assign_delivery(order_info.id, order_info.delivery_type)
        order_info.update({status: OrderStatus::DELIVERY_ASSIGNED}) if assign_success
    end

    
end