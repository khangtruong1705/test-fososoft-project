import React from 'react';
import { Popover } from 'antd';
import { Product } from '../../models/Product';
import styles from './CategoryItems.module.css'


let product1 = new Product('/asset/images/locgio2.png', 'Lọc Gió Động Cơ Air Filter-Chevolet', '299.000đ', '199.000', '-10%');
let product2 = new Product('/asset/images/locgio1.png', 'Lọc Gió Động Cơ Air Filter-Chevolet', '389.000đ', '199.000', '-21%');
let product3 = new Product('/asset/images/locgio4.png', 'Lọc Gió Động Cơ Air Filter-Chevolet', '699.000đ', '199.000', '-14%');
let product4 = new Product('/asset/images/locgio5.png', 'Lọc Gió Động Cơ Air Filter-Chevolet', '199.000đ', '199.000', '-16%');
const products = [product1, product2, product3, product4]

const categoriesDropdownContent = <div className={styles.categoriesDropdownContent}>
    <div className={`${styles.categoriesDropdownContentTop} row`}>
        {Array(6).fill('Bộ Lọc Gió').map((text, index) => (
            <div className='col-4' key={index}>
                <div className="  mb-3 card" >
                    <div className='card-body d-flex align-items-center'>
                        <img
                            style={{ width: '3vw' }}
                            src={process.env.PUBLIC_URL + '/asset/images/locgio.png'}
                            alt="icon"
                        />
                        <div style={{ fontSize: '0.9vw' }} className="ms-1">{text}</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    <hr></hr>
    <div className={styles.categoriesDropdownContentBottom}>
        <div className={styles.bestseller}>
            <div className={styles.bestsellerLeft} >Sản Phẩm Bán Chạy</div>
            <div className={styles.bestsellerRight}>
                <span>Xem tất cả</span>
                <i className="fa-solid fa-angles-right mx-1" />
            </div>
        </div>
        <div className='row'>
            {products.map((product, index) => (
                <div className='col-3' key={index}>
                    <div className={`${styles.bestsellerCard} card`}>
                        <div className={`${styles.bestsellerCardBody} card-body`}>
                            <img
                                src={process.env.PUBLIC_URL + product.image}
                                alt={product.name}
                            />
                            <p className={styles.bestsellerCardProductName}>{product.name}</p>
                            <div className={styles.bestsellerCardProductPrice}>{product.price}</div>
                            <div className={styles.bestsellerCardProductOldPrice}>
                                <span className={styles.bestsellerCardProductOldPriceChild}>
                                    {product.oldPrice}
                                </span>{' '}
                                <span className={styles.bestsellerCardProductDiscount}>{product.discount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
export const categoryChildren = [
    {
        key: '11',
        label: (
            <Popover content={categoriesDropdownContent} placement="right" trigger="hover">
                <span className={styles.menuLabel}>
                    <div className={styles.menuLabelContent}>
                        <img  src={process.env.PUBLIC_URL + '/asset/images/locgio.png'}></img>
                        <span>Bộ Lọc dầu</span>
                    </div>
                    <i className="fa-solid fa-angle-right" />
                </span>
            </Popover>
        ),
    },
    {
        key: '12',
        label: (
            <Popover content={categoriesDropdownContent} placement="right" trigger="hover">
                <span className={styles.menuLabel}>
                    <div className={styles.menuLabelContent}>
                        <img src={process.env.PUBLIC_URL + '/asset/images/locgio2.png'}></img>
                        <span>Bộ Lọc Không Khí</span>
                    </div>
                    <i className="fa-solid fa-angle-right" />
                </span>
            </Popover>
        ),
    },
    {
        key: '13',
        label: (
            <Popover content={categoriesDropdownContent} placement="right" trigger="hover">
                <span className={styles.menuLabel}>
                    <div className={styles.menuLabelContent}>
                        <img src={process.env.PUBLIC_URL + '/asset/images/locnhienlieu.png'}></img>
                        <span>Bộ Lọc Nhiên Liệu</span>
                    </div>
                    <i className="fa-solid fa-angle-right" />
                </span>
            </Popover>
        ),
    },
    {
        key: '14',
        label: (
            <Popover content={categoriesDropdownContent} placement="right" trigger="hover">
                <span className={styles.menuLabel}>
                    <div className={styles.menuLabelContent}>
                        <img src={process.env.PUBLIC_URL + '/asset/images/locgio6.jpg'}></img>
                        <span>Bộ Lọc Trong Cabin</span>
                    </div>
                    <i className="fa-solid fa-angle-right" />
                </span>
            </Popover>
        ),
    },
];

