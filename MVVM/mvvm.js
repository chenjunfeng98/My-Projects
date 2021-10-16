class MVVM {
    constructor(options){
        this.$options = options
        this.data = this.$options.data;
        let el = this.$options.el;
        observe(this.data);
        for(let key in this.data){
            Object.defineProperty(this,key,{
                get(){
                    return this.data[key];
                },
                set(newVal){
                   return  this.data[key] = newVal;
                }
            })
        }
        Complie(el,this)
    }



}
//数据劫持
function observe(data){
    let dep = new Dep();
    for(let key in data){
        let Val = data[key];
        if(Val !== null && typeof Val === 'object'){
            observe(Val);
        }
        Object.defineProperty(data,key,{
            get(){
                Dep.target && dep.addsub(Dep.target)
                return Val
            },
            set(newVal){
                if(newVal === Val){
                    return
                }
                Val = newVal;
                if(Val !== null && typeof Val === 'object'){
                    observe(Val);
                };
                dep.notify()
            }
        })
    }
}
//模板编译
function Complie(el,vm){
    //获取节点
    let vmel = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while(child = vmel.firstChild){
        fragment.appendChild(child);
    };
    replace(fragment)
        //循环匹配el中的子节点
    function replace(fragment){
        Array.from(fragment.childNodes).forEach(node=>{
            let text = node.textContent;
            let re = /\{\{(.*)\}\}/
            if(node.nodeType === 3 && re.test(text)){
                //替换数据
                let arr = RegExp.$1.split('.');
                let Val = vm;
                arr.forEach(key=>{ //获取{a:{a:1}}中的1
                    Val = Val[key];
                });
                new Watcher(vm,RegExp.$1,(newVal)=>{
                    node.textContent = text.replace(/\{\{(.*)\}\}/,newVal);
                    
                })
                node.textContent = text.replace(re,Val);

            };
            if(node.childNodes){
                replace(node)
            }
        })
    } 
    //挂载
    vmel.appendChild(fragment)
}

//发布与订阅

class Dep {
    constructor(){
        this.subs = []
    }
    //订阅
    addsub(fn){
        this.subs.push(fn)
    }

    notify(){
        this.subs.forEach(sub=>sub.update())
    }
}

class Watcher {
    constructor(vm,exp,fn){
        this.fn = fn;
        this.exp = exp;//作用于update()[a.a]
        this.vm = vm;//作用于update()
        Dep.target = this;
        let val = vm;
        let arr = exp.split('.');
        arr.forEach(key=>{
            val = val[key]
        });
        Dep.target = null;
    }
    update(){
        let val = this.vm;//赋新值操作
        let arr = this.exp.split('.');
        arr.forEach(key=>{//获取对应的新的data值
            val = val[key]
        });
        this.fn(val)
    }
}


