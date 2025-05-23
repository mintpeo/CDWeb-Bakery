package com.example.fullstackweb.request;

import java.util.List;

public class CheckOutRequest {
    private Long addressId;
    private String paymentMethod;
    private Long cardId; // null nếu COD
    private Double discountValid;
    private int shippingId;
    private Long totalAmount;
    private List<CheckOutItemRequest> items;

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Double getDiscountValid() {
        return discountValid;
    }

    public void setDiscountValid(Double discountValid) {
        this.discountValid = discountValid;
    }

    public int getShippingId() {
        return shippingId;
    }

    public void setShippingId(int shippingId) {
        this.shippingId = shippingId;
    }

    public List<CheckOutItemRequest> getItems() {
        return items;
    }

    public void setItems(List<CheckOutItemRequest> items) {
        this.items = items;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }
}
