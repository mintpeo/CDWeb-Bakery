package com.example.fullstackweb.models;
import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private int price;

    @Column(name = "flavor")
    private String flavor;

    @Column(name = "structure")
    private String structure;

    @Column(name = "decorate")
    private String decorate;

    @Column(name = "preserve")
    private String preserve;

    @Column(name = "detail")
    private String detail;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "categoryId")
//    @JsonIgnore
    private Category category;

    public Product() {}

    public Product(Long id, String name, int price, String flavor, String structure, String decorate, String preserve, String detail, String image, Category category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.flavor = flavor;
        this.structure = structure;
        this.decorate = decorate;
        this.preserve = preserve;
        this.detail = detail;
        this.image = image;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getFlavor() {
        return flavor;
    }

    public void setFlavor(String flavor) {
        this.flavor = flavor;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getDecorate() {
        return decorate;
    }

    public void setDecorate(String decorate) {
        this.decorate = decorate;
    }

    public String getPreserve() {
        return preserve;
    }

    public void setPreserve(String preserve) {
        this.preserve = preserve;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
