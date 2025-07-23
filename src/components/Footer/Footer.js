import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();
    return <div>
        <div className={styles.topFooter}>
            <div className={styles.topFooterContent}>
                <div className={styles.topFooterLeft}>
                    <i className="fa-solid fa-map-location-dot me-2" />
                    <span>Xem hệ thống 88 cửa hàng trên toàn quốc</span>
                </div>
                <div className={styles.topFooterRight}>
                    Xem ngay
                    <i className="fa-solid fa-arrow-right mx-2" />
                </div>
            </div>
        </div>
        <div className={styles.footerMain} >
            <div className={styles.topFooterContent}>
                <div>
                    <p style={{ fontSize: '0.9vw' }} className={styles.footerTitle}>VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY</p>
                    <div>Tax code: <strong>0305094228</strong></div>
                    <div>Address: <strong>13 Nghia Thuc, Ward 05, Distric 5, Ho Chi Minh City, Viet Nam.</strong></div>
                    <div>Phone number: <strong>0283 760 7607</strong></div>
                    <div>Opening hour: <strong>09:00 - 22:00 from Mon - Fri</strong></div>
                    <img className='mt-5' style={{width:'10vw' }} src={process.env.PUBLIC_URL + '/asset/images/bocongthuong.png'}></img>
                </div>
                <div>
                    <p className={styles.footerTitle}>Sitemap</p>
                    <p>About</p>
                    <p>Cart</p>
                    <p>Contact</p>
                </div>
                <div>
                    <p className={styles.footerTitle}>Legal</p>
                    <p><strong>__ Privacy Policy</strong></p>
                    <p>Cookie Policy</p>
                    <p>Delivery Policy</p>
                    <p>FAQs</p>
                </div>
                <div>
                    <p className={styles.footerTitle}>Dowload App</p>
                    <div className={styles.footerGoogleApp}>
                        <i style={{fontSize:'1.5vw'}} className="fa-brands fa-google-play mx-2" />
                        <div>
                            <div style={{fontSize:'0.7vw'}}>Get It On</div> 
                            <div>Google Play Store</div>
                        </div>
                    </div>
                    <div className={styles.footerAppleApp}>
                        <i style={{fontSize:'1.5vw'}} className="fa-brands fa-apple mx-2" />
                        <div>
                            <div style={{fontSize:'0.7vw'}}>Download From</div>
                            <div>Apple App Store</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
};

export default Footer;