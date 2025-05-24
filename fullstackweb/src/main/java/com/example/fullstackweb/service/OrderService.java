package com.example.fullstackweb.service;

import com.example.fullstackweb.models.*;
import com.example.fullstackweb.repository.*;
import com.example.fullstackweb.request.CheckOutRequest;
import com.example.fullstackweb.request.CheckOutItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BankCardRepository bankCardRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ShippingRepository shippingRepository;

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order createOrder(Long userId, CheckOutRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Order order = new Order();
        order.setUser(user); // set user
        order.setAddress(address); // set address

        // set phuong thuc thanh toan
        order.setPaymentMethod(request.getPaymentMethod());
        // khac COD set Bank Card; null
        if(!"COD".equals(request.getPaymentMethod())) {
            BankCard card = bankCardRepository.findById(request.getCardId())
                    .orElseThrow(() -> new RuntimeException("Bank Card not found"));
            order.setCard(card);
        } else order.setCard(null);

        order.setOrderDate(LocalDate.now()); // set date
        List<OrderItem> orderItems = new ArrayList<>(); // tao list luu product
        for (CheckOutItemRequest itemRequest : request.getItems()) { // loc list
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order); // lay id cua order: order_id
            orderItem.setProduct(product); // set product
            orderItem.setQuantity(itemRequest.getQuantity()); // lay so luong
            orderItem.setPrice(product.getPrice()); // lay price tu product
            orderItems.add(orderItem); // add vao list order items
        }
        order.setItems(orderItems); // set list order items vao list order
        order.setTotalAmount(request.getTotalAmount()); // set total

        Shipping shipping = shippingRepository.findById(request.getShippingId())
                .orElseThrow(() -> new RuntimeException("Shipping not fount"));
        order.setShipping(shipping); // set shipping

        order.setDiscountAmount(request.getDiscountAmount()); // set ma giam gia
        order.setStatus("Shipped"); // set trang thai
        return orderRepository.save(order);
    }
}
