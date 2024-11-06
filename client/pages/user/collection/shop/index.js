import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UserBox from '@/components/user/userBox';
import ShopCard from '@/components/shop/shopCard';
import Pagination from '@/components/pagination';
import Styles from '@/styles/user.module.scss';
import { FaSearch } from 'react-icons/fa';
import { withAuth } from '@/components/auth/withAuth';//引入登入檢查

function UserShop() {
	const mockShop = { shop_id: 1, name: '花磚甜點', logo: 'sugar_logo.png', fav: false };

	return (
		<>
			<Header />
			<UserBox>
				<div className="d-flex flex-column py-5 p-md-0 gap-3">
					<div className={`${Styles['TIL-search']} d-flex justify-content-center gap-2`}>
						<input type="text" className="px-3" placeholder="透過店家名稱搜尋" />
						<button className={`${Styles['TIL-Btn']} btn p-0`}>
							<FaSearch size={25} className={Styles['TIL-Fa']} />
						</button>
					</div>
					<div className="d-flex flex-row flex-wrap justify-content-center gap-5">
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
						<ShopCard
							shop={mockShop}
							onToggleFav={() => {}}
							initStateFav={mockShop.fav}
						/>
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
			</UserBox>
			<Footer />
		</>
	);
}
export default withAuth(UserShop);