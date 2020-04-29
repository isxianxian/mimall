/**
 * 封装storage
 */

const STORAGE_KEY = 'mall';
export default {
    // 获取Storage对象
    getStorage() {
        return JSON.parse((window.sessionStorage.getItem(STORAGE_KEY) || '{}'));
    },
    // 获取storage对象下的一个属性值 
    getItem(key, module) {
        if (module) {
            let val = this.getItem(module);
            return (val ? val[key] : '')
        }
        return this.getStorage()[key];
    },
    // 存储值
    setItem(key, value, module) {
        if (!module) {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        } else {
            let val = this.getItem(module);
            val[key] = value;
            this.setItem(module, val);
        }
    },
    // 清除
    clear(key, module) {
        let val = this.getStorage();
        if (module) {
            if (!val[module]) return;
            delete val[module][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
}
