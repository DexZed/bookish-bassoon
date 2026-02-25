interface IBuilder {
    title():void;
    description():void;
    image():void;
    price():void;
    category():void;
    rating():void;
    addToCart():void;
    viewDetails():void;
    remove():void;
}

class Product implements IBuilder{
    title():void{
        console.log('title');
    }
    description():void{
        console.log('description');
    }
    image():void{
        console.log('image');
    }
    price():void{
        console.log('price');
    }
    category():void{
        console.log('category');
    }
    rating():void{
        console.log('rating');
    }
    addToCart():void{
        console.log('add to cart');
    }
    viewDetails():void{
        console.log('view details');
    }
    remove():void{
        console.log('remove');
    
    }
}

class ProductDirector {
    private builder!: IBuilder;

    constructor(builder: IBuilder) {
        this.setBuilder(builder);
    }

    setBuilder(builder: IBuilder): void{
        this.builder = builder;
    }

    buildProduct() {
        this.builder.title();
        this.builder.description();
        this.builder.image();
        this.builder.price();
        this.builder.category();
        this.builder.rating();
        this.builder.addToCart();
        this.builder.viewDetails();
        this.builder.remove();
    
    }
}
