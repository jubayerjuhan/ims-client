import React from 'react'
import './ChahidaHome.css'
import bannerImg from './images/flyer-01.jpg'
import rice1 from './images/rice/1.jpg'
import rice2 from './images/rice/2.jpg'
import rice3 from './images/rice/3.jpg'
import rice4 from './images/rice/4.jpg'
import rice5 from './images/rice/5.jpg'
import rice6 from './images/rice/6.jpg'
import rice7 from './images/rice/7.jpg'
import rice8 from './images/rice/8.jpg'
import rice9 from './images/rice/9.jpg'
import rice10 from './images/rice/10.jpg'
import artboard2 from './images/Artboard 2.png'
// import login1 from './images/'
const ChahidaHome = () => {
  return (
    <>
      <div class="header">
        <div class="container">
          <div class="logo">
            <img src="images/Artboard 2.png" alt="" />
          </div>
          <nav class="nav">
            <input type="checkbox" name="" id="check" />
            <label for="check" class="checkbtn">
              <i class="fas fa-bars"></i>
            </label>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">Category <i class="fas fa-angle-down"></i></a>
                <ul class="sub-menu">
                  <li><a href="">কাটারি (প্রিমিয়াম)</a></li>
                  <li><a href="">কাটারি (রেগুলার)</a></li>
                  <li><a href="">মিনিকেট</a></li>
                  <li><a href="">ঢেঁকি ছাটা চাল</a></li>
                  <li><a href="">নাজির শাইল</a></li>
                  <li><a href="">বি আর-২৮</a></li>
                  <li><a href="">বি আর-২৯</a></li>
                  <li><a href="">চিনিগুড়া</a></li>
                  <li><a href="">বাঁশফুল</a></li>
                  <li><a href="">গুটি</a></li>
                </ul>
              </li>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* banner */}

      <div class="banner-section">
        <div class="container">
          <div class="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
      </div>

      {/* secion */}
      <section class="product-scrtion">
        <div class="container">
          <div class="new-div sectionPadding">
            <h2>New Items</h2>
            <div class="new-items-section ">
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img1" onmousemove="nextImg1()" onmouseout="prevImg1()"
                    src={rice1} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Mayonnais"Hinatamakokko"</p>
                  </a>
                  <a href=""><button>Add to cart</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img2" onmousemove="nextImg2()" onmouseout="prevImg2()"
                    src={rice2} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Miyagi Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise "Premium"</p>
                  </a>
                  <a href=""><button>Add to cart</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img3" onmousemove="nextImg3()" onmouseout="prevImg3()"
                    src={rice3} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise "Chili pepper"</p>
                  </a>
                  <a href=""><button>Add to cart</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img4" onmousemove="nextImg4()" onmouseout="prevImg4()"
                    src={rice4} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise"</p>
                  </a>
                  <a href=""><button>Add to cart</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img5" onmousemove="nextImg5()" onmouseout="prevImg5()"
                    src={rice5} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[NAGAO]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Ceramic grill net"</p>
                  </a>
                  <a href=""><button>Add to cart</button></a>
                </div>
              </div>
            </div>
          </div>
          <div class="rice-div sectionPadding">
            <h2>Rice/Multigrain</h2>
            <div class="new-items-section">
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img6" onmousemove="nextImg6()" onmouseout="prevImg6()"
                    src={rice6} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Mayonnais"Hinatamakokko"</p>
                  </a>
                  <a href=""><button>Show options</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""> <img id="img7" onmousemove="nextImg7()" onmouseout="prevImg7()"
                    src={rice7} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Miyagi Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise "Premium"</p>
                  </a>
                  <a href=""><button>Show options</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img8" onmousemove="nextImg8()" onmouseout="prevImg8()"
                    src={rice8} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise "Chili pepper"</p>
                  </a>
                  <a href=""><button>Show options</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img9" onmousemove="nextImg9()" onmouseout="prevImg9()"
                    src={rice9} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[Sun Farm]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Handmade mayonnaise"</p>
                  </a>
                  <a href=""><button>Show options</button></a>
                </div>
              </div>
              <div class="product-item">
                <div class="product-img">
                  <a href=""><img id="img10" onmousemove="nextImg10()" onmouseout="prevImg10()"
                    src={rice10} alt="" /></a>
                </div>
                <div class="product-content">
                  <a href="">
                    <p class="product-name">[NAGAO]</p>
                  </a>
                  <span class="taka"><img src="./images/taka.png" alt="" /> 10.99</span>
                  <a href="">
                    <p class="product-ditels">Ceramic grill net"</p>
                  </a>
                  <a href=""><button>Show options</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer-section">
        <div class="container">
          <div class="footer-content">
            <div class="input-and-social">
              <form action="">
                <input type="email" placeholder="Email address" />
                <button class="footer-btn">Subscribe</button>
              </form>
              <div class="footer-social">
                <a href=""><i class="fab fa-facebook-square"></i></a>
                <a href=""><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <div class="footer-content-items">
              <div class="footer-logo">
                <img src={artboard2} alt="" />
              </div>
              <div class="address-items">
                <p class="address">Address</p>
                <p>Hospital Road, Basurhat Companiganj</p>
                <p>(123) 456 7890</p>
                <p class="business">Business Hours</p>
                <p>Mon - Sat: 10am - 6pm</p>
                <p>Sun: 10am - 5pm</p>
              </div>
              <div class="footer-text-item">
                <a href="">Tips</a>
                <a href="">Blog (News)</a>
                <a href="">Our Company</a>
                <a href="">Rectuit</a>
                <a href="">For Commercial</a>
              </div>
              <div class="footer-text-item">
                <a href="">Shipping Policy</a>
                <a href="">Refund Policy</a>
                <a href="">Terms of Service</a>
                <a href="">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div class="copyright-content-item">
            <div class="copyright-text">
              <p>Copyright &copy; 2022 Chahida.com</p>
            </div>
            <div class="bank-card">
              <img src={require("./images/Login_01.jpg")} alt="" />
              <img src={require("./images/Login_02.jpg")} alt="" />
              <img src={require("./images/Login_03.jpg")} alt="" />
              <img src={require("./images/Login_04.jpg")} alt="" />
              <img src={require("./images/Login_05.jpg")} alt="" />
              <img src={require("./images/Login_06.jpg")} alt="" />
              <img src={require("./images/Login_07.jpg")} alt="" />
              <img src={require("./images/Login_08.jpg")} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ChahidaHome