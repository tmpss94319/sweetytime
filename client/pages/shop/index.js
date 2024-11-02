import React, { useState } from 'react';
import Header from '@/components/header';
import styles from '@/styles/shop.module.scss';
import ShopCard from '@/components/shop/shopCard';
import Banner from '@/components/shop/banner';
import Footer from '@/components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '@/components/pagination';
import ShopSidebar from '@/components/shopSidebar';

export default function Index() {
	const shops = [
		{ shop_id: 1, name: '花磚甜點', logo: 'sugar_logo.png' },
		{ shop_id: 2, name: '稍甜 SYRUP LESS', logo: 'SYRUP_LESS_logo.png' },
		{ shop_id: 3, name: '吃吃喝喝MAISONGOURMANDE', logo: 'Maison_Gourmande_logo.jpg' },
		{ shop_id: 4, name: '艾波索 法式甜點', logo: 'Aposo_logo.png' },
		{ shop_id: 5, name: 'iFcake 如菓蛋糕', logo: 'iFcake_logo.jpg' },
		{ shop_id: 6, name: 'la vie bonbon 中山旗艦店', logo: 'laviebonbon_logo.jpg' },
		{ shop_id: 7, name: '橘村屋', logo: 'kitsumuraya_logo.jpg' },
		{ shop_id: 8, name: '羊毛與花．光點', logo: 'youmoutoohana_Coffee.logo.jpg' },
		{ shop_id: 9, name: 'Lidée Sweet 時甜(敦化店)', logo: 'SEASON_Artisan_Pâtissier_logo.jpg' },
		{ shop_id: 10, name: '法點法食FADENFASAï', logo: 'FADENFASAï_logo.png' },
		{ shop_id: 11, name: '點冰室·ジャビン', logo: 'Give_Cold_Bird_logo.jpg' },
		{ shop_id: 12, name: '金雞母Jingimoo', logo: '法國主廚的甜點Nosif_logo.jpg' },
		{ shop_id: 13, name: '果昂甜品', logo: 'ami_logo.jpg' },
		{ shop_id: 14, name: '倉鼠甜點工作室', logo: 'chessmate_logo.jpg' },
		{ shop_id: 15, name: 'Miss V Bakery Cafe', logo: 'ladyM_logo.png' },
		{
			shop_id: 16,
			name: 'Monsieur Pierre皮耶先生•手作烘焙 晴光店',
			logo: 'Patisserie_Mon_Coeur_logo.jpg',
		},
		{ shop_id: 17, name: 'CrewsDessert空服員的手作甜點', logo: 'mpapa_logo.png' },
		{ shop_id: 18, name: '歐卡諾諾 `O ka roll roll', logo: 'TokyoParisDessert_logo.png' },
		{ shop_id: 19, name: 'bonniesugar手作甜點專門店', logo: 'mosaicPastry_logo.jpg' },
		{ shop_id: 20, name: 'Chizup!', logo: 'Jingimoo_logo.png' },
	];

	// 收藏邏輯
	const initStateFav = shops.map((shop) => ({ ...shop, fav: false }));
	const [favoriteIcon, setFavoriteIcon] = useState(initStateFav);

	const handleToggleFav = (id) => {
		setFavoriteIcon(
			favoriteIcon.map((shop) => (id === shop.shop_id ? { ...shop, fav: !shop.fav } : shop))
		);
	};

	return (
		<>
			<Header />
			<div className="TIL-banner">
				<Banner />
			</div>
			<div className={`${styles['TIL-body']} my-5 d-flex flex-column container gap-5`}>
				<div className="row">
					<div className="col-md-auto d-none d-xl-block p-0">
						<ShopSidebar />
					</div>
					<div className="mt-md-2 d-flex flex-wrap g-3 col-12 col-md-9 m-auto px-4 p-md-0">
						{favoriteIcon.map((s) => (
							<div className="col-6 col-sm-6 col-md-4 col-lg-3 p-0" key={s.shop_id}>
								<ShopCard
									shop={s}
									onToggleFav={handleToggleFav}
									initStateFav={s.fav}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="m-auto">
					<Pagination
						currentPage={1}
						totalPages={5}
						onPageChange={() => {}}
						changeColor="#fe6f67"
					/>
				</div>
			</div>
			<Footer />
		</>
	);
}
