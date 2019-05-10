const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = express();
const upload = multer({
	dest: 'upload/',
});

app.use(bodyParser.json());
app.use(express.static(resolve('../dist')));

function resolve(dir) {
	return path.join(__dirname, dir);
}

app.get('/api/userInfo', (req, res) => {
	res.json({
		succeed: true,
		errorCode: '0000000',
		errorMessage: '成功',
		data: {
			username: 'hulei',
			qq: '123456',
		},
	});
});

app.post('/api/userInfo', (req, res) => {
	res.json({
		succeed: true,
		errorCode: '0000000',
		errorMessage: '成功',
		data: null,
	});
});

app.post('/api/upload', upload.single('file'), (req, res) => {
	const file = req.file;

	console.log('文件类型：%s', file.mimetype);
	console.log('原始文件名：%s', file.originalname);
	console.log('文件大小：%s', file.size);
	console.log('文件保存路径：%s', file.path);
	res.json({
		succeed: true,
		errorCode: '0000000',
		errorMessage: '成功',
		data: null,
	});
});

app.listen(7878, () => {
	console.log('listem on 7878 o(*￣︶￣*)o');
});
