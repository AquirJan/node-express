const fs = require('fs');
const path = require('path')
// Date.prototype.format = function (fmt) {
//   var o = {
//     'M+': this.getMonth() + 1, //月份
//     'd+': this.getDate(), //日
//     'h+': this.getHours(), //小时
//     'm+': this.getMinutes(), //分
//     's+': this.getSeconds(), //秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), //季度
//     S: this.getMilliseconds(), //毫秒
//   }
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
//   for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
//   return fmt
// }

function deleteFolder(options) {
  return new Promise(resolve => {
    let _opt = Object.assign({ folderPath: 'tmp', recursive: true, startTime: null, endTime: null }, options)
    const _folderPath = path.resolve(_opt.folderPath)
    if (fs.existsSync(_folderPath)) {
      const _list = fs.readdirSync(_folderPath)
      if (_opt.recursive) {
        // 递归删除方式
        // console.log('递归删除方式')
        _list.forEach(val => {
          deleteAction(path.resolve(_folderPath, val), _opt)
        })
      } else {
        // 非递归删除方式
        // console.log('非递归删除方式')
        _list.forEach(val => {
          const _path = path.resolve(_folderPath, val)
          if (fs.existsSync(_path)){
            let _flag = true;
            const _stat = fs.statSync(_path);
            // console.log(_path)
            // console.log(_stat)
            // 文件删除
            if (!_stat.isDirectory()) {
              _flag = false
            }
            // console.log('文件删除')
            if (_opt.startTime && _opt.startTime < _stat.birthtime) {
              _flag = false
            }
            if (_opt.endTime && _opt.endTime >= _stat.birthtime) {
              _flag = false
            }
            if (_flag) {
              // fs.unlinkSync(_path)
            }
          } else {
            console.log('没有该文件')
          }
        })
      }
    } else {
      console.log('指定目录不存在')
    }
  })
}
// 执行删除动作方法时，先判断文件是否存在
function deleteAction(_path, opt) {
  const _stat = fs.statSync(_path);
  if (fs.statSync(_path).isDirectory()){
    // 目录删除
    if (fs.existsSync(_path)) {
      const _list = fs.readdirSync(_path)
      if (_list && _list.length) {
        // console.log('非空目录删除')
        deleteFolder({
          folderPath: _path
        })
        fs.rmdirSync(_path)
      } else {
        // console.log('空目录删除')
        fs.rmdirSync(_path)
      }
    } else {
      console.log(`${_path} 目录不存在`)
    }
  } else {
    // 文件删除
    // console.log('文件删除')
    let _flag = true;
    if (opt.startTime && opt.startTime < _stat.birthtime) {
      _flag = false;
    }
    if (opt.endTime && opt.endTime >= _stat.birthtime) {
      _flag = false;
    }
    if (fs.existsSync(_path) && _flag) {
      fs.unlinkSync(_path)  
    } else {
      console.log(`${_path} 文件不存在`)
    }
  }
}

deleteFolder({folderPath:'tmp'})