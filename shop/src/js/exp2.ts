// Second Way 

enum ProductDetails {
    Title = 'title',
    description = 'description',
    image = 'image',
    price = 'price',
    category = 'category',
    rating = 'rating',
    addToCart = 'add to cart',
    viewDetails = 'view details',
    remove = 'remove',
}

interface IBuilder {
    [ProductDetails.Title]():void;
    [ProductDetails.description]():void;
    [ProductDetails.image]():void;
    [ProductDetails.price]():void;
    [ProductDetails.category]():void;
    [ProductDetails.rating]():void;
    [ProductDetails.addToCart]():void;
    [ProductDetails.viewDetails]():void;
    [ProductDetails.remove]():void;
    getProduct():Array<string>;
    resetBuilder():void;
}

class Product implements IBuilder{
    private product:Array<string> = [];
    getProduct(): Array<string> {
        const productCopy = [...this.product];
        this.resetBuilder();
        return productCopy;
    }
    resetBuilder(): void {
        this.product = [];
    }
    setProductDetails(name:ProductDetails){
        this.product.push(name);
    }
    [ProductDetails.Title]():void{
        this.setProductDetails(ProductDetails.Title);
    }
    [ProductDetails.description]():void{
        this.setProductDetails(ProductDetails.description);
    }
    [ProductDetails.image]():void{
        this.setProductDetails(ProductDetails.image);
    }
    [ProductDetails.price]():void{
        this.setProductDetails(ProductDetails.price);
    }
    [ProductDetails.category]():void{
        this.setProductDetails(ProductDetails.category);
    }
    [ProductDetails.rating]():void{
        this.setProductDetails(ProductDetails.rating);
    }
    [ProductDetails.addToCart]():void{
        this.setProductDetails(ProductDetails.addToCart);
    }
    [ProductDetails.viewDetails]():void{
        this.setProductDetails(ProductDetails.viewDetails);
    }
    [ProductDetails.remove]():void{
        this.setProductDetails(ProductDetails.remove);
    }
}