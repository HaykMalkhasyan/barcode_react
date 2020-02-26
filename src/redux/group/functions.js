export function openMenu(arr,id,key,value=false){
    arr.forEach(function(current, index){
        if(current.id===id){
            current[key] = !current[key]
        }else{
            if(current.child){
                openMenu(current.child,id,key)
            }
        }
    })
    return arr;
}

export function addElement(arr,element){
    if(element.parent_id ===0){
        arr.push(element)
    }else{
        arr.forEach(function(current, index){
            if(current.id===element.parent_id) {
                if(!arr[index].child){
                    arr[index].child = []
                }
                arr[index].child.push(element)
                arr[index].open = true

            }else{
                if(current.child){
                    addElement(current.child,element)
                }
            }
        })
    }
    return arr;
}
export function editElement(arr,element){
    arr.forEach(function(current, index){
        if(current.id===element.id) {
            for (let key in element){
                current[key]=element[key]
            }
        }else{
            if(current.child){
                editElement(current.child,element)
            }
        }
    })
    return arr;
}

export function deleteElement(arr,id){
    arr.forEach(function(current, index){
        if(current.id===id) {
            arr.splice(index, 1);
        }else{
            if(current.child){
                deleteElement(current.child,id)
            }
        }
    })
    return arr;
}
