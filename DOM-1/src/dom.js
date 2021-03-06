window.dom = {
    // 创建新节点
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    // 新增弟弟元素
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    // 新增哥哥元素
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    // 新增子节点
    append(parent, node) {
        parent.appendChild(node)
    },
    // 新增父亲节点
    wrap(node, parent) {
        dom.before(node,parent)
        dom.append(parent,node)
    },
    // 删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // 删除后代
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    // 读写属性（重载）
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 3) {
            node.getAttribute(name)
        }
    },
    // 读写文本内容(适配)
    text(node, string) {
        if (arguments.length === 2) {
          if ('innerText' in code) {
            node.innerText = string  //IE
        } else {
            node.textContent = string  //其他
        }  
      }else if (arguments.length === 1) {
            if ('innerText' in code) {
        return node.innerText
        } else {
        return node.textContent
        }  
      }      
    },
    // 读写HTML内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
           return node.innerHTML 
        }
    },
    // 修改style
    style(node, name,value) {
        if (arguments.length === 3) {
            node.style[name] = object[name]
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            }else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
        
    },
    // class
    Class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        contains(node, className) {
            return node.classList.contains(className)
        },
    },
    // 添加事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName,fn)
    },
    // 删除事件监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName,fn)
    },
    // 获取标签
    find(selector,scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // 获取父元素
    parent(node) {
        return node.parentNode
    },
    // 获取子元素
    children(node) {
        return node.childrenNode
    },
    // 获取兄弟元素
    siblings(node) {
        return Array.from(node.parentNode.children)
        .filter(n => n !== node)
    },
    // 获取下一个节点
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    // 获取上一个节点
    previous(node) {
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // 遍历所有节点
    each(nodeList,fn) {
        for (let i = 0; i < nodeList; i++){
            fn.call(null,nodeList[i])
        }
    },
    // 获取元素排行
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++){
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
