class DeliveryService
    def self.assign_delivery order_id, delivery_type
        case delivery_type
        when DeliveryType::AIRCRAFT
            pick_aircraft order_id
        when DeliveryType::TRAIN
            pick_train order_id
        when DeliveryType::MORTOBIKE
            pick_motorbike order_id
        else
            puts "wrong delivery type"
            return false
        end

        return true
    end

    def self.pick_aircraft order_id
        AircraftDeliveryInfo.create({flight_no: "102", gate_of_arrival: "11", order_id: order_id})
    end

    def self.pick_train order_id
        TrainDeliveryInfo.create({train_no: "001", station_of_arrival: "20", order_id: order_id})
    end

    def self.pick_motorbike order_id
        MotorbikeDeliveryInfo.create({driver_name: "mr x", mobile: "123456", order_id: order_id})
    end
end