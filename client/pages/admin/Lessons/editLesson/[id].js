import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import styles from '@/styles/adminLesson.module.scss';
import AdminThemeProvider from '../../adminEdit';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditLesson(props) {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState([]);
	const [type, setType] = useState([]);
	const [selectType, setSelectType] = useState(''); // 預設值設為空
	const [selectTeacher, setSelectTeacher] = useState(0); // 預設值設為0
	const [teacher, setTeacher] = useState([]);
	const [status, setStatus] = useState(0); // 預設值設為0
	const [time, setTime] = useState(''); // 預設值設為空
	const [lessonName, setLessonName] = useState('');
	const [lessonPrice, setLessonPrice] = useState('');
	const [classroom, setClassroom] = useState('');
	const [location, setLocation] = useState('');
	const [selectedImage, setSelectedImage] = useState(null); // 用於保存選中的新照片
	const [previewImage, setPreviewImage] = useState(''); // 預覽照片

	const editorRef = useRef(null);
	const handleChangeType = (event) => {
		setSelectType(event.target.value);
	};
	const handleChangeTea = (event) => {
		setSelectTeacher(event.target.value);
	};
	const handleChangeSta = (event) => {
		setStatus(event.target.value);
	};

	const handleEdit = (e) => {
		const file = e.target.files[0];

		if (file) {
			setSelectedImage(file);
			setPreviewImage(URL.createObjectURL(file)); // 創建預覽URL
		}
	};

	const handleUpload = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('photo', selectedImage);
		axios
			.post(`http://localhost:3005/api/lesson/admin/upload/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => console.log('更新照片成功'))
			.catch((error) => console.error('更新照片失敗', error));
	};

	const handleTime = (event) => {
		setTime(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // 防止頁面刷新
		const formData = {
			lessonName,
			selectType,
			selectTeacher,
			lessonPrice,
			time,
			classroom,
			location,
			status,
			description: editorRef.current?.getContent(),
		};
		axios
			.post(`http://localhost:3005/api/lesson/admin/update/${id}`, formData)
			.then((res) => console.log('更新成功'))
			.catch((error) => console.error('更新資料失敗', error));
		router.push(`../viewLesson/${id}`);
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3005/api/lesson/${id}`)
			.then((res) => setData(res.data))
			.catch((error) => console.error('拿不到資料', error));
	}, [id]);

	useEffect(() => {
		axios
			.get(`http://localhost:3005/api/lesson/teacher`)
			.then((res) => setTeacher(res.data))
			.catch((error) => console.error('拿不到講師資料', error));
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:3005/api/lesson/type`)
			.then((res) => setType(res.data))
			.catch((error) => console.error('拿不到類別資料', error));
	}, []);

	useEffect(() => {
		if (data.lesson && data.lesson.length > 0) {
			setLessonName(data.lesson[0].name);
			setLessonPrice(data.lesson[0].price);
			setClassroom(data.lesson[0].classroom_name);
			setLocation(data.lesson[0].location);
			setSelectType(data.type[0].id); // 設定預設類別
			setSelectTeacher(data.lesson[0].teacher_id); // 設定預設講師
			setStatus(data.lesson[0].activation); // 設定課程狀態
			setTime(data.lesson[0].start_date); // 設定時間
		}
	}, [data]);

	return (
		<>
			{data.lesson ? (
				<AdminThemeProvider>
					<AdminLayout>
						{data.lesson.length > 0 ? (
							<div className="container">
								<div className="d-flex flex-column">
									<Image
										src={
											previewImage ||
											`/photos/lesson/${data.lesson[0]?.img_path}`
										}
										width={450}
										height={350}
										className="m-auto"
										style={{ objectFit: 'contain', borderRadius: '25px' }}
									/>
									<div className="m-auto">
										<Button
											variant="contained"
											className="m-2"
											component="label"
											sx={{
												color: '#FFF',
												background: '#fe6f67',
											}}
										>
											<input
												type="file"
												hidden
												accept="image/*"
												onChange={handleEdit}
											/>
											更新照片
										</Button>
										<Button
											variant="contained"
											className="m-2"
											component="label"
											onClick={handleUpload}
											sx={{
												color: '#FFF',
												background: '#fe6f67',
											}}
										>
											確認上傳
										</Button>
									</div>
								</div>
								<form onSubmit={handleSubmit}>
									<Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} m={2}>
										<TextField
											label="標題"
											name="name"
											value={lessonName}
											className={styles.formControlCustom}
											fullWidth
											size="small"
											onChange={(e) => setLessonName(e.target.value)} // 更新資料
										/>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												類別
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={
													selectType == '' ? data.type[0].id : selectType
												}
												label="type"
												onChange={handleChangeType}
												size="small"
											>
												{type.map((name) => (
													<MenuItem value={name.id} key={name.id}>
														{name.class_name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												講師
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={
													selectTeacher == ''
														? data.teacher[0].id
														: selectTeacher
												}
												label="teacher"
												onChange={handleChangeTea}
												size="small"
											>
												{teacher.map((tea, index) => (
													<MenuItem value={index + 1} key={index}>
														{tea.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField
											label="價錢"
											name="price"
											value={lessonPrice}
											className={styles.formControlCustom}
											onChange={(e) => setLessonPrice(e.target.value)} // 更新資料
											fullWidth
											size="small"
										/>
										<div className={styles['CTH-timePicker']}>
											<h5>時間</h5>
											<input
												type="datetime-local"
												className={styles['CTH-input']}
												name="updateTime"
												placeholder={data.lesson[0].start_date}
												value={
													time == '' ? data.lesson[0].start_date : time
												} // 預設值設為空
												onChange={handleTime}
											/>
										</div>
										<TextField
											label="地點"
											name="classroom"
											value={classroom}
											className={styles.formControlCustom}
											fullWidth
											size="small"
											onChange={(e) => setClassroom(e.target.value)} // 更新資料
										/>
										<TextField
											label="地址"
											name="location"
											value={location}
											className={styles.formControlCustom}
											fullWidth
											size="small"
											onChange={(e) => setLocation(e.target.value)}
										/>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												狀態
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={status}
												label="status"
												onChange={handleChangeSta}
												size="small"
											>
												<MenuItem value={1}>上架中</MenuItem>
												<MenuItem value={0}>下架</MenuItem>
											</Select>
										</FormControl>
									</Box>

									<div
										className={`${styles['CTH-class-info']} d-flex flex-column`}
									>
										<h2 className="pt-2">課程介紹</h2>
										<Editor
											apiKey="cfug9ervjy63v3sj0voqw9d94ojiglomezxkdd4s5jr9owvu"
											onInit={(evt, editor) => (editorRef.current = editor)}
											initialValue={data.lesson[0].description}
											init={{
												menubar: false,
												plugins: [
													'advlist autolink lists link image charmap print preview anchor',
													'searchreplace visualblocks code fullscreen',
													'insertdatetime media table paste code help wordcount',
												],
												toolbar:
													'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
											}}
										/>
										<Link href={`../viewLesson/${id}`} className="ms-auto mt-2">
											<Button
												variant="contained"
												onClick={handleSubmit}
												sx={{
													color: '#fff',
													background: '#fe6f67',
												}}
											>
												完成編輯
											</Button>
										</Link>
									</div>
								</form>
							</div>
						) : (
							''
						)}
					</AdminLayout>
				</AdminThemeProvider>
			) : (
				''
			)}
		</>
	);
}
