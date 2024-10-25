import React from 'react';
import styles from '@/components/shop/banner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Banner() {
	const area = '地區';
	const sort = '排序';
	const areaItems = [
		'北投區',
		'士林區',
		'大同區',
		'中山區',
		'松山區',
		'內湖區',
		'萬華區',
		'中正區',
		'大安區',
		'信義區',
		'南港區',
		'文山區',
	];

	return (
		<div className={`${styles['TIL-benner']}`}>
			<picture>
				<source
					media="(min-width: 1920px)"
					srcSet="/photos/background/bg-shop-banner.png"
				/>
				<source
					media="(max-width: 375px)"
					srcSet="/photos/background/bg-shop-benner-phone.png"
				/>
				<img
					src="/photos/background/bg-shop-banner.png"
					alt="Shop Banner"
					className={styles['TIL-Image']}
				/>
			</picture>
			<h2>Parner精選商家</h2>
			<div className={styles['TIL-filter']}>
				<div
					className="w-100 filter-box d-flex justify-content-center gap-md-3 gap-sm-1 p-md-3 p-sm-1"
				>
					<input
						type="text"
						className={`${styles['CTH-keywords']}`}
						id="keywords"
						placeholder="關鍵字"
					/>
					<select
						className={`${styles['TIL-form-select']} d-none d-sm-block`}
						aria-label="Default select example"
					>
						<option disabled defaultValue={area}>{area}</option>
						{areaItems.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
					<select
						className={`${styles['TIL-form-select']} d-none d-sm-block`}
						aria-label="Default select example"
					>
						<option disabled defaultValue={sort}>{sort}</option>
						<option value="asc">A-Z</option>
						<option value="desc">Z-A</option>
					</select>
					<button className={`${styles['TIL-search']} d-block d-sm-none`}>
						<FontAwesomeIcon icon={faFilter} className={styles['TIL-icon']} />
					</button>
					<button className={styles['TIL-search']}>
						<FontAwesomeIcon icon={faMagnifyingGlass} className={styles['TIL-icon']} />
					</button>
				</div>
			</div>
		</div>
	);
}