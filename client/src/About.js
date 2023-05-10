import React from "react";
import './css/About.css';
// import about from "../images/about.png";
// import about2 from "../images/about2.png";
// import about3 from "../images/about3.webp";
import { Container } from "react-bootstrap";


const About = () => {
    return (
        <>
            <div className="about-us-container">
                <Container className="about-us">
                    <div style={{ backgroundImage: 'url(https://sparkle-home-s3.s3.amazonaws.com/maid/about.jpg)' }} className="main bg_img">
                        <br />
                        <h1>About Us</h1>
                    </div>
                    <br />

                    <h4>Welcome to  Sparkle Home</h4>
                    <br />
                    <p>We are a socially conscious e-commerce platform that offers a wide variety of pre-owned items for sale.</p>
                    <p>At Sparkle Home, we understand that a clean and organized environment is vital to one's well-being, productivity, and comfort. That is why we have made it our mission to help our clients achieve this through our comprehensive cleaning services.
                        <br /> Our team of experienced and skilled cleaners is dedicated to delivering exceptional cleaning services that meet and exceed our clients' expectations. We use only the best cleaning tools and products to ensure that your space is left sparkling clean and free of any harmful germs and bacteria.
                    </p>
                    <div style={{ backgroundImage: 'url(https://sparkle-home-s3.s3.amazonaws.com/maid/about2.jpg)' }} className="about2-img bg_img">
                    </div>
                    <p>We offer a wide range of cleaning services to cater to our clients' needs, including regular house cleaning, deep cleaning, move-in/move-out cleaning, office cleaning, and commercial cleaning. Our services are tailored to suit your specific needs and schedule, ensuring that we provide maximum convenience and flexibility.</p>
                    <p>At Sparkle Home, we believe in building long-lasting relationships with our clients. We take pride in our professionalism, reliability, and attention to detail, and we strive to provide exceptional customer service that exceeds our clients' expectations.</p>
                    <p>Thank you for choosing Sparkle Home as your cleaning service provider. We look forward to working with you to make your space sparkle and shine!</p>
                    <div style={{ backgroundImage: 'url(https://sparkle-home-s3.s3.amazonaws.com/maid/about3.jpg)' }} className="about3-img bg_img">
                    </div>
                    <div>
                        <br />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default About;