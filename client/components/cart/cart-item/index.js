import React, { useState, useEffect } from 'react';
import sty from './cart-item.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { Icon, Checkbox, Button, IconButton, DeleteIcon } from '@mui/material';
import { useCart } from '@/context/cartContext';

export default function CartItem({
	src = '尚未傳入圖片src',
	name = '品名?',
	price = '價格?',
	count = '數量?',
	pid = '產品pid?',
	selected = false,
}) {
	// const [quantity, setQuantity] = useState(1);
	const { cart, setCart, handleCart } = useCart();

	useEffect(() => {
		//從資料庫取得個別產品的資訊並放入變數中
	});

	return (
		<div className="container-fluid py-2">
			<div className="row px-0 px-lg-2">
				{/* 勾選區 */}
				<div className="col-1 ZRT-center">
					<Checkbox
						checked={selected}
						sx={{ color: '#fe6f67', '&.Mui-checked': { color: '#fe6f67' } }}
						onClick={() => {
							setCart(handleCart(cart, pid, 'toggleSingleSelected'));
						}}
					/>
				</div>

				{/* 圖示區 */}
				<div className="col-2 align-content-center">
					<Link href={`product/${pid}`}>
						<Image
							src="/photos/products/00_ChizUp_cheesecake.jpg"
							height={200}
							width={200}
							style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
							alt={name}
						/>
					</Link>
				</div>

				{/* 品名價格區 */}
				<div className="col col-lg nameAndPrice container">
					<div className="row h-100">
						<div className="col-12 col-lg-7 align-content-center ">
							<h4 className="name m-0">{name}</h4>
						</div>
						<div className="col-12 col-lg-5 align-content-center text-danger">
							<h3 className="price m-0">$NT{price}</h3>
						</div>
					</div>
				</div>

				{/* 數量區 */}
				<div className="col-3 col-lg-2 ZRT-center">
					<div
						className={`${sty['ZRTRButton']} ZRT-center ZRT-click`}
						onClick={() => {
							// setQuantity(quantity - 1);
							setCart(handleCart(cart, pid, 'decrease'));
						}}
					>
						<FaMinus />
					</div>
					<div className={`${sty['ZRTCount']}`}>{count}</div>
					<div
						className={`${sty['ZRTRButton']} ZRT-center ZRT-click`}
						onClick={() => {
							// setQuantity(quantity + 1);
							setCart(handleCart(cart, pid, 'increase'));
						}}
					>
						<FaPlus />
					</div>
				</div>

				{/* 刪除區 */}
				<div className={`${sty['ZRTDelButton']} col-2 ZRT-center`}>
					<FaTrash
						className="ZRT-click"
						onClick={() => {
							setCart(handleCart(cart, pid, 'delete'));
						}}
					/>
				</div>
			</div>
		</div>
	);
}
