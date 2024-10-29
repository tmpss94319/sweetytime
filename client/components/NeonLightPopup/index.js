import React, { useState, useEffect } from 'react';
import styles from '../NeonLightPopup/style.module.scss';

const NeonLightPopup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentImage, setCurrentImage] = useState('red');
    const [animationState, setAnimationState] = useState('entering'); //entering: 進入動畫/ entered: 已完成進入/ exiting: 退出動畫

    useEffect(() => {
        let interval;
        let closeTimeout;
        let animationTimeout;

        if (isOpen) {
            // 設置進入完成狀態
            animationTimeout = setTimeout(() => {
                setAnimationState('entered');
            }, 500); // 與 CSS 動畫時間相匹配

            // 設置圖片切換的計時器
            interval = setInterval(() => {
                setCurrentImage((prev) => prev === 'red' ? 'green' : 'red');
            }, 300);

            // 設置關閉時間
            closeTimeout = setTimeout(() => {
                setAnimationState('exiting');
                setTimeout(() => {
                    setIsOpen(false);
                }, 2000); // 等待退出動畫完成
            }, 3000);

            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (interval) clearInterval(interval);
            if (closeTimeout) clearTimeout(closeTimeout);
            if (animationTimeout) clearTimeout(animationTimeout);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className={`${styles["popup-overlay"]} ${styles[animationState]}`}
        >
            <div className={styles["popup-container"]}>
                <div className={styles["popup-content"]}>
                    <img 
                        src={currentImage === 'red' ? "/vector/neonLightRed.svg" : "/vector/neonLightGreen.svg"}
                        alt={`neon_light_${currentImage}`}
                        className={styles["popup-image"]}
                    />
                </div>
            </div>
        </div>
    );
};

export default NeonLightPopup;