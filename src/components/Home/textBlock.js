import '../Home/Home.css';
import Footer from '../Hero/Footer';

function TextBlock() {
    const handleButtonClick = () => {
        window.location.href = '/products'; // Điều hướng đến trang /products
    };

    return (
        <div id="textblock">
            <div id="textblock-container">
                <h1 id="textblock-title">Welcome to Food Detection</h1>
                <p id="textblock-content">
                    Discover the power of AI in recognizing various food items.<br /><br />
                    Our cutting-edge technology allows you to simply upload a photo of your meal, and within seconds, you'll get detailed information about the food items present.<br /><br />
                    Whether you're curious about the nutritional content, or you want to impress your friends with your food knowledge, our application provides fast and accurate results.<br /><br />
                    Ready to start your food journey? Upload an image now and let us do the rest!
                </p>
                {/* Button Giỏ Hàng */}
                <button className="cart-button" onClick={handleButtonClick}>
                    Explore Products
                </button>
            </div>
            <Footer />
        </div>
    );
}


export default TextBlock;
