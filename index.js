#! node
const fs = require('fs');
const path = require("path");

let name = process.argv[2];
let workingDirectory = process.cwd();
let nameUpper = name.split('-').map((item) => {
	item = item.split('');
	item[0] = item[0].toUpperCase();
	return item.join('');
})
let nameCamel = name.split('-').map((item, index) => {
	if(index >= 1) {
		item = item.split('');
		item[0] = item[0].toUpperCase();
		return item.join('');
	}else {
		return item;
	}
})
nameUpper = nameUpper.join(''); // 首字母大写
nameCamel = nameCamel.join(''); // 驼峰命名
fs.mkdir(path.join(workingDirectory,`./${name}`), function(err) {
	if(err) throw err
	console.log(`创建${name}文件夹成功`);
	fs.writeFile(path.join(workingDirectory,`./${name}/${name}.html`),'','utf-8', function(err) {
		if(err) throw err
		console.log(`创建${name}.html文件成功`)
	})
	fs.writeFile(path.join(workingDirectory,`./${name}/${name}.less`),'','utf-8', function(err) {
		if(err) throw err
		console.log(`创建${name}.less文件成功`)
	})
	fs.readFile(path.join(__dirname, './template/tsxTemplate.tsx'), function(err,data) {
		if(err) throw err
		data = data.toString().replace(/\$\$\$/g, name);
		data = data.replace(/\$\$/g,nameUpper)
		fs.writeFile(path.join(workingDirectory,`./${name}/${name}.tsx`),data,'utf-8',function(err) {
			if(err) throw err
			console.log(`创建${name}.tsx文件成功`)
		})
	})
	fs.readFile(path.join(__dirname,'./template/interfaceTemplate.ts'), function(err, data) {
		if(err) throw err;
		data = data.toString().replace(/\$\$/g,nameUpper)
		fs.writeFile(path.join(workingDirectory,`./${name}/${name}.interface.ts`),data,'utf-8',function(err){
			if(err) throw err;
			console.log(`创建${name}.interface.ts文件成功`)
		})

	})
	fs.readFile(path.join(__dirname,'./template/serviceTemplate.tsx'), function(err, data) {
		if(err) throw err;
		data = data.toString().replace(/\$\$/g,nameUpper)
		fs.writeFile(path.join(workingDirectory,`./${name}/${name}.service.tsx`),data,'utf-8',function(err){
			if(err) throw err;
			console.log(`创建${name}.service.ts文件成功`)
		})

	})
	fs.readFile(path.join(__dirname,'./template/helperTemplate.ts'), function(err, data) {
		if(err) throw err;
		data = data.toString().replace(/\$\$/g,nameCamel)
		fs.writeFile(path.join(workingDirectory,`./${name}/${name}.helper.ts`),data,'utf-8',function(err){
			if(err) throw err;
			console.log(`创建${name}.helper.ts文件成功`)
		})

	})
// 	fs.writeFile(path.join(__dirname,`./${name}Component/${nameCamel}Obj.interface.ts`))

})